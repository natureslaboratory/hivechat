<?php

// Requires blockID, questionText

$input = json_decode(file_get_contents('php://input'), true);

create_question($input);
