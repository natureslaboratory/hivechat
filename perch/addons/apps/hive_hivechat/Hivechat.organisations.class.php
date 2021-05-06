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

	public $static_fields   = array('organisationID', 'organisationName', 'organisationSlug');

	function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS perch3_organisations (
			organisationID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			organisationName VARCHAR(255) NOT NULL,
			organisationSlug VARCHAR(255) NOT NULL,
			organisationLogo VARCHAR(255),
			createdBy INT(11) NOT NULL,
			organisationDesc text,
			dateCreated datetime default NOW(),
			lastUpdated datetime default NOW()
		); CREATE TABLE IF NOT EXISTS perch3_memberorg (
			memberOrgID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			memberID INT(11) NOT NULL,
			organisationID INT(11) NOT NULL,
			dateCreated datetime DEFAULT NOW()
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
		$orgID = $this->db->execute($sql);

		$sql = "INSERT INTO perch3_memberorg (memberID, organisationID) VALUES ('$data[memberID]', $orgID)";
		$this->db->execute($sql);
	}

	public function update_organisation($data)
	{
		$title = addslashes($data['organisationName']);
		$sql = "UPDATE perch3_organisations SET organisationName='$title'";
		foreach ($data as $key => $value) {
			if ($key == "organisationName") {
				continue;
			}
			$sql .= ", $key='$value'";
		}
		$sql .= " WHERE organisationID=$data[organisationID]";
		$this->db->execute($sql);
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

	public function get_organisation_members($organisationID)
	{
		$sql = "SELECT memberID FROM perch3_memberorg WHERE organisationID='$organisationID'";
		return $this->db->get_rows($sql);
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

	public function is_organisation_member($memberID, $organisationID)
	{
		$sql = "SELECT memberID FROM perch3_memberorg WHERE memberID='$memberID' AND organisationID='$organisationID'";
		$result = $this->db->get_row($sql);
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

	public function get_public_organisations()
	{
		$sql = "SELECT * FROM perch3_organisations WHERE organisationScope='Public'";
		return $this->db->get_rows($sql);
	}

	public function get_members($organisationID)
	{
		$sql = "SELECT * FROM perch3_members WHERE memberID IN (SELECT memberID FROM perch3_memberorg WHERE organisationID='$organisationID')";
		return $this->db->get_rows($sql);
	}

	public function add_member($organisationID, $memberID)
	{
		$sql = "INSERT INTO perch3_memberorg (organisationID, memberID) VALUES ('$organisationID', '$memberID')";
		return $this->db->execute($sql);
	}

	public function delete_member($organisationID, $memberID)
	{
		$sql = "DELETE FROM perch3_memberorg WHERE organisationID='$organisationID' AND memberID='$memberID'";
		return $this->db->execute($sql);
	}
}
