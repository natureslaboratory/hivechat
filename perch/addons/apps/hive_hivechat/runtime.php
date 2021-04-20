<?php

/*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
*/

    # Include your class files as needed - up to you.
    include('Hivechat.class.php');
    include('Hivechats.class.php');
    include('Hivechat.hive.class.php');
    include('Hivechat.hives.class.php');
    include('Hivechat.cell.class.php');
    include('Hivechat.cells.class.php');

    # Create the function(s) users will call from their pages

    function hive_hivechat_form_handler($SubmittedForm)
    {
      if ($SubmittedForm->validate()) {

        $API  = new PerchAPI(1.0, 'hive_hivechat');

        switch($SubmittedForm->formID) {

          case 'create_hive':
            $hives = new Hivechat_Hives($API);
            $data['memberID'] = perch_member_get('id');
            $data['hiveTitle'] = $SubmittedForm->data['hiveTitle'];
            $data['hiveCategory'] = $SubmittedForm->data['hiveCategory'];
            $data = $hives->create_hive($data);
          break;
          
          case 'delete_hive':
            $hives = new Hivechat_Hives($API);
            $data = $SubmittedForm->data;
            $hives->delete_hive($data['hiveID']);
          break;
          
          case 'update_hive':
          	$hives = new Hivechat_Hives($API);
          	$data = $SubmittedForm->data;
          	$files = $SubmittedForm->files;
          	$hives->update_hive($data,$files);
          break;
          
          case 'create_cell':
            $cells = new Hivechat_Cells($API);
            $data['memberID'] = perch_member_get('id');
            $data['hiveID'] = $SubmittedForm->data['hiveID'];
            $data['cellTitle'] = $SubmittedForm->data['cellTitle'];
            $data['cellDateTime'] = $SubmittedForm->data['cellDateTime'];
            $data = $cells->create_cell($data);
          break;
          
          case 'delete_cell':
            $cells = new Hivechat_Cells($API);
            $data = $SubmittedForm->data;
            $cells->delete_cell($data['cellID']);
          break;
          
          case 'update_cell':
          	$cells = new Hivechat_Cells($API);
          	$data = $SubmittedForm->data;
          	$cells->update_cell($data);
          break;
          
        }
      }
    }
    
    function browse_hives(){
	  $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Hives($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/browse_hives.html', 'hc');

      $list = $hives->hives_byLive();

      $i = 0;
      $rowEnd = false;
      foreach($list as $data){
	      if($i==0){
		      echo '<div class="row">';
	      }
	      if($data['hiveDynamicFields']<>''){
		      $json = json_decode($data['hiveDynamicFields'],true);
		      $desc = array('introduction' => $json['introduction']['processed']);
		      $data = array_merge($data,$json,$desc);
	      }
	      $html = $Template->render($data, true);
	      echo $html;
	      if($i==2){
		      echo '</div> <!--end row-->';
		      $rowEnd = true;
	      }
	      $i++;
		if($i==3){
			$i = 0;
		}
      }
      
      if(!$rowEnd){
	      echo '</div>';
      }
      
    }

    function create_hive($opts=array(), $return=false)
    {
      $API  = new PerchAPI(1.0, 'hivechat');

      $Template = $API->get('Template');
      $Template->set('hivechat/create_hive.html', 'hc');

      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, false);

      echo $html;

    }
    
    function create_cell($hiveID)
    {
      $API  = new PerchAPI(1.0, 'hivechat');

      $Template = $API->get('Template');
      $Template->set('hivechat/create_cell.html', 'hc');
      
      $data['hiveID'] = $hiveID;

      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, $data);

      echo $html;

    }
    
    function list_hives($memberID){
      
      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Hives($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/list_hives.html', 'hc');

      $list = $hives->hives_byMember($memberID);
      
      $html = $Template->render_group($list, true);

      echo $html;

    }
    
    function hive_cells($hiveID){
      
      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Cells($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/list_cells.html', 'hc');

      $list = $hives->cells_byHive($hiveID);
      
      if(count($list)==0){
	      
	      echo "<p><strong>You're yet to create a cell</strong></p>";
	      
      }else{
      
	      $html = $Template->render_group($list, true);
	      echo $html;
      
      }

    }
    
    function hive_cells_nav($hiveID,$cellID){
      
      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Cells($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/list_cells_nav.html', 'hc');

      $list = $hives->cells_byHive($hiveID);
      $count = count($list);
      $i = 0;
      while($i<$count){
	      if($cellID==$list[$i]['cellID'] OR ($cellID=='' AND $i==0)){
	      	$list[$i]['active']='yes';
	      }
	      $i++;
      }
      $html = $Template->render_group($list, true);
	  echo $html;

    }
    
    function get_hive($hiveID){

      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Hives($API);
 
      $data = $hives->get_hive($hiveID,true);
      
      return $data;
      
    }
    
    function delete_hive($hiveID)
    {
        
      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Hives($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/delete_hive.html', 'hc');
      
      $data = $hives->get_hive($hiveID);
      
      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, $data);

      echo $html;

    }
    
    function edit_hive($hiveID)
    {
	    
      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Hives($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/edit_hive.html', 'hc');
      
      $data = $hives->get_hive($hiveID);

      if($data['hiveDynamicFields']<>''){
	      $json = json_decode($data['hiveDynamicFields'],true);
	      $desc = array('introduction' => $json['introduction']['processed']);
	      $data = array_merge($data,$json,$desc);
      }
      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, $data);

      echo $html;

    }
    
    function get_cell($cellID){

      $API  = new PerchAPI(1.0, 'hivechat');
      $cells = new Hivechat_Cells($API);
 
      $data = $cells->get_cell($cellID,true);
      
      return $data;
      
    }
    
    function get_first_cell($hiveID){

      $API  = new PerchAPI(1.0, 'hivechat');
      $hives = new Hivechat_Cells($API);

      $list = $hives->cells_byHive($hiveID);
      return $list[0];
      
    }
    
    function delete_cell($cellID,$hiveID)
    {
        
      $API  = new PerchAPI(1.0, 'hivechat');
      $cells = new Hivechat_Cells($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/delete_cell.html', 'hc');
      
      $data = $cells->get_cell($cellID);
      
      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, $data);

      echo $html;

    }
    
    function edit_cell($cellID)
    {
	    
      $API  = new PerchAPI(1.0, 'hivechat');
      $cells = new Hivechat_Cells($API);
      
      $Template = $API->get('Template');
      $Template->set('hivechat/edit_cell.html', 'hc');
      
      $data = $cells->get_cell($cellID);

      if($data['cellDynamicFields']<>''){
	      $json = json_decode($data['cellDynamicFields'],true);
	      $desc = array('introduction' => $json['introduction']['processed']);
	      $data = array_merge($data,$json,$desc);
      }
      $html = $Template->render(false);
      $html = $Template->apply_runtime_post_processing($html, $data);

      echo $html;

    }