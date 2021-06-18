<?php

// Send encoded list of cells

$cellList = json_decode($_POST["cellList"], true);


$hive = get_hive($cellList[0]["hiveID"]);

// echo json_encode($cellList[0]["cellOrder"]);


if ($hive["organisationID"] != -1) {
    if (is_admin($hive["organisationID"], perch_member_get("id"))) {
        echo json_encode(update_new_cell_bulk($cellList));
    } else {
        http_response_code(403);
    }
} else if ($hive["memberID"] == perch_member_get("id")) {
    echo json_encode(update_new_cell_bulk($cellList));
} else {
    http_response_code(403);
}