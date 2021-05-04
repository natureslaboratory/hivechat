CREATE TABLE perch3_memberorg (
    memberOrgID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    memberID int(11) NOT NULL,
    organisationID int(11) NOT NULL,
    dateCreated datetime default NOW()
);