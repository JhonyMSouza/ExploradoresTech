// Quiz com perguntas sobre programação do zero, lógica, IDEs e primeiros passos
const quizDataOriginal = [
    { question: "O que significa programar?", options: ["Montar computadores", "Ensinar o computador a executar tarefas", "Desenhar gráficos", "Instalar jogos"], answer: 1 },
    { question: "Qual destas linguagens é ideal para iniciantes e crianças?", options: ["Scratch", "C++", "Java", "Assembly"], answer: 0 },
    { question: "O que é um algoritmo?", options: ["Um tipo de computador", "Sequência de passos para resolver um problema", "Um programa de desenho", "Um antivírus"], answer: 1 },
    { question: "Qual destas é uma variável válida em Python?", options: ["nome", "2nome", "@nome", "#nome"], answer: 0 },
    { question: "Qual operador é usado para somar dois valores?", options: ["-", "+", "*", "/"], answer: 1 },
    { question: "O que faz a estrutura de decisão 'if'?", options: ["Repete ações", "Toma decisões com base em condições", "Desenha gráficos", "Salva arquivos"], answer: 1 },
    { question: "Qual comando exibe uma mensagem na tela em Python?", options: ["show()", "print()", "display()", "echo()"], answer: 1 },
    { question: "Qual destas é uma IDE visual indicada para crianças e idosos?", options: ["Scratch", "VS Code", "Thonny", "Repl.it"], answer: 0 },
    { question: "Qual site permite programar sem instalar nada?", options: ["Repl.it", "Thonny", "VS Code", "Scratch"], answer: 0 },
    { question: "O que é necessário para instalar o Thonny?", options: ["Comprar licença", "Baixar do site oficial", "Instalar antivírus", "Ter um smartphone"], answer: 1 },
    { question: "Qual estrutura permite repetir ações várias vezes?", options: ["if", "for", "print", "else"], answer: 1 },
    { question: "Qual destes é um tipo de dado?", options: ["Booleano", "Monitor", "Planilha", "Mouse"], answer: 0 },
    { question: "Qual extensão do arquivo para programas Python?", options: [".exe", ".py", ".doc", ".html"], answer: 1 },
    { question: "Qual destas é uma boa prática ao programar?", options: ["Testar o código", "Ignorar erros", "Não salvar arquivos", "Compartilhar senhas"], answer: 0 },
    { question: "Qual ambiente suporta várias linguagens e é fácil de instalar?", options: ["VS Code", "Scratch", "Word", "Excel"], answer: 0 },
    { question: "O que é necessário para começar a programar?", options: ["Ter vontade de aprender", "Saber matemática avançada", "Ser adulto", "Ter computador caro"], answer: 0 },
    { question: "Qual destes é um exemplo de estrutura de repetição?", options: ["for", "if", "print", "else"], answer: 0 },
    { question: "Qual comando pede uma informação ao usuário em Python?", options: ["input()", "print()", "show()", "ask()"], answer: 0 },
    { question: "Qual destas IDEs é recomendada para quem quer aprender Python?", options: ["Thonny", "Word", "Excel", "Photoshop"], answer: 0 },
    { question: "Qual destas linguagens é usada para criar sites?", options: ["JavaScript", "Python", "C++", "Scratch"], answer: 0 }
];

let quizData = [];
let usedIndexes = [];

let currentQuestion = 0;
let score = 0;
let wrongAnswers = 0;

function updateScoreBoard() {
    document.getElementById('score').textContent = score;
    if(document.getElementById('wrong-score')) {
        document.getElementById('wrong-score').textContent = wrongAnswers;
    }
}

function showQuestion() {
    const container = document.getElementById('quiz-container');
    updateScoreBoard();
    if (usedIndexes.length < quizData.length) {
        // Seleciona um índice ainda não usado
        let idx;
        do {
            idx = Math.floor(Math.random() * quizData.length);
        } while (usedIndexes.includes(idx));
        usedIndexes.push(idx);
        const q = quizData[idx];
        container.innerHTML = `<div style='display:flex;flex-direction:column;gap:1rem;'>
            <p><strong>${usedIndexes.length}.</strong> ${q.question}</p>
            <div style='display:flex;flex-direction:column;gap:0.7rem;'>
                ${q.options.map((opt, i) => `<button class='cta-btn' style='width:100%;text-align:left;' data-opt='${i}'>${opt}</button>`).join('')}
            </div>
        </div>`;
        // Salva o índice da questão atual para checar resposta
        showQuestion.currentIdx = idx;
    } else {
        container.innerHTML = `<p>Quiz finalizado!<br>Respostas corretas: ${score}<br>Respostas erradas: ${wrongAnswers}<br>Pontuação: ${score}/${quizData.length}</p><button class='cta-btn' id='restart-quiz'>Reiniciar Quiz</button>`;
        updateScoreBoard();
        // Botão de reinício
        const restartBtn = document.getElementById('restart-quiz');
        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                document.getElementById('start-quiz').style.display = '';
                container.innerHTML = '';
            });
        }
    }
}

function answer(selected) {
    const idx = showQuestion.currentIdx;
    if (selected === quizData[idx].answer) {
        score++;
    } else {
        wrongAnswers++;
    }
    showQuestion();
}

function shuffleQuiz() {
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
}


// Inicialização segura após DOM pronto
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const scoreBoard = document.getElementById('score-board');
    if (!startBtn || !quizContainer || !scoreBoard) return;

    startBtn.addEventListener('click', function() {
        // Copia e embaralha as perguntas originais
        quizData = quizDataOriginal.slice();
        shuffleQuiz();
        currentQuestion = 0;
        score = 0;
        wrongAnswers = 0;
        usedIndexes = [];
        scoreBoard.innerHTML = `Pontuação: <span id='score'>0</span> | Erradas: <span id='wrong-score'>0</span>`;
        showQuestion();
        startBtn.style.display = 'none';
    });

    // Event delegation para respostas
    quizContainer.addEventListener('click', function(e) {
        if (e.target && e.target.matches('button.cta-btn[data-opt]')) {
            const selected = parseInt(e.target.getAttribute('data-opt'));
            answer(selected);
        }
    });
});
