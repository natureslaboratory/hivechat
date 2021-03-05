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
                    <div>Update Your Account Details
                        <div class="page-title-subheading">Change your password or <strong>hivechat</strong> profile and account details</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Password</h5>
                        <?php perch_member_form('password.html'); ?>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="main-card mb-3 card">
	                <div class="card-body">
	                    <h5 class="card-title">Profile</h5>
                        <?php perch_member_form('profile.html'); ?>
                    </div>
                </div>
            </div>
		</div>
    </div>           
<?php    
}
?>
<?php perch_layout('admin.footer'); ?>