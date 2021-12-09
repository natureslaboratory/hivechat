<?php

include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php');

echo json_encode(get_public_organisations([
    "skip-template" => true,
    "searchTerm" => perch_get("s"),
    "page" => perch_get("page"),
    "perPage" => perch_get("per")
]));

