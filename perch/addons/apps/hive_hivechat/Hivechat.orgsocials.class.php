<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_OrgSocials extends PerchAPI_Factory
{
	protected $table     = 'orgsocials';
	protected $pk        = 'socialID';
	protected $singular_classname = 'orgsocial';

	protected $default_sort_column = 'socialID';

	public $static_fields   = [
        'socialID', 
        'organisationID', 
        'socialType',
        "socialLink",
        "dateCreated"
    ];

	function __construct($API)
	{
		parent::__construct($API);
		$sql = "CREATE TABLE IF NOT EXISTS perch3_orgsocials (
			socialID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            organisationID INT(11) NOT NULL,
            socialType VARCHAR(255) NOT NULL,
            socialLink VARCHAR(255),
            dateCreated datetime DEFAULT NOW()
		);";

		$statements = explode(';', $sql);
		foreach ($statements as $statement) {
			$statement = trim($statement);
			if ($statement != '') $this->db->execute($statement);
		}
	}

    function add_org_social($data) {
        if (!($data["organisationID"] && $data["socialType"] && $data["socialLink"])) {
            return;
        }

        $sql = "INSERT INTO perch3_orgsocials (organisationID, socialType, socialLink) 
                VALUES ('$data[organisationID]', '$data[socialType]', '$data[socialLink]');";
        return $this->db->execute($sql);
    }

    function update_org_social($data) {
        if (!($data["socialID"] && $data["socialType"] && $data["socialLink"])) {
            return;
        }

        $sql = "UPDATE perch3_orgsocial SET socialType='$data[socialType]', socialLink='$data[socialLink]' WHERE socialID='$data[socialID]';";
        return $this->db->execute($sql);
    }

    function get_org_socials($organisationID) {
        $sql = "SELECT * FROM perch3_orgsocials WHERE organisationID='$organisationID';";
        return $this->db->get_rows($sql);
    }

    function get_social($socialID) {
        $sql = "SELECT * FROM perch3_orgsocials WHERE socialID='$socialID' LIMIT 1;";
        return $this->db->get_row($sql);
    }

    function delete_social($socialID) {
        $sql = "DELETE FROM perch3_orgsocials WHERE socialID='$socialID';";
        return $this->dv->execute($sql);
    }

}