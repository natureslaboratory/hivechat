<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Questions extends PerchAPI_Factory
{
	protected $table     = 'hivechat_questions';
	protected $pk        = 'questionID';
	protected $singular_classname = 'Question';

	protected $default_sort_column = 'questionID';

	public $static_fields   = [
        'blockID',
        'questionerID',
        'questionText'
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			questionID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            blockID INT(11) NOT NULL,
            questionerID INT(11) NOT NULL,
            questionText text NOT NULL,
            questionPrivacy VARCHAR(255) NOT NULL DEFAULT 'Private',
			dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_question($data) {
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

    function update_question($data) {
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

    function get_question($questionID) {
        $sql = "SELECT * FROM $this->table WHERE questionID='$questionID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function delete_question($questionID) {
        $sql = "DELETE FROM $this->table WHERE questionID=$questionID";
        return $this->db->execute($sql);
    }

    function get_block_questions($blockID) {
        $sql = "SELECT * FROM $this->table WHERE blockID='$blockID'";
        return $this->db->get_rows($sql);
    }

    function get_member_questions($memberID) {
        $sql = "SELECT * FROM $this->table WHERE questionerID='$memberID'";
        return $this->db->get_rows($sql);
    }
}