<?php perch_layout('admin.header'); ?>
<?php
if (perch_member_logged_in()) {
    if (perch_get('orgID') && is_organisation_member(perch_member_get('id'), perch_get('orgID'))) {
?>
        <div class="app-main__outer">
            <div class="app-main__inner">
                <div class="app-page-title">
                    <div class="page-title-wrapper">
                        <div class="page-title-heading">
                            <div class="page-title-icon">
                                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                            </div>
                            <div>Manage Your Organisation
                                <div class="page-title-subheading">Use the options below to manage your <strong>organisation</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <?php get_organisation(perch_get("orgID")) ?>
                        <?php get_organisation_hives(perch_get("orgID")) ?>
                    </div>
                    
                    <div class="col-md-6">
                        <?php delete_organisation(perch_get("orgID")); ?>
                        <?php create_hive(["organisationID" => perch_get("orgID")]); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <?php
    } else {
        ?>
            <div class="app-main__outer">
                <div class="app-main__inner">
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
                </div>
            </div>
            </div>
        <?php
    }
}
        ?>
        <?php 
        perch_layout('admin.footer'); ?>