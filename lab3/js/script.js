document.querySelector("#zip").addEventListener("change", displayCity);
document.addEventListener("DOMContentLoaded", loadStates);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#state").addEventListener("change", loadCounties)
document.querySelector("#password").addEventListener("click", passwordAssist)
document.querySelector("#passwordbtn").addEventListener(
    "click",
    function (event) {
        event.preventDefault();
        useSuggestedPassword();
    }
);
document.querySelector("#passwordbtn").style.display = "none";

async function displayCity() {
    try {
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
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
        document.querySelector("#state").value = data.state;
        await autoLoadCounties(data.state, data.county.replace(/[\s.,]+/g, '_'));

    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        document.querySelector("#city").style.color = "red";
        console.error(error);
    }
}

async function loadStates() {
    let stateMenu = document.querySelector("#state");

    stateMenu.textContent = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);

    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps;
            option.textContent = item.state;
            stateMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        stateMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
}

async function loadCounties() {
    let countyMenu = document.querySelector("#county");
    let state = document.querySelector("#state").value;
    countyMenu.textContent = "#";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    countyMenu.appendChild(defaultOption);

    try {
        let url = `https://csumb.space/api/geo/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county.replace(/[\s.,]+/g, '_');
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        countyMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        countyMenu.appendChild(errorOption);
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        return false;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.style.color = "green";
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.style.color = "red";
        return false;
    }
}
async function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");

    usernameError.textContent = "";

    if (password.length < 6) {
        passwordError.textContent = "Must have 6 or more characters";
        passwordError.style.color = "red";
        isValid = false;
    } else {
        if (password !== passwordAgain) {
            isValid = false;
            passwordError.textContent = "Passwords must match";
            passwordError.style.color = "red";
        }
    }

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();

        if (usernameAvailable === false) {
            isValid = false;
        }
    }

    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}

async function autoLoadCounties(state, countyValue) {
    let countyMenu = document.querySelector("#county");
    // let state = document.querySelector("#state").value;
    countyMenu.textContent = "#";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    countyMenu.appendChild(defaultOption);

    try {
        let url = `https://csumb.space/api/geo/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county.replace(/[\s.,]+/g, '_');
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }

        countyMenu.value = countyValue;
    } catch (error) {
        console.error(error);

        countyMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        countyMenu.appendChild(errorOption);
    }
}

async function passwordAssist() {
    suggestField = document.querySelector("#suggestedPassword");

    try {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);
        let data = await response.json();

        document.querySelector("#passwordbtn").style.display = "inline";
        suggestField.textContent = `Suggested Password: ${data.password}`;
        // let passwordButton = document.querySelector("#passwordbtn").


    } catch (error) {
        console.error(error);

        suggestField.textContent = "Unable to suggest password";

    }
}

function useSuggestedPassword() {
    document.querySelector("#passwordbtn").style.display = "none";
    let suggestField = document.querySelector("#suggestedPassword");
    pwd = suggestField.textContent.split(/:(.*)/s)[1];
    suggestField.textContent = "";
    console.log(pwd);

    document.querySelector("#password").value = pwd;
    document.querySelector("#passwordAgain").value = pwd;
}