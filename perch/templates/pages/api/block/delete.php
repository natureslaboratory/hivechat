<?php

$blockID = $_POST["blockID"];
$block = get_block($blockID);
$cell = get_new_cell($block["cellID"]);

if ($cell["organisationID"] !== "-1") {
    if (is_admin($cell["organisationID"], perch_member_get("id"))) {
        $isAdmin = true;
    }
} else if ($cell["memberID"] == perch_member_get("id")) {
    $isOwner = true;
}

if ($isOwner || $isAdmin) {
    echo json_encode(delete_block($blockID));
} else {
    http_response_code(403);
}