<?php
/*
 * WhatWeather 1.2, jQuery plugin
 *
 * Copyright(c) 2013, Salman Amakran
 * http://getkode.be/whatweather/
 *
 * WhatWeather provides weather's data and let you manage the display
 *
 * You may use WhatWeather under the terms of the GNU GPL licence
 * http://www.gnu.org/licenses/gpl-3.0.en.html
 */
// your private key
$yourKey  = "";
// if the geolocation or IP options
$location = isset($_GET["latitude"]) && isset($_GET["longitude"]) && $_GET["latitude"] && $_GET["longitude"] ?
				 $_GET["latitude"].",".$_GET["longitude"] : $_GET["city"];
$location = isset($_GET["ip"]) && $_GET["ip"] == "true" ? $_SERVER["SERVER_ADDR"] : $location;
// Caching of data
$filename = "whatweather-". trim(base64_encode($location)) .".txt";

if ($_GET["cache"] ==  "true" && $_GET["refresh"] > 0 && file_exists($filename) && (time() < filemtime($filename) + $_GET["refresh"])) {
	$data = file_get_contents($filename);

} else {
	$data = file_get_contents("http://free.worldweatheronline.com/feed/weather.ashx?"
						."q=". $location ."&"
						."format=json&"
						."num_of_days=". $_GET["days"] ."&"
						."includeLocation=yes&"
						.'extra=localObsTime&'
						."key=". $yourKey);
	file_put_contents($filename, $data);
}
// echo the result
echo $data
?>