<?php include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php'); ?>

<?php

$input = json_decode(file_get_contents('php://input'), true);

if (count($input) == 0) {
    $input = $_POST;
}

login($input);

if (!perch_member_logged_in()) {
    http_response_code(401);
}