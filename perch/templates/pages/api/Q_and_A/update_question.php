<?php

// Requires blockID, questionText, questionID, questionPrivacy

$input = json_decode(file_get_contents('php://input'), true);

update_question($input);
