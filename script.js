const playButton = document.getElementById("play-button");
const resumeButton = document.getElementById("resume-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const time = document.getElementById("div");

var voiceList = document.querySelector("#voiceList");
var synth = window.speechSynthesis;

var voices = [];

// PopulateVoices();
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

function PopulateVoices() {
  voices = synth.getVoices();

  var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
  voiceList.innerHTML = "";
  voices.forEach((voice) => {
    var listItem = document.createElement("option");

    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
  });

  voiceList.selectedIndex = selectedIndex;
}

let crruntCharacter;

const utterance = new SpeechSynthesisUtterance();

utterance.addEventListener("end", () => {
  textInput.disabled = false;
});
utterance.addEventListener("boundary", (e) => {
  crruntCharacter = e.charIndex;
});

speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(crruntCharacter));
});

function playText(text) {
  var selectedVoiceName =
    voiceList.selectedOptions[0].getAttribute("data-name");
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      utterance.voice = voice;
    }
  });
  utterance.text = text;
  utterance.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}

playButton.addEventListener("click", () => {
  playText(textInput.value);
});

pauseButton.addEventListener("click", () => {
  speechSynthesis.pause();
});

resumeButton.addEventListener("click", () => {
  speechSynthesis.resume();
});

stopButton.addEventListener("click", stopText);
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
utterance.addEventListener("boundary", function (event) {
  console.log(
    event.name + " boundary reached after " + event.elapsedTime + " seconds."
  );
});
