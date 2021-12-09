<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

if (perch_member_logged_in()) {
    $memberID = perch_member_get("id");
    echo json_encode(get_member_organisations($memberID, ["skip-template" => true]));
} else {
    http_response_code(401);
}