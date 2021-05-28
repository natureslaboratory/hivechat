<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

            
<?php //perch_layout("admin.title", ["title" => "Manage your organisation hives"]);



?>

<?php 

switch (perch_layout_var("action", true)) {
    case "edit":
        if (perch_layout_has("actionID") && perch_layout_has("actionSubID")) {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisationSlug/manage/hives/edit/" . perch_layout_var("actionID", true),
                "label" => "Back to Hive"
            ]); ?>
            <div class="row">
                <div class="col-md-6">
                    <?php edit_cell(perch_layout_var("actionSubID", true)); ?> 
                </div>
                <div class="col-md-6">
                    <?php delete_cell(perch_layout_var("actionSubID", true), perch_layout_var("actionID", true)); ?> 
                </div>
            </div>
        <?php
        } else if (perch_layout_has("actionID")) {
            ?> 
            <div id="manage-hive" 
                data-organisationSlug="<?= $organisationSlug ?>" 
                data-hiveID="<?= perch_layout_var("actionID", true) ?>"
                data-organisationName="<?= $organisation["organisationName"] ?>"
                data-organisationID="<?= $organisation["organisationID"] ?>"
            >
            </div>
            <?php
            // perch_layout("admin.back", [
            //     "href" => "/explore/organisations/$organisationSlug/manage/hives",
            //     "label" => "Back to Hives"
            // ]);
            ?>
            
            <!-- <div id="manage-hive" data-actionID="<?php //perch_layout_var("actionID", true) ?>" data-organisationSlug="<?php //$organisationSlug ?>"></div> -->
            <div class="row">
                <div class="col-md-6">
                    <?php edit_hive(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]); ?> 
                    <?php delete_hive(perch_layout_var("actionID", true)) ?>
                </div>
                <div class="col-md-6">
                    <?php // create_cell(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]); 
                        $cells = hive_cells(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug], true);
                        ?> 
                        <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                            <a href="/explore/organisations/<?= $organisationSlug ?>/manage/hives/create/<?= perch_layout_var("actionID", true) ?>/">
                                <button class="btn btn-alternate">+ New Cell</button>
                            </a>
                        </div>
                        <?php
                        if ($cells) {
                            echo $cells;
                        }
                    ?> 
                </div>
            </div>
            <?php
        } else {
            ?> 
            <script>
                let urlSplit = window.location.href.split("/");
                for (let i = urlSplit.length-1; i >= 0; i--) {
                    const element = urlSplit[i];
                    if (element == "organisations") {
                        window.location.href = urlSplit.slice(0, i+2).join("/");
                    }
                }
            </script>
            <?php
        }
        break;
    case "create":
        if (perch_layout_has("actionID")) {
            // Creating cell in hive of actionID
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisationSlug/manage/hives/edit/" . perch_layout_var("actionID", true),
                "label" => "Back to Hive"
            ]);
            ?>
            <div class="row">
                <div class="col-md-6">
                    <?php create_cell(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]); ?>
                </div>
            </div>

            <?php
        } else {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisationSlug/manage/hives/",
                "label" => "Back to Hives"
            ]);
            ?>
            <div class="row">
                <div class="col-md-6">
                    <?php create_hive(["organisationID" => $organisation["organisationID"]]); ?>
                </div>
            </div>
            <?php
        }
        break;
    default:
        perch_layout("admin.back", [
            "href" => "/explore/organisations/$organisationSlug/manage",
            "label" => "Back to $organisation[organisationName]"
        ]);
        ?>
            <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                <a href="/explore/organisations/<?= $organisationSlug ?>/manage/hives/create">
                    <button class="btn btn-alternate">+ New Hive</button>
                </a>
            </div>
            <div class="row c-hives">
                <div class="col-md-12">
                    <?php 
                        // $opts = [
                            // "type" => "All",
                            // "memberID" => perch_member_get("id")
                        // ];
                        // get_organisation_hives($organisation["organisationID"], $opts) ?>
                    <div id="admin-hives"></div>
                </div>
                <div class="col-md-6">
                    <?php //create_hive(["organisationID" => $organisation["organisationID"]]); ?>
                </div>
            </div>
        <?php
}
?>
