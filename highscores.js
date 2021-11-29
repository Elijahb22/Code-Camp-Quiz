//Highscore vars
var highscore_table = document.getElementById("highscores-table");
var clear_highscore_btn = document.getElementById("clear-highscores");
//Event listener to clear highscores
clear_highscore_btn.addEventListener('click', clearHighscores);
//This loads the highscore table
generateHighscoresTable();
function generateHighscoresTable() {
  let highscores = localStorage.getItem("scoreList");
  if (highscores) {
    addHighscoreTableRows(highscores);
  } 
}
