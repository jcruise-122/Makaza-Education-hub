here// ===============================
// Past Papers Website - script.js
// ===============================

// Wait until the page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // Search functionality
    // -------------------------------
    const searchInput = document.getElementById("searchInput");
    const papers = document.querySelectorAll(".paper-card");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase().trim();

            papers.forEach(function (paper) {
                const text = paper.textContent.toLowerCase();

                if (text.includes(searchTerm)) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Country filter
    // -------------------------------
    const countryFilter = document.getElementById("countryFilter");

    if (countryFilter) {
        countryFilter.addEventListener("change", function () {
            const selectedCountry = countryFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const country = paper.dataset.country
                    ? paper.dataset.country.toLowerCase()
                    : "";

                if (selectedCountry === "all" || country === selectedCountry) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Subject filter
    // -------------------------------
    const subjectFilter = document.getElementById("subjectFilter");

    if (subjectFilter) {
        subjectFilter.addEventListener("change", function () {
            const selectedSubject = subjectFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const subject = paper.dataset.subject
                    ? paper.dataset.subject.toLowerCase()
                    : "";

                if (
                    selectedSubject === "all" ||
                    subject === selectedSubject
                ) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Paid explanations
    // -------------------------------
    const paidButtons = document.querySelectorAll(".paid-answer");

    paidButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert(
                "The explained answer costs K1.00. " +
                "Payment can be made using MTN Mobile Money, " +
                "Airtel Money, Zamtel Money or supported bank options."
            );
        });
    });


    // -------------------------------
    // Mobile menu
    // -------------------------------
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });
    }


    // -------------------------------
    // Back to top button
    // -------------------------------
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // -------------------------------
    // Current year in footer
    // -------------------------------
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
// ===============================
// QUIZ SYSTEM
// ===============================

let quizQuestions = [];
let currentQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;

// Start a quiz
function startQuiz(questions) {
    quizQuestions = questions;
    currentQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;

    showQuestion();
}

// Display the current question
function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("quiz-result");

    if (!questionElement || !answersElement) {
        console.log("Quiz elements not found.");
        return;
    }

    if (currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[currentQuestion];

    questionElement.textContent =
        `${currentQuestion + 1}. ${question.question}`;

    answersElement.innerHTML = "";
    selectedAnswer = null;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "quiz-answer";

        button.onclick = function () {
            selectAnswer(index, button);
        };

        answersElement.appendChild(button);
    });

    if (resultElement) {
        resultElement.textContent = "";
    }
}

// Select an answer
function selectAnswer(index, button) {
    const buttons = document.querySelectorAll(".quiz-answer");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAnswer = index;
}

// Submit the current answer
function submitAnswer() {
    if (selectedAnswer === null) {
        alert("Please select an answer first.");
        return;
    }

    const question = quizQuestions[currentQuestion];

    if (selectedAnswer === question.correct) {
        quizScore++;
    }

    currentQuestion++;
    showQuestion();
}

// Display final score
function showQuizResult() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("quiz-result");

    if (questionElement) {
        questionElement.textContent = "Quiz Complete!";
    }

    if (answersElement) {
        answersElement.innerHTML = "";
    }

    if (resultElement) {
        resultElement.textContent =
            `You scored ${quizScore} out of ${quizQuestions.length}.`;
    }
}

// Restart quiz
function restartQuiz() {
    if (quizQuestions.length === 0) {
        return;
    }

    currentQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;

    showQuestion();
}


// ===============================
// TWO-PLAYER / RIVAL QUIZ
// ===============================

let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

function startRivalQuiz(questions) {
    quizQuestions = questions;
    currentQuestion = 0;

    player1Score = 0;
    player2Score = 0;

    currentPlayer = 1;

    showRivalQuestion();
}

function showRivalQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const playerElement = document.getElementById("current-player");

    if (!questionElement || !answersElement) {
        return;
    }

    if (currentQuestion >= quizQuestions.length) {
        showRivalResult();
        return;
    }

    const question = quizQuestions[currentQuestion];

    questionElement.textContent =
        `${currentQuestion + 1}. ${question.question}`;

    answersElement.innerHTML = "";

    if (playerElement) {
        playerElement.textContent =
            `Player ${currentPlayer}'s turn`;
    }

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "quiz-answer";

        button.onclick = function () {
            if (index === question.correct) {
                if (currentPlayer === 1) {
                    player1Score++;
                } else {
                    player2Score++;
                }
            }

            // Switch player
            if (currentPlayer === 1) {
                currentPlayer = 2;
            } else {
                currentPlayer = 1;
                currentQuestion++;
            }

            showRivalQuestion();
        };

        answersElement.appendChild(button);
    });
}

function showRivalResult() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("quiz-result");

    if (questionElement) {
        questionElement.textContent = "Rival Quiz Complete!";
    }

    if (answersElement) {
        answersElement.innerHTML = "";
    }

    if (resultElement) {
        if (player1Score > player2Score) {
            resultElement.textContent =
                `Player 1 wins! ${player1Score} - ${player2Score}`;
        } else if (player2Score > player1Score) {
            resultElement.textContent =
                `Player 2 wins! ${player2Score} - ${player1Score}`;
        } else {
            resultElement.textContent =
                `It's a draw! ${player1Score} - ${player2Score}`;
        }
    }
}


// ===============================
// DOCUMENT SEARCH
// ===============================

function searchDocuments() {
    const searchBox = document.getElementById("search");

    if (!searchBox) {
        return;
    }

    const searchText = searchBox.value.toLowerCase();

    const documents = document.querySelectorAll(".document-card");

    documents.forEach(documentCard => {
        const text = documentCard.textContent.toLowerCase();

        if (text.includes(searchText)) {
            documentCard.style.display = "";
        } else {
            documentCard.style.display = "none";
        }
    });
}


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("show");
    }
}


// ===============================
// PAGE LOADING
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully.");

    const searchBox = document.getElementById("search");

    if (searchBox) {
        searchBox.addEventListener("input", searchDocuments);
    }
});
