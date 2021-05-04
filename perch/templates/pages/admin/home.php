<?php perch_layout('admin.header'); ?>   
<?php
if (true) {
    // PerchSystem::redirect("/admin");
}
?>
<?php
if(!perch_member_logged_in()){
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Register or Sign In
                        <div class="page-title-subheading">Access your <strong>hivechat</strong> account</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Sign in</h5>
                        <?php perch_members_login_form(); ?>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Register</h5>
                        <?php perch_member_form('register.html'); ?>
                    </div>
                </div>
            </div>
		</div>
    </div>           
<?php
}else{
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Welcome
                        <div class="page-title-subheading">Manage your <strong>hivechat</strong> account and create your conferences</div>
                    </div>
                </div>
            </div>
        </div>
			<div class="row">
	            <?php perch_content('Page Content'); ?>
			</div>
        </div>           
   
<?php    
}
?>
<?php perch_layout('admin.footer'); ?>