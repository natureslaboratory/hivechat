<?php

if (count($_POST) == 0) {
    echo "Noooo";
} else {
    $isOrganisation = false;
    if (array_key_exists("organisationID", $_POST)) {
        $isOrganisation = true;
        $organisationID = $_POST["organisationID"];
        if (is_admin($organisationID, perch_member_get("id"))) {
            $isAdmin = true;
        }
    }
    
    if ($isAdmin || !$isOrganisation) {
        echo json_encode(create_new_cell($_POST));
    } else {
        echo "Hello there";
    }
}
