WhatWeather
=========

WhatWeather is a [jQuery](https://github.com/jquery/jquery) plugin which provides weather's data. 
It uses [worldweatheronline.com](http://www.worldweatheronline.com/) API to get, parse and deliver data in order to create weather's widgets.
WhatWeather provides data and let you manage the display. 
However, it uses [Mustach](https://github.com/janl/mustache.js). In this way, you can easely change the template of your widgets.

License
-------
You may use WhatWeather under the terms of the Creative Commons [See [LICENCE](http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode)].

[![Creative Commons logo](http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en)

What it can do
--------------
The plugin can't do any things by itself. His job is to delivers weather's data. But it gives you an easy way to develop a weather widget. It is also a ready to use by including 3 widgets.

![First widget](http://getkode.files.wordpress.com/2013/05/widget-1.png?w=170)
![Second widget](http://getkode.files.wordpress.com/2013/05/widget-2.png?w=450)
![third widget](http://getkode.files.wordpress.com/2013/05/widget-3.png?w=448)

You can get weather data from cities all over the world. The plugin uses the name of the city, geographic coordinate system, IP adresse or the HTML5 geolocation API. The plugin can also save data by using Web Storage API.


###Demo

Coming soon ...

Package content
-----------------
* js/jquery.min.2.0.0.js
* js/mustache.js
* js/whatweather.0.5.js
* css/webfonts/Climacons.ttf
* css/webfonts/climacons-webfont.eot
* css/webfonts/climacons-webfont.svg
* css/webfonts/climacons-webfont.ttf
* css/webfonts/climacons-webfont.woff
* css/webfonts/climacons-font.css
* css/style.css
* get_weather.php

Installation
-----------
First, you must have a worldweatheronline.com key API. You can have a free one at [this page](http://developer.worldweatheronline.com/member/register). A PHP file is used in order to do Ajax requests..

```php
// your private key
$yourKey  = "";
// if the geolocation or IP options are used
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
```
WhatWeather uses [Climacons font](http://adamwhitcroft.com/climacons/) to display weather's icons.
```html
<link href='css/webfont/climacons-font.css' rel='stylesheet' type='text/css'>
```
```html
<script type="text/javascript" src="js/jquery.min.2.0.0.js"></script>
<script type="text/javascript" src="js/mustache.js"></script>
<script type="text/javascript" src="js/whatweather.0.5.js"></script>
```
Usage
-----
```js
<script type="text/javascript">
    $("#container").whatWeather({city:"brussels,belgium", days:"5"});
</script>
```
Methods
-------
###before()
You can override this method in order to do something before the data's request. The method takes one argument: a jQuery element.
```js
$("#container").whatWeather({
    city: "brussels,belgium", 
    days: "5", 
    before: function(el){
        el.text("Loading ...");
    }
});
```
###after()
After the request of the weather data, this method is called. The method takes one argument: a jQuery element.
```js
$("#container").whatWeather({
    city: "brussels,belgium", 
    days: "5", 
    after: function(el){
      el.text("Data loaded !");
    }
});
```
###success()
When the Ajax request succeeded, this method is used to manipulate the data. The method takes 2 arguments: a jQuery element and JSON object which contains data weather.
```js
$("#container").whatWeather({
    city: "brussels,belgium", 
    days: "5", 
    success: function(el, data){
      el.text("Request succeeded !");
    }
});
```
###fail()
The fail method is called if the request failed.
```js
$("#container").whatWeather({
    city: "brussels,belgium", 
    days: "5", 
    fail: function(el){
      el.text("Request failed !");
    }
});
```
Options
-------
### id
this parameter is used to identify each widget. It is a facultative parameter. If it is send, it will be used for the hashmap of web storage.
```js
$("#container").whatWeather({id:"myFirstWidget",city:"brussels,belgium", days:"5"});
```
### city
This parameter contains city's name and country's name. The both are separated by a coma.
### latitude
If for any reason you want to specify geographic coordinates. You can use the latitude and longitude.
### longitude
It is used with latitude parameter.
### ip
You can use the IP address to get the city's weather of the visitor. Default value is false.
### geolocation.
You can also use the geolocation API of HTML5. Default value is false.
### days
Number of days of forecast. Default value is 1 and the maximum is 5.
### async
This parameter indicates if the request will be asynchronous. Default value is true.
### refresh
The refresh parameter is used if you want to save data and don't send a request every page refresh. The value represent a second. Default value 600 (10 min).
### cssClass
This is used for the defaults templates. You can specify a CSS class to change the design of the template. Default value is "widget-1".
###Regional options
This options are used to translate the UI.
#### typeTemp
You can get the temperature in degrees Celsius or Fahrenheit. Default value is "C".
#### day
Default value is "Day".
#### max
Default value is "Max".
#### min
Default value is "Min".
#### msgError
Default value is "Loading error".
### weekDays
Default value is ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].
### months
Default value is ["January","February","March","April","May","June","July","August","September","October","November","December"].
### dateFormat
Date format, default value is "{{d}}/{{m}}/{{Y}}".
### updateDateFormat
Date format of the update data. Default value is "{{l}} {{M}} {{j}}, {{Y}}".
### template
You can select which default template to use. Default value is 0.

More documentation coming soon ... Stay tune ;-)