<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

echo json_encode(get_org_socials(perch_get("id")));