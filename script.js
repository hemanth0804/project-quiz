const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"], answer: "Shakespeare" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultContainer = document.getElementById("result");
const timerElement = document.getElementById("timer");

let shuffledQuizData = [];
let timerInterval;

// Function to shuffle questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load quiz questions
function loadQuiz() {
    quizContainer.innerHTML = "";
    shuffledQuizData = [...quizData]; // Copy the original data
    shuffleArray(shuffledQuizData); // Shuffle the questions

    shuffledQuizData.forEach((item, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.setAttribute("data-index", index); // Track original index
        questionElement.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
        
        item.options.forEach(option => {
            const label = document.createElement("label");
            label.classList.add("option");
            label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
            questionElement.appendChild(label);
        });

        quizContainer.appendChild(questionElement);
    });

    resultContainer.innerText = ""; // Clear previous result
    submitButton.disabled = false; // Enable submit button
}

// Start the countdown timer
function startTimer(duration) {
    let timeLeft = duration;
    timerElement.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            calculateScore();
            disableQuiz();
            submitButton.disabled = true;
        }
    }, 1000);
}

// Format time as MM:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds);
}

// Calculate score and show correct/wrong answers
function calculateScore() {
    let score = 0;
    const questionElements = document.querySelectorAll(".question");

    questionElements.forEach((questionElement, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const originalIndex = parseInt(questionElement.getAttribute("data-index"));

        if (selectedOption) {
            if (selectedOption.value === shuffledQuizData[originalIndex].answer) {
                score++;
                questionElement.style.backgroundColor = "lightgreen"; // Correct answer
            } else {
                questionElement.style.backgroundColor = "lightcoral"; // Incorrect answer
            }
        } else {
            questionElement.style.backgroundColor = "lightcoral"; // No answer selected
        }
    });

    resultContainer.innerText = `You scored ${score} out of ${shuffledQuizData.length} correctly.`;
}

// Disable all quiz options after submission
function disableQuiz() {
    const options = document.querySelectorAll("input[type='radio']");
    options.forEach(option => option.disabled = true);
}

// Restart the quiz with new shuffled questions
function restartQuiz() {
    clearInterval(timerInterval); // Stop existing timer
    loadQuiz();
    startTimer(60); // Reset timer to 60 seconds
}

// Event Listeners
submitButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    calculateScore();
    disableQuiz();
    submitButton.disabled = true;
});

restartButton.addEventListener("click", restartQuiz);

// Initialize quiz on page load
window.onload = () => {
    loadQuiz();
    startTimer(60);
};
