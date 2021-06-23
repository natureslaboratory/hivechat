<?php

if (count($_FILES) > 0) {
    upload_file($_FILES["file"], $_POST["fileName"], $_POST["blockID"]);
}