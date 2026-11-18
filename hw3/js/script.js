const openWeatherAPI_key = "YOUR_KEY_HERE" //need to fix
document.querySelector("#zip").addEventListener("change", validateInput);
document.querySelector("#zip_loading").style.display = "none";
let DEBUG = false;

async function displayCity() {
    try {
        document.querySelector("#img_placement img:last-child") ? document.querySelector("#img_placement img:last-child").remove() : null;
        // document.querySelector("#zip_loading").style.display = "";
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/geo/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let text = await response.text();

        if (!text.trim()) {
            throw new Error("API returned an empty response");
        }

        let data = JSON.parse(text);

        //the API returns false when the zip code is not found, so we can check for that case before trying to access the city property
        if (data === false) {
            document.querySelector("#city").textContent = "Zip code not found";
            document.querySelector("#city").style.color = "orange";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            document.querySelector("#zip_loading").style.display = "none";
            return;
        }

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#city").style.color = "white";
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
        await loadWeather(data.latitude, data.longitude);

    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        document.querySelector("#city").style.color = "red";
        DEBUG ? console.error(error) : null;
    }
}

async function loadWeather(lat, lon) {
    try {
        let API_key = openWeatherAPI_key;

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`;
        let response = await fetch(url);
        let text = await response.text();

        if (!text.trim()) {
            throw new Error("API returned an empty response");
        }

        let data = JSON.parse(text);

        if (data === false) {
            document.querySelector("#temperature").textContent = "Zip code not found";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }

        document.querySelector("#temperature").textContent = data.main.temp;
        document.querySelector("#zip_loading").style.display = "none";
        document.querySelector("#weather").textContent = data.weather[0].main;
        DEBUG ? console.log(data.weather[0].main) : null;
        let container = document.querySelector("#img_placement");
        let image = document.createElement('img');
        image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        image.alt = data.weather[0].description;

        container.appendChild(image);


    } catch (error) {
        document.querySelector("#temperature").textContent = "Unable to retrieve city";
        document.querySelector("#temperature").style.color = "red";
        DEBUG ? console.error(error) : null;
    }
}

function validateInput() {
    let isValid = true;
    document.querySelector("#zip_loading").style.display = "";
    let zip_feedback = document.querySelector("#zip_feedback");
    zip_feedback ? zip_feedback.textContent = "" : null;
    let userInput = document.querySelector("#zip").value;

    DEBUG ? console.log(userInput.length) : null;
    userInput.length !== 5 ? isValid = false : null;

    if (isValid) {
        displayCity();
    }
    else {
        document.querySelector("#zip_loading").style.display = "none";
        zip_feedback.textContent = "Zipcode is not valid";
        zip_feedback.style.color = "red";
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        document.querySelector("#temperature").textContent = "";
        document.querySelector("#weather").textContent = "";
        document.querySelector("#img_placement img:last-child") ? document.querySelector("#img_placement img:last-child").remove() : null;
        return;
    }
}