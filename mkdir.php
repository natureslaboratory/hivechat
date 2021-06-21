<?php
error_reporting(-1);

// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);

if (!is_dir($_SERVER["DOCUMENT_ROOT"] . "/hello")) {
    echo mkdir("./hello") ? "Created" : "Failed";
} else {
    echo "Already exists";
}
echo "<br>";
