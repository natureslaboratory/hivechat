-- Added nullable orgID, and un-nullable hivePrivacy to perch3_hives

ALTER TABLE perch3_hives ADD hivePrivacy VARCHAR(255) NOT NULL DEFAULT 'Draft' AFTER hiveLive,
                         ADD organisationID INT(11) NOT NULL DEFAULT '-1' AFTER hiveDynamicFields;