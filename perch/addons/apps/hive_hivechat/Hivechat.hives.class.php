<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Hives extends PerchAPI_Factory
{
    protected $table     = 'hives';
	protected $pk        = 'hiveID';
	protected $singular_classname = 'hive';
	
	protected $default_sort_column = 'hiveID';
	
	public $static_fields   = array('hiveID', 'memberID', 'hiveTitle', 'hiveCategory', 'hiveDynamicFields');
	
	public function create_hive($data){
		$title = addslashes($data['hiveTitle']);
		$orgID = $data['organisationID'] ? $data['organisationID'] : "-1";
		$sql = "INSERT INTO perch3_hives (memberID, hiveTitle, hiveCategory, hiveDynamicFields, organisationID) VALUES ('$data[memberID]', '$title', '$data[hiveCategory]', '$data[hiveDynamicFields]', '$orgID')";
		$result = $this->db->execute($sql);
	}
	
	public function update_hive($data){
		
		$title = addslashes($data['hiveTitle']);
		$introduction = $data['introduction'];
		$intro = array(
		  'introduction' => array(
		    '_flang' => "html",
		    'raw' => $introduction,
		    'processed' => $introduction
		  )
		); 
		$jsonData = $intro;
		$json = addslashes(json_encode($jsonData));
		
		$sql = "UPDATE perch3_hives SET hiveTitle='$title', hiveLive='$data[hiveLive]', hiveCategory='$data[hiveCategory]', hiveDynamicFields='$json' WHERE hiveID='$data[hiveID]'";
		$result = $this->db->execute($sql);
	}
	
	public function hives_byMember($memberID){
		$sql = "SELECT * FROM perch3_hives WHERE memberID='$memberID' AND organisationID='-1' ORDER BY hiveID DESC";
		$result = $this->db->get_rows($sql);
		return $result;
	}
	
	public function hives_byLive(){
		$sql = "SELECT * FROM perch3_hives WHERE hiveLive='Yes' ORDER BY hiveID DESC LIMIT 100";
		$result = $this->db->get_rows($sql);
		return $result;
	}
	
	public function get_hive($hiveID){
		$sql = "SELECT * FROM perch3_hives WHERE hiveID='$hiveID'";
		$result = $this->db->get_row($sql);
		return $result;
	}
	
	public function delete_hive($hiveID){
		$sql = "DELETE FROM perch3_hives WHERE hiveID='$hiveID'";
		$result = $this->db->execute($sql);
		$sql = "DELETE FROM perch3_cells WHERE hiveID='$hiveID'";
		$result = $this->db->execute($sql);
		return $result;
	}
  
}