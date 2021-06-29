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
        perch_layout("explore_organisation/explore.organisation.manage.hives", $opts);
        break;
    case "members":
        perch_layout("explore_organisation/explore.organisation.manage.members", $opts);
        break;
    case "details":
        perch_layout("explore_organisation/explore.organisation.manage.details", $opts);
        break;
    default:
        if (perch_layout_var("type", true)) { ?>
            <script>
                let urlSplit = window.location.href.split("/");
                let newUrl = "";
                for (let i = urlSplit.length - 1; i >= 0; i--) {
                    const element = urlSplit[i];
                    if (element) {
                        let urlSlice = urlSplit.slice(0, i);
                        newUrl = urlSlice.join("/");
                        break;
                    }
                }

                window.location.href = newUrl;
            </script>
        <?php } else { ?>

            <?php perch_layout("admin.title", ["title" => "Manage your organisation", "logo" => $organisation["organisationLogo"]]); ?>

            <a href="/explore/organisations/<?= $organisationSlug ?>">
                <button class="btn btn-outline-primary mb-4">Back to <?= $organisation["organisationName"] ?></button>
            </a>
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Hives
                        </div>
                        <div class="card-body">
                            <p>
                                Keep track of all your organisations hives.
                            </p>
                            <a href="/explore/organisations/<?= $organisationSlug ?>/manage/hives">
                                <button class="btn btn-primary">
                                    Manage
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Members
                        </div>
                        <div class="card-body">
                            <p>
                                View and manage all members.
                            </p>
                            <a href="/explore/organisations/<?= $organisationSlug ?>/manage/members">
                                <button class="btn btn-primary">
                                    Manage
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-header">
                            Details
                        </div>
                        <div class="card-body">
                            <p>
                                Edit your organisation name, description, logo, social media, and more.
                            </p>
                            <a href="/explore/organisations/<?= $organisationSlug ?>/manage/details">
                                <button class="btn btn-primary">
                                    Manage
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

<?php }
}

?>