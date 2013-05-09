/*
 * WhatWeather 0.5, jQuery plugin
 *
 * Copyright(c) 2013, Salman Amakran
 * http://www.position-absolute.com
 *
 * WhatWeather provides weather's data and let you manage the display
 *
 * You may use WhatWeather under the terms of the Creative Commons BY-NC-SA
 * http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode.
 */
(function($){
    $.fn.extend({
        whatWeather: function (settings) {
            var $this = $(this);
            
            function WhatWeather(settings){
                // unique id
                var uuid = new Date().getTime();
                // default settings    
                var options = {
                    id: "",
                    city: "",
                    days: 1,
                    latitude: 0,
                    longitude: 0,
                    ip: false,
                    async: true,
                    refresh: 600,
                    geolocation: false,
                    cssClass: "widget-1",
                    typeTemp: "C",
                    day: "Date",
                    max: "Max",
                    min: "Min",
                    msgError: "Loading error",
                    weekDays: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
                    dateFormat: "{{d}}/{{m}}/{{Y}}",
                    updateDateFormat: "{{l}} {{M}} {{j}}, {{Y}}",
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
                    before: function(el){
                        //do something
                        el.html('<div class="loading"></div>');
                    },
                    after: function(el){
                        // do something
                        if ($(".next-days", el).length) {
                            $(".next-days", el).delay(500).toggle("fast");
                        }
                    },
                    success: function(el, response){
                        response.data.current_condition[0].temp = options.typeTemp.toLowerCase() == "c"  ? 
                                                                    response.data.current_condition[0].temp_C :
                                                                    response.data.current_condition[0].temp_F;
                        response.data.current_condition[0].dayOrNight = response.data.current_condition[0].localObsDateTime.indexOf("PM") != -1 ? "night" : "day";
                        response.data.current_condition[0].localObsDateTime = Mustache.render(options.updateDateFormat, 
                                                                                getUpdateDate(response.data.current_condition[0].localObsDateTime));
                        
                        var icons = options.icons.day;

                        if (response.data.current_condition[0].dayOrNight == "night") {
                            icons = options.icons.night
                        }
                        for (var i = 0; i < response.data.weather.length; i++) {
                            response.data.weather[i].dayWeatherIcon = icons["w-"+response.data.weather[i].weatherCode];
                            response.data.weather[i].dayWeatherPic = response.data.weather[i].weatherCode;
                            response.data.weather[i].date = Mustache.render(options.dateFormat, getDate(response.data.weather[i].date));
                            response.data.weather[i].tempMin = options.typeTemp.toLowerCase() == "c"  ? 
                                                                response.data.weather[i].tempMinC :
                                                                response.data.weather[i].tempMinF;
                            response.data.weather[i].tempMax = options.typeTemp.toLowerCase() == "c"  ? 
                                                                response.data.weather[i].tempMaxC :
                                                                response.data.weather[i].tempMaxF
                        }
                        var weather = {
                            "day": options.day,
                            "max": options.max,
                            "min": options.min,
                            "cssClass": options.cssClass,
                            "typeTemp": options.typeTemp,
                            "currentCondition": response.data.current_condition[0],
                            "currentWeatherIcon":   response.data.current_condition[0].dayOrNight == "night" ?
                                                        options.icons.night["w-"+response.data.current_condition[0].weatherCode] :
                                                        options.icons.day["w-"+response.data.current_condition[0].weatherCode],
                            "city": response.data.nearest_area[0].areaName[0].value,
                            "country": response.data.nearest_area[0].country[0].value,
                            "nextDays": (options.days > 0 ? response.data.weather : null)
                        };
                        if (window.localStorage && options.refresh > 0) {
                            localStorage.setItem(options.id ? options.id : options.city, JSON.stringify(weather));
                            localStorage.setItem((options.id ? options.id : options.city)+"-time", new Date().getTime() + (options.refresh * 1000));
                        }
                        //console.log(options.id+": refreh");
                        displayWather(el, weather);
                    },
                    fail: function(el){
                        // do something
                        el.html('<div class="error"><span>'+options.msgError+'</span></div>');
                    }
                };
                /**
                  *
                  *
                  */                                
                var getWeather = function(){
                    var el          = $(Mustache.render(options.templates[options.template], options));
                    var needRefresh = window.localStorage && options.refresh > 0 ? 
                                        (new Date().getTime() > window.localStorage.getItem((options.id ? options.id : options.city)+"-time") ? true : false) 
                                        : true;
                   
                    $this.append(el);

                    if (needRefresh) {
                        $.ajax({
                            url : 'get_weather.php',
                            type: 'POST',
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
                            beforeSend : options.before(el)
                        }).done(function(response){
                            if (response.data.error) {
                                options.msgError = response.data.error[0].msg;

                                options.fail(el);
                            } else {
                                options.success(el, response);
                            }
                        }).fail(function() {
                            options.fail(el);
                        });;
                    } else {
                        //console.log(options.id+": stored");
                        displayWather(el, JSON.parse(window.localStorage.getItem(options.id ? options.id : options.city)));
                    }
                };
                /**
                  *
                  *
                  */                                
                var displayWather =  function(el, weather) {
                    tmp = $(Mustache.render(options.templates[options.template], weather));

                    el.replaceWith(tmp);
                    options.after(tmp);
                };
                /**
                  *
                  *
                  */                                
                var getLocation = function (position) {
                    options.latitude  = position.coords.latitude;
                    options.longitude = position.coords.longitude;
                    
                    getWeather();
                };
                /**
                  *
                  *
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
                  *
                  *
                  */                                
                var getDate = function (date) {
                    var d = new Date(date);

                    parse = {
                        "a": ""+ (d.getHours() > 12 ? "pm" : "am"),
                        "A": ""+ (d.getHours() > 12 ? "PM" : "AM"),
                        "g": ""+ (d.getHours() > 12 ? d.getHours()-12 : d.getHours()),
                        "G": ""+ (d.getHours()),
                        "h": ""+ (d.getHours() < 10 ? "0"+ d.getHours() : (d.getHours() > 12 ? d.getHours()-12 : d.getHours())),
                        "H": ""+ (d.getHours() < 10 ? "0"+ d.getHours() : d.getHours()),
                        "i": ""+ (d.getMinutes()), 
                        "I": ""+ (d.getMinutes() < 10 ? "0"+ d.getMinutes() : d.getMinutes()), 
                        "s": ""+ (d.getSeconds()),
                        "S": ""+ (d.getSeconds() < 10 ? "0"+ d.getSeconds() : d.getSeconds()),
                        "j": ""+ (d.getDate()), 
                        "d": ""+ (d.getDate() < 10 ? "0"+ d.getDate() : d.getDate()),
                        "n": ""+ (d.getMonth()+1),
                        "m": ""+ (d.getMonth() < 9 ? "0"+ (d.getMonth()+1) : d.getMonth()+1),
                        "y": ""+ (d.getYear()-100),
                        "Y": ""+ (d.getFullYear()),
                        "l": options.weekDays[d.getDay()],
                        "D": options.weekDays[d.getDay()].substring(0,3),
                        "F": options.months[d.getMonth()],
                        "M": options.months[d.getMonth()].substring(0,3)
                    };
                    return parse;
                };
                /**
                  *
                  *
                  */                                
                var getUpdateDate = function(date){
                    var tmp  = date.split(" ");
                    var time = tmp[1].split(":");

                    if (tmp[2] == "PM") {
                        time[0] = time[0] == 12 ? time[0] : parseInt(time[0]) + 12;
                    } 

                    //console.log(tmp[0]+"T"+time.join(":"));
                    return getDate(tmp[0]+"T"+time.join(":"));
                };
                /**
                  *
                  *
                  */                                
                var setDefaults = function(settings) {
                    $.extend(options, settings);
                    return this;
                };
                // set dafault settings
                setDefaults(settings || {})
                
                if (navigator.geolocation && options.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){getLocation(position)}, function(error){errorGetLocation(error)});
                } else {
                    getWeather();
                }
            };
            // 
            return this.each(function() { 
                new WhatWeather(settings);
                return this;
            });
        }        
    });
})(jQuery);