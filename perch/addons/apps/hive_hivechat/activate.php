<?php
    // Prevent running directly:
    if (!defined('PERCH_DB_PREFIX')) exit;

    // Let's go
    $sql = "";
    
    $sql = str_replace('__PREFIX__', PERCH_DB_PREFIX, $sql);

    // $sql = "use hivechat; CREATE TABLE IF NOT EXISTS perch3_organisations (
    //     organisationID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //     organisationName VARCHAR(255) NOT NULL,
    //     organisationSlug VARCHAR(255) NOT NULL,
    //     organisationLogo VARCHAR(255),
    //     createdBy INT(11) NOT NULL,
    //     organisationDesc text,
    //     dateCreated datetime DEFAULT NOW(),
    //     lastUpdated datetime DEFAULT NOW()
    // ); CREATE TABLE IF NOT EXISTS perch3_memberorg (
    //     memberOrgID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //     memberID INT(11) NOT NULL,
    //     organisationID INT(11) NOT NULL,
    //     dateCreated datetime DEFAULT NOW()
    // );";
    
    $statements = explode(';', $sql);
    foreach($statements as $statement) {
        $statement = trim($statement);
        if ($statement!='') $this->db->execute($statement);
    }
        
    $sql = 'SHOW TABLES LIKE "'.$this->table.'"';
    $result = $this->db->get_value($sql);
    
    return $result;
