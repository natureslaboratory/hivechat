<?php
$organisation = get_organisation_by_slug(perch_get("orgSlug"), ["skip-template" => true], true);
echo json_encode(get_organisation_socials($organisation["organisationID"]));