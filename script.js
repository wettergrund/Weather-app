const Confirmbutton = document.getElementById('city-confirm');
const SearchBar = document.getElementById('city-input');
let selectedUnit = "metric";
let degChar = "C";
let currentLat;
let currentLong;




let myWeather = {
    apiKey: "20c1b5b4154b642825b84b32a726d7aa",
    getWather: async function(city){
        if(city === "CurrentLocation"){
            await fetch('https://api.openweathermap.org/data/2.5/weather?' +
           'lat='       + currentLat + 
           '&lon='       + currentLong +
           '&units='    + selectedUnit + 
           '&appid='    + this.apiKey
            )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))     
        }
        else{

        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' 
            + city + '&units='
            + selectedUnit + '&appid='
            + this.apiKey
            )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        // .then((data) => console.log(data))
        
        }

        
    },
    displayWeather: function(data){
        
        if(data.cod != "200"){
            document.querySelector(".city").innerText = "Something went wrong";
        }
        else{
            const { name } = data;
            const { description, icon } = data.weather[0];
            const { temp } = data.main;
            const { deg } = data.wind;
            const degCon = deg - 180;
            const flooredTemp = Math.round(temp);

            console.log(name, description, temp, flooredTemp);
            const windDir = document.querySelector(".rotate");

            document.querySelector(".city").innerText = name;
            document.querySelector(".temp").innerText = flooredTemp + '°' + degChar;
            document.querySelector(".weather").innerText = description;
            document.getElementById("city-input").value = "";

        
            document.querySelector(".image").style.backgroundImage = 
            "url(https://source.unsplash.com/random/100/?" + name + ",weather)"
            windDir.style.transform = "rotate(" + degCon + "deg)";

        }
    }
}
SearchBar.addEventListener('keydown', function(event) {
    if(event.key === "Enter") {
        searchByCity();
    }
})

Confirmbutton.addEventListener('click', searchByCity)


function searchByCity(){
    const CityInput = document.getElementById('city-input');
    myWeather.getWather(CityInput.value);
}


function changeUnit(){
    let currentCity = document.querySelector(".city").innerText;
    if(selectedUnit == "metric"){
        selectedUnit = "imperial";
        degChar = "F";
    }
    else {
        selectedUnit = "metric"
        degChar = "C";
    }

    myWeather.getWather(currentCity)
}


const locBtn = document.querySelector('#location')

locBtn.addEventListener('click', getLocation)


function getLocation() {
    console.log("Location clicked")
    navigator.geolocation.getCurrentPosition(showPosition);

}

function showPosition(position) {
  currentLat = position.coords.latitude;
  currentLong = position.coords.longitude;
  myWeather.getWather("CurrentLocation")
}


myWeather.getWather("Stockholm")


document.getElementById("temp").addEventListener('click', changeUnit)



// animate background


const circlePos = document.querySelector('.circle')

window.onmousemove = e => {
	const mouseX = e.clientX,
				mouseY = e.clientY;
  
	const xDecimal = (mouseX / window.innerWidth) * 100,
				yDecimal = (mouseY / window.innerHeight) * 100;

  circlePos.style.translate = xDecimal + "vw " + yDecimal + "vh";
}