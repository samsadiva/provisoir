let currentQuestion = 0;
let score = 0;
const questions = [
    // Array of your questions and answers
    // { question: '...', options: ['...', '...', '...'], answer: '...' }
];

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];

    if (question) {
        let html = `<h4>${currentQuestion + 1}. ${question.question}</h4>`;
        question.options.forEach((option, index) => {
            html += `<div class="form-check">
                        <input type="radio" class="form-check-input" name="options" value="${index}" required>
                        <label class="form-check-label">${option}</label>
                    </div>`;
        });

        questionContainer.innerHTML = html;
    } else {
        questionContainer.innerHTML = 'No more questions.';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
    }
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            display.textContent = "Time's up!";
            submitExam();
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const submitBtn = document.getElementById('submit-btn');

    loadQuestion();
    startTimer(1200, minutesDisplay);

    document.getElementById('next-btn').addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="options"]:checked');
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value, 10);
            const correctAnswer = questions[currentQuestion].answer;

            if (answerIndex === correctAnswer) {
                score++;
            }

            currentQuestion++;
            loadQuestion();
        } else {
            alert('Please select an option.');
        }
    });

    submitBtn.addEventListener('click', submitExam);
});

function submitExam() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.textContent = `Your score is ${score}/${questions.length}.`;
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
}
