<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Files extends PerchAPI_Factory
{
	protected $table     = 'hivechat_files';
	protected $pk        = 'fileID';
	protected $singular_classname = 'Files';

	protected $default_sort_column = 'fileID';

	public $static_fields   = [
        'fileID',
        'blockID',
        'fileLocation',
        'dateUploaded'
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			fileID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            blockID INT(11) NOT NULL,
            fileName VARCHAR(255) NOT NULL,
            fileLocation VARCHAR(255) NOT NULL,
			dateUploaded datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_file($data) {
        $sql = "INSERT INTO $this->table (";
        $count = 0;
        foreach ($data as $key => $value) {
            if ($count == 0) {
                $sql .= $key;
            } else {
                $sql .= ", $key";
            }
            $count++;
        }
        $sql .= ") VALUES (";
        $count = 0;
        foreach ($data as $key => $value) {
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

    function update_file($data) {
        $sql = "UPDATE $this->table SET "; 

        $count = 0;
        foreach ($data as $key => $value) {
            if ($key == $this->pk) {
                continue;
            }

            if ($count == 0) {
                $sql .= "$key='$value'";
            } else {
                $sql .= ", $key='$value'";
            }
            $count++;
        }
        
        $sql .= " WHERE ". $this->pk . "=" . $data[$this->pk];
        // echo $sql;
        return $this->db->execute($sql);
    }

    function get_file($fileID) {
        $sql = "SELECT * FROM $this->table WHERE fileID='$fileID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_files_by_name($fileName) {
        $sql = "SELECT * FROM $this->table WHERE fileName='$fileName' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_files_by_location($fileLocation) {
        $sql = "SELECT * FROM $this->table WHERE fileLocation='$fileLocation' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_block_files($blockID) {
        $sql = "SELECT * FROM $this->table WHERE blockID='$blockID'";
        return $this->db->get_rows($sql);
    }

    function delete_file($fileID) {
        $sql = "DELETE FROM $this->table WHERE fileID=$fileID";
        return $this->db->execute($sql);
    }
}