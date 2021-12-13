<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Organisations extends PerchAPI_Factory
{
	protected $table     = 'organisations';
	protected $pk        = 'organisationID';
	protected $singular_classname = 'organisation';

	protected $default_sort_column = 'organisationID';

	public $static_fields   = [
		"organisationName",
		"organisationSlug",
		"organisationLogo",
		"organisationScope",
		"createdBy",
		"organisationDesc"
	];

	public $memberOrg_static_fields = [
		"memberID",
		"organisationID",
		"memberRole",
		"contactList",
		"memberOrgDynamicFields"
	];

	function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS perch3_organisations (
			organisationID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			organisationName VARCHAR(255) NOT NULL,
			organisationSlug VARCHAR(255) NOT NULL,
			organisationLogo VARCHAR(255),
			organisationScope varchar(255),
			createdBy INT(11) NOT NULL,
			organisationDesc text,
			dateCreated datetime default NOW(),
			lastUpdated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

	public function create_organisation($data)
	{
		$title = addslashes($data['organisationName']);
		if ($this->get_organisation_by_name($title)) {
			return;
		}
		$sql = "INSERT INTO perch3_organisations (organisationName, organisationSlug, createdBy) VALUES ('$title', '$data[organisationSlug]', '$data[memberID]')";
		echo $this->db->execute($sql) ? "Success" : "Fail";
		$orgID = $this->db->get_row("SELECT LAST_INSERT_ID()")["LAST_INSERT_ID()"];

		$sql = "INSERT INTO perch3_memberorg (memberID, organisationID, memberRole, contactList) VALUES ('$data[memberID]', $orgID, 0, 0)";
		echo $sql;
		echo $this->db->execute($sql) ? "Success" : "Fail";
	}

	public function update_organisation($data)
	{
		$title = addslashes($data['organisationName']);
		$sql = "UPDATE perch3_organisations SET organisationName='$title'";
		foreach ($this->static_fields as $key) {
			if ($key == "organisationName") {
				continue;
			} else if ($data[$key]) {
				$sql .= ", $key='$data[$key]'";
			}
		}
		$sql .= " WHERE organisationID=$data[organisationID]";
		$this->db->execute($sql);
		return $sql;
	}

	public function get_organisation($organisationID)
	{
		$sql = "SELECT * FROM perch3_organisations WHERE organisationID='$organisationID'";
		$result = $this->db->get_row($sql);
		return $result;
	}

	public function get_organisation_by_name($organisationName)
	{
		$sql = "SELECT * FROM perch3_organisations WHERE organisationName='$organisationName'";
		return $this->db->get_row($sql);
	}

	public function get_organisation_by_slug($organisationSlug)
	{
		$sql = "SELECT * FROM perch3_organisations WHERE organisationSlug='$organisationSlug'";
		return $this->db->get_row($sql);
	}

	public function get_organisation_members($organisationID, Int $page = 0, $perPage = 20, $searchTerm = "")
	{
		$limit = "";

		if ($page) {
			$offsetAmount = ($page - 1) * $perPage;
			$limit = " LIMIT $offsetAmount, $perPage";
		}

		$sql = "SELECT memberID FROM perch3_memberorg WHERE organisationID='$organisationID'" . $limit;

		$newSql = "SELECT mb.memberEmail, mb.memberID, mb.memberProperties FROM perch3_memberorg AS mo INNER JOIN perch3_members AS mb ON mo.memberID=mb.memberID WHERE organisationID='$organisationID' AND (mb.memberProperties LIKE '%$searchTerm%' OR mb.memberEmail LIKE '%$searchTerm%')" . $limit;


		return $this->db->get_rows($newSql);
		// return $sql;
	}

	public function get_organisation_members_count($organisationID, $searchTerm = "") {
		$sql = "SELECT COUNT(mo.memberOrgID) AS memberCount FROM perch3_memberorg AS mo INNER JOIN perch3_members AS mb ON mo.memberID=mb.memberID WHERE organisationID='$organisationID' AND (mb.memberProperties LIKE '%$searchTerm%' OR mb.memberEmail LIKE '%$searchTerm%')";
		return $this->db->get_row($sql);
	}

	public function get_organisation_names()
	{
		$sql = "SELECT organisationName FROM perch3_organisations";
		$result = $this->db->get_rows($sql);
		return $result;
	}

	public function get_member_organisations($memberID)
	{
		$sql = "SELECT organisationID, organisationName, organisationSlug FROM perch3_organisations WHERE organisationID IN (SELECT organisationID FROM perch3_memberorg WHERE memberID='$memberID')";
		$result = $this->db->get_rows($sql);
		return $result;
	}

	public function is_organisation_member($memberID, $organisationID, $opts = [])
	{
		$sql = "SELECT * FROM perch3_memberorg WHERE memberID='$memberID' AND organisationID='$organisationID' LIMIT 1";
		$result = $this->db->get_row($sql);
		if ($opts["returnMember"]) {
			return $result;
		}
		if ($result) {
			return true;
		}
		return false;
	}

	public function get_organisation_hives($organisationID)
	{
		$sql = "SELECT * FROM perch3_hives WHERE organisationID='$organisationID'";
		return $this->db->get_rows($sql);
	}

	public function delete_organisation($organisationID)
	{
		$sql = "DELETE FROM perch3_organisations WHERE organisationID='$organisationID';
				DELETE FROM perch3_cells WHERE hiveID IN (SELECT hiveID FROM perch3_hives WHERE organisationID='$organisationID');
				DELETE FROM perch3_hives WHERE organisationID='$organisationID';
				DELETE FROM perch3_memberorg WHERE organisationID='$organisationID';";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

	public function get_public_organisations($page = 1, $perPage = 20, $searchTerm = "")
	{
		$limit = "";

		if ($page) {
			$offsetAmount = ($page - 1) * $perPage;
			$limit = " LIMIT $offsetAmount, $perPage";
		}

		$sql = "SELECT * FROM perch3_organisations
		WHERE organisationScope='Public'
		AND organisationName LIKE '%$searchTerm%'" . $limit;

		$orgs = $this->db->get_rows($sql);

		$sql = "SELECT COUNT(organisationID) AS organisationCount FROM perch3_organisations WHERE organisationName LIKE '%$searchTerm%' AND organisationScope='Public'";
		$count = $this->db->get_row($sql)["organisationCount"];
		
		return [
			"organisations" => $orgs,
			"pages" => ceil($count / $perPage)
		];
	}

	public function get_public_organisations_count($searchTerm = "")
	{
		$sql = "SELECT COUNT(organisationID) AS organisationCount FROM perch3_organisations WHERE ";
		return $this->db->get_row($sql)["organisationCount"];
	}

	public function get_members($organisationID)
	{
		$sql = "SELECT * FROM perch3_members WHERE memberID IN (SELECT memberID FROM perch3_memberorg WHERE organisationID='$organisationID')";
		return $this->db->get_rows($sql);
	}

	public function add_member($data)
	{
		$member = $this->get_member($data["memberID"]);
		
		// Checks it already an org member
		$memberOrg = $this->get_memberorg($data["organisationID"], $data["memberID"]);
		if ($memberOrg) {
			return;
		}

		if ($data["contactList"]) {
			$contactList = true;
		} else {
			$contactList = false;
		}

		if ($member) {
			$sql = "INSERT INTO perch3_memberorg (organisationID, memberID, memberRole, contactList, memberOrgDynamicFields) VALUES ('$data[organisationID]', '$data[memberID]', 1, $contactList '$data[memberOrgDynamicFields]')";
			return $this->db->execute($sql);
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
        return $this->db->execute($sql);
	}

	public function get_member($memberID)
	{
		$sql = "SELECT * FROM perch3_members WHERE memberID='$memberID' LIMIT 1";
		return $this->db->get_row($sql);
	}

	public function is_member($memberEmail)
	{
		$sql = "SELECT * FROM perch3_members WHERE memberEmail='$memberEmail' LIMIT 1";
		if($this->db->get_row($sql)) {
			return true;
		}
		return false;
	}

	public function get_member_by_email($memberEmail)
	{
		$sql = "SELECT * FROM perch3_members WHERE memberEmail='$memberEmail' LIMIT 1";
		return $this->db->get_row($sql);
	}

	public function delete_member($organisationID, $memberID)
	{
		$sql = "DELETE FROM perch3_memberorg WHERE organisationID='$organisationID' AND memberID='$memberID'";
		return $this->db->execute($sql);
	}

	public function get_memberorg($organisationID, $memberID)
	{
		$sql = "SELECT * FROM perch3_memberorg WHERE organisationID='$organisationID' AND memberID='$memberID' LIMIT 1";
		return $this->db->get_row($sql);
	}

	function printArray($item, $depth = 0)
	{
		foreach ($item as $key => $value) {
			$depthString = str_repeat("--", $depth);
			if (gettype($value) !== "array") {
				echo "$depthString $key: $value <br>";
			} else {
				echo "$depthString $key: <br>";
				printArray($value, $depth + 1);
			}
		}
	}

	public function update_member($data)
	{
		$role = $data["memberRole"];
		switch ($role) {
			case "Admin":
				$data["memberRole"] = 0;
				break;
			case "Member":
				$data["memberRole"] = 1;
				break;
			default:
				break;
		}

		$newData = $data;
		$newData["contactList"] = $newData["contactList"] ? true : false;
		
		$sql = "UPDATE perch3_memberorg SET ";
		$i = 0;
		foreach ($newData as $key => $value) {
			if ($i == 0) {
				$sql .= " $key='$value'";
			} else {
				$sql .= ", $key='$value'";
			}
			$i++;
		}


		$sql .= " WHERE organisationID=$data[organisationID] AND memberID=$data[memberID]";
		$this->db->execute($sql);
	}

	public function is_admin($organisationID, $memberID)
	{
		$sql = "SELECT * FROM perch3_memberorg WHERE organisationID='$organisationID' AND memberID='$memberID' AND memberRole=0 LIMIT 1";
		$result = $this->db->get_row($sql);
		return $result ? true : false;
	}

	public function get_organisation_contacts($organisationID) {
		$sql = "SELECT * FROM perch3_memberorg WHERE organisationID='$organisationID' AND contactList='1'";
		return $this->db->get_rows($sql); 
	}
}
