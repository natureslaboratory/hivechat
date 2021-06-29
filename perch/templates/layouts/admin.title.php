
<div class="app-page-title">
    <div class="page-title-wrapper">
        <div class="page-title-heading">
        <?php if (perch_layout_var("logo", true)) { ?>
            <img class="page-title-logo" src="<?= perch_layout_var("logo", true) ?>" alt="Logo">
        <?php } else { ?>
            <div class="page-title-icon">
                <i class="pe-7s-user icon-gradient bg-mean-fruit"></i>
            </div>
        <?php } ?>
            <div>
                <?= perch_layout_var("title", true) ?>
            </div>
        </div>
    </div>
</div>