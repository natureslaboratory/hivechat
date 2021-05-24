<?php

//     ini_set('display_errors', 1);
//     ini_set('display_startup_errors', 1);
//     error_reporting(E_ALL);

class Hivechat_Cells extends PerchAPI_Factory
{
    protected $table     = 'cells';
	protected $pk        = 'cellID';
	protected $singular_classname = 'cell';
	
	protected $default_sort_column = 'cellID';
	
	public $static_fields   = array('cellID', 'hiveID', 'memberID', 'cellTitle', 'cellDateTime', 'cellDynamicFields');
	
	public function create_cell($data){
		$sql = "INSERT INTO perch3_cells (hiveID, memberID, cellTitle, cellSubTitle, cellDateTime, cellLive, cellDynamicFields) VALUES ('$data[hiveID]', '$data[memberID]', '$data[cellTitle]', '$data[cellSubTitle]', '$data[cellDateTime]', 'No', '$data[cellDynamicFields]')";
		echo $sql;
		$result = $this->db->execute($sql);
	}
	
	public function update_cell($data){
		
		$introduction = $data['cellIntroduction'];
		$intro = array(
		  'introduction' => array(
		    '_flang' => "html",
		    'raw' => $introduction,
		    'processed' => $introduction
		  ),
		  'video' => $data['video']
		); 
		$jsonData = $intro;
		$json = addslashes(json_encode($jsonData));
		
		$sql = "UPDATE perch3_cells SET cellTitle='$data[cellTitle]', cellSubTitle='$data[cellSubTitle]', cellDateTime='$data[cellDateTime]', cellLive='$data[cellLive]', cellDynamicFields='$json' WHERE cellID='$data[cellID]'";
		// echo $sql;
		$result = $this->db->execute($sql);
	}
	
	public function cells_byHive($hiveID){
		$sql = "SELECT * FROM perch3_cells WHERE hiveID='$hiveID' ORDER BY hiveID DESC";
		$result = $this->db->get_rows($sql);
		return $result;
	}
	
	public function get_cell($cellID){
		$sql = "SELECT * FROM perch3_cells WHERE cellID='$cellID'";
		$result = $this->db->get_row($sql);
		return $result;
	}
	
	public function delete_cell($cellID){
		$sql = "DELETE FROM perch3_cells WHERE cellID='$cellID'";
		$result = $this->db->execute($sql);
		return $result;
	}
  
}