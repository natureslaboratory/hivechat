<?php

$blocks = json_decode($_POST["blocks"], true);

$cell = get_new_cell($blocks[0]["cellID"]);

if ($cell["organisationID"] !== -1) {
    $organisationID = $cell["organisationID"];
    if (is_admin($organisationID, perch_member_get("id"))) {
        $isAdmin = true;
    }
}

$isOwner = $cell["memberID"] == perch_member_get("id");


if ($isAdmin || $isOwner) {
    update_blocks($blocks);
} else {
    http_response_code(403);
}