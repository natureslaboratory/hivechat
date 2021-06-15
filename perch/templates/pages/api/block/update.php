<?php

$block = get_block($_POST["blockID"]);
$cell = get_new_cell($block["cellID"]);

if ($cell["organisationID"] !== -1) {
    $organisationID = $cell["organisationID"];
    if (is_admin($organisationID, perch_member_get("id"))) {
        $isAdmin = true;
    }
}

$isOwner = $cell["memberID"] == perch_member_get("id");

if ($isAdmin || $isOwner) {
    echo json_encode(update_block($_POST));
} else {
    http_response_code(403);
}