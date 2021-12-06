<?php

$organisationID = perch_get("orgID");
$memberID = perch_member_get("id");

if (is_admin($organisationID, $memberID)) {
    // echo "<pre>" . print_r(organisation_member_requests($organisationID, ["skip-template" => true]), true);
    echo json_encode(organisation_member_requests($organisationID, ["skip-template" => true]));
} else {
    // echo "orgID = $organisationID, memberID = $memberID";
    http_response_code(403);
}

// Create page!