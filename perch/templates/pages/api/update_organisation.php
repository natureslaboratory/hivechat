<?php

if (perch_member_logged_in() && is_organisation_member(perch_member_get('id'), $_REQUEST["organisationID"])) {
    update_organisation($_REQUEST);
}

PerchUtil::redirect("/admin/organisations");