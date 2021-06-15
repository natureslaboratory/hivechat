<?php

if (count($_POST) == 0) {
    echo "Noooo";
} else {
    echo json_encode(create_new_block($_POST));
}
