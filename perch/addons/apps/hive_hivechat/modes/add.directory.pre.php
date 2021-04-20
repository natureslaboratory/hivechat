<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//     $Suppliers_All = new JC_Fabrications_Suppliers($API);
    $Directories = new Business_Directories($API);

    $HTML     = $API->get('HTML');
    $Form     = $API->get('Form');
    $Text     = $API->get('Text');
    $Template = $API->get ('Template');


    // THIS IS THE MASTER FORM TEMPLATE FOR THIS ITEM - THE FIRST BIT IS THE PATH, THE SECOND IS THE 'NAMESPACE'
    $Template->set('simple_calendar/directories.html','sc');

    // SETTING SOME VARIABLES
    $result = false;
    $message = false;

    // DO WE HAVE AN ID? IF SO, IT'S AN 'EDIT'...
    if (isset($_GET['id']) && $_GET['id']!='') {
    	  // GET THE ITEM AND MAKE IT INTO AN ARRAY
        $listingID = (int) $_GET['id'];    
        $Directory = $Directories->find($listingID, true);
//         $Supplier = $Suppliers_All->find($Directory->supplierID(), true);
        $details = $Directory->to_array();        
        
        // SET THE HEADING
        $heading1 = 'Edit Directory: '.$Directory->listingTitle().'';
//         $heading2 = 'Supplier: '.$Supplier->name().'';
      
        $buttonText = 'Update Directory';
        
    }else{
      	// NO - WE'RE MAKING A NEW ONE
        $Directory = false;
        $listingID = false;
        $details = array();
        
        // SET THE HEADING        
        $heading1 = 'Add Directory';
      
        // SET THE FORM BUTTON TEXT
        $buttonText = 'Add Directory';
      
    }
    
    // HANDLE BLOCKS FROM TEMPLATE
    $Form->handle_empty_block_generation($Template);

    // SET REQUIRED FIELDS
    $Form->set_required_fields_from_template($Template, $details);

    if($Form->submitted()) {
    
        //FOR ITEMS PROGRAMMATICALLY ADDED TO FORM
        $postvars = array('memberID', 'listingTitle', 'businessCategory', 'businessSlug', 'tags');	   
        $data = $Form->receive($postvars);
//         $data['date'] = $Form->get_date('date');

        // READ IN DYNAMIC FIELDS FROM TEMPLATE
        $previous_values = false;
        if (isset($details['listingDynamicFields'])) {
            $previous_values = PerchUtil::json_safe_decode($details['listingDynamicFields'], true);
        }

        // GET DYNAMIC FIELDS AND CREATE JSON ARRAY FOR DB
        $dynamic_fields = $Form->receive_from_template_fields($Template, $previous_values, $Directories, $Directory);
        $data['listingDynamicFields'] = PerchUtil::json_safe_encode($dynamic_fields);

        // IF WE HAVE A SUPPLIER UPDATE IT
        if (is_object($Directory)) {
            $result = $Directory->update($data);
        }else{
            // OTHERWISE CREATE IT
            if (isset($data['listingID'])) unset($data['listingID']);

            $new_directories = $Directories->create($data);

            // SHOW RELEVANT MESSAGE
            if ($new_directories) {
                PerchUtil::redirect($API->app_path() .'/directory/add?id='.$new_directories->id().'&created=1');
            }else{
                $message = $HTML->failure_message('Sorry, that Directory could not be created.');
            }
        }

        // SHOW RELEVANT MESSAGE
        if ($result) {
            $message = $HTML->success_message('Your Directory has been successfully updated. Return to %sDirectory%s', '<a href="'.$API->app_path() .'/directory/">', '</a>');  
        }else{
            $message = $HTML->failure_message('Sorry, that Directory could not be updated.');
        }

        // GET ORG DATA TO POPULATE FORM
        if (is_object($Directory)) {
            $details = $Directory->to_array();
        }else{
            $details = array();
        }
          
        
    }
    
    if (isset($_GET['created']) && !$message) {
        $message = $HTML->success_message('Your Directory has been successfully created. Return to %sDirectory%s', '<a href="'.$API->app_path() .'/directory/">', '</a>'); 
    }