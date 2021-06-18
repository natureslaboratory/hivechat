<?php

/*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
*/

# Include your class files as needed - up to you.
include('Hivechat.class.php');
include('Hivechats.class.php');
include('Hivechat.hive.class.php');
include('Hivechat.hives.class.php');
include('Hivechat.cell.class.php');
include('Hivechat.cells.class.php');
include('Hivechat.organisation.class.php');
include('Hivechat.organisations.class.php');
include('Hivechat.notification.class.php');
include('Hivechat.notifications.class.php');
include('Hivechat.invite.class.php');
include('Hivechat.invites.class.php');
include('Hivechat.orgsocial.class.php');
include('Hivechat.orgsocials.class.php');
include('Hivechat.newCell.class.php');
include('Hivechat.newCells.class.php');
include('Hivechat.file.class.php');
include('Hivechat.files.class.php');
include('Hivechat.block.class.php');
include('Hivechat.blocks.class.php');
include('HiveApi.php');

# Create the function(s) users will call from their pages

function hive_hivechat_form_handler($SubmittedForm)
{
  if ($SubmittedForm->validate()) {

    $API  = new PerchAPI(1.0, 'hive_hivechat');

    switch ($SubmittedForm->formID) {

      case 'create_hive':
        $hives = new Hivechat_Hives($API);
        $data['memberID'] = perch_member_get('id');
        $data['hiveTitle'] = $SubmittedForm->data['hiveTitle'];
        $data['hiveCategory'] = $SubmittedForm->data['hiveCategory'];
        if ($SubmittedForm->data["organisationID"]) {
          $data["organisationID"] = $SubmittedForm->data["organisationID"];
        }
        $data = $hives->create_hive($data);
        break;

      case 'delete_hive':
        $hives = new Hivechat_Hives($API);
        $data = $SubmittedForm->data;
        $hives->delete_hive($data['hiveID']);
        break;

      case 'update_hive':
        $hives = new Hivechat_Hives($API);
        $data = $SubmittedForm->data;
        $files = $SubmittedForm->files;
        $result = $hives->update_hive($data, $files);

        if ($data["organisationID"]) {
          create_hive_notifications($data["organisationID"], array_merge($data, $result));
        }

        break;

      case 'create_cell':
        $cells = new Hivechat_Cells($API);
        $data['memberID'] = perch_member_get('id');
        $data['hiveID'] = $SubmittedForm->data['hiveID'];
        $data['cellTitle'] = $SubmittedForm->data['cellTitle'];
        if ($SubmittedForm->data['cellDate'] && $SubmittedForm->data['cellTime']) {
          $data['cellDateTime'] = $SubmittedForm->data['cellDate'] . " " . $SubmittedForm->data['cellTime'];
        } else if ($SubmittedForm->data['cellDate']) {
          $data['cellDateTime'] = $SubmittedForm->data['cellDate'] . " 00:00:00";
        } else {
          $data['cellDateTime'] = "2000:01:01 00:00:00";
        }
        $data = $cells->create_cell($data);
        break;

      case 'delete_cell':
        $cells = new Hivechat_Cells($API);
        $data = $SubmittedForm->data;
        $cells->delete_cell($data['cellID']);
        break;

      case 'update_cell':
        $cells = new Hivechat_Cells($API);
        $data = $SubmittedForm->data;
        $cells->update_cell($data);
        break;

      case 'create_organisation':
        try {
          $organisations = new Hivechat_Organisations($API);
          $data['memberID'] = perch_member_get('id');
          $data['organisationName'] = $SubmittedForm->data['organisationName'];
          $data['organisationSlug'] = $SubmittedForm->data['organisationSlug'];
          $organisations->create_organisation($data);
        } catch (Error $e) {
          echo $e;
        }
        break;

      case 'update_organisation':
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;
        $orgs->update_organisation($data);
        break;

      case 'delete_organisation':
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;
        $orgs->delete_organisation($data["organisationID"]);
        break;

      case 'accept_organisation_invite':
        $orgs = new Hivechat_Organisations($API);
        $invites = new Hivechat_Invites($API);
        $notifications = new Hivechat_Notifications($API);
        $data = $SubmittedForm->data;

        $invite = $invites->get_invite($data["inviteID"]);

        if (!$invites->has_invite(perch_member_get("email"), $data["inviteID"])) {
          break;
        }

        $member = $orgs->get_member_by_email($invite["memberEmail"]);

        $addMemberData = [
          "memberID" => $member["memberID"],
          "organisationID" => $invite["organisationID"],
          "memberEmail" => $member["memberEmail"]
        ];

        $result = $orgs->add_member($addMemberData);

        if ($result) {
          $invites->delete_invite($data["inviteID"]);
          $memberFlat = HiveApi::flatten($member, [
            "mappings" => [
              "first_name" => "first_name",
              "last_name" => "last_name"
            ]
          ]);
          $organisation = $orgs->get_organisation($invite["organisationID"]);
          $message = "$memberFlat[first_name] $memberFlat[last_name] has accepted your invitation to join $organisation[organisationName].";
          $link = "/explore/organisations/$organisation[organisationSlug]/manage/members";
          $notifications->create_notification($invite["senderID"], $member["memberID"], $message, $link);
        }

        ?>
          <script>
              window.location.href="/explore/organisations/<?= $organisation["organisationSlug"] ?>"
          </script>
        <?php

        break;

      case "create_organisation_invite":
        $orgs = new Hivechat_Organisations($API);
        $invites = new Hivechat_Invites($API);
        $email = new PerchEmail("hivechat/signup.html");

        $data = $SubmittedForm->data;

        $member = $orgs->get_member_by_email($data["memberEmail"]);
        if ($member && $orgs->is_organisation_member($member["memberID"], $data["organisationID"])) {
          break;
        }

        $invites->create_invite($data["memberEmail"], $data["senderID"], $data["organisationID"]);
        $sender = HiveApi::flatten($orgs->get_member($data["senderID"]), ["mappings" => ["first_name" => "first_name", "last_name" => "last_name"]]);
        $organisation = $orgs->get_organisation($data["organisationID"]);
        $message = "$sender[first_name] $sender[last_name] has invited you to join $organisation[organisationName]";
        $link = "/admin/register";

        if ($member) {
          $link = "/admin/invites";
          create_notification($member["memberID"], $data["senderID"], $message, $link);
        }

        $email->set_bulk([
          "email_message" => $message,
          "email_subject" => $message,
          "isMember" => $member ? true : false,
          "protocol" => $_SERVER["HTTPS"] ? "https://" : "http://",
          "email_link" => $link
        ]);

        $email->senderName("Hivechat");
        $email->senderEmail("caleb@natureslaboratory.co.uk");
        $email->recipientEmail($data["memberEmail"]);
        $email->send();

        break;

      case "decline_organisation_invite":
        $orgs = new Hivechat_Organisations($API);
        $invites = new Hivechat_Invites($API);
        $notifications = new Hivechat_Notifications($API);

        $data = $SubmittedForm->data;
        if ($invites->has_invite(perch_member_get("email"), $data["inviteID"])) {
          $invite = $invites->get_invite($data["inviteID"]);
          $invites->delete_invite($data["inviteID"]);

          $member = $orgs->get_member_by_email($invite["memberEmail"]);
          $memberFlat = HiveApi::flatten($member, [
            "mappings" => [
              "first_name" => "first_name",
              "last_name" => "last_name"
            ]
          ]);

          $organisation = $orgs->get_organisation($invite["organisationID"]);
          $message = "$memberFlat[first_name] $memberFlat[last_name] has declined your invitation to join $organisation[organisationName].";
          $link = "/explore/organisations/$organisation[organisationSlug]/manage/members";
          $notifications->create_notification($invite["senderID"], $member["memberID"], $message, $link);
        }
        break;

      case "delete_organisation_invite":
        $invites = new Hivechat_Invites($API);
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;

        if ($orgs->is_admin($data["organisationID"], perch_member_get("id"))) {
          $invites->delete_invite($data["inviteID"]);
        }
        break;

      case 'manage_organisation_member':
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;
        $orgs->update_member($data);
        // printArray($data);
        break;
      case 'remove_organisation_member':
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;
        $orgs->delete_member($data["organisationID"], $data["memberID"]);
        // printArray($data);
        break;
      case 'add_org_social':
        $orgsocials = new Hivechat_OrgSocials($API);
        $data = $SubmittedForm->data;
        $orgsocials->add_org_social($data);
        break;
    }
  }
}

function printArray($item, $depth = 0)
{
  foreach ($item as $key => $value) {
    $depthString = str_repeat("--", $depth);
    if (gettype($value) !== "array") {
      echo "$depthString $key: $value <br>";
    } else {
      echo "$depthString $key: <br>";
      printArray($value, $depth + 1);
    }
  }
}

function browse_hives($opts = [])
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $organisations = new Hivechat_Organisations($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/browse_hives.html', 'hc');
  $list = null;

  if ($opts["memberID"]) {
    $isMember = $organisations->is_organisation_member($opts["memberID"], $opts["organisationID"]);
  }

  if ($opts["organisationID"]) {
    $list = $hives->hives_byOrganisationLive($opts["organisationID"]);
  } else {
    $list = $hives->hives_byLive();
  }

  $newList = [];
  foreach ($list as $hive) {
    $orgInfo = [];
    if ($hive["organisationID"]) {
      $orgInfo = $organisations->get_organisation($hive["organisationID"]);
    }

    $newHive = HiveApi::flatten($hive, ["mappings" => ["processed" => "introduction"]]);
    $newList[] = array_merge($newHive, $orgInfo);
  }

  $html = $Template->render_group($newList, true);
  echo $html;
}

function create_hive($opts = array(), $return = false)
{
  $API  = new PerchAPI(1.0, 'hivechat');

  if ($opts["organisationID"]) {
    $orgs = new Hivechat_Organisations($API);
    $data = $orgs->get_organisation($opts["organisationID"]);
  }

  $Template = $API->get('Template');
  $Template->set('hivechat/create_hive.html', 'hc');

  $data["action"] = $opts["action"];

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function create_cell($hiveID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');

  $Template = $API->get('Template');
  $Template->set('hivechat/create_cell.html', 'hc');

  $data['hiveID'] = $hiveID;
  $data = array_merge($data, $opts);

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function list_hives($memberID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/list_hives.html', 'hc');

  $list = $hives->hives_byMember($memberID);

  $html = $Template->render_group($list, true);

  echo $html;
}

function hive_cells($hiveID, $opts = [], $return = false)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Cells($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/list_cells.html', 'hc');

  $list = $hives->cells_byHive($hiveID);

  if ($opts["skip-template"]) {
    return $list;
  }

  if ($return) {
    return $Template->render_group($list, true);
  }

  if (count($list) == 0) {

    echo "You're yet to create a cell.";
  } else {

    $html = $Template->render_group($list, true);
    echo $html;
  }
}

function hive_cells_nav($hiveID, $cellID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Cells($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/list_cells_nav.html', 'hc');

  // Allows the button links to reference a relative path;
  // one for general hives and one for organisation hives.
  $uri = $_SERVER["REQUEST_URI"];
  $explodedUri = explode("/", $uri);
  $explodedLength = count($explodedUri);
  $relativeUri = "";
  if ($cellID && $hiveID) {
    for ($i = 0; $i < $explodedLength - 2; $i++) {
      $relativeUri .= $explodedUri[$i] . "/";
    }
  } else {
    for ($i = 0; $i < $explodedLength - 1; $i++) {
      $relativeUri .= $explodedUri[$i] . "/";
    }
  }

  $list = $hives->cells_byHive($hiveID);
  $count = count($list);
  $i = 0;
  while ($i < $count) {
    if ($cellID == $list[$i]['cellID'] or ($cellID == '' and $i == 0)) {
      $list[$i]['active'] = 'yes';
    }
    $list[$i]["relativePath"] = $relativeUri;
    $i++;
  }
  $html = $Template->render_group($list, true);
  echo $html;
}

function get_hive($hiveID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  $data = $hives->get_hive($hiveID, true);

  return $data;
}

function get_hive_with_cells($hiveID) 
{
  
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $cells = new Hivechat_Cells($API);
  $hive = $hives->get_hive($hiveID);
  $hive = HiveApi::flatten($hive, [
    "mappings" => [
      "raw" => "introduction"
    ]
  ]);
  $hiveCells = $cells->cells_byHive($hiveID);
  
  $cellIDList = [];
  foreach ($hiveCells as $cell) {
    $cellDynamicFields = json_decode($cell["cellDynamicFields"]);
    $newCell = $cell;
    $newCell["cellDynamicFields"] = $cellDynamicFields;
    $cellIDList[] = $newCell;
  }

  $data = [];

  $data["hive"] = $hive;
  $data["cells"] = $cellIDList;

  return $data;
}

function delete_hive($hiveID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/delete_hive.html', 'hc');

  $data = $hives->get_hive($hiveID);

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function edit_hive($hiveID, $opts = [])
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/edit_hive.html', 'hc');

  $data = $hives->get_hive($hiveID);
  $data = array_merge($data, $opts);

  if ($data['hiveDynamicFields'] <> '') {
    $json = json_decode($data['hiveDynamicFields'], true);
    $desc = array('introduction' => $json['introduction']['processed']);
    $data = array_merge($data, $json, $desc);
  }
  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function get_organisation_public_hives($organisationID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $orgs = new Hivechat_Organisations($API);

  $organisation = $orgs->get_organisation($organisationID);

  $data = $hives->hives_byOrganisationLive($organisationID);
  $newData = [];
  foreach ($data as $hive) {
    $newHive = HiveApi::flatten($hive, [
      "mappings" => [
        "raw" => "hiveIntro"
      ]
    ]);
    $newData[] = array_merge($newHive, $organisation);
  }

  return $newData;
}

function get_member_hives($opts = []) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  $memberID = perch_member_get("id");

  return $hives->get_member_hives($memberID, $opts["privacy"]);

}

function get_organisation_hives($organisationID, $opts = [])
{

  // echo json_encode($opts);
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $orgs = new Hivechat_Organisations($API);
  $organisation = $orgs->get_organisation($organisationID);

  $memberID = $opts["memberID"];
  $isAdmin = $memberID ? $orgs->is_admin($organisationID, $memberID) : false;
  $isMember = $memberID ? $orgs->is_organisation_member($memberID, $organisationID) : false;

  if (!$opts["skip-template"]) {
    $Template = $API->get('Template');
    $Template->set('hivechat/list_hives.html', 'hc');
  }

  switch ($opts["type"]) {
    case "Public":
      $data = $hives->get_public_org_hives($organisationID);
      break;
    case "Private":
      if ($isMember) {
        $data = $hives->get_private_org_hives($organisationID);
      }
      break;
    case "Draft":
      if ($isAdmin) {
        $data = $hives->get_draft_org_hives($organisationID);
      }
      break;
    case "All":
      if ($isAdmin) {
        $data = $hives->hives_byOrganisation($organisationID);
      }
      break;
    default:
      return;
  }


  if (!$data) {
    return;
  }

  $newData = [];
  foreach ($data as $hive) {
    $newHive = HiveApi::flatten($hive, [
      "mappings" => [
        "raw" => "hiveIntro"
      ]
    ]);
    $newData[] = array_merge($newHive, $organisation);
  }

  if ($opts["skip-template"]) {
    return $newData;
  }

  $html = $Template->render_group($newData, true);

  echo $html;
}

function get_cell($cellID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_Cells($API);

  $data = $cells->get_cell($cellID, true);

  return $data;
}

function get_first_cell($hiveID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Cells($API);

  $list = $hives->cells_byHive($hiveID);
  return $list[0];
}

function delete_cell($cellID, $hiveID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_Cells($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/delete_cell.html', 'hc');

  $data = $cells->get_cell($cellID);

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function edit_cell($cellID)
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_Cells($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/edit_cell.html', 'hc');

  $data = $cells->get_cell($cellID);

  // $data = HiveApi::flatten($data, [
  //   "mappings" => [
  //     "raw" => "cellIntroduction_raw",
  //     "processed" => "cellIntroduction",
  //     "video" => "video"
  //   ]
  // ]);

  $cellDynamicFields = json_decode($data["cellDynamicFields"], true);
  if ($cellDynamicFields) {
    $data["video"] = $cellDynamicFields["video"];
    $data["cellIntroduction"] = $cellDynamicFields["introduction"]["processed"];
    $data["questionVideo"] = $cellDynamicFields["questionVideo"];
    $data["questionText"] = $cellDynamicFields["questionText"]["processed"];
  }

  // HiveApi::printArray($data);

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function create_organisation()
{
  $API  = new PerchAPI(1.0, 'hivechat');

  $Template = $API->get('Template');
  $Template->set('hivechat/create_organisation.html', 'hc');

  $html = $Template->render(false);
  $html = $Template->apply_runtime_post_processing($html);

  echo $html;
}

function create_organisation_api($data)
{
  $API  = new PerchAPI(1.0, 'hivechat');

  $organisations = new Hivechat_Organisations($API);

  return $organisations->create_organisation($data);
}


function get_organisation_names()
{

  $API  = new PerchAPI(1.0, 'hivechat');

  $organisations = new Hivechat_Organisations($API);

  return $organisations->get_organisation_names();
}

function get_organisation_members($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');

  $organisations = new Hivechat_Organisations($API);


  return $organisations->get_organisation_members($organisationID);
}


function get_member_organisations($memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $list = $organisations->get_member_organisations($memberID);
  $newList = [];
  foreach ($list as $org) {
    $newOrg = $org;
    $newOrg["isAdmin"] = $organisations->is_admin($org["organisationID"], $memberID) ? true : false;
    $newList[] = $newOrg;
  }

  $Template = $API->get('Template');
  $Template->set('hivechat/organisation_list.html', 'hc');

  $html = $Template->render_group($newList, true);

  echo $html;
}

function get_organisation($organisationID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/update_organisation.html', 'hc');

  $data = $organisations->get_organisation($organisationID);

  if ($opts["skip-template"]) {
    return $data;
  }

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function is_organisation_member($memberID, $organisationID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  return $organisations->is_organisation_member($memberID, $organisationID, $opts);
}

function update_organisation($data)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  return $organisations->update_organisation($data);
}

function delete_organisation($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/delete_organisation.html', 'hc');

  $data = $organisations->get_organisation($organisationID);

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

// Deprecated
// function get_organisation_hives($organisationID, $opts = [])
// {
//   $API  = new PerchAPI(1.0, 'hivechat');
//   $hives = new Hivechat_Hives($API);
//   $organisations = new Hivechat_Organisations($API);
//   $organisation = $organisations->get_organisation($organisationID);

//   $Template = $API->get('Template');
//   $Template->set('hivechat/list_hives.html', 'hc');
//   $list = null;

//   if ($opts["scope"] == "Public") {
//     $list = $hives->hives_byOrganisationLive($organisationID);
//   } else {
//     $list = $hives->hives_byOrganisation($organisationID);
//   }

//   $newList = [];
//   foreach ($list as $hive) {
//     $newList[] = array_merge($hive, $organisation, $opts);
//   }

//   $html = $Template->render_group($newList, true);

//   echo $html;
// }

function get_organisation_by_slug($organisationSlug, array $opts = [], $return = false)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);
  $data = $organisations->get_organisation_by_slug($organisationSlug);

  if ($opts["skip-template"]) {
    if ($return) {
      return $data;
    } else {
      echo $data;
      return;
    }
  }

  $Template = $API->get('Template');
  $Template->set('hivechat/organisation.html', 'hc');

  $html = $Template->render($data);
  if ($return) {
    return $html;
  }

  echo $html;
}

function get_public_organisations()
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);



  $list = $organisations->get_public_organisations();

  $Template = $API->get('Template');
  $Template->set('hivechat/public_org_list.html', 'hc');

  $html = $Template->render_group($list, true);

  echo $html;
}

function organisation_members($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $list = $organisations->get_members($organisationID);
  $organisation = $organisations->get_organisation($organisationID);
  $newList = [];

  foreach ($list as $member) {
    $newMember = HiveApi::flatten($member);

    $memberorg = $organisations->get_memberorg($organisationID, $newMember["memberID"]);
    switch ($memberorg["memberRole"]) {
      case 1:
        $newMember["memberRole"] = "Member";
        break;
      case 0:
        $newMember["memberRole"] = "Admin";
        break;
      default:
        break;
    }

    foreach ($organisation as $key => $value) {
      $newMember[$key] = $value;
    }

    $newList[] = $newMember;
  }

  function memberSort($a, $b)
  {
    if ($a["memberRole"] == "Admin" && $b["memberRole"] == "Member") {
      return -1;
    } else if ($a["memberRole"] == "Member" && $b["memberRole"] == "Admin") {
      return 1;
    } else {
      return 0;
    }
  }

  usort($newList, "memberSort");

  $list = $newList;

  $Template = $API->get('Template');
  $Template->set('hivechat/member_list.html', 'hc');

  // printArray($list);
  $html = $Template->render_group($list, true);

  echo $html;
}

function add_organisation_member($organisationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $data = $organisations->get_organisation($organisationID);

  $Template = $API->get('Template');
  $Template->set('hivechat/add_organisation_member.html', 'hc');
  $data["memberID"] = $memberID;

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function remove_organisation_member($organisationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);

  $member = $orgs->get_member($memberID);
  $data = HiveApi::flatten($member);

  $data["organisationID"] = $organisationID;

  $Template = $API->get('Template');
  $Template->set('hivechat/remove_organisation_member.html', 'hc');


  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function is_member($memberEmail)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  return $organisations->is_member($memberEmail);
}

function manage_organisation_member($organisationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);
  $memberorg = $orgs->get_memberorg($organisationID, $memberID);
  $org = $orgs->get_organisation($organisationID);

  switch ($memberorg["memberRole"]) {
    case 1:
      $memberorg["memberRole"] = "Member";
      break;
    case 0:
      $memberorg["memberRole"] = "Admin";
      break;
    default:
      break;
  }

  $memberorg = array_merge($memberorg, $org);

  $Template = $API->get('Template');
  $Template->set('hivechat/manage_organisation_member.html', 'hc');

  $html = $Template->render($memberorg);
  $html = $Template->apply_runtime_post_processing($html, $memberorg);

  echo $html;
}

function is_admin($organisationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);
  return $orgs->is_admin($organisationID, $memberID);
}

function is_organisation_hive($hiveID, $organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $hive = $hives->get_hive($hiveID);
  if ($hive["organisationID"] == $organisationID) {
    return true;
  }
  return false;
}

function sendEmail($opts = [])
{

  $API  = new PerchAPI(1.0, 'hivechat');
  $template = $opts["template"] ? $opts["template"] : "hivechat/email.html";
  $Email = new PerchEmail($template);
  $Email->set_bulk($opts["content"]);


  $Email->subject($opts["subject"]);
  $Email->senderName($opts["senderName"]);
  $Email->senderEmail("caleb@natureslaboratory.co.uk");
  $Email->recipientEmail($opts["recipientEmail"]);
  $Email->send();
}

function mark_notifications_as_read($memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Notifications = new Hivechat_Notifications($API);
  return $Notifications->read_all_notifications($memberID);
}

function create_notification($memberID, $creatorID, $notificationMessage, $notificationLink)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Notifications = new Hivechat_Notifications($API);
  return $Notifications->create_notification($memberID, $creatorID, $notificationMessage, $notificationLink);
}

function get_notifications($memberID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Notifications = new Hivechat_Notifications($API);

  $list = $Notifications->get_member_notifications($memberID);

  if ($opts["skip-template"]) {
    return $list;
  }

  $Template = $API->get('Template');
  $Template->set('hivechat/notifications.html', 'hc');

  $html = $Template->render_group($list, true);
  echo $html;
}

function create_hive_notifications($organisationID, $data)
{
  if (!$data["notificationType"]) {
    return;
  }

  $API  = new PerchAPI(1.0, 'hivechat');
  $Organisations = new Hivechat_Organisations($API);
  $Hives = new Hivechat_Hives($API);

  $hive = $Hives->get_hive($data["hiveID"]);
  $members = $Organisations->get_organisation_members($organisationID);
  $organisation = $Organisations->get_organisation($organisationID);
  $creator = HiveApi::flatten($Organisations->get_member($data["memberID"]), [
    "mappings" => [
      "first_name" => "first_name",
      "last_name" => "last_name"
    ]
  ]);

  switch ($data["notificationType"]) {
    case "Published":
      $message = "$hive[hiveTitle] has been published by $creator[first_name] $creator[last_name] in $organisation[organisationName].";
      $link = "/explore/organisations/$organisation[organisationSlug]/$data[hiveID]";
      break;
    case "Updated":
      $message = "$hive[hiveTitle] has been updated by $creator[first_name] $creator[last_name] in $organisation[organisationName].";
      $link = "/explore/organisations/$organisation[organisationSlug]/$data[hiveID]";
      break;
    default:
      break;
  }

  foreach ($members as $member) {
    create_notification($member["memberID"], $data["memberID"], $message, $link);
  }
}

function delete_notification($notificationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Notifications = new Hivechat_Notifications($API);
  $details = [
    "notificationID" => $notificationID,
    "memberID" => $memberID,
    "memberHasNotification" => $Notifications->member_has_notification($notificationID, $memberID)
  ];
  if ($Notifications->member_has_notification($notificationID, $memberID)) {
    $Notifications->delete_notification($notificationID);
    $details["deleted"] = true;
  } else {
    $details["deleted"] = false;
  }
  echo json_encode($details);
}

function get_invites($memberEmail)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Invites = new Hivechat_Invites($API);
  $Organisations = new Hivechat_Organisations($API);

  $memberInvites = $Invites->get_member_invites($memberEmail);

  $list = [];

  foreach ($memberInvites as $memberInvite) {
    $org = $Organisations->get_organisation($memberInvite["organisationID"], ["skip-template" => true]);
    $sender = HiveApi::flatten($Organisations->get_member($memberInvite["senderID"]), [
      "mappings" => [
        "first_name" => "first_name",
        "last_name" => "last_name"
      ]
    ]);
    $list[] = array_merge($memberInvite, $org, $sender);
  }


  $Template = $API->get('Template');
  $Template->set('hivechat/invites.html', 'hc');

  $html = $Template->render_group($list, true);
  $html = $Template->apply_runtime_post_processing($html, $list);
  // $html = $Template->render_forms($html, $list);
  echo $html;
}

function get_organisation_invites($organisationID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Invites = new Hivechat_Invites($API);
  $Organisations = new Hivechat_Organisations($API);
  $organisationInvites = $Invites->get_organisation_invites($organisationID);

  $list = [];
  foreach ($organisationInvites as $invite) {
    $sender = HiveApi::flatten($Organisations->get_member($invite["senderID"]), [
      "mappings" => [
        "first_name" => "first_name",
        "last_name" => "last_name"
      ]
    ]);
    $newInvite = $invite;
    $invite["sender_first_name"] = $sender["first_name"];
    $invite["sender_last_name"] = $sender["last_name"];
    $list[] = $invite;
  }

  if ($opts["skip-template"]) {
    return $list;
  }


  $Template = $API->get('Template');
  $Template->set('hivechat/organisation_invites.html', 'hc');

  $html = $Template->render_group($list, true);
  $html = $Template->apply_runtime_post_processing($html, $list);

  echo $html;
}

function delete_organisation_invite($inviteID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $Invites = new Hivechat_Invites($API);
  $Organisations = new Hivechat_Organisations($API);

  $invite = $Invites->get_invite($inviteID);

  if ($Organisations->is_admin($invite["organisationID"], perch_member_get("id"))) {
    return $Invites->delete_invite($inviteID);
  }
  return null;
}

function get_org_socials($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgsocials = new Hivechat_OrgSocials($API);
  return $orgsocials->get_org_socials($organisationID);
}

function add_organisation_socials($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');

  $Template = $API->get('Template');
  $Template->set('hivechat/add_organisation_social.html', 'hc');
  $data = [
    "organisationID" => $organisationID
  ];

  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html, $data);

  echo $html;
}

function get_organisation_socials($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgsocials = new Hivechat_OrgSocials($API);

  return $orgsocials->get_org_socials($organisationID);
}

function get_organisation_socials_admin($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgsocials = new Hivechat_OrgSocials($API);

  $list = $orgsocials->get_org_socials($organisationID);

  $Template = $API->get('Template');
  $Template->set('hivechat/list_organisation_socials.html', 'hc');


  $html = $Template->render_group($list, true);
  $html = $Template->apply_runtime_post_processing($html, $list);

  echo $html;
}

function save_social($data)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);
  $orgsocials = new Hivechat_OrgSocials($API);

  if (!($data["organisationSlug"] &&
    $data["socialID"] &&
    $data["socialType"] &&
    $data["socialLink"])) {
    return ["success" => false, "error" => "Incorrect Post", "data" => $data];
  }

  $organisation = $orgs->get_organisation_by_slug($data["organisationSlug"]);
  if (!$orgs->is_admin($organisation["organisationID"], perch_member_get("id"))) {
    return ["success" => false, "error" => "Not Admin"];
  }

  $result = $orgsocials->update_org_social($data);
  if ($result) {
    return ["success" => true, "data" => $data];
  } else {
    return ["success" => false, "error" => "Database Error", "sql" => $result, "data" => $data];
  }
}

function delete_social($socialID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);
  $orgsocials = new Hivechat_OrgSocials($API);
  $social = $orgsocials->get_social($socialID);

  if (!$orgs->is_admin($social["organisationID"], perch_member_get("id"))) {
    return ["success" => false, "error" => "Not Admin", "socialID" => $socialID, "member" => perch_member_get("id")];
  }

  $result = $orgsocials->delete_social($socialID);
  if ($result) {
    return ["success" => true];
  } else {
    return ["success" => false, "error" => "Database Error"];
  }
}

function add_social($data)
{
  if (!($data["socialLink"] &&
    $data["socialType"] &&
    $data["organisationID"])) {
    return ["success" => false, "error" => "Invalid Post", "data" => $data];
  }

  $API  = new PerchAPI(1.0, 'hivechat');
  $orgsocials = new Hivechat_OrgSocials($API);
  $result = $orgsocials->add_org_social($data);
  if ($result) {
    return ["success" => true];
  } else {
    return ["success" => false, "error" => "Database Error", "data" => $data];
  }
}

function is_hive_owner($memberID, $hiveID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_hives($API);

  $hive = $hives->get_hive($hiveID);
  if ($hive["memberID"] == $memberID) {
    return true;
  }
  return false;
}

function create_invites_bulk($emails, $senderID, $organisationID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $invites = new Hivechat_Invites($API);
  $organisations = new Hivechat_Organisations($API);

  if ($organisations->is_admin($organisationID, $senderID)) {
    http_response_code(403);
    return;
  }
  
  $filteredEmails = [];
  $debug = [];
  foreach ($emails as $email) {
    $member = $organisations->get_member_by_email($email);
    if ($member) {
      $memberOrg = $organisations->is_organisation_member($member["memberID"], $organisationID);
      if ($memberOrg) {
        $debug[$email] = "Already Member";
        continue;
      } 
    }

    $invite = $invites->has_organisation_invite($email, $organisationID);
    if ($invite) {
      $debug[$email] = "Has Invite";
      continue;
    } else {
      $debug[$email] = "No Invite";
    }

    $exists = false;
    foreach ($filteredEmails as $filteredEmail) {
      if ($email == $filteredEmail) {
        $debug[$email] = "Already in filteredEmails";
        $exists = true;
      } else {
        $debug[$email] = "Not in filteredEmails";
      }
    }
    if (!$exists) {
      $debug[$email] = "Adding to filteredEmails";
      $filteredEmails[] = $email;
    } else {
      $debug[$email] = "Not adding to filteredEmails";
    }
    
  }

  return $invites->create_invites_bulk($filteredEmails, $senderID, $organisationID);
}

function update_hive($data) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);

  return $hives->update_hive($data);
}

function create_new_cell($cellData) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_NewCells($API);

  $currentCells = $cells->get_hive_cells($cellData["hiveID"]);

  
  $fields = [
    "cellTitle",
    "cellSubtitle",
    "cellDate",
    "memberID",
    "hiveID"
  ];
  
  $data = HiveApi::filter($cellData, $fields);
  $data["cellOrder"] = count($currentCells);
  
  return $cells->create_cell(HiveApi::formatAllStrings($data));
}

function update_new_cell($cellData) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_NewCells($API);

  $fields = [
    "cellID",
    "cellTitle",
    "cellSubtitle",
    "cellDate",
    "hiveID",
    "cellOrder"
  ];

  $data = HiveApi::filter($cellData, $fields);
  return $cells->update_cell(HiveApi::formatAllStrings($data));
} 

function update_new_cell_bulk($cellList) {
  $results = [];
  foreach ($cellList as $cell) {
    $results[] = update_new_cell($cell);
    // $results[] = $cell;
  }
  return $results;
}

function get_new_cell($cellID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_NewCells($API);

  $cell = $cells->get_cell($cellID);
  $cell["blocks"] = get_cell_blocks($cellID);

  return $cell;
}

function get_cell_blocks($cellID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $blocks = new Hivechat_Blocks($API);

  return $blocks->get_blocks_by_cell($cellID);
}

function create_new_block($blockData) {
  // cellID, blockOrder, blockType, blockData, fileNames, files

  $API  = new PerchAPI(1.0, 'hivechat');
  $blocks = new Hivechat_Blocks($API);
  $files = $blockData["files"];
  $fileNames = json_decode($blockData["fileNames"]);

  $fileArray = [];
  foreach ($files as $fileRef => $file) {
    $fileIndex = explode("_", $fileRef)[1];
    $fileArray[] = [
      "file" => $file,
      "fileName" => $fileNames[$fileIndex]
    ];
  }

  $fields = [
    "blockOrder",
    "blockType",
    "blockData",
    "cellID"
  ];

  $data = HiveApi::filter($blockData, $fields);

  $blockID = $blocks->create_block(HiveApi::formatAllStrings($data));
  // echo "BlockID = $blockID";
  // echo json_encode($fileNames);

  $files = new Hivechat_Files($API);
  $results = [];
  foreach ($fileArray as $file) {
    // echo json_encode([$file["file"]["name"], $file["fileName"]]);
    $results[] = upload_file($file["file"], $file["fileName"], $blockID);
  }
  // return $results;
}

function update_block($block) {
  // [blockID, blockOrder, blockType, blockData]
  $API  = new PerchAPI(1.0, 'hivechat');
  $blocks = new Hivechat_Blocks($API);

  $fields = [
    "blockID",
    "blockOrder",
    "blockType",
    "blockData"
  ];

  $data = HiveApi::filter($block, $fields);

  if (is_array($data["blockData"])) {
    $data["blockData"] = json_encode($data["blockData"]);
  }

  echo "data[blockData] = " . $data["blockData"];

  return $blocks->update_block(HiveApi::formatAllStrings($data));
}

function update_blocks($blocks) {
  // [[blockID...], [], []]

  $results = [];
  foreach ($blocks as $block) {
    $results[] = update_block($block);
  }

  return $results;
}

function get_block($blockID) {
  
  $API  = new PerchAPI(1.0, 'hivechat');
  $blocks = new Hivechat_Blocks($API);

  return $blocks->get_block($blockID);
}

function delete_block($blockID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $blocks = new Hivechat_Blocks($API);

  return $blocks->delete_block($blockID);
}

function get_hive_cells($hiveID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $cells = new Hivechat_NewCells($API);

  return $cells->get_hive_cells($hiveID);
}

function upload_file($file, $fileName, $blockID) {
  $API  = new PerchAPI(1.0, 'hivechat');
  $files = new Hivechat_Files($API);

  $debug = [];

  if (!is_dir("./file_uploads")) {
    echo "creating dir";
    echo mkdir("./file_uploads", 0777, true) ? "created" : "failed";
  }

  $name_exists = $files->get_files_by_name($file["name"]);

  if ($name_exists) {
    $info = pathinfo($_FILES['userFile']['name']);
    $ext = $info['extension']; // get the extension of the file
    $newname = HiveApi::random_str(10) . "." . $ext;
    
    $target = './file_uploads/.' . $newname;
  } else {
    $target = './file_uploads' . "/" . $file["name"];
  }

  echo json_encode(["target" => $target]);

  $result = move_uploaded_file($file["tmp_name"], $target);

  if ($result) {
    $query = $files->create_file([
      "fileName" => $fileName,
      "fileLocation" => $target,
      "blockID" => $blockID
    ]);
  }

  if ($query) {
    return [$files->get_files_by_location($target), "debug" => $debug];
  }
}
