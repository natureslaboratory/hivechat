<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <?php if (perch_get("hiveID")) { 
                perch_layout("explore.hive", [
                    "hiveID" => perch_get("hiveID"),
                    "cellID" => perch_get("cellID"),
                    "organisationSlug" => perch_get("organisationSlug")
                    ]);
        } else if (perch_get("organisationSlug")) { 
            perch_layout("explore.organisation", [
                "organisationSlug" => perch_get("organisationSlug")
            ]);
         } else { ?>
                <div class="app-page-title">
                    <div class="page-title-wrapper">
                        <div class="page-title-heading">
                            <div class="page-title-icon">
                                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                            </div>
                            <div>Public Organisations
                                <!-- <div class="page-title-subheading">Change your password or <strong>hivechat</strong> profile and account details</div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <?php get_public_organisations() ?>
                    </div>
                </div>
            <?php } ?>
            </div>
            <?php perch_layout('admin.footer'); ?>