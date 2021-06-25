<?php perch_layout('admin.header'); ?>

<?php

// echo perch_get("action");

?>


<div class="app-main__outer">
    <div class="app-main__inner">

        <?php
        if (perch_member_logged_in()) {
            if (perch_get('cellID')) {
        ?>
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
                        <?php delete_cell(perch_get('cellID'), perch_get('hiveID')); ?>
                    </div>
                </div>
            <?php
            } elseif (perch_get('hiveID')) {
            ?>
                <div id="manage-hive"
                    data-hiveID="<?= perch_get("hiveID") ?>"
                    data-backurl="/admin/your-hives/"
                ></div>
            <?php
            } else if (perch_get("action") == "create") {
            ?>

                <div class="app-page-title">
                    <div class="page-title-wrapper">
                        <div class="page-title-heading">
                            <div class="page-title-icon">
                                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                            </div>
                            <div>Create Hive
                                <div class="page-title-subheading">Create a new hive</div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                perch_layout("admin.back", [
                    "href" => "/admin/your-hives",
                    "label" => "Back to hives"
                ]);
                ?>
                <div class="row">
                    <div class="col-md-6">
                        <?php create_hive(["action" => "/admin/your-hives"]) ?>
                    </div>
                </div>

            <?php
            } else {
            ?>
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
                <div id="admin-hives"></div>
        <?php
            }
        }
        ?>
    </div>
    <?php perch_layout('admin.footer'); ?>