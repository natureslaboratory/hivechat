<?php


    $HTML 		= $API->get('HTML');
	  $Form 		= $API->get('Form');
	  $Template = $API->get('Template');

    $Directories = new Business_Directories($API);
//     $Suppliers_All = new JC_Fabrications_Suppliers($API);
//     $Items = new JC_Fabrications_Items($API);

    $directories = array();
    $directories = $Directories->all();