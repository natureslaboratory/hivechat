<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
    # include the API
    include('../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'simple_calendar');

    # include your class files
    include('../Simple_Calendar.class.php');
    include('../Simple_Calendars.class.php');
    include('../Simple_Calendar.directory.class.php');
    include('../Simple_Calendar.directories.class.php');
    
    # Grab an instance of the Lang class for translations
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Simple Calendar - Business Directory');
    
    
    # Set Subnav
    include('../modes/_subnav.php');


    # Do anything you want to do before output is started
    include('../modes/directory.list.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../modes/directory.list.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');