<?php

$slug = perch_get("urlSlug");
$organisation = get_organisation_by_slug($slug, ["skip-template" => true], true);

$debug = [
];

echo json_encode(array_merge(get_organisation_invites($organisation["organisationID"], ["skip-template" => true]), $debug));