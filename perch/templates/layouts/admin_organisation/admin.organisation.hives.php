<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

            
<?php perch_layout("admin.title", ["title" => "Manage your organisation hives"]);

perch_layout("admin.back", [
    "href" => "/admin/organisations/$organisationSlug",
    "label" => "Back to $organisation[organisationName]"
]);

?>

<div class="row">
    <div class="col-md-6">
        <?php 
            $opts = [
                "type" => "All",
                "memberID" => perch_member_get("id")
            ];
            get_organisation_hives($organisation["organisationID"], $opts) 
        ?>
    </div>
    <div class="col-md-6">
        <?php create_hive(["organisationID" => $organisation["organisationID"]]); ?>
    </div>
</div>