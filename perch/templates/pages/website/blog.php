<?php perch_layout('website.header'); ?>

    <?php 
	    
	    if(perch_get('s')){
		    perch_blog_post(perch_get('s')); 
	    }else{
		    perch_blog_recent_posts(10);
	    }
	    
    ?>

<?php perch_layout('website.footer'); ?>