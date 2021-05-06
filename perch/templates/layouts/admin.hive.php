<?php
if (perch_member_logged_in()) {
    $cellID = perch_layout_var("cellID", true);
    $hiveID = perch_layout_var("hiveID", true);
    $organisationSlug = perch_layout_var("organisationSlug", true);
    $organisation = null;
    if ($organisationSlug) {
        $organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);
    }

    if ($cellID) {
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
                <a href="<?= $organisationSlug ? "/admin/organisations/$organisationSlug/$hiveID" : "/admin/your-hives/$hiveID" ?>">
                    <button class="btn btn-outline-primary mb-4">Back to <?= get_hive($hiveID)["hiveTitle"] ?></button>
                </a>
                <div class="row">
                    <div class="col-md-6">
                        <?php edit_cell($cellID); ?>
                    </div>
                    <div class="col-md-6">
                        <?php delete_cell($cellID, $hiveID); ?>
                    </div>
                </div>
            </div>
        <?php
    } elseif ($hiveID) {
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
                    <a href="<?= $organisationSlug ? "/admin/organisations/$organisationSlug" : "/admin/your-hives/" ?>">
                        <button class="btn btn-outline-primary mb-4">Back to <?= $organisationSlug ? $organisation["organisationName"] : "Hives" ?></button>
                    </a>
                    <div class="row">
                        <div class="col-md-6">
                            <?php edit_hive($hiveID); ?>
                            <h2 class="mb-3">Cells</h2>
                            <?php hive_cells($hiveID); ?>
                        </div>
                        <div class="col-md-6">
                            <?php create_cell($hiveID); ?>
                            <?php delete_hive($hiveID); ?>
                        </div>
                    </div>
                </div>
            <?php
        }
    }
?>