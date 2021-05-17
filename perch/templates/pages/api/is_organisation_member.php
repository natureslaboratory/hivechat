<?php

echo json_encode(is_organisation_member($_GET["memberID"], $_GET["orgID"], ["returnMember" => true]));