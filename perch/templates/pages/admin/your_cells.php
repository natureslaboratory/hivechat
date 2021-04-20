<?php perch_layout('admin.header'); ?>   
<?php
if(perch_member_logged_in()){
	if(perch_get('cellID')){
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Manage Your Cell
                        <div class="page-title-subheading">Use the options below to manage your <strong>hivechat</strong> cells</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <?php edit_cell(perch_get('cellID')); ?>
            </div>
            <div class="col-md-6">
               <?php delete_cell(perch_get('cellID'),perch_get('hiveID')); ?>
            </div>
		</div>
    </div> 
<?php	
	}elseif(perch_get('hiveID')){
?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Manage Your Hive
                        <div class="page-title-subheading">Use the options below to manage your <strong>hivechat</strong> hives and its cells</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <?php edit_hive(perch_get('hiveID')); ?>
                <h2 class="mb-3">Cells</h2>
                <?php hive_cells(perch_get('hiveID')); ?>
            </div>
            <div class="col-md-6">
               <?php create_cell(perch_get('hiveID')); ?>
               <?php delete_hive(perch_get('hiveID')); ?>
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
                    <div>Your Hives
                        <div class="page-title-subheading">Manage your <strong>hivechat</strong> hives and cells</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-6">
                <?php list_hives(perch_member_get('id')); ?>
            </div>
            <div class="col-md-6">
	        	<?php create_hive(); ?>    
			</div>
		</div>
    </div>           
<?php    
	}
}
?>
<?php perch_layout('admin.footer'); ?>