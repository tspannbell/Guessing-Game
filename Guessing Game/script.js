// Access the DOM element 'msg'
const msgEl = document.getElementById("msg");

//  Create a Random Number
const randomNum = getRandomNumber();

// function getRandomNumber
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

console.log("Number:" + randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener("result", onSpeak);

function onSpeak(e) {
  // console.log(e)
  const msg = e.results[0][0].transcript;
  console.log(msg);

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
  <div> You said: </div>
  <span class="box">${msg}</span>
  `;
}

//check the users guess against the number
function checkNumber(msg) {
  const num = +msg;

  // check number to see if it is valid
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div> That is NOT a valid number</div>`;
    return;
  }

  // check if number is in between 1 - 100
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div> Number must be between 1 and 100</div>`;
    return;
  }
  // check the number
  if (num === randomNum) {
    // let the user know they have won
    document.body.innerHTML = `
    <h2> Congrats ! You have guessed the number!<br><br>
    It was ${num} </h2>
    <button class-"play-again" id="play-again"> Play again </button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div> GO LOWER </div>`;
  } else {
    msgEl.innerHTML += `<div> GO HIGHER </div>`;
  }
}

// end speech recognition service

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
