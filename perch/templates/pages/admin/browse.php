<?php perch_layout('admin.header'); ?>   
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-search icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Browse
                        <div class="page-title-subheading">Browse <strong>hivechat</strong> cells</div>
                    </div>
                </div>
            </div>
        </div>
			
	            <?php browse_hives(); ?>
			
        </div>           
<?php perch_layout('admin.footer'); ?>