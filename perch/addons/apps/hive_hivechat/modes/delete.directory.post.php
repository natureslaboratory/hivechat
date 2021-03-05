<?php

    # Main panel
    echo $HTML->main_panel_start(); 
//    include('_subnav.php');
    echo $HTML->heading1('Delete Directory');
    echo $Form->form_start();
    
    if ($message) {
        echo $message;
    }else{
        echo $HTML->warning_message('Are you sure you wish to delete the directory: %s?', $details['listingTitle']);
        echo $Form->form_start();
        echo $Form->hidden('listingID', $details['listingID']);
		echo $Form->submit_field('btnSubmit', 'Delete', $API->app_path().'/directory/');

        echo $Form->form_end();
    }
    
    echo $HTML->main_panel_end();