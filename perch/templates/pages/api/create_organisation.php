<?php

if (perch_get("memberID")) {
    echo json_encode(get_member_organisations(perch_get("memberID")));
}

