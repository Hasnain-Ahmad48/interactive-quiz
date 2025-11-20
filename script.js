const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      {text: "Hyper Text Markup Language", correct: true},
      {text: "High Tech Modern Language", correct: false},
      {text: "Hyperlink Text Mode Language", correct: false},
      {text: "Home Tool Markup Language", correct: false},
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      {text: "text-style", correct: false},
      {text: "font-size", correct: true},
      {text: "text-size", correct: false},
      {text: "font-weight", correct: false},
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      {text: "<js>", correct: false},
      {text: "<scripting>", correct: false},
      {text: "<script>", correct: true},
      {text: "<javascript>", correct: false},
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      {text: "function = myFunction()", correct: false},
      {text: "function:myFunction()", correct: false},
      {text: "create.myFunction()", correct: false},
      {text: "function myFunction()", correct: true},
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      {text: "onmouseclick", correct: false},
      {text: "onchange", correct: false},
      {text: "onclick", correct: true},
      {text: "onmouseover", correct: false},
    ],
  },
  {
    question: "Which character is used to indicate an end tag in HTML?",
    answers: [
      {text: "*", correct: false},
      {text: "/", correct: true},
      {text: "<", correct: false},
      {text: "^", correct: false},
    ],
  },
  {
    question: "How do you select an element with id 'demo' in CSS?",
    answers: [
      {text: "#demo", correct: true},
      {text: ".demo", correct: false},
      {text: "demo", correct: false},
      {text: "*demo", correct: false},
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      {text: "*", correct: false},
      {text: "-", correct: false},
      {text: "=", correct: true},
      {text: "x", correct: false},
    ],
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    answers: [
      {text: "<heading>", correct: false},
      {text: "<h1>", correct: true},
      {text: "<h6>", correct: false},
      {text: "<head>", correct: false},
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      {text: "if i = 5 then", correct: false},
      {text: "if (i == 5)", correct: true},
      {text: "if i == 5 then", correct: false},
      {text: "if i = 5", correct: false},
    ],
  },
];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const questionCountElement = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  startTimer();

  setNextQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerElement.innerText = `Time: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  questionCountElement.innerText = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn-answer");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  if (questions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    nextBtn.innerText = "Finish";
    nextBtn.classList.remove("hide");
    nextBtn.onclick = () => {
      showScore();
    };
  }
}

function showScore() {
  clearInterval(timerInterval);
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  scoreElement.innerText = `${score} / ${questions.length}`;

  if (score === questions.length) {
    messageElement.innerText = "Perfect score! You're a pro!";
  } else if (score > questions.length / 2) {
    messageElement.innerText = "Great job! Keep it up.";
  } else {
    messageElement.innerText = "Nice try! Review the topics and try again.";
  }
  nextBtn.innerText = "Next";
  nextBtn.onclick = () => {
    currentQuestionIndex++;
    setNextQuestion();
  };
}
