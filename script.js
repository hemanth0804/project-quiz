const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"], answer: "Shakespeare" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

let timerInterval;

function loadQuiz() {
    quizContainer.innerHTML = ""; 
    quizData.forEach((item, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `<p>${index + 1}. ${item.question}</p>`;
        
        item.options.forEach(option => {
            const label = document.createElement("label");
            label.classList.add("option");
            label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
            questionElement.appendChild(label);
        });

        quizContainer.appendChild(questionElement);
    });
}

function startTimer(duration) {
    let timeLeft = duration;
    const timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerElement.textContent = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds);

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            calculateScore(); 
            disableQuiz();
            submitButton.disabled = true;
        }
        timeLeft--;
    }, 1000);
}

function calculateScore() {
    let score = 0;
    quizData.forEach((item, index) => {
        const questionElement = document.querySelectorAll(".question")[index];
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);

        if (selectedOption) {
            if (selectedOption.value === item.answer) {
                score++;
                questionElement.style.backgroundColor = "lightgreen"; 
            } else {
                questionElement.style.backgroundColor = "lightcoral"; 
            }
        } else {
            questionElement.style.backgroundColor = "lightcoral"; 
        }
    });
    resultContainer.innerText = `You scored ${score} out of ${quizData.length} correctly.`;
}

function disableQuiz() {
    const options = document.querySelectorAll("input[type='radio']");
    options.forEach(option => option.disabled = true);
}

submitButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    calculateScore();
    disableQuiz();
    submitButton.disabled = true;
});

window.onload = () => {
    loadQuiz();
    startTimer(60); 
};
