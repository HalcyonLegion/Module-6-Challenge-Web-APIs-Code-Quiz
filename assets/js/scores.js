//Grabbing the 2 ID's on the page

const highscoresList = document.getElementById("highscores-list");
const clearButton = document.getElementById("clear");

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscores
  .sort((a, b) => b.score - a.score)
  .forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    highscoresList.appendChild(li);
  });

clearButton.addEventListener("click", () => {
    localStorage.removeItem("highscores");
    highscoresList.innerHTML = "";
    });