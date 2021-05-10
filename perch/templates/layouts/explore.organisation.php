<?php

if (perch_layout_has("organisationSlug")) {
    $organisation = get_organisation_by_slug(perch_layout_var("organisationSlug", true), ["skip-template" => true], true);

    if (!$organisation) {
        ?>
            <script>
                window.location.href = "/explore/organisations";
            </script>

        <?php
    }
}

$isAdmin = is_admin($organisation["organisationID"], perch_member_get("id"));
$isMember = is_organisation_member(perch_member_get("id"), $organisation["organisationID"]);

if (perch_layout_var("manage", true) == "manage" && $isAdmin) {
    perch_layout("explore_organisation/explore.organisation.manage", perch_layout_var("parameters", true));
} else if (perch_layout_var("manage", true)) {
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
} else {

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
<div style="display: flex; justify-content: space-between">
    <a href="/explore/organisations/">
        <button class="btn btn-outline-primary mb-4">Back to Organisations</button>
    </a>
    <?php if ($isAdmin) { ?>
    <a href="/explore/organisations/<?= $organisation["organisationSlug"] ?>/manage">
        <button class="btn btn-primary mb-4">Manage Organisation</button>
    </a>
    <?php } ?>

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
</div>
<div class="row">
    <div class="col-md-6">
        <div id='hives'></div>
    </div>
</div>
<?php   
}

?>

<script>
</script>