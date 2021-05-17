<?php

echo json_encode(get_notifications(perch_member_get("id"), ["skip-template" => true]));