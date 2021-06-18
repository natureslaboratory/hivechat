<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Blocks extends PerchAPI_Factory
{
	protected $table     = 'hivechat_blocks';
	protected $pk        = 'cellID';
	protected $singular_classname = 'newCell';

	protected $default_sort_column = 'order';

	public $static_fields   = [
        'blockID',
        'cellID',
        'order',
        'blockType',
        'blockData',
        "dateCreated"
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			blockID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            cellID INT(11) NOT NULL,
            blockOrder INT(11) NOT NULL,
			blockType VARCHAR(255),
            blockData text,
            dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_block($blockData) {
        $sql = "INSERT INTO $this->table (";
        $count = 0;
        foreach ($blockData as $key => $value) {
            if ($count == 0) {
                $sql .= $key;
            } else {
                $sql .= ", $key";
            }
            $count++;
        }
        $sql .= ") VALUES (";
        $count = 0;
        foreach ($blockData as $key => $value) {
            if ($count == 0) {
                $sql .= "'$value'";
            } else {
                $sql .= ", '$value'";
            }
            $count++;
        }

        $sql .= ");";

        return $this->db->execute($sql);
    }

    function update_block($blockData) {
        $sql = "UPDATE $this->table SET "; 

        $count = 0;
        foreach ($blockData as $key => $value) {
            if ($key == "blockID") {
                continue;
            }

            if ($count == 0) {
                $sql .= "$key='$value'";
            } else {
                $sql .= ", $key='$value'";
            }
            $count++;
        }
        
        $sql .= " WHERE blockID=$blockData[blockID]";
        return $this->db->execute($sql);
    }

    function get_block($blockID) {
        $sql = "SELECT * FROM $this->table WHERE blockID='$blockID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_blocks_by_cell($cellID) {
        $sql = "SELECT * FROM $this->table WHERE cellID='$cellID' ORDER BY blockOrder ASC";
        return $this->db->get_rows($sql);
    }

    function delete_block($blockID) {
        $sql = "DELETE FROM $this->table WHERE blockID=$blockID";
        return $this->db->execute($sql);
    }
}