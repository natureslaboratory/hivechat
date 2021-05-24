<?php

# gets hive details

function returnHive($hive) {
    echo json_encode($hive);
}

function returnPrivateHive($memberID, $data) {
    $hive = $data["hive"];
    if ($hive["organisationID"] >= 0) {
        $isMember = is_organisation_member($memberID, $hive["organisationID"]);
        if ($isMember) {
            returnHive($data);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerHive($memberID, $data);
    }
}


function returnDraftHive($memberID, $data) {
    $hive = $data["hive"];
    if ($hive["organisationID"] >= 0) {
        $isAdmin = is_admin($hive["organisationID"], $memberID);
        if ($isAdmin) {
            returnHive($data);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerHive($memberID, $data);
    }
}

function returnOwnerHive($memberID, $data) {
    $hive = $data["hive"];
    $isOwner = is_hive_owner($memberID, $hive["hiveID"]);
    if ($isOwner) {
        returnHive($data);
    } else {
        http_response_code(401);
    }
}

$data = get_hive_with_cells(perch_get("hiveID"));
$hive = $data["hive"];
$memberID = perch_member_get("id");

if ($hive) {
    switch ($hive["hivePrivacy"]) {
        case "Public":
            returnHive($data);
            break;
        case "Private":
            returnPrivateHive($memberID, $data);
            break;
        case "Draft":
            returnDraftHive($memberID, $data);
            break;
        default:
            http_response_code(500);
    }
} else {
    http_response_code(404);
}
