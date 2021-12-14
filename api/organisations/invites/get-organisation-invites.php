<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

$orgID = perch_get("id");
$memberID = perch_member_get("id");
$opts = [
    "page" => perch_get("page"),
    "perPage" => perch_get("perPage"),
    "searchTerm" => perch_get("s"),
    "skip-template" => true
];

if (is_admin($orgID, $memberID)) {
    echo json_encode(get_organisation_invites($orgID, $opts));
} else {
    http_response_code(403);
}