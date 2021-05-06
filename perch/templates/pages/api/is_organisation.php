<?php

echo json_encode(get_organisation_by_slug($_GET["s"], ["skip-template" => true], true));