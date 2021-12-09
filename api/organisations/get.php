<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

if (perch_get("slug")) {
    echo json_encode(get_organisation_by_slug(perch_get("slug"), ["skip-template" => true, "show-admin" => true], true));
}

