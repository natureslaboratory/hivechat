<?php

$fields = [];
$data = [];
$file = $_FILES["data"];

$fileStream = fopen($file["tmp_name"], "rb");
$fields = fgetcsv($fileStream);
$col = $_POST["colname"];

$emailIndex = null;

for ($i=0; $i < count($fields); $i++) {
    $field = preg_replace('/[^a-zA-Z0-9]/','', $fields[$i]);
    if (strtolower($field) == strtolower($col)) {
        $emailIndex = $i;
        break;
    }
}


while (true) {
    $row = fgetcsv($fileStream);
    if ($row) {
        $data[] = $row[$emailIndex];
    } else {
        break;
    }
}

// array_unique?

echo json_encode(array_merge($data, []));