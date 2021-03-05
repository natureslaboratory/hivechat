<?php
    switch($_SERVER['SERVER_NAME']) {

        case 'hivechat.co.uk':
            include(__DIR__.'/config.hivechat-co-uk.php');
            break;

        default:
            include('config.production.php');
            break;
    }

    define('PERCH_LICENSE_KEY', 'R32101-BMP253-QTP338-VTL741-XJA015');
    define('PERCH_EMAIL_FROM', 'jack@jackbarber.co.uk');
    define('PERCH_EMAIL_FROM_NAME', 'Jack Barber');

    define('PERCH_LOGINPATH', '/perch');
    define('PERCH_PATH', str_replace(DIRECTORY_SEPARATOR.'config', '', __DIR__));
    define('PERCH_CORE', PERCH_PATH.DIRECTORY_SEPARATOR.'core');

    define('PERCH_RESFILEPATH', PERCH_PATH . DIRECTORY_SEPARATOR . 'resources');
    define('PERCH_RESPATH', PERCH_LOGINPATH . '/resources');
    
    define('PERCH_HTML5', true);
    define('PERCH_TZ', 'UTC');
    
//    define('PERCH_DEBUG', true);