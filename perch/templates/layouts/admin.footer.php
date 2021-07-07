	<div class="app-wrapper-footer">
                    <div class="app-footer">
                        <div class="app-footer__inner">
                            <div class="app-footer-left">
                                <ul class="nav">
	                                <?php if(perch_member_logged_in()){?>
                                    <li class="nav-item">
                                        <a href="/admin/logout" class="nav-link">
                                            Logout
                                        </a>
                                    </li>
                                    <?php } ?>
                                    <li class="nav-item">
                                        <a href="/" class="nav-link">
                                            Back to Website                                        
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="app-footer-right">
                                <ul class="nav">
                                    <li class="nav-item">
                                        <a href="/about" class="nav-link">
                                            About
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/terms-and-conditions">Terms and Conditions</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/privacy-policy">Privacy Policy</a>
                                    </li>   
                                    <li class="nav-item">
                                        <a href="https://natureslaboratory.co.uk" target="_blank" class="nav-link">
                                            Built by Nature&rsquo;s Laboratory
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>    </div>
            <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
        </div>
    </div>
<script type="text/javascript" src="/src/assets/scripts/main.js"></script>
<script src="/src/assets/scripts/fitvids.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/react-rte@0.16.3/dist/react-rte.min.js"></script> -->
<script src="/js/index.js"></script>

<script src="/redactor/redactor.js"></script>
<script>
  $(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $("body").fitVids();
  });
</script>
<script type="text/javascript" src="/src/assets/scripts/chat.js"></script>
    <script type="text/javascript">
    
        // ask user for name with popup prompt    
        var name = '<?php echo perch_member_get('first_name'); ?> <?php echo perch_member_get('last_name'); ?>';
        
        // display name on page
    	$("#name-area").html("You are: <span>" + name + "</span>");
    	
    	// strip tags
    	name = name.replace(/(<([^>]+)>)/ig,"");
    	
    	// kick off chat
        var chat =  new Chat();
    	$(function() {
    	
    		 chat.getState(); 
    		 
    		 // watch textarea for key presses
             $("#sendie").keydown(function(event) {  
             
                 var key = event.which;  
           
                 //all keys including return.  
                 if (key >= 33) {
                   
                     var maxLength = $(this).attr("maxlength");  
                     var length = this.value.length;  
                     
                     // don't allow new content if length is maxed out
                     if (length >= maxLength) {  
                         event.preventDefault();  
                     }  
                  }  
    		 																																																});
    		 // watch textarea for release of key press
    		 $('#sendie').keyup(function(e) {	
    		 					 
    			  if (e.keyCode == 13) { 
    			  
                    var text = $(this).val();
    				var maxLength = $(this).attr("maxlength");  
                    var length = text.length; 
                     
                    // send 
                    if (length <= maxLength + 1) { 
                     
    			        chat.send(text, name);	
    			        $(this).val("");
    			        
                    } else {
                    
    					$(this).val(text.substring(0, maxLength));
    					
    				}	
    				
    				
    			  }
             });
            
    	});
    </script>
    <script src="https://kit.fontawesome.com/6b035dc64a.js" crossorigin="anonymous"></script>
</body>
</html>