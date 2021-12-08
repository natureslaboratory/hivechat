<?php include($_SERVER['DOCUMENT_ROOT'] . '/perch/runtime.php'); ?>

<?php

if (perch_member_logged_in()) {
    $memberID = perch_member_get("id");
    echo json_encode(get_member($memberID));
} else {
    echo json_encode([
        "memberEmail" => null,
        "memberID" => null,
        "memberProperties" => []
    ]);
}
