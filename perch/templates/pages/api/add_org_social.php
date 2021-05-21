<?php

$organisation = get_organisation_by_slug($_POST["organisationSlug"], ["skip-template" => true], true);
if (is_admin($organisation["organisationID"], perch_member_get("id"))) {
    echo json_encode(add_social(array_merge($_POST, ["organisationID" => $organisation["organisationID"]])));
} else {
    echo json_encode(["success" => false, "error" => "Insufficient Permissions", "data" => $_POST]);
}
