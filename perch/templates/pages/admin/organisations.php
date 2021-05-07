<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <?php if (perch_get("hiveID") || (perch_get("manage") && perch_get("manage") !== "manage")) { 
            perch_layout("explore.hive", [
                "hiveID" => perch_get("hiveID") ? perch_get("hiveID") : perch_get("manage"),
                "cellID" => perch_get("cellID"),
                "organisationSlug" => perch_get("organisationSlug")
                ]);
        } else if (perch_get("organisationSlug")) { 
            $opts = [
                "organisationSlug" => perch_get("organisationSlug"),
                "manage" => perch_get("manage"),
                "parameters" => [
                    "organisationSlug" => perch_get("organisationSlug"),
                    "type" => perch_get("type"),
                    "action" => perch_get("action"),
                    "actionID" => perch_get("actionID"),
                    "actionSubID" => perch_get("actionSubID")
                ]
            ];
            perch_layout("explore.organisation", $opts);
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