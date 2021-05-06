<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
        <div class="app-main__inner">
    <?php
    if (perch_member_logged_in()) {
        $organisation = null;
        if (perch_get("organisationSlug")) {
            $organisation = get_organisation_by_slug(perch_get("organisationSlug"), ["skip-template" => true], true);
        }
        if ($organisation) {
            if (is_organisation_member(perch_member_get('id'), $organisation["organisationID"])) {
                if (perch_get("hiveID")) {
                    perch_layout("admin.hive", [
                        "hiveID" => perch_get("hiveID"),
                        "cellID" => perch_get("cellID"),
                        "organisationSlug" => perch_get("organisationSlug")
                    ]);
                } else if (perch_get("section")) {
                    $opts = [
                        "organisationSlug" => perch_get("organisationSlug"),
                        "action" => perch_get("action"),
                        "actionID" => perch_get("actionID")
                    ];
                    switch (perch_get("section")) {
                        case "members":
                            perch_layout("admin_organisation/admin.organisation.members", $opts);
                            break;
                        case "details":
                            perch_layout("admin_organisation/admin.organisation.details", $opts);
                            break;
                        case "hives":
                            perch_layout("admin_organisation/admin.organisation.hives", $opts);
                            break;
                        default:
                            echo "404";
                            break;
                    }
                } else {
                    perch_layout("admin_organisation/admin.organisation", [
                        "organisationSlug" => perch_get("organisationSlug")
                    ]);
                }
                
            } else {
            ?>
                <script>
                    window.location.href = "/admin/organisations";
                </script>
            <?php
            }
        } else {
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
        }
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