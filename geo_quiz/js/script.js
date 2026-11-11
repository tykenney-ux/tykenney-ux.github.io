const DEBUG = false
document.querySelector("button").addEventListener("click", gradeQuiz);

let score = 0;
displayCheckboxChoices(3, ["A. Jackson", "B. Franklin", "T. Jefferson", "T. Roosevelt"])
displayRadioChoices(4, ["Maine", "Rhode Island", "Maryland", "Delaware"]);
// displayQ5Choices();
displayCheckboxChoices(5, ["Oregon", "Nevada", "Arizona", "Utah", "New Mexico"]);
displayCheckboxChoices(6, ["Maine", "Vermont", "New Hampshire", "Massachusetts", "Rhode Island", "Connecticut"]);
displayRadioChoices(7, ["Washington, D.C.", "New York City, NY", "San Fransisco, CA", "Eagleton, WI"]);
displayRadioChoices(8, ["Alaska", "Texas", "California", "Hawaii"]);

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {//TODO: change to generalize text
    let isValid = true;

    //text
    let q1Response = document.querySelector("#q1").value;
    let q10Response = document.querySelector("#q10").value;

    //dropdown
    //q2
    let q2Response = document.querySelector("#q2").value;
    //q9
    let q9Response = document.querySelector("#q9").value;

    //radio
    //q8
    let selectedQ8 = document.querySelector("input[name=q8]:checked");
    //q7
    let selectedQ7 = document.querySelector("input[name=q7]:checked");
    //q4
    let selectedQ4 = document.querySelector("input[name=q4]:checked");


    let validationFdbk = document.querySelector("#validationFdbk");



    //checkbox
    //q3
    if ((!document.querySelector("#q3T_Jefferson").checked &&
        !document.querySelector("#q3T_Roosevelt").checked &&
        !document.querySelector("#q3A_Jackson").checked &&
        !document.querySelector("#q3B_Franklin").checked) ||
        (!document.querySelector("#q5Oregon").checked &&    //q5
            !document.querySelector("#q5Nevada").checked &&
            !document.querySelector("#q5Arizona").checked &&
            !document.querySelector("#q5Utah").checked &&
            !document.querySelector("#q5New_Mexico").checked) ||
        (!document.querySelector("#q6Maine").checked &&     //q6
            !document.querySelector("#q6Vermont").checked &&
            !document.querySelector("#q6New_Hampshire").checked &&
            !document.querySelector("#q6Massachusetts").checked &&
            !document.querySelector("#q6Connecticut").checked &&
            !document.querySelector("#q6Rhode_Island").checked) ||
        (q2Response === "" || q9Response === "") ||
        (q1Response === "" || q10Response === "") ||
        (selectedQ4 === null || selectedQ7 === null || selectedQ8 === null)) {
        isValid = false;
        validationFdbk.textContent = "Please check that every question is answered";
    }







    if (q1Response === "" || q10Response === "") {
        isValid = false;
        validationFdbk.textContent = "Please check that every question is answered";
    }

    return isValid;
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value.toLowerCase();

    let q1Feedback = document.querySelector("#q1Feedback");
    let q2Feedback = document.querySelector("#q2Feedback");
    let q3Feedback = document.querySelector("#q3Feedback");
    let q4Feedback = document.querySelector("#q4Feedback");
    let q5Feedback = document.querySelector("#q5Feedback");
    let q6Feedback = document.querySelector("#q6Feedback");
    let q7Feedback = document.querySelector("#q7Feedback");
    let q8Feedback = document.querySelector("#q8Feedback");
    let q9Feedback = document.querySelector("#q9Feedback");
    let q10Feedback = document.querySelector("#q10Feedback");

    // let markImg1 = document.querySelector("#markImg1");

    q1Feedback.textContent = "";
    q1Feedback.className = "";
    // markImg1.textContent = "";

    /*Question 1*/
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    /*Question 2*/
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    /*Question 3*/
    if (document.querySelector("#q3T_Jefferson").checked &&
        document.querySelector("#q3T_Roosevelt").checked &&
        !document.querySelector("#q3A_Jackson").checked &&
        !document.querySelector("#q3B_Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    /*Question 4*/
    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    /*Question 5*/
    if (document.querySelector("#q5Oregon").checked &&
        document.querySelector("#q5Nevada").checked &&
        document.querySelector("#q5Arizona").checked &&
        !document.querySelector("#q5Utah").checked &&
        !document.querySelector("#q5New_Mexico").checked) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    /*Question 6*/
    if (document.querySelector("#q6Maine").checked &&
        document.querySelector("#q6Vermont").checked &&
        document.querySelector("#q6New_Hampshire").checked &&
        document.querySelector("#q6Massachusetts").checked &&
        document.querySelector("#q6Connecticut").checked &&
        document.querySelector("#q6Rhode_Island").checked) {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    /*Question 7*/
    let selectedQ7 = document.querySelector("input[name=q7]:checked");

    if (selectedQ7 !== null && selectedQ7.value === "Washington, D.C.") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    /*Question 8*/
    let selectedQ8 = document.querySelector("input[name=q8]:checked");

    if (selectedQ8 !== null && selectedQ8.value === "Alaska") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    /*Question 9*/
    if (q9Response === "fl") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }
    /*Question 10*/
    if (q10Response === "oklahoma") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    // document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
    document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
    if (score >= 80) {
        DEBUG ? console.log("passing score") : null;
        document.querySelector("#totalScore").style.color = 'green';
        document.querySelector("#scoreFeedback").textContent = "Congratulations! You've Passed!"
    }
    else {
        DEBUG ? console.log("failing score") : null;
        document.querySelector('#totalScore').style.color = 'red';
        document.querySelector("#scoreFeedback").textContent = "Whoops! Try Again!"
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/*replaced with generic function*/
// function displayQ4Choices() {
//     let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
//     shuffleArray(q4ChoicesArray);

//     let choicesContainer = document.querySelector("#q4Choices");
//     choicesContainer.textContent = "";

//     for (let choice of q4ChoicesArray) {
//         let input = document.createElement("input");
//         input.type = "radio";
//         input.name = "q4";
//         input.id = choice;
//         input.value = choice;

//         let label = document.createElement("label");
//         label.htmlFor = choice;
//         label.textContent = choice;

//         choicesContainer.appendChild(input);
//         choicesContainer.appendChild(label);
//         choicesContainer.appendChild(document.createTextNode(" "));
//     }
// }

function displayRadioChoices(index, choicesArray) {
    shuffleArray(choicesArray);

    let choicesContainer = document.querySelector(`#q${index}Choices`);
    choicesContainer.textContent = "";

    for (let choice of choicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = `q${index}`;
        input.id = `q${index}` + choice.replace(/[\s.,]+/g, '_');
        // input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = `q${index}` + choice.replace(/[\s.,]+/g, '_');
        label.textContent = choice;

        if (DEBUG) {
            console.log(`q${index}`)
            console.log(input.id)
            console.log(input.value)
        }

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

/*replaced with generic function*/
// function displayQ5Choices() {
//     let q5ChoicesArray = ["Oregon", "Nevada", "Arizona", "Utah", "New Mexico"];
//     shuffleArray(q5ChoicesArray);

//     let choicesContainer = document.querySelector("#q5Choices");
//     choicesContainer.textContent = "";

//     for (let choice of q5ChoicesArray) {
//         let input = document.createElement("input");
//         input.type = "checkbox";
//         input.name = "q5";
//         input.id = choice;
//         input.value = choice;

//         let label = document.createElement("label");
//         label.htmlFor = choice;
//         label.textContent = choice;

//         choicesContainer.appendChild(input);
//         choicesContainer.appendChild(label);
//         choicesContainer.appendChild(document.createTextNode(" "));
//     }
// }

function displayCheckboxChoices(index, choicesArray) {
    shuffleArray(choicesArray);

    let choicesContainer = document.querySelector(`#q${index}Choices`);
    choicesContainer.textContent = "";



    for (let choice of choicesArray) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.name = `q${index}`;

        input.id = `q${index}` + choice.replace(/[\s.,]+/g, '_');
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = `q${index}` + choice.replace(/[\s.,]+/g, '_');
        label.textContent = choice;

        if (DEBUG) {
            console.log(`q${index}`)
            console.log(input.id)
            console.log(input.value)
        }

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

/*tutorial stuff*/
// function gradeQuiz() {
//     console.log("Grading quiz...");
//     document.querySelector("#validationFdbk").textContent = "";

//     if (!isFormValid()) {
//         return;
//     }

//     let q1Response = document.querySelector("#q1").value;
//     console.log(q1Response);
// }

// function gradeQuiz() {
//     console.log("Grading quiz...");
//     let q1Response = document.querySelector("#q1").value;
//     console.log(q1Response);
// }
