<?php

/*
     ini_set('display_errors', 1);
     ini_set('display_startup_errors', 1);
     error_reporting(E_ALL);
*/

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
        if ($this->has_organisation_invite($memberEmail, $organisationID)) {
            return;
        }

        $sql = "INSERT INTO perch3_invites
                (memberEmail, senderID, organisationID) 
                VALUES 
                ('$memberEmail', '$senderID', '$organisationID');";
        return $this->db->execute($sql);
    }

    function create_invites_bulk($emails, $senderID, $organisationID, $sendEmails) {
        $sql = "INSERT INTO perch3_invites
                (memberEmail, senderID, organisationID) 
                VALUES ";
        for ($i=0; $i < count($emails); $i++) { 
            $email = $emails[$i];
            if ($this->has_organisation_invite($email, $organisationID)) {
                continue;
            }
            $sql .= "('$email', '$senderID', '$organisationID')";

            if ($i < count($emails)-1) {
                $sql .= ", ";
            } else {
                $sql .= ";";
            }
        }
        $result = $this->db->execute($sql);

        if (!$result) {
            return false;
        }

        $orgs = new Hivechat_Organisations($this->API);
        $notifications = new Hivechat_Notifications($this->API);
        $sender = HiveApi::flatten($orgs->get_member($senderID), ["mappings" => ["first_name" => "first_name", "last_name" => "last_name"]]);
        $organisation = $orgs->get_organisation($organisationID);

        foreach ($emails as $memberEmail) {
            $member = $orgs->get_member_by_email($memberEmail);
            $email = new PerchEmail("hivechat/signup.html");

            $message = "$sender[first_name] $sender[last_name] has invited you to join $organisation[organisationName]";
            $link = "/admin/register";
    
            if ($member) {
              $link = "/admin/invites";
              $notifications->create_notification($member["memberID"], $senderID, $message, $link);
            }

            if ($sendEmails) {
                $email->set_bulk([
                  "email_message" => $message,
                  "email_subject" => $message,
                  "isMember" => $member ? true : false,
                  "protocol" => $_SERVER["HTTPS"] ? "https://" : "http://",
                  "email_link" => $link
                ]);
        
                $email->senderName("Hivechat");
                $email->senderEmail("caleb@natureslaboratory.co.uk");
                $email->recipientEmail($memberEmail);
                $email->send();
            }
        }

        return true;
    }

    function has_invite($memberEmail, $inviteID) {
        $sql = "SELECT * FROM perch3_invites WHERE memberEmail='$memberEmail' AND inviteID='$inviteID' LIMIT 1";
        if ($this->db->get_row($sql)) {
            return true;
        }
        return false;
    }
    
    function has_invites($memberEmail) {
       $sql = "SELECT COUNT(memberEmail) AS count FROM perch3_invites WHERE memberEmail='$memberEmail'";
        $data = $this->db->get_row($sql);
        return $data['count'];
    }

    function has_organisation_invite($memberEmail, $organisationID) {
        $sql = "SELECT * FROM perch3_invites WHERE memberEmail='$memberEmail' AND organisationID='$organisationID' LIMIT 1";
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