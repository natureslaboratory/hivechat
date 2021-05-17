<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Notifications extends PerchAPI_Factory
{
	protected $table     = 'notifications';
	protected $pk        = 'notificationID';
	protected $singular_classname = 'notification';

	protected $default_sort_column = 'notificationID';

	public $static_fields   = [
        'notificationID', 
        'memberID', 
        'creatorID', 
        'notificationMessage', 
        'notificationLink', 
        'notificationCreated', 
        'notificationRead'
    ];

    function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS perch3_notifications (
			notificationID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            memberID INT(11) NOT NULL,
            creatorID INT(11) NOT NULL DEFAULT -1,
            notificationMessage VARCHAR(1000) NOT NULL,
            notificationLink VARCHAR(255) NOT NULL,
            notificationRead BOOLEAN NOT NULL DEFAULT 0,
			dateCreated datetime default NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function create_notification($memberID, $creatorID, $notificationMessage, $notificationLink) {
        $slashedMessage = addslashes($notificationMessage);
        $slashedLink = addslashes($notificationLink);
        $sql = "INSERT INTO perch3_notifications 
                (memberID, creatorID, notificationMessage, notificationLink) 
                VALUES 
                ('$memberID', '$creatorID', '$slashedMessage', '$slashedLink');";
        return $this->db->execute($sql);
    }

    function get_member_notifications($memberID) {
        $sql = "SELECT * FROM perch3_notifications WHERE memberID='$memberID' ORDER BY dateCreated DESC";
        return $this->db->get_rows($sql);
    }

    function read_notification($notificationID) {
        $sql = "UPDATE perch3_notifications SET notificationRead=1 WHERE notificationID='$notificationID'";
        $result = $this->db->execute($sql);
        $returnData = [
            "notificationID" => $notificationID
        ];
        if (gettype($result) == "array") {
            $returnData["result"] = $result;
        } else {
            $returnData["result"] = null;
        }
        return $returnData;
    }

    function read_all_notifications($memberID) {
        $sql = "UPDATE perch3_notifications SET notificationRead=1 WHERE memberID='$memberID'";
        $result = $this->db->execute($sql);
        return $result;
    }

    function delete_notification($notificationID) {
        $sql = "DELETE FROM perch3_notifications WHERE notificationID='$notificationID'";
        return $this->db->execute($sql);
    }

    function member_has_notification($notificationID, $memberID) {
        $sql = "SELECT * FROM perch3_notifications WHERE notificationID='$notificationID' AND memberID='$memberID' LIMIT 1";
        if ($this->db->get_row($sql)) {
            return true;
        }
        return false;
    }

}