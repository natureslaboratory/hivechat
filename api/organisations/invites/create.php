<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');


$input = json_decode(file_get_contents('php://input'), true);

if (count($input) == 0) {
    $input = $_POST;
}


// socialLink, socialType, organisationID
$memberID = perch_member_get("id");
$input["senderID"] = $memberID;
$organisationID = $input["organisationID"];
if (is_admin($organisationID, $memberID)) {
    echo create_invite($input);
    // echo json_encode($input);
} else {
    http_response_code(403);
}
