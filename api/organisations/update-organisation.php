<?php
include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

$input = json_decode(file_get_contents('php://input'), true);

if (count($input) == 0) {
    $input = $_POST;
}

$memberID = perch_member_get("id");

if (is_admin($input["organisationID"], $memberID)) {
    echo update_organisation($input);
} else {
    echo json_encode(["memberID" => $memberID, "form" => $input]);
}