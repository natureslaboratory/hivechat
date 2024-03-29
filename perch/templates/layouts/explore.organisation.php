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
$manage = perch_layout_var("manage", true);
$manageOptions = [
    "manage", 
    "join",
    "leave"
];
$isValidOption = false;
foreach ($manageOptions as $option) {
    if (perch_layout_var("manage", true) == $option) {
        $isValidOption = true;
    }
}

if (!$isValidOption && $manage) { ?>
    <script>
        // window.location.href = "/explore/organisations/<?= $organisation["organisationSlug"] ?>";
    </script>
<?php }

if (perch_layout_var("manage", true) == "manage" && $isAdmin) {
    perch_layout("explore_organisation/explore.organisation.manage", perch_layout_var("parameters", true));
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
                    <br>
                    <?php perch_layout("explore_organisation/explore.organisation.socials", ["organisationSlug" => $organisation["organisationSlug"]]); ?>
                </div>
            </div>
            <div class="page-title-actions">
                <div class="d-inline-block dropdown">
                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                        <span class="btn-icon-wrapper pr-2 opacity-7">
                            <i class="fa fa-business-time fa-w-20"></i>
                        </span>
                        Options
                    </button>
                    <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(109px, 33px, 0px);">
                        <ul class="nav flex-column">
                            <?php
                            $memberID = perch_member_get("id");
                            $isMember = is_organisation_member($memberID, $organisation["organisationID"]);
                            $isAdmin = is_admin($organisation["organisationID"], $memberID);
                            if ($isMember || $isAdmin) {
                            ?>
                                <li class="nav-item">
                                    <a href="/explore/organisations/<?= $organisation["organisationSlug"] ?>/member-details" class="nav-link">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Edit Your Details
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="/explore/organisations/<?= $organisation["organisationSlug"] ?>/contact-list" class="nav-link">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Contact List
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="/explore/organisations/<?= $organisation["organisationSlug"] ?>/leave" class="nav-link">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Leave Organisation
                                        </span>
                                    </a>
                                </li>
                            <?php } else { ?>
                                <li class="nav-item">
                                    <!-- Redirects to form which creates join request -->
                                    <a <?= has_request($organisation["organisationID"]) ? "disabled" : null ?> href="/explore/organisations/<?= $organisation["organisationSlug"] ?>/join" class="nav-link <?= has_request($organisation["organisationID"]) ? "disabled" : null ?>">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Request To Join
                                        </span>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
        if (perch_layout_var("manage", true) == "join") {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisation[organisationSlug]/",
                "label" => "Back to $organisation[organisationName]"
            ]);
            if (!perch_member_logged_in()) {
                ?> 
                    <script>
                        window.location.href = `/admin/register/?r=${window.location.href}`;
                    </script>
                <?php
            }
            create_request($organisation["organisationID"]);
        } else if ($manage == "leave") {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisation[organisationSlug]/",
                "label" => "Back to $organisation[organisationName]"
            ]);
            leave_organisation($organisation["organisationID"]);
        } else if ($manage == "member-details") {
            perch_layout("admin.back", [
                "href" => "/explore/organisations/$organisation[organisationSlug]/",
                "label" => "Back to $organisation[organisationName]"
            ]);
            ?>
            <div class="row">
                <div class="col-md-6">
                    <?php update_organisation_member_details($organisation["organisationID"]); ?>
                </div>
            </div>

            <?php
        } else if ($manage == "contact-list") {
            if ($isMember || $isAdmin) {
                perch_layout("admin.back", [
                    "href" => "/explore/organisations/$organisation[organisationSlug]/",
                    "label" => "Back to $organisation[organisationName]"
                ]);
                organisation_contact_list($organisation["organisationID"]);
            } else { ?>
                <script>
                    window.location.href = "/explore/organisations/<?= $organisation["organisationSlug"] ?>"
                </script>
            <?php }
        } else {
    ?>
    <div style="display: flex; justify-content: space-between">
        <a href="/explore/organisations/">
            <button class="c-button--back iframe-hide btn btn-outline-primary mb-4">Back to Organisations</button>
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
                    <?= nl2br($organisation["organisationDesc"]) ?>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div id='hives' data-orgid=<?= $organisation["organisationID"] ?>></div>
        </div>
    </div>
<?php
        }
}

?>

<script>
</script>