<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
  
    <link rel="stylesheet" href="/design/css/bootstrap.min.css">
    <link rel="stylesheet" href="/design/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/design/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/design/css/jquery.fancybox.min.css">
    <link rel="stylesheet" href="/design/fonts/icomoon/style.css">
    <link rel="stylesheet" href="/design/fonts/flaticon/font/flaticon.css">
    <link rel="stylesheet" href="/design/css/aos.css">
    <link rel="stylesheet" href="/design/css/style.css">
    <style>
	.logo{
		background:url('/design/images/hivechat.svg') top left no-repeat;
		margin-top:10px;
		background-size:contain;
		height:100px;
		width:200px;
	}    
	.logo a{
		text-indent:-10000000px;
		display:block;
	}
	</style>

    <title><?php perch_pages_title(); ?></title>
  </head>
  <body>


    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close">
          <span class="icofont-close js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
    
    <div class="container">


      <nav class="site-nav">
        <div class="logo">
          <a href="/">Hivechat</a>
        </div>
        <div class="row align-items-center">
          
          
          <div class="col-12 col-sm-12 col-lg-12 site-navigation text-center">
	        <?php 
		          perch_pages_navigation(array(
			        'navgroup' =>'main',
				  	'template' => array('item.html', 'subitem.html')
				  )); 
			?>
<!--
            <ul class="js-clone-nav d-none d-lg-inline-block text-left site-menu">
              <li class="active"><a href="index.html">Home</a></li>
              <li class="has-children">
                <a href="#">Dropdown</a>
                <ul class="dropdown">
                  <li><a href="#">Menu One</a></li>
                  <li class="has-children">
                    <a href="#">Menu Two</a>
                    <ul class="dropdown">
                      <li><a href="#">Sub Menu One</a></li>
                      <li><a href="#">Sub Menu Two</a></li>
                      <li><a href="#">Sub Menu Three</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Menu Three</a></li>
                </ul>
              </li>
              <li><a href="inner-page.html">Inner Page</a></li>
              <li><a href="contact.html">Contact us</a></li>
            </ul>
-->

            <ul class="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right menu-absolute">
              <li class="cta-button"><a href="/admin"><?php if(perch_member_logged_in()){echo "Your Account";}else{echo "Register / Sign In";}?></a></li>
            </ul>

            <a href="#" class="burger ml-auto site-menu-toggle js-menu-toggle d-block d-lg-none" data-toggle="collapse" data-target="#main-navbar">
              <span></span>
            </a>

          </div>

        </div>  
      </nav> <!-- END nav -->

    </div> <!-- END container -->