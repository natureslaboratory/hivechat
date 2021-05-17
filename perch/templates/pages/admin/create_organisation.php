<?php perch_layout('admin.header'); 

    // Report all PHP errors
error_reporting(-1);

// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);

?> 

<?php
if(perch_member_logged_in()){
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Create an Organisation
                        <div class="page-title-subheading">Create a new <strong>organisation</strong></div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <?php create_organisation(); ?>
            </div>
		</div>
    </div>           
<?php    
}
?>


<?php perch_layout('admin.footer'); ?>