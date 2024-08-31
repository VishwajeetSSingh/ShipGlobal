const words = [
    { word: "EXCHANGE", hint: "The act of trading" },
    { word: "JAVASCRIPT", hint: "A popular programming language" },
    { word: "ALGORITHM", hint: "A step-by-step procedure for calculations" },
    { word: "DEVELOPER", hint: "Someone who creates software" },
    { word: "INTERFACE", hint: "A point of interaction between components" }
];

let currentWord, scrambledWord, attempts = 0, timeLeft = 30, timer;

// Get references to HTML elements
const scrambledWordEl = document.getElementById("scrambled-word");
const hintEl = document.getElementById("hint");
const timeLeftEl = document.getElementById("time-left");
const userInputEl = document.getElementById("user-input");
const refreshWordBtn = document.getElementById("refresh-word");
const checkWordBtn = document.getElementById("check-word");
const feedbackEl = document.getElementById("feedback");
const attemptCountEl = document.getElementById("attempt-count");

// Shuffle the letters of the word
function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

// Set a new word and reset game state
function setNewWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = scrambleWord(currentWord.word);
    scrambledWordEl.textContent = scrambledWord;
    hintEl.textContent = `Hint: ${currentWord.hint}`;
    attempts = 0;
    attemptCountEl.textContent = attempts;
    feedbackEl.textContent = "";
    userInputEl.value = "";
    clearInterval(timer);
    timeLeft = 30;
    timeLeftEl.textContent = timeLeft;
    startTimer();
}

// Start countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            feedbackEl.textContent = "Time's up! Try a new word.";
        }
    }, 1000);
}

// Check if user input matches the original word
function checkWord() {
    const userWord = userInputEl.value.toUpperCase();
    if (userWord === currentWord.word) {
        feedbackEl.textContent = "Correct! Well done!";
        clearInterval(timer);
    } else {
        feedbackEl.textContent = "Incorrect. Try again!";
        attempts++;
        attemptCountEl.textContent = attempts;
    }
}

// Event listeners for buttons and Enter key
refreshWordBtn.addEventListener("click", setNewWord);
checkWordBtn.addEventListener("click", checkWord);
userInputEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWord();
    }
});

// Initialize the game
setNewWord();
