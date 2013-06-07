/*
 * WhatWeather 1.0, jQuery plugin
 *
 * Copyright(c) 2013, Salman Amakran
 * http://getkode.be/whatweather/
 *
 * WhatWeather provides weather's data and let you manage the display
 *
 * You may use WhatWeather under the terms of the GNU GPL licence
 * http://www.gnu.org/licenses/gpl-3.0.en.html
 */
(function($){
    $.fn.extend({
        whatWeather: function (settings) {
            var $this = $(this);
            
            function WhatWeather(settings){
                // unique id
                var uuid     = new Date().getTime();
                //get the current dir
                var uri      = window.location.protocol+'//'+window.location.host;
                var pathname = window.location.pathname != "/" ? window.location.pathname.split("/") : [], dir = "";

                for (var i = 1; i < pathname.length -1; i++) {
                    dir += "/"+ pathname[i]; 
                }
                uri = uri + dir;
                // default settings    
                var options = {
                    uuid: uuid,
                    uri: uri,
                    id: "",
                    city: "",
                    days: 1,
                    latitude: 0,
                    longitude: 0,
                    ip: false,
                    geolocation: false,
                    async: true,
                    refresh: 600,
                    dayAndNight: true,
                    cssClass: "widget-1",
                    typeTemp: "C",
                    day: "Date",
                    max: "Max",
                    min: "Min",
                    msgError: "Loading error",
                    weekDays: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
                    dateFormat: "{{dd}}/{{mm}}/{{yy}}",
                    updateDateFormat: "{{DD}} {{M}} {{d}}, {{yy}}",
                    template: 0,
                    templates: ['<div class="{{cssClass}}">\
                         <div class="current">\
                            <p>\
                             <span class="temperature">{{currentCondition.temp}}°<sup>{{typeTemp}}</sup></span>\
                             <span class="climacon {{currentWeatherIcon}} pic"></span>\
                             <span class="location">{{city}}, {{country}}</span>\
                            </p>\
                         </div>\
                         <div class="next-days" style="display:none">\
                            <p>\
                             <span class="day">{{day}}</span>\
                             <span class="temp-max">{{max}}</span>\
                             <span class="temp-min">{{min}}</span>\
                             <span class="temp-pic"></span>\
                            </p>\
                            {{#nextDays}}\
                            <p>\
                             <span class="day">{{date}}</span>\
                             <span class="temp-max">{{tempMax}}°</span>\
                             <span class="temp-min">{{tempMin}}°</span>\
                             <span class="climacon {{dayWeatherIcon}} temp-pic"></span>\
                            </p>\
                            {{/nextDays}}\
                         </div>\
                        </div>',
                        '<div class="{{cssClass}}">\
                         <div class="current">\
                            <p>\
                             <span class="temperature">{{currentCondition.temp}}°<sup>{{typeTemp}}</sup></span>\
                             <span class="climacon {{currentWeatherIcon}} pic"></span>\
                             <span class="location">{{city}}, {{country}}</span>\
                            </p>\
                         </div>\
                        </div>',
                        '<div class="{{cssClass}}">\
                         <div class="current">\
                            <p>\
                             <span class="climacon {{currentWeatherIcon}} pic"></span>\
                            </p>\
                            <p>\
                             <span class="temperature">{{currentCondition.temp}}°<sup>{{typeTemp}}</sup></span>\
                             <span class="location">{{city}}</span>\
                            </p>\
                         </div>\
                        </div>'],
                    icons: {
                        day: {
                            'w-395':'flurries sun',
                            'w-392':'lightning sun',
                            'w-389':'lightning',
                            'w-386':'lightning sun',
                            'w-377':'hail',
                            'w-374':'hail sun',
                            'w-371':'fleurries sun',
                            'w-368':'snow sun',
                            'w-365':'sleet sun',
                            'w-362':'sleet sun',
                            'w-359':'downpour',
                            'w-356':'downpour sun',
                            'w-353':'showers sun',
                            'w-350':'hail',
                            'w-338':'fleurries',
                            'w-335':'fleurries sun',
                            'w-332':'fleurries',
                            'w-329':'fleurries',
                            'w-326':'snow sun',
                            'w-323':'snow sun',
                            'w-320':'snow',
                            'w-317':'hail',
                            'w-314':'hail',
                            'w-311':'hail',
                            'w-308':'rain',
                            'w-305':'rain sun',
                            'w-302':'rain',
                            'w-299':'rain sun',
                            'w-296':'drizzle sun',
                            'w-293':'drizzle',
                            'w-284':'hail',
                            'w-281':'hail',
                            'w-266':'drizzle',
                            'w-263':'drizzle sun',
                            'w-260':'flog sun',
                            'w-248':'flog sun',
                            'w-230':'snowflake',
                            'w-227':'snow',
                            'w-200':'lightning sun',
                            'w-185':'hail',
                            'w-182':'hail',
                            'w-179':'sleet sun',
                            'w-176':'drizzle sun',
                            'w-143':'haze sun',
                            'w-122':'cloud',
                            'w-119':'cloud',
                            'w-116':'cloud sun',
                            'w-113':'sun'
                        },
                        night: {
                            'w-395':'fleurries moon',
                            'w-392':'lightning moon',
                            'w-389':'lightning',
                            'w-386':'lightning moon',
                            'w-377':'hail',
                            'w-374':'hail moon',
                            'w-371':'fleurries moon',
                            'w-368':'snow moon',
                            'w-365':'sleet moon',
                            'w-362':'sleet moon',
                            'w-359':'downpour',
                            'w-356':'downpour moon',
                            'w-353':'showers moon',
                            'w-350':'hail',
                            'w-338':'fleurries',
                            'w-335':'fleurries moon',
                            'w-332':'fleurries',
                            'w-329':'fleurries',
                            'w-326':'snow moon',
                            'w-323':'snow moon',
                            'w-320':'snow',
                            'w-317':'hail',
                            'w-314':'hail',
                            'w-311':'hail',
                            'w-308':'rain',
                            'w-305':'rain moon',
                            'w-302':'rain',
                            'w-299':'rain moon',
                            'w-296':'drizzle moon',
                            'w-293':'drizzle',
                            'w-284':'hail',
                            'w-281':'hail',
                            'w-266':'drizzle',
                            'w-263':'drizzle moon',
                            'w-260':'flog moon',
                            'w-248':'flog moon',
                            'w-230':'snowflake',
                            'w-227':'snow',
                            'w-200':'lightning moon',
                            'w-185':'hail',
                            'w-182':'hail',
                            'w-179':'sleet moon',
                            'w-176':'drizzle moon',
                            'w-143':'haze moon',
                            'w-122':'cloud',
                            'w-119':'cloud',
                            'w-116':'cloud moon',
                            'w-113':'moon'
                        }
                    },
                    before: function(el, options){
                        el.html('<div class="loading"></div>');
                    },
                    after: function(el, options){
                        if ($(".next-days", el).length) {
                            $(".next-days", el).delay(500).toggle("fast");
                        }
                    },
                    success: function(el, data, options){
                        data.data.current_condition[0].temp = options.typeTemp.toLowerCase() == "c"  ? 
                                                                    data.data.current_condition[0].temp_C :
                                                                    data.data.current_condition[0].temp_F;
                        data.data.current_condition[0].dayOrNight = "day";

                        if (options.dayAndNight) {                                            
                            data.data.current_condition[0].dayOrNight = isDay(data.data.current_condition[0].localObsDateTime) ? "day" : "night";
                        }
                        data.data.current_condition[0].localObsDateTime = Mustache.render(options.updateDateFormat, 
                                                                                getUpdateDate(data.data.current_condition[0].localObsDateTime));
                        
                        var icons = options.icons.day;

                        for (var i = 0; i < data.data.weather.length; i++) {
                            data.data.weather[i].dayWeatherIcon = icons["w-"+data.data.weather[i].weatherCode];
                            data.data.weather[i].dayWeatherPic = data.data.weather[i].weatherCode;
                            data.data.weather[i].date = Mustache.render(options.dateFormat, getDate(data.data.weather[i].date));
                            data.data.weather[i].tempMin = options.typeTemp.toLowerCase() == "c"  ? 
                                                                data.data.weather[i].tempMinC :
                                                                data.data.weather[i].tempMinF;
                            data.data.weather[i].tempMax = options.typeTemp.toLowerCase() == "c"  ? 
                                                                data.data.weather[i].tempMaxC :
                                                                data.data.weather[i].tempMaxF
                        }
                        var weather = {
                            "day": options.day,
                            "max": options.max,
                            "min": options.min,
                            "cssClass": options.cssClass,
                            "typeTemp": options.typeTemp,
                            "currentCondition": data.data.current_condition[0],
                            "currentWeatherIcon":   data.data.current_condition[0].dayOrNight == "night" ?
                                                        options.icons.night["w-"+data.data.current_condition[0].weatherCode] :
                                                        options.icons.day["w-"+data.data.current_condition[0].weatherCode],
                            "city": data.data.nearest_area[0].areaName[0].value,
                            "country": data.data.nearest_area[0].country[0].value,
                            "nextDays": (options.days > 0 ? data.data.weather : null),
                            "options": options
                        };
                        if (window.localStorage && options.refresh > 0) {
                            localStorage.setItem(options.id ? options.id : options.city, JSON.stringify(weather));
                            localStorage.setItem((options.id ? options.id : options.city)+"-time", new Date().getTime() + (options.refresh * 1000));
                        }
                        displayWather(el, weather);
                    },
                    fail: function(el, options){
                        el.html('<div class="error"><span>'+options.msgError+'</span></div>');
                    }
                };
                // The function getWeather excute an Ajax request to get weather data
                var getWeather = function(){
                    var el          = $(Mustache.render(options.templates[options.template], options));
                    var needRefresh = window.localStorage && options.refresh > 0 ? 
                                        (new Date().getTime() > window.localStorage.getItem((options.id ? options.id : options.city)+"-time") ? true : false) 
                                        : true;
                   
                    $this.append(el);

                    if (needRefresh) {
                        $.ajax({
                            url : options.uri +'/get_weather.php',
                            type: 'GET',
                            data: {
                                city: options.city.replace(" ", "+"),
                                days: options.days,
                                latitude: options.latitude,
                                longitude: options.longitude,
                                ip: options.ip,
                                uuid: uuid
                            },
                            dataType: 'json',
                            async: options.async,
                            beforeSend : options.before(el, options)
                        }).done(function(response){
                            if (response.data.error) {
                                options.msgError = response.data.error[0].msg;
                                
                                options.fail(el, options);
                            } else {
                                options.success(el, response, options);
                            }
                        }).fail(function(options) {
                            options.fail(el, options);
                        });
                    } else {
                        displayWather(el, JSON.parse(window.localStorage.getItem(options.id ? options.id : options.city)));
                    }
                };
                /** 
                 * This function display the weather
                 * @param el a jQuey object
                 * @param weather a JSON object contains the weather data
                 */
                var displayWather =  function(el, weather) {
                    tmp = $(Mustache.render(options.templates[options.template], weather));

                    el.replaceWith(tmp);
                    options.after(tmp, options);
                };
                /** 
                 * The getLocation function si called by the Geolocation API
                 * @param postion is a Geolocation object
                 */                                
                var getLocation = function (position) {
                    options.latitude  = position.coords.latitude;
                    options.longitude = position.coords.longitude;
                    
                    getWeather();
                };
                /**
                 * This function is called if the geolocation fail
                 * @param error contains the error's message
                 */                                
                var errorGetLocation = function (error) {
                    var info = "Error during the geolocation : ";

                    switch(error.code) {
                        case error.TIMEOUT:
                            info += "Timeout !";
                        break;
                        case error.PERMISSION_DENIED:
                            info += "You have not given permission";
                        break;
                        case error.POSITION_UNAVAILABLE:
                            info += "The position could not be determined";
                        break;
                        case error.UNKNOWN_ERROR:
                            info += "Unknown error";
                        break;
                    }
                    // in this case, the IP option is activated.
                    options.ip = true;
                    
                    getWeather();
                };
                /**
                 * getDate function get a date and parses it
                 * @param date a string 
                 * @return a JSON object
                 */                                
                var getDate = function (date) {
                    var d = new Date(date);
                    // parse date
                    if (date) {
                        tmp = date.split(/[^0-9]/);
                        
                        for (var i = 0; i < 5; i++) {
                            tmp[i] = tmp[i] != undefined ? tmp[i] : "00";
                        }
                        d = new Date(tmp[0],tmp[1]-1,tmp[2],tmp[3],tmp[4]);
                    }
                    parse = {
                        "a": ""+ (d.getHours() > 12 ? "pm" : "am"),
                        "A": ""+ (d.getHours() > 12 ? "PM" : "AM"),
                        "g": ""+ (d.getHours() > 12 ? d.getHours()-12 : d.getHours()),
                        "gg": ""+ (d.getHours() < 10 ? "0"+ d.getHours() : (d.getHours() > 12 ? d.getHours()-12 : d.getHours())),
                        "h": ""+ (d.getHours()),
                        "hh": ""+ (d.getHours() < 10 ? "0"+ d.getHours() : d.getHours()),
                        "i": ""+ (d.getMinutes()), 
                        "ii": ""+ (d.getMinutes() < 10 ? "0"+ d.getMinutes() : d.getMinutes()), 
                        "s": ""+ (d.getSeconds()),
                        "ss": ""+ (d.getSeconds() < 10 ? "0"+ d.getSeconds() : d.getSeconds()),
                        "d": ""+ (d.getDate()), 
                        "dd": ""+ (d.getDate() < 10 ? "0"+ d.getDate() : d.getDate()),
                        "m": ""+ (d.getMonth()+1),
                        "mm": ""+ (d.getMonth() < 9 ? "0"+ (d.getMonth()+1) : d.getMonth()+1),
                        "y": ""+ (d.getYear()-100),
                        "yy": ""+ (d.getFullYear()),
                        "DD": options.weekDays[d.getDay()],
                        "D": options.weekDays[d.getDay()].substring(0,3),
                        "MM": options.months[d.getMonth()],
                        "M": options.months[d.getMonth()].substring(0,3)
                    };
                    return parse;
                };
                /**
                 * getUpdateDate get te update date and parses it
                 * @param date a string
                 */                                
                var getUpdateDate = function(date){
                    var tmp  = date.split(" ");
                    var time = tmp[1].split(":");

                    if (tmp[2] == "PM") {
                        time[0] = time[0] == 12 ? time[0] : parseInt(time[0]) + 12;
                    } 
                    return getDate(tmp[0]+"T"+time.join(":"));
                };
                /**
                 * This function tests if the current time is day
                 * @param time a string
                 * @return true or false
                 */
                var isDay = function(time){
                    var tmp  = time.split(" ");
                    var time = tmp[1].split(":"); 
                    
                    if ((tmp[2].indexOf("AM") != -1 && parseInt(time[0]) > 5) || (tmp[2].indexOf("PM") != -1 && parseInt(time[0]) < 8)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                /**
                 * setDefaults function set the default settings
                 * @param settings JSON object
                 */                                
                var setDefaults = function(settings) {
                    $.extend(options, settings);
                    return this;
                };
                // set dafault settings
                setDefaults(settings || {});
                
                if (navigator.geolocation && options.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){getLocation(position)}, function(error){errorGetLocation(error)});
                } else {
                    getWeather();
                }
            };
            // initialisation 
            return this.each(function() { 
                new WhatWeather(settings);
                return this;
            });
        }        
    });
})(jQuery);