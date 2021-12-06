<?php

// POST questionID, answerText, answerPrivacy. Check if is an admin/owner of the block

$input = json_decode(file_get_contents('php://input'), true);

$question = get_question($input["questionID"]);
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
        create_answer($input);
    } else {
        http_response_code(403);
    }
} else {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        create_answer($input);
    } else {
        http_response_code(403);
    }
}