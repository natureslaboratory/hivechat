<?php

$blockID = $_POST["blockID"];
$block = get_block($blockID);
$cell = get_new_cell($block["cellID"]);
$hive = get_hive($cell["hiveID"]);

if ($hive["organisationID"] !== "-1") {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        $isAdmin = true;
    }
} else if ($hive["memberID"] == perch_member_get("id")) {
    $isOwner = true;
}

if ($isOwner || $isAdmin) {
    echo json_encode(delete_block($blockID));
} else {
    http_response_code(403);
}