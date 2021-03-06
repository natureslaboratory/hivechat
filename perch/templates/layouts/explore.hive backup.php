<?php 
    $hive = get_hive(perch_layout_var("hiveID", true));
    $hiveJson = json_decode($hive['hiveDynamicFields'],true);
    $cell = null;
    $cellJson = null;
	echo perch_layout_var("cellID", true);
    if (perch_layout_has("cellID") || perch_layout_var("slugType")) {
        $cell = get_cell(perch_layout_has("cellID") ? perch_layout_var("cellID", true) : perch_layout_var("slugType", true));
        $cellJson = json_decode($cell['cellDynamicFields'],true);
    }else{
        $cell = get_first_cell(perch_layout_var("hiveID", true));
        $cellJson = json_decode($cell['cellDynamicFields'],true);
    }
    $organisation = get_organisation_by_slug(perch_layout_var("organisationSlug", true), ["skip-template" => true], true);

	if (!is_organisation_hive(perch_layout_var("hiveID", true), $organisation["organisationID"])) {
		?>
			<script>
				window.location.href = "/explore/organisations/<?= $organisation["organisationSlug"] ?>/"
			</script>
		<?php
	}
?>

        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-users icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div><?php echo $hive['hiveTitle']; ?>
                        <div class="page-title-subheading"><?php echo $json['introduction']['processed']; ?></div>
                    </div>
                </div>
            </div>
        </div>
        <a href="/explore/organisations/<?= $organisation["organisationSlug"] ?>">
            <button class="btn btn-outline-primary mb-4">Back to <?= $organisation["organisationName"] ?></button>
        </a>
		<div class="row">
			<div class="col-md-8 mb-4">
			<?php echo "<h1>".$cell['cellTitle']."</h1>"; ?>
			</div>
            <div class="col-md-8">
	            <?php 
		        if($cellJson['video']<>''){ ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Video - via YouTube</h5>
                        <?php echo $cellJson['video']; ?>
                    </div>
                </div>
                <?php 
	            }
	            if($cellJson['introduction']['processed']<>''){ 
	            ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Introduction</h5>
	                    <?php echo $cellJson['introduction']['processed']; ?>
                    </div>
                </div>
                <?php
	            }
	            if($cellJson['zoom']['meetingURL']<>''){ 
	            ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Zoom</h5>
	                    <a href="<?php echo $cellJson['zoom']['meetingURL']; ?>" class="btn btn-small btn-primary">Join the Zoom Meeting</a>
                    </div>
                </div>
                <?php
	            }
	            if($cellJson['chat']=='Yes'){ 
	            ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Chat</h5>
	                    <p id="name-area" style="display:none;"></p>
        
				        <div id="chat-wrap"><div id="chat-area"></div></div>
				        
				        <form id="send-message-area">
					        <div class="position-relative form-group">
					            <label>Join the Discussion</label>
					            <textarea id="sendie" maxlength='300' class="form-control"></textarea>
					        </div>
					        <div class="position-relative form-group">
					            <input type="submit" class="btn btn-small btn-primary" value="Comment" />
					        </div>
				        </form>
                    </div>
                </div>
                <?php
	            }
	            if($cellJson['documents']<>''){ 
	            ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Documents &amp; Downloads</h5>
	                    <table class="mb-0 table table-borderless">
	                        <thead>
	                        <tr>
	                            <th>Name</th>
	                            <th>Description</th>
	                            <th>Download</th>
	                        </tr>
	                        </thead>
	                        <tbody>
	                        <tr>
	                            <th scope="row">PDF File</th>
	                            <td>Contains everything you need to know for the conference</td>
	                            <td><a class="btn btn-small btn-primary text-white">Download</a></td>
	                        </tr>
	                        <tr>
	                            <th scope="row">PDF File</th>
	                            <td>Contains everything you need to know for the conference</td>
	                            <td><a class="btn btn-small btn-primary text-white">Download</a></td>
	                        </tr>
	                        <tr>
	                            <th scope="row">PDF File</th>
	                            <td>Contains everything you need to know for the conference</td>
	                            <td><a class="btn btn-small btn-primary text-white">Download</a></td>
	                        </tr>
	                        </tbody>
	                    </table>
                    </div>
                </div>
                <?php
	            }
	            ?>
            </div>
            <div class="col-md-4">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Cells</h5>
	                    <ul class="list-group">
		                    <?php hive_cells_nav(perch_layout_var('hiveID', true),perch_layout_var('cellID', true)); ?>
                        </ul>
                    </div>
                </div>
                <?php
                if($cellJson['qa']=='Yes'){ 
	            ?>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Q &amp; A</h5>
	                    <ul class="list-group mb-3">
                            <li class="list-group-item"><h5 class="list-group-item-heading">Did you do any training before attempting this?</h5><p>Asked by Tim</p></li>
                            <li class="list-group-item"><h5 class="list-group-item-heading">What was the fastest single mile you ran during this challenge?</h5><p>Asked by Sarah</p></li>
                            <li class="list-group-item"><h5 class="list-group-item-heading">Would you do it again?</h5><p>Asked by Jim</p></li>
                        </ul>
	                    <form id="send-message-area">
					        <div class="position-relative form-group">
					            <label>Got a Question?</label>
					            <textarea id="sendie" maxlength='300' class="form-control"></textarea>
					        </div>
					        <div class="position-relative form-group">
					            <input type="submit" class="btn btn-small btn-primary" value="Ask" />
					        </div>
				        </form>
                    </div>
                </div>
                <?php
	            }
	            ?>
            </div> 
        </div>
		<div id="hive"></div>