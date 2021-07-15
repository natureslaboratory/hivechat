<?php

$blockID = perch_get("blockID");

echo json_encode(get_questions($blockID, false, ["scope" => "Public"]));
    