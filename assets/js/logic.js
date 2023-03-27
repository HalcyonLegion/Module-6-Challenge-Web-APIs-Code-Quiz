
//Ok so going by the HTML I definitely need a timer. Lesson 7 had a good example of this.
let timer;
let timeRemaining = 0;

//The Questions appears to be another JS file. I remember in Lesson 7 the words to guess were in an array, will the questions need to be like that too..? But they were in the same JS file. Maybe this is why questions.js is above the logic.js as they need to load first.
let currentQuestionIndex = 0;

//Score initialised here
let score = 0;

//Making sure all the ID's are grabbed
const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionContainer = document.getElementById("questions");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

//Simple event listener to start the Quiz
startButton.addEventListener("click", startQuiz);

//Function to start the quiz, including the timer, time remaining, where the question index is (can I randomise this?) and what the Score is.
function startQuiz() {
  timeRemaining = 75;
  timerElement.textContent = timeRemaining;
  currentQuestionIndex = 0;
  score = 0;

  //Creates the illusion that the page is transitioning between screens when it's actually just hiding and showing elements when triggered.
  document.getElementById("start-screen").classList.add("hide");
  questionContainer.classList.remove("hide");

  //Makes the timer countdown start with the startQuiz function. Updates the timeRemaining span on the HTML. If the timer hits 0 the quiz ends.
  timer = setInterval(function() {
    timeRemaining--;
    timerElement.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);

  //Then the next question in the index is queued up.
  showNextQuestion();
}

//This will queue up the questions until they are all answered/used. I'll need to tell it how to advance through the array later?
function showNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  //Accesses my Questions Array and grabs the title and updates the appropriate element.
  const question = questions[currentQuestionIndex];
  questionTitleElement.textContent = question.title;
  choicesElement.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice");
    button.addEventListener("click", () => selectAnswer(index));
    choicesElement.appendChild(button);
  });
}

//Accesses my Questions Array and grabs the Answer to check whether the selection is the right or wrong one.
function selectAnswer(choiceIndex) {
  const question = questions[currentQuestionIndex];
  const correctAnswer = question.answer === question.choices[choiceIndex];

  //Going to try and use the Audio provided!
  var incorrect = new Audio("./assets/sfx/incorrect.wav");
  var correct = new Audio("./assets/sfx/correct.wav");

  //Implementing the penalty and the score increment. As well as the appropriate sounds! Also updated the feedback element to show either Wrong or Correct as an added bonus, then to hide itself after 2 seconds.
  if (!correctAnswer) {
    feedbackElement.textContent = "Wrong!";
    feedbackElement.classList.remove("hide");
    setTimeout(() => {
      feedbackElement.classList.add("hide");
    }, 2000);
    incorrect.play();
    timeRemaining -= 10;
  } else {
    feedbackElement.textContent = "Correct!";
    feedbackElement.classList.remove("hide");
    setTimeout(() => {
      feedbackElement.classList.add("hide");
    }, 2000);
    correct.play();
    score += 10;
  }

  //Advances the Question Index and then grabs the next one.
  currentQuestionIndex++;
  showNextQuestion();
}

//What happens when the quiz ends? I need to hide the questions and display the end screen. This contains the final score and a space I can enter initials.
function endQuiz() {
  clearInterval(timer);
  questionContainer.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScoreElement.textContent = score;
}

//The logic that lets me save the high score.
submitButton.addEventListener("click", saveHighscore);

//My function to save the high score and store it as JSON to keep it in the localstorage so it doesn't get removed.
function saveHighscore() {
  const initials = initialsInput.value.trim();

  //Will always save the Initials as Uppercase, retro style! Also prevents people submitting Blank entries on a similar timer to the one I implemented earlier.
  if (initials) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const newScore = {
      initials: initials.toUpperCase(),
      score: score,
    };

    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  } else {
    feedbackElement.textContent = "Please enter initials!";
    feedbackElement.classList.remove("hide");
    setTimeout(() => {
      feedbackElement.classList.add("hide");
    }, 2000);
  }
}