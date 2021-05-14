<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Invites extends PerchAPI_Factory
{
	protected $table     = 'invites';
	protected $pk        = 'inviteID';
	protected $singular_classname = 'invite';

	protected $default_sort_column = 'inviteID';

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
		$sql = "CREATE TABLE IF NOT EXISTS perch3_invites (
			inviteID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            memberEmail VARCHAR(255) NOT NULL,
            senderID INT(11) NOT NULL,
            organisationID INT(11) NOT NULL,
			dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_invite($memberEmail, $senderID, $organisationID) {
        if ($this->has_invite($memberEmail, $organisationID)) {
            return;
        }

        $sql = "INSERT INTO perch3_invites
                (memberEmail, senderID, organisationID) 
                VALUES 
                ('$memberEmail', '$senderID', '$organisationID');";
        return $this->db->execute($sql);
    }

    function has_invite($memberEmail, $inviteID) {
        $sql = "SELECT * FROM perch3_invites WHERE memberEmail='$memberEmail' AND inviteID='$inviteID' LIMIT 1";
        if ($this->db->get_row($sql)) {
            return true;
        }
        return false;
    }

    function get_member_invites($memberEmail) {
        $sql = "SELECT * FROM perch3_invites WHERE memberEmail='$memberEmail' ORDER BY dateCreated DESC";
        return $this->db->get_rows($sql);
    }

    function get_organisation_invites($organisationID) {
        $sql = "SELECT * FROM perch3_invites WHERE organisationID='$organisationID' ORDER BY dateCreated DESC";
        return $this->db->get_rows($sql);
    }

    function delete_invite($inviteID) {
        $sql = "DELETE FROM perch3_invites WHERE inviteID='$inviteID'";
        return $this->db->execute($sql);
    }

    function get_invite($inviteID) {
        $sql = "SELECT * FROM perch3_invites WHERE inviteID='$inviteID' LIMIT 1";
        return $this->db->get_row($sql);
    }
}