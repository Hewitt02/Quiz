// Define an array of quiz questions, each with a question, choices, and the correct answer.
const quizQuestions = [
    // Question 1
    {
        question: "Which Pokemon is a water type?",
        choices: ["Charmander", "Bulbasaur", "Squirtle", "Pikachu"],
        answers: "Squirtle",
    },
    // Question 2
    {
        question: "Which of the following Pokemon can evolve?",
        choices: ["Blastoise", "Mewtwo", "Groudon", "Bayleef"],
        answers: "Bayleef",
    },
    // ... (more questions)
];

// Define variables to interact with elements in the HTML.
const play = document.querySelector("#play");
const timer = document.querySelector("#timer");
const choiceEl = document.querySelector("#choices");
const scoreTable = document.querySelector("#scoreTable");
const playAgain = document.querySelector("#reset");

let score = 0; // Initialize the score
let secondsLeft = 60; // Initialize the timer
let currentQuestionIndex = 0; // Initialize the current question index

play.style.visibility = "visible";

// Add an event listener to the "Play" button to start the game.
play.addEventListener('click', startGame);

// Function to start the timer countdown
function startTimer() {
    const timerInterval = setInterval(() => {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            timer.textContent = secondsLeft;
            clearInterval(timerInterval);
            endQuiz(); // Call the endQuiz function when time runs out
        }
    }, 1000);
}

// Function to start the quiz game
function startGame() {
    displayQuestions();
    startTimer();
    document.querySelector("#scoreTable").parentElement.classList.add("hidden");
    play.style.visibility = "hidden";
    document.querySelector("#timer").classList.remove("hidden");
}

// Function to display the current quiz question
function displayQuestions() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionEl = document.querySelector("#question");
    console.log()
    choiceEl.innerHTML = '';

    // Loop through and display answer choices
    currentQuestion.choices.forEach((choice, index) => {
        const optionEl = document.createElement('li');
        optionEl.textContent = choice;
        choiceEl.appendChild(optionEl);

        // Add a click event listener to each answer choice
        optionEl.addEventListener('click', checkAnswer);
    });
}

// Function to check the user's answer
function checkAnswer(event) {
    const userAnswer = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (userAnswer === currentQuestion.answers) {
        score++; // Increase the score for a correct answer
        window.alert('Correct!');
    } else {
        secondsLeft -= 10; // Deduct time for an incorrect answer
        window.alert('Incorrect!');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
    } else {
        displayQuestions();
    }
}

// Function to end the quiz and display the user's score
function endQuiz() {
    document.getElementById('game').classList.add("hidden");
    document.getElementById('initials').classList.remove("hidden");
    document.querySelector("#saveBtn").onclick = saveScore;
    document.getElementById('timer').classList.remove("hidden");
    document.getElementById('reset').classList.remove("hidden");
    window.alert('Quiz ended. Your score: ' + score);
}

// Function to save the user's score with their initials
function saveScore() {
    const initials = document.querySelector("input").value.trim();
    if (!initials) {
        alert("Please add your initials!");
        return;
    }

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = { initials, score };
    highScores.push(newScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScores();
    document.getElementById('initials').classList.add("hidden");
    document.querySelector("#scoreTable").parentElement.classList.remove("hidden");
}

// Function to display high scores
function displayScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    scoreTable.innerHTML = '';

    highScores.sort((a, b) => b.score - a.score);

    for (let i = 0; i < highScores.length; i++) {
        const scoreList = document.createElement('li');
        scoreList.textContent = highScores[i].initials + ": " + highScores[i].score;
        scoreTable.appendChild(scoreList);
    }
}

// Function to reset the game
function reset() {
    score = 0;
    secondsLeft = 60;
    currentQuestionIndex = 0;

    document.getElementById('game').classList.remove("hidden");
    document.getElementById('initials').classList.add("hidden");
    document.querySelector("#scoreTable").parentElement.classList.add("hidden");
    document.getElementById('reset').classList.add("hidden");

    startGame();
}

// Add event listeners for the "Play Again" and "Play" buttons
playAgain.addEventListener('click', reset);
play.addEventListener('click', startGame);

