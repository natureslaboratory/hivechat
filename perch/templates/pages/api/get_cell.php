<?php

# Passed a hiveID and cellID
# Checks privacy - if public get cell, if private check if the user is an org member, if draft, check if user is org admin
# return data

function returnCell($cell) {
    echo json_encode(HiveApi::flatten($cell, ["mappings" => [
        "processed" => "introduction",
        "video" => "video"
    ]]));
}

function returnOwnerCell($cell, $memberID, $hive) {
    $isOwner = is_hive_owner($memberID, $hive["hiveID"]);
    if ($isOwner) {
        returnCell($cell);
    } else {
        http_response_code(401);
    }
}

function returnPrivateCell($cell, $memberID, $hive) {
    if ($hive["organisationID"] >= 0) {
        $isMember = is_organisation_member($memberID, $hive["organisationID"]);
        if ($isMember) {
            returnCell($cell);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerCell($cell, $memberID, $hive);
    }
}

function returnDraftCell($cell, $memberID, $hive) {
    if ($hive["organisationID"] >= 0) {
        $isAdmin = is_admin($hive["organisationID"], $memberID);
        if ($isAdmin) {
            returnCell($cell);
        } else {
            http_response_code(401);
        }
    } else {
        returnOwnerCell($cell, $memberID, $hive);
    }
}

$cellID = perch_get("cellID");
$cell = get_cell($cellID);
$hiveID = $cell["hiveID"];
$memberID = perch_member_get("id");
$hive = get_hive($hiveID);

if ($hive && $cell) {
    switch ($hive["hivePrivacy"]) {
        case "Public":
            returnCell($cell);
            break;
        case "Private":
            returnPrivateCell($cell, $memberID, $hive);
            break;
        case "Draft":
            returnDraftCell($cell, $memberID, $hive);
            break;
        default:
            http_response_code(500);
    }
} else {
    http_response_code(406);
}