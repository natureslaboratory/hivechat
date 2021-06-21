<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Requests extends PerchAPI_Factory
{
	protected $table     = 'hivechat_requests';
	protected $pk        = 'requestID';
	protected $singular_classname = 'Files';

	protected $default_sort_column = 'requestID';

	public $static_fields   = [
        'memberID',
        'organisationID',
        'requestText'
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			requestID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            memberID INT(11) NOT NULL,
            organisationID INT(11) NOT NULL,
            requestText text NOT NULL,
			dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_request($data) {
        $sql = "INSERT INTO $this->table (";
        $count = 0;
        foreach ($this->static_fields as $key) {
            if ($data[$key]) {
                if ($count == 0) {
                    $sql .= $key;
                } else {
                    $sql .= ", $key";
                }
                $count++;
            }
        }
        $sql .= ") VALUES (";
        $count = 0;
        foreach ($this->static_fields as $key) {
            if ($data[$key]) {
                if ($count == 0) {
                    $sql .= "'$data[$key]'";
                } else {
                    $sql .= ", '$data[$key]'";
                }
                $count++;
            }
        }

        $sql .= ");";
        return $this->db->execute($sql);
    }

    function update_request($data) {
        if (!$data[$this->pk]) {
            return;
        }
        $sql = "UPDATE $this->table SET "; 

        $count = 0;
        foreach ($this->static_fields as $key) {
            if ($data[$key]) {
                if ($count == 0) {
                    $sql .= "$key='$data[$key]'";
                } else {
                    $sql .= ", $key='$data[$key]'";
                }
                $count++;
            }
        }
        
        $sql .= " WHERE ". $this->pk . "=" . $data[$this->pk];
        return $this->db->execute($sql);
    }

    function has_request($memberID, $organisationID) {
        $sql = "SELECT * FROM $this->table WHERE memberID='$memberID' AND organisationID='$organisationID'";
        return $this->db->get_rows($sql);
    }

    function get_request($requestID) {
        $sql = "SELECT * FROM $this->table WHERE requestID='$requestID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function delete_request($requestID) {
        $sql = "DELETE FROM $this->table WHERE requestID=$requestID";
        return $this->db->execute($sql);
    }

    function get_organisation_requests($organisationID) {
        $sql = "SELECT * FROM $this->table WHERE organisationID='$organisationID'";
        return $this->db->get_rows($sql);
    }

    function get_member_requests($memberID) {
        $sql = "SELECT * FROM $this->table WHERE memberID='$memberID'";
        return $this->db->get_rows($sql);
    }
}