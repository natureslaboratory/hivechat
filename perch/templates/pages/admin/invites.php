<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">

    <?php get_invites(perch_member_get("email")) ?>


    </div>
<?php perch_layout('admin.footer'); ?>