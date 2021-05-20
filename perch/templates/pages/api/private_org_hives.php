<?php

$organisation = get_organisation_by_slug($_GET["orgSlug"], ["skip-template" => true], true);

echo json_encode(get_organisation_private_hives($organisation["organisationID"], perch_member_get("id")));
