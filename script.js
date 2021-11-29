//Main section var
var quiz_sections = document.querySelectorAll(".quiz-section");
//start var
var start_section = document.getElementById("start");
var start_btn = document.getElementById("start-btn");
//Quiz section var
var quiz_section = document.getElementById("quiz-questions");
var time_remaining = document.getElementById("time-remaining");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choice_status = document.querySelectorAll(".choice-status");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");
//End section var
var end_section = document.getElementById("end");
var end_title = document.getElementById("end-title");
var score = document.getElementById("score");
var inital_input = document.getElementById("initials");
var submit_score = document.getElementById("submit-score");
var error_message = document.getElementById("error-message");
//questions made  for var and also displays the correct answer
class questions {
    constructor(question, choices, indexOfCorrectChoice) {
      this.question = question;
      this.choices = choices;
      this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
var questions_1 = new questions("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
var questions_2 = new questions("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
var questions_3 = new questions("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
var questions_4 = new questions("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
var questions_5 = new questions("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
var question_list = [questions_1, questions_2, questions_3, questions_4, questions_5];
//declaring blocked local scope var
let currentQuestions = 0;
let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout;
//our event listeners for start button, choices and submitting the score.
start_btn.addEventListener('click', startGame);
choices.addEventListener('click', processChoice);
submit_score.addEventListener('submit', processInput);
//function to start the game
function startGame() {
    showElement(quiz_sections, quiz_section);
    
    displayTime();  
    displayQuestion();
  
    startTimer();
  } 
// function to show and hide certain elements
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
//Displays current time 
    function displayTime() {
        time_remaining.textContent = totalTime;
    }
//Starts timer for questions
    function startTimer() {
        totalTimeInterval = setInterval(function() {
            totalTime--;
            displayTime();
            checkTime();
        }, 1000);
    }
// declares when the timer is up  
    function checkTime() {
        if (totalTime <= 0) {
            totalTime = 0;
            endGame();
        }
    }
//displays question
    function displayQuestion() {
        question.textContent = question_list[currentQuestions].question;
        displayChoiceList();
    }
// displays choice list
    function displayChoiceList() {
        choices.innerHTML = "";
  
        question_list[currentQuestions].choices.forEach(function(answer, index) {
            var li = document.createElement("li");
            li.dataset.index = index;
            var button = document.createElement("button");
            button.textContent = (index + 1) + ". " + answer;
            li.appendChild(button);
            choices.appendChild(li);
        });
    }
//function is for when the user answers a question.
  function processChoice(event) {
    var userChoice = parseInt(event.target.parentElement.dataset.index);
    resetChoiceStatusEffects();
    checkChoice(userChoice);
    getNextQuestion();
  }

//Displays choices status
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
      
// check whether the user choice the correct or incorrect choice
  function checkChoice(userChoice) {
        if (isChoiceCorrect(userChoice)) {
          displayCorrectChoiceEffects();
        } 
        else {
          displayWrongChoiceEffects();
        }
    }
// confirms the correct choice     
    function isChoiceCorrect(choice) {
        return choice === question_list[currentQuestions].indexOfCorrectChoice;
    }
// confirms the wrong choice and its effects     
    function displayWrongChoiceEffects() {
        deductTimeBy(10);
      
        styleTimeRemainingWrong();
        showElement(choice_status, wrong);
      
        choiceStatusTimeout = setTimeout(function() {
          hideElement(wrong);
          styleTimeRemainingDefault();
        }, 1000);
    }
//deducts the time by 10 for chooseing the wrong choice     
    function deductTimeBy(seconds) {
        totalTime -= seconds;
        checkTime();
        displayTime();
    }
//displays the correct choice effects      
    function displayCorrectChoiceEffects() {
        showElement(choice_status, correct);
      
        choiceStatusTimeout = setTimeout(function() {
          hideElement(correct);
        }, 1000);
    }
      
//Goes to the next question
    function getNextQuestion() {
        currentQuestions++;
        if (currentQuestions >= question_list.length) {
          endGame();
        } else {
          displayQuestion();
        }
    }
//End game
    function endGame() {
        clearInterval(totalTimeInterval);
        showElement(quiz_sections, end_section);
        displayScore();
        setEndHeading();
    }
//displays final score
    function displayScore() {
        score.textContent = totalTime;
    }
// determines whether user ran out of time or finished the quiz 
    function setEndHeading() {
        if (totalTime === 0) {
            end_title.textContent = "Sorry! time out!";
        } 
        else {
            end_title.textContent = "Congrats! Your done!";
        }
    }
// inputs initials with the users score on the highscores
    function processInput(event) {
        event.preventDefault();
      
        var initials = inital_input.value.toUpperCase();
      
        if (isInputValid(initials)) {
          var score = totalTime;
          var highscoreEntry = getNewHighscoreEntry(initials, score);
          saveHighscoreEntry(highscoreEntry);
          window.location.href= "./highscores.html";
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
        } 
        else if (initials.match(/[^a-z]/ig)) {
          errorMessage = "Initials may only include letters."
          displayFormError(errorMessage);
          return false;
        } 
        else {
          return true;
        }
      }
//saves new highscores
      function saveHighscoreEntry(highscoreEntry) {
        const currentScores = getScoreList();
        placeEntryInHighscoreList(highscoreEntry, currentScores);
        localStorage.setItem('scoreList', JSON.stringify(currentScores));
      }
      


