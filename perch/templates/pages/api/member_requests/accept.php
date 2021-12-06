<?php

$input = json_decode(file_get_contents('php://input'), true);

$requestID = $input["requestID"];
$memberID = perch_member_get("id");
$request = get_request($requestID);

if (is_admin($request["organisationID"], $memberID)) {
    accept_request($requestID);
} else {
    http_response_code(403);
};

// Need to check that the person submitting the accept has the correct permissions