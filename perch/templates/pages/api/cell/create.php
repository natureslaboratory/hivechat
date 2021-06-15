<?php

// Needs hiveID, cellTitle, cellSubtitle, cellDate

$hive = get_hive($_POST["hiveID"]);

// echo json_encode($hive);

echo json_encode($_POST);

if (count($_POST) == 0) {
    http_response_code(401);
} else {
    $isOrganisation = false;
    if ($hive["organisationID"] !== "-1") {
        $isOrganisation = true;
        $organisationID = $hive["organisationID"];
        if (is_admin($organisationID, perch_member_get("id"))) {
            $isAdmin = true;
        }
    }
    
    if ($isAdmin || !$isOrganisation) {
        echo json_encode(create_new_cell(array_merge($_POST, ["memberID" => perch_member_get("id")])));
    } else {
        http_response_code(403);
    }
}
