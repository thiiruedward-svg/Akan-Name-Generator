const form = document.getElementById("akanForm");
const message = document.getElementById("message")

// Akan names for each day of the week
const maleNames =[
    "Kwasi",     // Sunday
    "Kwadwo",    // Monday
    "Kwabena",   // Tuesday
    "Kwaku",     // Wednesday
    "Yaw",       // Thursay
    "Kofi",      // Friday
    "Kwame"      // Saturday
];

const femaleNames = [
    "Akosua",   // Sunday 
    "Adwoa",    // Monday
    "Abenaa",   // Tuesday
    "Akua",     // Wednesday
    "Yaa",      // Thursday
    "Afua",     // Friday
    "Ama"       // Saturday
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Get the user's input
    const day = Number(document.getElementById("day").value);
    const month = Number(document.getElementById("month").value);
    const year = Number(document.getElementById("year").value);
    const gender = document.getElementById("gender").value;

    // Validate the input
    if(
        !Number.isInteger(day) ||
        !Number.isInteger(month) ||
        !Number.isInteger(year) ||
        year < 1 ||
        month < 1 || month > 12 ||
        day < 1 || day > 31 ||
        gender === ""
    ) {
        alert("Please enter a valid date and select your gender."); return;
    }

    //Check that the date actually exists
    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        alert("That date does not exist. Please try again."); return;
    }

    // Separate the year into century and last two digits
    const CC = Math.floor(year / 100);
    const YY = year % 100;

    // Apply the assignment's day-of-week fornula
    let MM = month;
    let adjustedDay = day;
    let adjustedYear = year;

    // January and February are treated as months 13 and 14
    // of the previous year in this calculation
    if (MM < 3) {
        MM += 12;
        adjustedYear -= 1;
    }

    const adjustedCC = Math.floor(adjustedYear / 100);
    const adjustedYY = adjustedYear % 100;

    const result = (
        Math.floor(adjustedCC / 4) - 2 * adjustedCC - 1 + 
        Math.floor((5 * adjustedYY) / 4) +
        Math.floor((26 * (MM + 1)) / 10) + adjustedDay
    );

    //Convert the result to a day index: Sunday = 0
    const dayIndex =((result % 7) + 7) % 7;
    const dayName = days[dayIndex];

    // Select the Akan name according to gender
    let akanName;

    if (gender === "male") {
        akanName = maleNames[dayIndex];
    } else {
        akanName = femaleNames[dayIndex];
    }

    // Display the result
    message.textContent = "You were born on " + dayName + ". Your Akan name is " + akanName + "!";
});