const questions = [
    {
        question: "¿Cuál es el máximo de jugadores?",
        answers: {
            a: "2",
            b: "4",
            c: "6"
        },
        correctAnswer: "b"
    },
    {
        question: "¿Con cuántos dados se juega?",
        answers: {
            a: "1",
            b: "2",
            c: "3"
        },
        correctAnswer: "a"
    },
    {
        question: "¿Con cuál número empiezas a jugar?",
        answers: {
            a: "1",
            b: "2",
            c: "6"
        },
        correctAnswer: "c"
    }
];

let currentQuestionIndex = 0;
let timerInterval;

function startQuiz() {
    showQuestion(currentQuestionIndex);
    startTimer();
}

function showQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[index];
    questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        ${Object.keys(questionData.answers).map(key => `
            <label>
                <input type="radio" name="question" value="${key}">
                <span onclick="checkAnswer('${key}')">${questionData.answers[key]}</span>
            </label>
        `).join('')}
    `;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetTimer();
            showQuestion(currentQuestionIndex);
        } else {
            clearInterval(timerInterval);
            document.getElementById('result').innerHTML = "¡Has completado el quiz!";
            document.querySelector('.next-button').style.display = 'block'; // Muestra el botón de avanzar
        }
    } else {
        document.getElementById('result').innerHTML = "Respuesta incorrecta. Intenta de nuevo.";
    }
}

function startTimer() {
    const timer = document.getElementById('timer');
    let width = 100;
    timerInterval = setInterval(() => {
        if (width <= 0) {
            clearInterval(timerInterval);
            document.getElementById('result').innerHTML = "¡Se acabó el tiempo!";
        } else {
            width--;
            timer.style.width = width + '%';
        }
    }, 100);
}

function resetTimer() {
    clearInterval(timerInterval);
    const timer = document.getElementById('timer');
    timer.style.width = '100%';
    startTimer();
}

function goToColorsPage() {
    window.location.href = 'colores.html';
}

document.addEventListener('DOMContentLoaded', startQuiz);
