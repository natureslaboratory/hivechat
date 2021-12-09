<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

if (perch_member_logged_in()) {
    $memberEmail = perch_member_get("email");
    echo json_encode(get_member_invites_list($memberEmail));
} else {
    http_response_code(401);
}