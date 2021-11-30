//Highscores var
var highscore_table = document.getElementById("highscores-table");
var clear_highscore_btn = document.getElementById("clear-highscores");

//The event listener
clear_highscore_btn.addEventListener('click', clearHighscores);

//Loads table when page loaded
generateHighscoresTable();

function generateHighscoresTable() {
  let highscores = localStorage.getItem("scoreList");
  if (highscores) {
    addHighscoreTableRows(highscores);
  } 
}

//generates highscore to the the table
function addHighscoreTableRows(highscores) {
  highscores = JSON.parse(highscores);

  highscores.forEach(function(scoreItem, index) {
    var rankCell = createRankCell(index + 1);
    var scoreCell = createScoreCell(scoreItem.score);
    var initialsCell = createInitialsCell(scoreItem.initials);
    var highscoreTableRow = createHighscoreTableRow(rankCell, scoreCell, initialsCell);
    highscoreTableRow.appendChild(highscoreTableRow);
  });
}

function createRankCell(rank) {
  var rankCell = document.createElement('td');
  rankCell.textContent = `#${rank}`;
  return rankCell;
}

function createScoreCell(score) {
  var scoreCell = document.createElement('td');
  scoreCell.textContent = score;
  return scoreCell;
}

function createInitialsCell(initials) {
  var initialsCell = document.createElement('td');
  initialsCell.textContent = initials;
  return initialsCell;
}

function createHighscoreTableRow(rankCell, scoreCell, initialsCell) {
  var tableRow = document.createElement('tr');
  tableRow.appendChild(rankCell);
  tableRow.appendChild(scoreCell);
  tableRow.appendChild(initialsCell);
  return tableRow;
}

//Clears the table
function clearHighscores() {
  localStorage.setItem('scoreList', []);
  while (highscore_table.children.length > 1) {
    highscore_table.removeChild(highscore_table.lastChild);
  }
}