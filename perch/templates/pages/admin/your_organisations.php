<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
        <div class="app-main__inner">
    <?php
    if (perch_member_logged_in()) {
        ?>
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div class="page-title-icon">
                            <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                        </div>
                        <div>Your Organisations
                            <div class="page-title-subheading">Manage your <strong>organisations</strong></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <?php 
                        try {
                            get_member_organisations(perch_member_get('id'));
                        } 
                        catch(Error $e) {
                            echo $e;
                        }  ?>
                </div>
                <div class="col-md-6">
                    <?php create_organisation(); ?>
                </div>
            </div>
        <?php
        
    } else { ?>
        <script>
            window.location.href = "/admin";
        </script>
        
    <?php }
            ?>
        </div>
    </div>
</div>
            <?php 
            perch_layout('admin.footer'); ?>