<?php
echo "Logging out"; 
perch_member_log_out();

?>
<?php 

echo "http://$_SERVER[HTTP_HOST]";

header("location:http://$_SERVER[HTTP_HOST]/admin"); 

?>