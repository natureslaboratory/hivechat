<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

<?php
$opts = [
    "action" => perch_layout_var("action", true),
    "actionID" => perch_layout_var("actionID", true),
    "actionSubID" => perch_layout_var("actionSubID", true),
];
switch (perch_layout_var("type", true)) {
    case "hives":
        perch_layout("explore_organisation/explore.organisation.hives", $opts);
        break;
    case "members":
        perch_layout("explore_organisation/explore.organisation.members", $opts);
        break;
    case "details":
        perch_layout("explore_organisation/explore.organisation.details", $opts);
        break;
    default: 
        if (perch_layout_var("type", true)) { ?>
            <script>
                let urlSplit = window.location.href.split("/");
                let newUrl = "";
                for (let i = urlSplit.length-1; i >= 0; i--) {
                    const element = urlSplit[i];
                    if (element) {
                        let urlSlice = urlSplit.slice(0, i);
                        newUrl = urlSlice.join("/");
                        break;
                    }        
                }

                window.location.href = newUrl;
            </script>
        <?php }
        else { ?>

<div class="app-page-title">
    <div class="page-title-wrapper">
        <div class="page-title-heading">
            <div class="page-title-icon">
                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
            </div>
            <div>Manage Your Organisation
                <div class="page-title-subheading">Use the options below to manage your <strong>organisation</strong></div>
            </div>
        </div>
    </div>
</div>

<a href="/explore/organisations/<?= $organisationSlug ?>">
    <button class="btn btn-outline-primary mb-4">Back to <?= $organisation["organisationName"] ?></button>
</a>
<div class="row">
    <div class="col-md-6">
        <a href="/explore/organisations/<?= $organisationSlug ?>/manage/hives">
            <button class="btn btn-primary">
                Hives
            </button>
        </a>
        <a href="/explore/organisations/<?= $organisationSlug ?>/manage/members">
            <button class="btn btn-primary">
                Members
            </button>
        </a>
        <a href="/explore/organisations/<?= $organisationSlug ?>/manage/details">
            <button class="btn btn-primary">
                Details
            </button>
        </a>
    </div>
</div>

<?php } 
}

?>