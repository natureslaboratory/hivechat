<?php

$emails = json_decode($_POST["emails"]);
$sendEmails = $_POST["sendEmails"];
$senderID = perch_member_get("id");
$organisation = get_organisation_by_slug($_POST["organisationSlug"], ["skip-template" => true], true);


$result = create_invites_bulk($emails, $senderID, $organisation["organisationID"], ["sendEmails" => $sendEmails]);

if ($result) {
    echo json_encode($result);
} else {
    echo "Hello";
}
