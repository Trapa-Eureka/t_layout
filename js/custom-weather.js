(function makeAPICalls() {
    // get time
    var date = new Date();
    var hour = date.getHours();
    var body = document.body;
    // set class for day or night
    if (hour >= 18) {
        body.classList.remove('day');
        body.classList.add('night');
    } else {
        body.classList.remove('night');
        body.classList.add('day');
    }

    // element variables
    var theLoc = document.getElementById('location');
    var theData = document.getElementById('weather-data');
    var theDeg = document.getElementById('degrees');

    function loadLocationData() {
        var locUrl = 'https://ipapi.co/json/';
        var locParsedResponse,
            city,
            region,
            latitude,
            longitude,
            greeting,
            locHtml;

        var locRequest = new XMLHttpRequest();
        locRequest.onreadystatechange = function() {

            // check if the connection was made
            if (locRequest.readyState === 4) {
                theLoc.innerHTML = '... request received ...';

                // check if the API sent back OK TO GO
                if (locRequest.status === 200) {
                    // parse the JSON response
                    locParsedResponse = JSON.parse(locRequest.responseText);

                    // assign response to variables
                    city = locParsedResponse.city;
                    region = locParsedResponse.region;
                    latitude = locParsedResponse.latitude;
                    longitude = locParsedResponse.longitude;

                    // determine greeting
                    if (hour >= 18) {
                        greeting = 'Good evening, '
                    } else {
                        greeting = 'Hello, '
                    }

                    // build html
                    locHtml = '<p>' +
                        greeting +
                        city + ', ' + region +
                        '.</p>';

                    // assign to innerHtml
                    theLoc.innerHTML = locHtml;

                    var wUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=8c194040a06d9a847bb9c5589246be57';
                    var wParsedResponse,
                        wShortName,
                        wLongName,
                        wIcon,
                        vvSmrtDeg,
                        wDegC,
                        wDegF,
                        celsius,
                        wHtml,
                        degHtml;

                    var wRequest = new XMLHttpRequest();
                    wRequest.onreadystatechange = function() {
                        if (wRequest.readyState === 4) {
                            theData.innerHTML = '... request received ...';
                            if (wRequest.status === 200) {
                                wParsedResponse = JSON.parse(wRequest.responseText);

                                wShortName = wParsedResponse.weather[0].main;
                                wLongName = wParsedResponse.weather[0].description;
                                wIcon = wParsedResponse.weather[0].id;
                                vvSmrtDeg = wParsedResponse.main.temp;

                                wDegC = Math.round(vvSmrtDeg - 273.15);
                                wDegF = Math.round((vvSmrtDeg * (9 / 5)) - 459.67);

                                wHtml = '<div>' +
                                    wShortName +
                                    '<span>(' + wLongName + ')</span>' +
                                    '<i class="wi wi-owm-' + wIcon + '"></i></div>';

                                celsius = true;
                                degHtml = wDegC + '&deg; C';
                                theDeg.innerHTML = degHtml;

                                var switcher = document.getElementById('switcher');
                                switcher.addEventListener('click', function() {

                                    if (celsius === true) {
                                        degHtml = wDegF + '&deg; F';
                                        theDeg.innerHTML = degHtml;
                                        celsius = false;
                                    } else {
                                        degHtml = wDegC + '&deg; C';
                                        theDeg.innerHTML = degHtml;
                                        celsius = true;
                                    }

                                }, false);

                                theData.innerHTML = wHtml;

                            } else {
                                theData.innerHTML = 'Request for weather received by server, but there is a problem with response: ' + wRequest.status;
                            }
                        }
                    }

                    wRequest.open('GET', wUrl, true);
                    wRequest.send(null);
                } else {
                    theLoc.innerHTML = 'Request for location received by server, but there is a problem with response: ' + locRequest.status;
                }
            }
        }

        locRequest.open('GET', locUrl, true);
        locRequest.send(null);
    }

    loadLocationData();

})();

// sample JSON

// {
//   "coord": {
//     "lon": -122.76,
//     "lat": 45.46
//   },
//   "weather": [
//     {
//       "id": 801,
//       "main": "Clouds",
//       "description": "few clouds",
//       "icon": "02n"
//     }
//   ],
//   "base": "cmc stations",
//   "main": {
//     "temp": 293.84,
//     "pressure": 1011.71,
//     "humidity": 65,
//     "temp_min": 293.84,
//     "temp_max": 293.84,
//     "sea_level": 1035.44,
//     "grnd_level": 1011.71
//   },
//   "wind": {
//     "speed": 2.61,
//     "deg": 332.003
//   },
//   "clouds": {
//     "all": 20
//   },
//   "dt": 1463531507,
//   "sys": {
//     "message": 0.0038,
//     "country": "US",
//     "sunrise": 1463574997,
//     "sunset": 1463629144
//   },
//   "id": 7261327,
//   "name": "Garden Home-Whitford",
//   "cod": 200
// }