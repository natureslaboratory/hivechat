<?php

// requires posted video id, returns response

$id = perch_get("id");

$reqString = "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&id=$id&key=" . YOUTUBE_API_KEY;

$ch = curl_init($reqString);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$res = curl_exec($ch);

echo $res;

curl_close($ch);

