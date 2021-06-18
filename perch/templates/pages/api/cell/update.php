<?php

$cellID = $_POST["cellID"];
$cell = get_new_cell($cellID);
$hive = get_hive($cell["hiveID"]);

// echo json_encode([$cell["memberID"], perch_member_get("id")]);

if ($hive["organisationID"] !== "-1") {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        $isAdmin = true;
    }
} else if ($cell["memberID"] == perch_member_get("id")) {
    $isOwner = true;
}


if ($isAdmin || $isOwner) {
    echo json_encode(update_new_cell($_POST));
} else {
    http_response_code(403);
}