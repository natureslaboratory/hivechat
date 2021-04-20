<?php perch_layout('admin.header'); ?>   
<?php
if(perch_member_logged_in()){
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-search icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Search Results
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <?php  
	                       	$query = perch_get('q');
							perch_content_search($query, array(
								'from-path'=>'/admin',
								'excerpt-chars'=>300,
							));
                        ?>
                    </div>
                </div>
            </div>
		</div>
    </div>           
<?php    
}
?>
<?php perch_layout('admin.footer'); ?>