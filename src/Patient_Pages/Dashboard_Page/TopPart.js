import React from "react";
import patient_details_bg from "../../Assets/Dashboard_Page/patient_details_bg.png";

export default function Top_part(){

    let weather = {
        apiKey: "dadee94a86d93919d257e4735ca6aa92",
        fetchWeather: function () {
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=14.874870&lon=120.823967&appid=" +
              this.apiKey
          )
            .then((response) => {
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
            })
            .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
          const { icon, description } = data.weather[0];
          const { temp } = data.main;
          document.querySelector(".weather_icon").src ="https://openweathermap.org/img/wn/" + icon + "@4x.png";
          document.getElementsByClassName("weather_description")[0].innerText = description;
          var real_temp = temp - 273.15;
          real_temp = parseInt(real_temp);
          document.getElementsByClassName("weather_temperature")[0].innerText = real_temp + "°C";
        }
      };
 
      weather.fetchWeather();
 
      function goToweathersite(){
        window.open('https://weather.com/en-PH/weather/today/l/RPXX0017:1:RP?Goto=Redirected', '_blank');
      }

return(
    <div className="top_details">
    <div className="box"
      style={{
      backgroundImage: `url(${patient_details_bg})`
    }}>
        <p>Welcome, {localStorage.getItem("patient_login_firstname")}</p>
    </div>

    <div className="box">
      <div className="left">
          <p className="weather_description"></p>
          <img alt="" src="" className="weather_icon"/>
      </div>
      <div className="right">
        <p>Pinagbarilan, Baliuag</p>
        <p>BULACAN, PH</p>
        <p className="weather_temperature"></p>
      </div>
    </div>
  </div>
)
}