document.getElementById('searchButton').addEventListener('click',function(){
    showItems();
})
function showItems(){
    const cityName = document.getElementById('cityInput').value;
    const displayCity = document.getElementById('displayCityName');
    const temperature = document.getElementById('showTemperature');
    const weather = document.getElementById('weather');
    const icon = document.getElementById('image');
    console.log(icon);
    console.log(weather);
    const fromFunction = findCities(cityName,displayCity,temperature,weather,icon);
    
    // console.log(`here shows`,fromFunction);
} 

function findCities(city,displayCity,temperature,weather,image){
    console.log(displayCity);
    // const city = document.getElementById('cityInput').value;
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9abb39ee2697f5f7f73aac45f0d091fe`)
.then(response=>response.json())
.then(data=>{
    
    console.log(data);
    const cityFromApi=data.name;
    if(cityFromApi === city){
     displayWrongAndRight(city,cityFromApi);
    const kelvin = data.main.temp;
    const celcius = convertKelvinTocelcius(kelvin).toFixed(2);
    const getweather = data.weather[0].main;
    const icon = data.weather[0].icon;
    // displayAllElement(city,celcius);
    displayCity.innerText = city;
    temperature.innerText = celcius;
    weather.innerText= getweather;
    console.log(icon);
    image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    else{
        displayWrongAndRight(city,cityFromApi);
        // displayWrongInput.innerText="Sorry couldn't find The city";
    }

});
}
function convertKelvinTocelcius(kelvin){
    const celcius = kelvin-273.15;
    return celcius;
}
function displayWrongAndRight(city,cityFromApi){
    if(city==cityFromApi){
    const displayInput = document.getElementById('displayPart');
    displayInput.style.display='block';
    const displaywrongPart= document.getElementById('displaywrongPart');
    displaywrongPart.style.display='none';
    }
    else{
        const displayInput = document.getElementById('displayPart');
    displayInput.style.display='none';
    const displaywrongPart= document.getElementById('displaywrongPart');
    displaywrongPart.style.display='block';
    }
}