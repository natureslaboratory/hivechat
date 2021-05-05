<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <?php if (perch_get("organisationSlug")) { ?>
            <?php
            $organisation = get_organisation_by_slug(perch_get("organisationSlug"), ["skip-template" => true], true);
            ?>
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <?php if ($organisation["organisationLogo"]) { ?>
                            <img class="page-title-logo" src="<?= $organisation["organisationLogo"] ?>" alt="<?= $organisation["organisationName"] ?>">
                        <?php } else { ?>
                            <div class="page-title-icon">
                                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                            </div>
                        <?php } ?>
                        <div>
                            <?= $organisation["organisationName"] ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 card">
                        <div class="card-header-tab card-header">
                            <div class="card-header-title">
                                About <?= $organisation["organisationName"] ?>
                            </div>
                        </div>
                        <div class="card-body">
                            <?= $organisation["organisationDesc"] ?>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <?php get_organisation_hives($organisation["organisationID"], ["scope" => "Public"]) ?>
                </div>
            </div>
            <?php } else { ?>
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