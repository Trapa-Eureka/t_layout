const weather = document.querySelector(".js-weathers");

const API_KEY = "8c194040a06d9a847bb9c5589246be57";
const COORDS = 'coords';

var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric" + city; {
    $.ajax({
        url: apiURI,
        dataType: "json",
        type: "GET",
        async: "false",
        success: function(resp) {
            console.log(resp);
            console.log("현재온도 : " + (resp.main.temp - 273.15));
            console.log("현재습도 : " + resp.main.humidity);
            console.log("날씨 : " + resp.weather[0].main);
            console.log("상세날씨설명 : " + resp.weather[0].description);
            console.log("날씨 이미지 : " + resp.weather[0].icon);
            console.log("바람   : " + resp.wind.speed);
            console.log("나라   : " + resp.sys.country);
            console.log("도시이름  : " + resp.name);
            console.log("구름  : " + (resp.clouds.all) + "%");
        }
    })
}