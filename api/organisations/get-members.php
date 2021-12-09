<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

if (perch_get("slug")) {
    $org = get_organisation_by_slug(perch_get("slug"), ["skip-template" => true], true);
    $page = perch_get("page") ?: 0;
    $opts = [
        "page" => $page,
        "searchTerm" => perch_get("s")
    ];
    echo json_encode(get_organisation_members_new($org["organisationID"], $opts));
}

