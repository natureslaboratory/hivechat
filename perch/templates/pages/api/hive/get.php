<?php

// Params - hiveID, organisationID, privacy
// if no params, return member public hives
// if just privacy, return member {privacy} hives

$hiveID = perch_get("hiveID");
$organisationID = perch_get("organisationID");
$privacy = perch_get("privacy") ? perch_get("privacy") : "Public";
$memberID = perch_member_get("id");

// echo json_encode($_GET);

if ($hiveID) {
    $hive = get_hive($hiveID);
    if ($hive["hivePrivacy"] == "Draft") {
        if (is_admin($hive["organisationID"], $memberID)) {
            echo json_encode($hive);
        } else {
            http_response_code(403);
        }
    } else if ($hive["hivePrivacy"] == "Private") {
        if (is_organisation_member($memberID, $hive["organisationID"])) {
            echo json_encode($hive);
        } else {
            http_response_code(403);
        }
    } else {
        echo json_encode($hive);
    }
} else if ($organisationID) {
    $hives = get_organisation_hives($organisationID, ["type" => $privacy, "memberID" => $memberID, "skip-template" => true]);
    if ($hives) {
        echo json_encode($hives);
    }
} else {
    echo json_encode(get_member_hives(["privacy" => $privacy]));
}

