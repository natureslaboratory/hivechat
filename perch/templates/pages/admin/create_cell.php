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
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Create a Hive
                        <div class="page-title-subheading">Create a new <strong>hivechat</strong> hives and start sharing ideas</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <?php create_hive(); ?>
            </div>
		</div>
    </div>           
<?php    
}
?>
<?php perch_layout('admin.footer'); ?>