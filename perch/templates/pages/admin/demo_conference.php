<?php perch_layout('admin.header'); ?>   
<?php

?>
<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-users icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>Demo Conference Page Layout
                        <div class="page-title-subheading">This is how a <strong>hivechat</strong> conference page might look</div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-8">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Video - via YouTube</h5>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/EvT5XS7j-Dc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Introduction</h5>
	                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum at velit id viverra. Mauris condimentum ante et suscipit ullamcorper. In nunc ante, accumsan non vestibulum vitae, euismod et nisl. Vivamus condimentum porta lectus vehicula imperdiet. Maecenas imperdiet fringilla libero. Fusce lacinia leo eget augue interdum mollis. Nulla facilisi. Duis sit amet placerat lectus.</p>
                    </div>
                </div>
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Zoom</h5>
	                    <a href="#" class="btn btn-small btn-primary">Join the Zoom Meeting</a>
                    </div>
                </div>
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
            </div>
            <div class="col-md-4">
                <div class="main-card mb-3 card">
                    <div class="card-body">
	                    <h5 class="card-title">Schedule</h5>
	                    <ul class="list-group">
                            <li class="active list-group-item"><h5 class="list-group-item-heading">10:00 - A Mile an Hour</h5>
                                <p class="list-group-item-text">Running a different kind of marathon</p></li>
                            <li class="list-group-item"><h5 class="list-group-item-heading">11:00 - Another Video</h5>
                                <p class="list-group-item-text">Another video description</p><a href="#" class="btn btn-small btn-primary">Join</a></li>
                            <li class="list-group-item"><h5 class="list-group-item-heading">12:00 - Live Chat with Someone</h5>
                                <p class="list-group-item-text">Finishing with a live chat via Zoom</p><a href="#" class="btn btn-small btn-primary">Join</a></li>
                        </ul>
                    </div>
                </div>
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
            </div>
		</div>
    </div>           
<?php    

?>
<?php perch_layout('admin.footer'); ?>