<?php

// echo json_encode([$_FILES, $_POST]);

if (count($_POST) == 0) {
    echo "Noooo";
} else {
    json_encode(create_new_block(array_merge($_POST, ["files" => $_FILES])));
}
