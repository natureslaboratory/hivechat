<?php

/*

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
*/


class Hive_Hivechats extends PerchAPI_Factory
{
    protected $table     = 'hivhechat';
	protected $pk        = 'hivechatID';
	protected $singular_classname = 'hivechat';
	
	protected $default_sort_column = 'hivechatID';
	
	public $static_fields   = array('calendarID','memberID','name','ofType','maxCapacity','maxAdults','maxChildren','permitSingleOccupancy','singleOccupancyReduction',
                                  'threeNightSaving','fiveNightSaving','weekMin','weekendMin','depositType','depositValue');
  
  public function calendars_byMember($memberID){
    
    return $this->db->get_rows('SELECT * FROM perch3_sc_calendars WHERE memberID="'.$memberID.'" ORDER BY name ASC');
    
  }
  
  public function listings_byMember($memberID){
    
    return $this->db->get_rows('SELECT * FROM perch3_business_directory WHERE memberID="'.$memberID.'" ORDER BY listingTitle ASC');
    
  }
  
  public function getMembers(){
    
    return $this->db->get_rows('SELECT * FROM perch3_members');
    
  }
  
  public function getCalendar($calendarID){
    
    return $this->db->get_row('SELECT * FROM perch3_sc_calendars WHERE calendarID="'.$calendarID.'"');
    
  }
  
  public function create_listing($data){
	  
	$this->db->execute('INSERT INTO perch3_business_directory (listingTitle,memberID) VALUES ("'.$data['name'].'","'.$data['memberID'].'")');  
	  
  }
  
  public function get_listing($listingID){
    
    return $this->db->get_row('SELECT * FROM perch3_business_directory WHERE listingID="'.$listingID.'"');
    
  }
  
  public function delete_listing($listingID){
    
    return $this->db->execute('DELETE FROM perch3_business_directory WHERE listingID="'.$listingID.'"');
    
  }
  
  public function update_listing($data,$files){

    $listingTitle = $data['listingTitle'];
    $businessCategory = $data['businessCategory'];
    $listingID = $data['listingID'];
	
	$description = $data['description'];
	
	unset($data['listingTitle']);
	unset($data['businessCategory']);
	unset($data['listingID']);
	
	unset($data['description']);
	
	$desc = array(
	  'description' => array(
	    '_flang' => "html",
	    'raw' => $description,
	    'processed' => $description
	  )
	); 
	
	$data = array_merge($data,$desc);
	
	if($files['image']['name']<>''){
	
	    $valid_extensions = array('jpeg', 'jpg'); // valid extensions
		$path = '../../../uploads/'; // upload directory
		
		$img = $files['image']['name'];
		$tmp = $files['image']['tmp_name'];
		// get uploaded file's extension
		$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
		// can upload same image using rand function
		$final_image = rand(1000,1000000).'.jpg';
		$final_image_large = rand(1000,1000000).'_large.jpg';
		$final_image_small = rand(1000,1000000).'_small.jpg';
		// check's valid format
		if(in_array($ext, $valid_extensions)) 
		{ 
			$path_normal = $path.strtolower($final_image);
			$path_large = $path.strtolower($final_image_large);
			$path_small = $path.strtolower($final_image_small); 
			if(move_uploaded_file($tmp,$path_normal)) 
			{	
				resize_crop_image(1200, 600, $path_normal, $path_normal);
				resize_crop_image(1920, 960, $path_normal, $path_large);
				resize_crop_image(600, 300, $path_normal, $path_small);
			}
		} else {
			echo 'Invalid File';
		}
		
		if($path_normal=='../../../uploads/'){
			$path = '';
		}else{
			
			$image = array(
				'image' => $path_normal,
				'image_large' => $path_large,
				'image_small' => $path_small,
			);
				
		}
	
	}else{
		
		$image = array(
			'image' => $data['image'],
			'image_large' => $data['image_large'],
			'image_small' => $data['image_small']
		);
		
	}
	
	$data = array_merge($data,$image);
	
	$json = addslashes(json_encode($data));
    
    return $this->db->execute('UPDATE perch3_business_directory SET listingTitle="'.$listingTitle.'", businessCategory="'.$businessCategory.'", listingDynamicFields="'.$json.'" WHERE listingID="'.$listingID.'"');
    
  }
  
}

function resize_crop_image($max_width, $max_height, $source_file, $dst_dir, $quality = 80){
    $imgsize = getimagesize($source_file);
    $width = $imgsize[0];
    $height = $imgsize[1];
    $mime = $imgsize['mime'];
 
    switch($mime){
        case 'image/gif':
            $image_create = "imagecreatefromgif";
            $image = "imagegif";
            break;
 
        case 'image/png':
            $image_create = "imagecreatefrompng";
            $image = "imagepng";
            $quality = 7;
            break;
 
        case 'image/jpeg':
            $image_create = "imagecreatefromjpeg";
            $image = "imagejpeg";
            $quality = 80;
            break;
 
        default:
            return false;
            break;
    }
     
    $dst_img = imagecreatetruecolor($max_width, $max_height);
    $src_img = $image_create($source_file);
     
    $width_new = $height * $max_width / $max_height;
    $height_new = $width * $max_height / $max_width;
    //if the new width is greater than the actual width of the image, then the height is too large and the rest cut off, or vice versa
    if($width_new > $width){
        //cut point by height
        $h_point = (($height - $height_new) / 2);
        //copy image
        imagecopyresampled($dst_img, $src_img, 0, 0, 0, $h_point, $max_width, $max_height, $width, $height_new);
    }else{
        //cut point by width
        $w_point = (($width - $width_new) / 2);
        imagecopyresampled($dst_img, $src_img, 0, 0, $w_point, 0, $max_width, $max_height, $width_new, $height);
    }
     
    $image($dst_img, $dst_dir, $quality);
 
    if($dst_img)imagedestroy($dst_img);
    if($src_img)imagedestroy($src_img);
}