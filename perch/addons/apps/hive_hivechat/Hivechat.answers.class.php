<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Answers extends PerchAPI_Factory
{
	protected $table     = 'hivechat_answers';
	protected $pk        = 'answerID';
	protected $singular_classname = 'Answer';

	protected $default_sort_column = 'answerID';

	public $static_fields   = [
        'questionID',
        'answerPrivacy',
        'answererID',
        'answerText'
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			$this->pk INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            questionID INT(11) NOT NULL,
            answerPrivacy VARCHAR(255) NOT NULL default 'Private',
            answererID INT(11) NOT NULL,
            answerText text NOT NULL, 
			dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_answer($data) {
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
        // echo $sql;
        return $this->db->execute($sql);
    }

    function update_answer($data) {
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

    function get_answer($answerID) {
        $sql = "SELECT * FROM $this->table WHERE answerID='$answerID' LIMIT 1";
        return $this->db->get_row($sql);
    }

    function get_answers_by_question($questionID) {
        $sql = "SELECT * FROM $this->table WHERE questionID='$questionID'";
        return $this->db->get_rows($sql);
    }

    function delete_answer($answerID) {
        $sql = "DELETE FROM $this->table WHERE answerID=$answerID";
        return $this->db->execute($sql);
    }
}