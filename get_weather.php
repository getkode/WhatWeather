<?php
// your private key
$yourKey  = "";
// if the geolocation or IP options
$location = isset($_POST["latitude"]) && isset($_POST["longitude"]) && $_POST["latitude"] && $_POST["longitude"] ?
				 $_POST["latitude"].",".$_POST["longitude"] : $_POST["city"];
$location = isset($_POST["ip"]) && $_POST["ip"] == "true" ? $_SERVER["SERVER_ADDR"] : $location;
// echo the result
echo file_get_contents("http://free.worldweatheronline.com/feed/weather.ashx?"
						."q=". $location ."&"
						."format=json&"
						."num_of_days=". $_POST["days"] ."&"
						."includeLocation=yes&"
						.'extra=localObsTime&'
						."key=". $yourKey);
?>