<?php   
    
    $Hives = new Hivechat_Hives($API);
    $Cells = new Hivechat_Cells($API);

    $HTML     = $API->get('HTML');
    $Form     = $API->get('Form');
    $Text     = $API->get('Text');
    $Template = $API->get ('Template');

//    $calendars = array();
	
//    $calendars = $Calendars->all();
            
//     if ($calendars == false) {

//         $message = $HTML->warning_message('There are no calendars to display');        

//     }
