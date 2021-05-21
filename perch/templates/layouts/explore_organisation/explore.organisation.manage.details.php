<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

<?php perch_layout("admin.title", ["title" => "Manage your organisation details"]);

perch_layout("admin.back", [
    "href" => "/explore/organisations/$organisationSlug/manage",
    "label" => "Back to $organisation[organisationName]"
]);

?>

<div class="row">
    <div class="col-md-6">
        <?php get_organisation($organisation["organisationID"]) ?>
    </div>
</div>
<div class="line-break"></div>
<div class="row">
    <div class="col-md-6">
        <div id="social-list"></div>
    </div>
</div>
<div class="line-break"></div>
<div class="row">
    <div class="col-md-6">
        <?php delete_organisation($organisation["organisationID"]); ?>
    </div>
</div>