// fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
// .then(response =>response.json())


// async function quizesapp(){
//     const main = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
//     const data = await main.json();
//     console.log(data);
//     // let m = document.getElementById('container1');

// }
// quizesapp();




// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
        .then(response => response.json())
        .then(data => {
            startQuiz(data.results); 
        })
        .catch(error => console.error('Error fetching quiz data:', error));
});

let currentQuestionIndex = 0;
let quizData = [];
let correctAnswer = "";
let selectedElement = null;

function startQuiz(data) {
    quizData = data; 
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const question = quizData[currentQuestionIndex];

        document.querySelector('.container1 h1').textContent = question.question; 

        const answers = [...question.incorrect_answers];
        correctAnswer = question.correct_answer; 
        answers.push(correctAnswer);
        shuffleArray(answers); 

        document.querySelectorAll('.main .code').forEach(element => {
            element.classList.remove('correct', 'incorrect');
        });

        document.querySelectorAll('.main .code').forEach((element, index) => {
            if (answers[index]) {
                element.querySelector('h1').textContent = `${String.fromCharCode(65 + index)}: ${answers[index]}`;
                element.style.display = 'block'; 
                element.onclick = () => checkAnswer(answers[index], element);
            } else {
                element.style.display = 'none'; 
            }
        });
    } else {
        document.querySelector('.container1 h1').textContent = "Quiz Finished!";
        document.querySelector('.main').innerHTML = ""; 
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkAnswer(selectedAnswer, selectedElement) {

    document.querySelectorAll('.main .code').forEach(element => {
        element.onclick = null; 
    });

    if (selectedAnswer === correctAnswer) {
        selectedElement.classList.add('correct'); 
    } else {
        selectedElement.classList.add('incorrect');

        document.querySelectorAll('.main .code').forEach(element => {
            if (element.querySelector('h1').textContent.includes(correctAnswer)) {
                element.classList.add('correct'); 
            }
        });
    }

   
    setTimeout(() => {
        currentQuestionIndex++; 
        loadQuestion();
    }, 2000); 
}
