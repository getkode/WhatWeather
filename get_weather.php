<?php
ini_set('allow_url_fopen', true);
// your private key
$yourKey  = "";
// if the geolocation or IP options
$location = isset($_GET["latitude"]) && isset($_GET["longitude"]) && $_GET["latitude"] && $_GET["longitude"] ?
				  $_GET["latitude"].",".$_GET["longitude"] : $_GET["city"];
$location = isset($_GET["ip"]) && $_GET["ip"] == "true" ? $_SERVER["REMOTE_ADDR"] : $location;
// echo the result
echo file_get_contents("http://free.worldweatheronline.com/feed/weather.ashx?"
						."q=". $location ."&"
						."format=json&"
						."num_of_days=". $_GET["days"] ."&"
						."includeLocation=yes&"
						.'extra=localObsTime&'
						."key=". $yourKey);
?>