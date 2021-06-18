<?php
error_reporting(-1);

// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);


echo mkdir("./hello") ? "Created" : "Failed";
echo "<br>";
