<?php

// Pass hiveID, action
$debug = [];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $submittedHive = json_decode($_POST["hive"], true);
    $hiveID = $submittedHive["hiveID"];
    $hive = get_hive($submittedHive["hiveID"]);
} else {
    $debug["method"] = "get";
    $hive = get_hive(perch_get("hiveID"));
}

if ($hive["organisationID"]) {
    $isOrgAdmin = ($hive["organisationID"] > -1) && is_admin($hive["organisationID"], perch_member_get("id"));
    $isHiveOwner = ($hive["organisationID"] == -1) && ($hive["memberID"] == perch_member_get("id"));
} else {
    $isHiveOwner = $hive["memberID"] == perch_member_get("id");
}


if ($isOrgAdmin || $isHiveOwner) {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        processPost($_POST);
    } else {
        processRequest($hive, perch_get("action"));
    }
} else {
    // echo json_encode(["post" => $_POST, "hive" => $hive, "debug" => $debug]);
}


function processRequest($hive, $action = "get-hive") {
    switch ($action) {
        case "get-hive":
            $hiveFlat = HiveApi::flatten($hive, ["mappings" => ["processed" => "introduction"]]);
            echo json_encode($hiveFlat);
            break;
        case "get-cells":
            $cells = get_hive_cells($hive["hiveID"]);
            echo json_encode($cells);
            break;
        default:
            http_response_code(406);
    }
}

function processPost($data) {
    echo json_encode($data["type"]);
    switch($data["type"]) {
        case "hiveDetails":
            $hiveData = json_decode($data["hive"], true);
            echo json_encode(update_hive($hiveData));
            break;
    }
}

