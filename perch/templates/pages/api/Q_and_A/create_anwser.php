<?php

// POST questionID, answerText, answerPrivacy. Check if is an admin/owner of the block

$question = get_question($_POST["questionID"]);
$blockID = $question["blockID"];
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
        echo json_encode(create_answer($_POST));
    } else {
        echo "bleagh";
    }
} else {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        echo json_encode(create_answer($_POST));
    } else {
        echo "boop";
    }
}