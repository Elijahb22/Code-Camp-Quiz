//Main section var
var quiz_sections = documentary.queryselectorall(".quiz-section");
//start var
var start_section = documentary.getElementId("start");
var start_btn = documentary.getElementId("start-btn");
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
//Questions
class question {
    constructor(question, choices, indexOfCorrectChoice) {
      this.question = question;
      this.choices = choices;
      this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
var question_1 = new question("Commonly used data types DO NOT include: ", 
  ["Strings", "Booleans", "Alerts", "Numbers"], 2);
var question_2 = new question("The condition in an if / else statement is enclosed within ____.", 
  ["Quotes", "Curly brackets", "Parentheses", "Square brackets"], 2);
var question_3 = new question("Arrays in JavaScript can be used to store ____.", 
  ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
var question_4 = new question("String values must be enclosed within _____ when being assigned to variables.", 
  ["Commas", "Curly brackets", "Quotes", "Parentheses"], 2);
var question_5 = new question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["JavaScript", "Terminal/Bash", "For Loops", "console.log"], 3);
var question_list = [question_1, question_2, question_3, question_4, question_5];


