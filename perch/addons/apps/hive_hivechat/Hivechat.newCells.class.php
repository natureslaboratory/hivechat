<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_NewCells extends PerchAPI_Factory
{
	protected $table     = 'newCells';
	protected $pk        = 'cellID';
	protected $singular_classname = 'newCell';

	protected $default_sort_column = 'order';

	public $static_fields   = [
        'inviteID',
        'memberEmail',
        'senderID',
        'organisationID',
        "dateCreated"
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS perch3_newCells (
			cellID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            memberID INT(11) NOT NULL,
            hiveID INT(11) NOT NULL,
            cellOrder INT(11) NOT NULL,
			dateCreated datetime default NOW(),
            cellDate datetime default null,
            cellTitle VARCHAR(255) NOT NULL,
            cellSubtitle VARCHAR(255)
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    /*
        cellData
        {
            memberID,
            organisationID?,
            cellTitle,
            cellDate?
        }
    */

    function create_cell($cellData) {
        $sql = "INSERT INTO $this->table (";
        $count = 0;
        foreach ($cellData as $key => $value) {
            if ($count == 0) {
                $sql .= $key;
            } else {
                $sql .= ", $key";
            }
            $count++;
        }
        $sql .= ") VALUES (";
        $count = 0;
        foreach ($cellData as $key => $value) {
            if ($count == 0) {
                $sql .= "'$value'";
            } else {
                $sql .= ", '$value'";
            }
            $count++;
        }

        $sql .= ");";
        // echo $sql;
        return $this->db->execute($sql);
    }

    function update_cell($cellData) {
        $sql = "UPDATE $this->table SET "; 

        $count = 0;
        foreach ($cellData as $key => $value) {
            if ($key == "cellID") {
                continue;
            }

            if ($count == 0) {
                $sql .= "$key='$value'";
            } else {
                $sql .= ", $key='$value'";
            }
            $count++;
        }
        
        $sql .= " WHERE cellID=$cellData[cellID]";
        // echo $sql;
        return $this->db->execute($sql);
    }

    function get_cell($cellID) {
        $sql = "SELECT * FROM $this->table WHERE cellID='$cellID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_hive_cells($hiveID) {
        $sql = "SELECT * FROM $this->table WHERE hiveID='$hiveID' ORDER BY cellOrder";
        return $this->db->get_rows($sql);
    }

    function delete_cell($cellID) {
        $sql = "DELETE FROM $this->table WHERE cellID=$cellID";
        return $this->db->execute($sql);
    }
}