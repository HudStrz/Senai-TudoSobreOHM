const quizData = [
    {
        question: "Qual é a fórmula da Lei de Ohm?",
        a: "V = I / R",
        b: "V = I * R",
        c: "V = R / I",
        d: "V = I^2 * R",
        correct: "b",
    },
    {
        question: "O que representa a letra 'I' na fórmula da Lei de Ohm?",
        a: "Tensão",
        b: "Resistência",
        c: "Corrente",
        d: "Potência",
        correct: "c",
    },
    {
        question: "Na Lei de Ohm, se a resistência aumenta e a tensão permanece constante, o que acontece com a corrente?",
        a: "Aumenta",
        b: "Diminui",
        c: "Permanece a mesma",
        d: "Se torna zero",
        correct: "b",
    },
    {
        question: "A resistência elétrica é medida em:",
        a: "Ohms",
        b: "Volts",
        c: "Amperes",
        d: "Watts",
        correct: "a",
    },
    {
        question: "Qual é a fórmula da Segunda Lei de Ohm?",
        a: "R = ρ * L / A",
        b: "R = ρ / L * A",
        c: "R = ρ * A / L",
        d: "R = L / ρ * A",
        correct: "a",
    },
    {
        question: "O que é resistência elétrica?",
        a: "A oposição ao fluxo de corrente",
        b: "A capacidade de conduzir eletricidade",
        c: "A quantidade de carga elétrica",
        d: "A velocidade dos elétrons",
        correct: "a",
    },
    {
        question: "Qual a unidade de medida da corrente elétrica?",
        a: "Ohms",
        b: "Volts",
        c: "Amperes",
        d: "Watts",
        correct: "c",
    },
    {
        question: "O que acontece com a corrente se a tensão dobrar e a resistência permanecer constante?",
        a: "Dobra",
        b: "Cai pela metade",
        c: "Permanece a mesma",
        d: "Se torna zero",
        correct: "a",
    },
    {
        question: "Qual a unidade de medida da resistência elétrica?",
        a: "Ohms",
        b: "Volts",
        c: "Amperes",
        d: "Watts",
        correct: "a",
    },
    {
        question: "Qual é a relação entre tensão e corrente em um resistor?",
        a: "Proporcional",
        b: "Inversamente proporcional",
        c: "Exponencial",
        d: "Logarítmica",
        correct: "a",
    }
];

let currentQuestion;
let score;
let timer;
let timeLeft;

const startBtn = document.getElementById('start-btn');
const quizContainer = document.querySelector('.quiz-container');
const quizEl = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const backBtn = document.getElementById('back-btn');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
backBtn.addEventListener('click', goBack);

function startQuiz() {
    startBtn.classList.add('hidden');
    quizEl.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    shuffleArray(quizData);
    loadQuestion();
    backBtn.classList.remove('hidden');
    timeLeft = 60; // 1 minuto por pergunta
    resetTimer();
    startTimer();
}

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = `
        <li><button class="option-btn" data-answer="a">${currentQuizData.a}</button></li>
        <li><button class="option-btn" data-answer="b">${currentQuizData.b}</button></li>
        <li><button class="option-btn" data-answer="c">${currentQuizData.c}</button></li>
        <li><button class="option-btn" data-answer="d">${currentQuizData.d}</button></li>
    `;
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedAnswer = e.target.getAttribute('data-answer');
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        timeLeft = 60; // Reinicia o tempo para a próxima pergunta
        resetTimer(); // Reinicia o timer para a próxima pergunta
        startTimer();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);
    quizEl.innerHTML = `
        <h2>Você respondeu ${score}/${quizData.length} perguntas corretamente.</h2>
        ${getFinalMessage()}
        <button id="retry-btn" class="option-btn">Tentar novamente</button>
    `;
    document.getElementById('retry-btn').addEventListener('click', function() {
        window.location.reload();
    });
}

function getFinalMessage() {
    if (score === quizData.length) {
        return `<h3>Parabéns! Você acertou todas as perguntas! 🎉</h3>`;
    } else if (score >= 7) {
        return `<h3>Parabéns! Você acertou ${score} perguntas! 👏</h3>`;
    } else {
        return `<h3>Você acertou ${score} perguntas. Continue praticando! 😊</h3>`;
    }
}

function startTimer() {
    timerEl.innerText = `Tempo restante: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Tempo restante: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
                timeLeft = 60; // Reinicia o tempo para a próxima pergunta
                startTimer(); // Reinicia o timer para a próxima pergunta
            } else {
                showResults();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        timeLeft = 60; // Reinicia o tempo para a próxima pergunta
        resetTimer(); // Reinicia o timer para a próxima pergunta
        startTimer();
    } else {
        showResults();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function goBack() {
    history.back();
}
