<?php

if (perch_layout_has("organisationSlug")) {
    $organisation = get_organisation_by_slug(perch_layout_var("organisationSlug", true), ["skip-template" => true], true);
}

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
<a href="/explore/organisations/">
    <button class="btn btn-outline-primary mb-4">Back to Organisations</button>
</a>
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
</div>
<?php browse_hives(["organisationID" => $organisation["organisationID"]]) ?>