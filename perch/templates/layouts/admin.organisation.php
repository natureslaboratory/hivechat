<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

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

            <a href="/admin/organisations/">
                <button class="btn btn-outline-primary mb-4">Back to Organisations</button>
            </a>
            <div class="row">
                <div class="col-md-6">
                    <?php get_organisation($organisation["organisationID"]) ?>
                    <?php organisation_members($organisation["organisationID"]) ?>
                </div>

                <div class="col-md-6">
                    <?php delete_organisation($organisation["organisationID"]); ?>
                    <?php create_hive(["organisationID" => $organisation["organisationID"]]); ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <?php get_organisation_hives($organisation["organisationID"]) ?>
                </div>
            </div>
        </div>
    </div>
</div>