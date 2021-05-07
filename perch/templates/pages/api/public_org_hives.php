<?php

$organisation = get_organisation_by_slug($_GET["orgSlug"], ["skip-template" => true], true);

echo json_encode(get_organisation_public_hives($organisation["organisationID"]));
