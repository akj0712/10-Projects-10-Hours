const quizData = [
    {
        question: "How old am I?",
        a: "10",
        b: "20",
        c: "30",
        correct: "b",
    },
    {
        question: "What is the most used programming language in 2019?",
        a: "JavaScript",
        b: "C++",
        c: "Python",
        correct: "a",
    },
    {
        question: "Who is the Prime Minister of India?",
        a: "Abhinav Kumar Jha",
        b: "Narendra Modi",
        c: "Abhishek Jha",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Styles sheets",
        c: "Jason Object Notation",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "None of the above",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const submit = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    question.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;

    // currentQuiz++;
}

function getSelected() {
    const answerEls = document.querySelectorAll(".answer");
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    // * console.log(answer);
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submit.addEventListener("click", () => {
    // * check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score = score + 5;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You Answered correctly ${score}/25\nGet a life</h2> <button onclick="location.reload()">Reload</button>`;
        }
    }
});
