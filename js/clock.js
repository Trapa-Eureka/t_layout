const clockContainer = document.querySelector(".js-clock"), // help find js-clock class in the document
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date(); // date is class
    const minutes = date.getMinutes(); // get the mins.
    const hours = date.getHours(); // get the hour
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    // If 'sec' is less than 10, return string.
}

function init() {
    getTime(); // get the hour first
    setInterval(getTime, 1000); // set movement
}

init();