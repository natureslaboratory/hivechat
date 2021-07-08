<?php perch_layout('admin.header'); ?>   
<?php PerchSystem::set_var('url_redirect', perch_get('r')); ?>
<?php PerchSystem::set_var('an_email', perch_get('anEmail')); ?>
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
        <?php if (perch_get("action") == "register") { ?>
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                        </div>
                        <div>
                            Register
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Register</h5>
                            <?php perch_member_form('register.html'); ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php } else if (perch_get("action") == "login") { ?>
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                        </div>
                        <div>
                            Login
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
            </div>
        <?php } else {
            ?>
            <script>
                window.location.href = "/admin/login";
            </script>
            <?php
        }
        ?>
    </div>    
    <script>
		const url = window.location.href;
		const url2 = url.split("?")[0];
		const email = url2.split("/").pop();
		function validateEmail(email){
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
		
		if(validateEmail(email)){
			$(document).ready(function(){
				$('#form1_email').val(email);
			});
		}
	</script>       
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
                    <div>Welcome, <?= perch_member_get("first_name") ?>
                        <div class="page-title-subheading">Manage your <strong>hivechat</strong> account and create your conferences</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
<!--
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Your Hives
                        </div>
                        <div class="card-body">
                            <p>
                                Keep track of all your hives.
                            </p>
                            <a href="/admin/your-hives">
                                <button class="btn btn-primary">
                                    View
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
-->
                <!-- <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Your Organisations
                        </div>
                        <div class="card-body">
                            <p>
                                View and manage all your organisations.
                            </p>
                            <a href="/admin/organisations">
                                <button class="btn btn-primary">
                                    View
                                </button>
                            </a>
                        </div>
                    </div>
                </div> -->
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Your Account
                        </div>
                        <div class="card-body">
                            <p>
                                Manage your account details.
                            </p>
                            <a href="/admin/account">
                                <button class="btn btn-primary">
                                    Manage
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
   
<?php    
}
?>
<?php perch_layout('admin.footer'); ?>