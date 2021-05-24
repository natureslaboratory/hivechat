<?php

# gets hive details

function returnHive($hive) {
    echo json_encode($hive);
}

function returnPrivateHive($memberID, $hive) {
    if ($hive["organisationID"] >= 0) {
        $isMember = is_organisation_member($memberID, $hive["organisationID"]);
        if ($isMember) {
            returnHive($hive);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerHive($memberID, $hive);
    }
}


function returnDraftHive($memberID, $hive) {
    if ($hive["organisationID"] >= 0) {
        $isAdmin = is_admin($hive["organisationID"], $memberID);
        if ($isAdmin) {
            returnHive($hive);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerHive($memberID, $hive);
    }
}

function returnOwnerHive($memberID, $hive) {
    $isOwner = is_hive_owner($memberID, $hive["hiveID"]);
    if ($isOwner) {
        returnHive($hive);
    } else {
        http_response_code(401);
    }
}

$hive = get_hive_with_cell_list(perch_get("hiveID"));
$memberID = perch_member_get("id");

if ($hive) {
    switch ($hive["hivePrivacy"]) {
        case "Public":
            returnHive($hive);
            break;
        case "Private":
            returnPrivateHive($memberID, $hive);
            break;
        case "Draft":
            returnDraftHive($memberID, $hive);
            break;
        default:
            http_response_code(500);
    }
} else {
    http_response_code(404);
}
