<?php perch_layout('admin.header'); ?>
<div class="app-main__outer">
    <div class="app-main__inner">
    <?php
        if (!perch_member_logged_in()) { ?>
            <script>
                window.location.href="/admin/login";
            </script>
        <?php }
    ?>

    <?php member_requests() ?>


    </div>
<?php perch_layout('admin.footer'); ?>