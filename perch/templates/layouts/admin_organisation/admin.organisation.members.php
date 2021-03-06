<?php 

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

<?php 
perch_layout("admin.title", ["title" => "Manage your organisation members"]);

?>

<?php switch (perch_layout_var("action", true)) {
    case "add":
        perch_layout("admin.back", [
            "href" => "/admin/organisations/$organisationSlug/members",
            "label" => "Back to members"
        ]); ?>
        <div class="row">
            <div class="col-md-6">
                <?php add_organisation_member($organisation["organisationID"], perch_member_get("id")) ?>
            </div>
        </div>
    <?php break;

    case "manage":
        perch_layout("admin.back", [
            "href" => "/admin/organisations/$organisationSlug/members",
            "label" => "Back to members"
        ]); ?>
        <div class="row">
            <div class="col-md-6">
                <?php manage_organisation_member($organisation["organisationID"], perch_layout_var("actionID", true)) ?>
            </div>
        </div>
        <?php
        break;
    default: 
        perch_layout("admin.back", [
            "href" => "/admin/organisations/$organisationSlug/",
            "label" => "Back to $organisation[organisationName]"
        ]); ?>
        <div class="row">
            <div class="col-md-12">
                <?php organisation_members($organisation["organisationID"]) ?>
            </div>
        </div>
    <?php
} ?>
