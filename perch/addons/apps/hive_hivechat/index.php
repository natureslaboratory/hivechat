<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
    # include the API
    include('../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'simple_calendar');

    # include your class files
    include('Hivechat.class.php');
    include('Hivechats.class.php');
    include('Hivechat.hive.class.php');
    include('Hivechat.hives.class.php');
    include('Hivechat.cell.class.php');
    include('Hivechat.cells.class.php');

    # Grab an instance of the Lang class for translations
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Hivechat');
    
    
    # Set Subnav
    include('modes/_subnav.php');


    # Do anything you want to do before output is started
    include('modes/home.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('modes/home.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');