<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

            
<?php perch_layout("admin.title", ["title" => "Manage your organisation hives"]);



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
            </div>
        <?php
        } else if (perch_layout_has("actionID")) {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisationSlug/manage/hives",
                "label" => "Back to Hives"
            ]);
            ?> 
            <div class="row">
                <div class="col-md-6">
                    <?php edit_hive(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]); ?> 
                </div>
                <div class="col-md-6">
                    <?php // create_cell(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]); 
                        hive_cells(perch_layout_var("actionID", true), ["organisationSlug" => $organisationSlug]);
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
        }
        break;
    default:
        perch_layout("admin.back", [
            "href" => "/explore/organisations/$organisationSlug/manage",
            "label" => "Back to $organisation[organisationName]"
        ]);
        ?>
            <div class="row">
                <div class="col-md-6">
                    <?php get_organisation_hives($organisation["organisationID"], ["type" => "organisation"]) ?>
                </div>
                <div class="col-md-6">
                    <?php create_hive(["organisationID" => $organisation["organisationID"]]); ?>
                </div>
            </div>
        <?php
}
?>
