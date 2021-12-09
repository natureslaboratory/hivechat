<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

echo json_encode(get_public_organisations([
    "skip-template" => true
]));

