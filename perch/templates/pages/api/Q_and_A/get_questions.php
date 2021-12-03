<?php

// GET blockID. Check if is an admin/owner of the block

$blockID = perch_get("blockID");
$block = get_block($blockID);
$cell = get_new_cell($block["cellID"]);
$hive = get_hive($cell["hiveID"]);

// echo json_encode([
//     "block" => $block,
//     "cell" => $cell,
//     "hive" => $hive
// ]);

if ($hive["organisationID"] == -1) {
    if ($hive["memberID"] == perch_member_get("id")) {
        echo json_encode(get_questions($blockID, true));
    } else {
    }
} else {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        echo json_encode(get_questions($blockID, true));
    } else {
    }
}
