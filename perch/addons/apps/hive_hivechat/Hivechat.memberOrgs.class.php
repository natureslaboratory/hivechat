<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_MemberOrgs extends PerchAPI_Factory
{
	protected $table     = 'memberorg';
	protected $pk        = 'memberOrgID';
	protected $singular_classname = 'memberOrg';

	protected $default_sort_column = 'memberOrgID';

	public $static_fields   = [
		"memberID",
		"organisationID",
		"memberRole",
		"contactList",
		"memberOrgDynamicFields"
	];

	function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS $this->table (
			memberOrgID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			memberID INT(11) NOT NULL,
			organisationID INT(11) NOT NULL,
			memberRole INT(11) NOT NULL default 1,
			contactList TINYINT(1) NOT NULL default 0,
			memberOrgDynamicFields text,
			dateCreated datetime DEFAULT NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') {
				$this->db->execute($statement);
			} 
		}
	}

	public function is_organisation_member($memberID, $organisationID, $opts = [])
	{
		$sql = "SELECT * FROM $this->table WHERE memberID='$memberID' AND organisationID='$organisationID' LIMIT 1";
		$result = $this->db->get_row($sql);
		if ($opts["returnMember"]) {
			return $result;
		}
		if ($result) {
			return true;
		}
		return false;
	}

	public function add_member($data)
	{
		// Checks it already an org member
		$memberOrg = $this->get_memberorg($data["organisationID"], $data["memberID"]);
		if ($memberOrg) {
			return;
		}

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
		echo json_encode(["sql" => $sql]);
        return $this->db->execute($sql);
	}

	public function delete_member($organisationID, $memberID)
	{
		$sql = "DELETE FROM $this->table WHERE organisationID='$organisationID' AND memberID='$memberID'";
		return $this->db->execute($sql);
	}

	public function get_memberorg($organisationID, $memberID)
	{
		$sql = "SELECT * FROM $this->table WHERE organisationID='$organisationID' AND memberID='$memberID' LIMIT 1";
		return $this->db->get_row($sql);
	}

	public function update_member($data)
	{
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

	public function is_admin($organisationID, $memberID)
	{
		$sql = "SELECT * FROM $this->table WHERE organisationID='$organisationID' AND memberID='$memberID' AND memberRole=0 LIMIT 1";
		$result = $this->db->get_row($sql);
		return $result;
	}

	public function get_organisation_contacts($organisationID) {
		$sql = "SELECT * FROM $this->table WHERE organisationID='$organisationID' AND contactList='1'";
		return $this->db->get_rows($sql); 
	}

	public function get_memberorg_id($organisationID, $memberID) {
		$sql = "SELECT memberOrgID FROM $this->table WHERE organisationID='$organisationID' AND memberID='$memberID'";
		return $this->db->get_row($sql)["memberOrgID"];
	}
}
