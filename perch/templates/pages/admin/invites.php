<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">
    <?php
        if (!perch_member_logged_in()) { ?>
            <script>
                window.location.href="/admin/register?r=invite";
            </script>
        <?php }
    ?>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
                </div>
                Invites
            </div>
        </div>
    </div>

    <?php 
    $inviteID = perch_get("inviteID");
    if ($inviteID) {
        if (has_invite($inviteID)) {
            perch_layout("admin.back", [
                "href" => "/admin/invites",
                "label" => "Back to invites"
            ]);
            ?>
            <div class="row">
                <div class="col-md-6" style="margin: 0 auto">
                    <?php get_invite($inviteID); ?>
                </div>
            </div>
            <?php
        } else { ?>
            <script>
                window.location.href = "/admin/invites";
            </script>
        <?php }
    } else {
        get_invites(perch_member_get("email"));
    }

    ?>

    </div>
<?php perch_layout('admin.footer'); ?>