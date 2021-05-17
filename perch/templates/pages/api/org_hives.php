<?php

if (perch_get("orgSlug")) {
    $organisation = get_organisation_by_slug(perch_get("orgSlug"), ["skip-template" => true], true);
    $opts = [
        "type" => perch_get("type") ? perch_get("type") : "Public",
        "memberID" => perch_member_logged_in() ? perch_member_get("id") : "",
        "skip-template" => true
    ];
    
    echo json_encode(get_organisation_hives($organisation["organisationID"], $opts));
} else {
    echo "Hello";
}
