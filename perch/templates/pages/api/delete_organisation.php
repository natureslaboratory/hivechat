<?php

if (perch_member_logged_in() && is_organisation_member(perch_member_get('id'), $_REQUEST["organisationID"])) {
    delete_organisation($_REQUEST["organisationID"]);
}

PerchUtil::redirect("/admin/organisations");