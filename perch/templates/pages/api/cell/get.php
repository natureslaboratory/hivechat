<?php

$cellID = perch_get("cellID");
if ($cellID != null) {
    echo json_encode(get_new_cell($cellID));
} else {
    // echo "No CellID";
}