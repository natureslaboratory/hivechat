<?php

$organisationSlug = perch_layout_var("organisationSlug", true);
$organisation = get_organisation_by_slug($organisationSlug, ["skip-template" => true], true);

?>

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

<a href="/admin/organisations/">
    <button class="btn btn-outline-primary mb-4">Back to Organisations</button>
</a>
<div class="row">
    <div class="col-md-6">
        <a href="/admin/organisations/<?= $organisationSlug ?>/hives">
            <button class="btn btn-primary">
                Hives
            </button>
        </a>
        <a href="/admin/organisations/<?= $organisationSlug ?>/members">
            <button class="btn btn-primary">
                Members
            </button>
        </a>
        <a href="/admin/organisations/<?= $organisationSlug ?>/details">
            <button class="btn btn-primary">
                Details
            </button>
        </a>
    </div>
</div>