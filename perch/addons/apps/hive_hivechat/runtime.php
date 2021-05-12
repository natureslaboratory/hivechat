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
        $hives->update_hive($data, $files);
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
      
      case 'add_organisation_member':
        $orgs = new Hivechat_Organisations($API);
        $data = $SubmittedForm->data;
        $orgs->add_member($data);
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

  $i = 0;
  $rowEnd = false;
  foreach ($list as $data) {
    $orgInfo = [];
    if ($data["organisationID"]) {
      $orgInfo = $organisations->get_organisation($data["organisationID"]);
    }
    if ($i == 0) {
      echo '<div class="row">';
    }
    if ($data['hiveDynamicFields'] <> '') {
      $json = json_decode($data['hiveDynamicFields'], true);
      $desc = array('introduction' => $json['introduction']['processed']);
      $data = array_merge($data, $json, $desc);
    }
    $html = $Template->render(array_merge($data, $orgInfo), true);
    echo $html;
    if ($i == 2) {
      echo '</div> <!--end row-->';
      $rowEnd = true;
    }
    $i++;
    if ($i == 3) {
      $i = 0;
    }
  }

  if (!$rowEnd) {
    echo '</div>';
  }
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
    for ($i=0; $i < $explodedLength-2; $i++) { 
      $relativeUri .= $explodedUri[$i] . "/";
    }
  } else {
    for ($i=0; $i < $explodedLength-1; $i++) { 
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
    $newHive = [];
    $props = [];
    foreach ($hive as $key => $value) {
      if ($key == "hiveDynamicFields") {
        $props = json_decode($value, true);
        $intro = $props["introduction"]["raw"];
        $newHive["hiveIntro"] = $intro;
      } else {
        $newHive[$key] = $value;
      }
    }
    $newData[] = array_merge($newHive, $organisation);
    
  }

  return $newData;
}

function get_organisation_private_hives($organisationID, $memberID)
{
  
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $orgs = new Hivechat_Organisations($API);
  $organisation = $orgs->get_organisation($organisationID);

  
  if ($orgs->is_organisation_member($memberID, $organisationID)) {
    $data = $hives->hives_byOrganisationPrivate($organisationID);
    $newData = [];
    foreach ($data as $hive) {
      $newHive = [];
      $props = [];
      foreach ($hive as $key => $value) {
        if ($key == "hiveDynamicFields") {
          $props = json_decode($value, true);
          $intro = $props["introduction"]["raw"];
          $newHive["hiveIntro"] = $intro;
        } else {
          $newHive[$key] = $value;
        }
      }
      $newData[] = array_merge($newHive, $organisation);
    }
    return $newData;
  }


  return;

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

  if ($data['cellDynamicFields'] <> '') {
    $json = json_decode($data['cellDynamicFields'], true);
    $desc = array('cellIntroduction' => $json['introduction']['processed']);
    $data = array_merge($data, $json, $desc);
  }
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

  $Template = $API->get('Template');
  $Template->set('hivechat/organisation_list.html', 'hc');

  $html = $Template->render_group($list, true);

  echo $html;
}

function get_organisation($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $Template = $API->get('Template');
  $Template->set('hivechat/update_organisation.html', 'hc');

  $data = $organisations->get_organisation($organisationID);



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

function get_organisation_hives($organisationID, $opts = [])
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $hives = new Hivechat_Hives($API);
  $organisations = new Hivechat_Organisations($API);
  $organisation = $organisations->get_organisation($organisationID);

  $Template = $API->get('Template');
  $Template->set('hivechat/list_hives.html', 'hc');
  $list = null;

  if ($opts["scope"] == "Public") {
    $list = $hives->hives_byOrganisationLive($organisationID);
  } else {
    $list = $hives->hives_byOrganisation($organisationID);
  }

  $newList = [];
  foreach ($list as $hive) {
    $newList[] = array_merge($hive, $organisation, $opts);
  }

  $html = $Template->render_group($newList, true);

  echo $html;
}

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

    function memberSort($a, $b) {
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

function add_organisation_member($organisationID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $organisations = new Hivechat_Organisations($API);

  $data = $organisations->get_organisation($organisationID);
  
  $Template = $API->get('Template');
  $Template->set('hivechat/add_organisation_member.html', 'hc');


  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html);

  echo $html;
}

function remove_organisation_member($organisationID, $memberID)
{
  $API  = new PerchAPI(1.0, 'hivechat');
  $orgs = new Hivechat_Organisations($API);

  $member = $orgs->get_member($memberID);

  $data = [
    "organisationID" => $organisationID
  ];

  foreach ($member as $key => $value) {
    if ($key == "memberProperties") {
      $props = json_decode($value);
      foreach ($props as $propKey => $propValue) {
        $data[$propKey] = $propValue;
      }
    } else {
      $data[$key] = $value;
    }
  }
  
  $Template = $API->get('Template');
  $Template->set('hivechat/remove_organisation_member.html', 'hc');


  $html = $Template->render($data);
  $html = $Template->apply_runtime_post_processing($html);

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