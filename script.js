//Section list
var quiz_sections = document.querySelectorAll(".quiz-section");

//Start
var start_section = document.getElementById("start");
var start_btn = document.getElementById("start-btn");

//Quiz questions
var quiz_section = document.getElementById("quiz-questions");
var time_remaining = document.getElementById("time-remaining");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choice_status = document.querySelectorAll(".choice-status");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

//End
var end_section = document.getElementById("end");
var end_title= document.getElementById("end-title");
var score = document.getElementById("score");
var initials_input = document.getElementById("initials");
var submit_score = document.getElementById("submit-score");
var error_message= document.getElementById("error-message");

//Questions
class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
var question_1 = new Question("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
var question_2 = new Question("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
var question_3 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
var question_4 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
var question_5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
var question_list = [question_1, question_2, question_3, question_4, question_5];

let currentQuestion = 0;

let totalTime = 60;
let totalTimeInterval;
let choiceStatusTimeout; 

// Event listners for start button, choices and submit your score
start_btn.addEventListener('click', startGame);
choices.addEventListener('click', processChoice);
submit_score.addEventListener('submit', processInput);

/******** START GAME ********/ 
function startGame() {
  showElement(quiz_sections, quiz_section);
  
  displayTime();  
  displayQuestion();

  startTimer();
}

/******** SHOWING/HIDING ELEMENTS ********/ 
function showElement(siblingList, showElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  showElement.classList.remove("hidden");
} 
function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}
/******** TIME ********/ 
function displayTime() {
  time_remaining.textContent = totalTime;
}
function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}
function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}
/******** QUESTIONS ********/ 
function displayQuestion() {
  question.textContent = question_list[currentQuestion].question;

  displayChoiceList();
}

function displayChoiceList() {
  choices.innerHTML = "";

  question_list[currentQuestion].choices.forEach(function(answer, index) {
    var li = document.createElement("li");
    li.dataset.index = index;
    var button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    choices.appendChild(li);
  });
}

//when user answers a question
function processChoice(event) {
  var userChoice = parseInt(event.target.parentElement.dataset.index);
  resetChoiceStatusEffects();
  checkChoice(userChoice);
  getNextQuestion();
}

//Displaying choice statuses
function resetChoiceStatusEffects() {
  clearTimeout(choiceStatusTimeout);
  styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
  time_remaining.style.color = "#4616E8";
}

function styleTimeRemainingWrong() {
  time_remaining.style.color = "#E81648";
}

function checkChoice(userChoice) {
  if (isChoiceCorrect(userChoice)) {
    displayCorrectChoiceEffects();
  } else {
    displayWrongChoiceEffects();
  }
}

function isChoiceCorrect(choice) {
  return choice === question_list[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
  deductTimeBy(10);

  styleTimeRemainingWrong();
  showElement(choice_status, wrong);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(wrong);
    styleTimeRemainingDefault();
  }, 1000);
}

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function displayCorrectChoiceEffects() {
  showElement(choice_status, correct);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(correct);
  }, 1000);
}

//Get next question
function getNextQuestion() {
  currentQuestion++;
  if (currentQuestion >= question_list.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

// end game function 
function endGame() {
  clearInterval(totalTimeInterval);
  
  showElement(quiz_sections, end_section);
  displayScore();
  setEndHeading();
}

function displayScore() {
  score.textContent = totalTime;
}

function setEndHeading() {
  if (totalTime === 0) {
    end_title.textContent = "Sorry! You ran out of time!";
  } else {
    end_title.textContent = "Congratulations! You answered all the questions before your time ran out!";
  }
}

/******** SUBMITTING INITIALS ********/ 
function processInput(event) {
  event.preventDefault();

  var initials = initials_input.value.toUpperCase();

  if (isInputValid(initials)) {
    var score = totalTime;
    var highscoreEntry = getNewHighscoreEntry(initials, score);
    saveHighscoreEntry(highscoreEntry);
    window.location.href= "highscore.html";
  }
}

function getNewHighscoreEntry(initials, score) {
  var entry = {
    initials: initials,
    score: score,
  }
  return entry;
}

function isInputValid(initials) {
  let errorMessage = "";
  if (initials === "") {
    errorMessage = "You can't submit empty initials!";
    displayFormError(errorMessage);
    return false;
  } else if (initials.match(/[^a-z]/ig)) {
    errorMessage = "Initials may only include letters."
    displayFormError(errorMessage);
    return false;
  } else {
    return true;
  }
}

function displayFormError(errorMessage) {
  errorMessage.textContent = errorMessage;
  if (!initials_input.classList.contains("error")) {
    initials_input.classList.add("error");
  }
}

function saveHighscoreEntry(highscoreEntry) {
  var currentScores = getScoreList();
  placeEntryInHighscoreList(highscoreEntry, currentScores);
  localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
  var currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
  var newScoreIndex = getNewScoreIndex(newEntry, scoreList);
  scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
  if (scoreList.length > 0) {
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].score <= newEntry.score) {
        return i;
      }
    } 
  }
  return scoreList.length;
}


