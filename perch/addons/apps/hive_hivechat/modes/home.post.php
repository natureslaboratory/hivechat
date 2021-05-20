
<?php
/*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
*/

    echo $HTML->title_panel([
    'heading' => $Lang->get('Hivechat'),
//     'button'  => [
//             'text' => $Lang->get('Add Calendar'),
//             'link' => $API->app_nav().'/calendars/add',
//             'icon' => 'core/plus',
//         ],
    ], $CurrentUser);
    
    # Main panel
    echo $HTML->main_panel_start();
   
    include('_subnav.php');
    ?>
    <p>Hello</p>
    <?php
    
    echo $HTML->main_panel_end();