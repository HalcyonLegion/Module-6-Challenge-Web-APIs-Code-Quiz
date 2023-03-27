
//My array of questions, ideas to iterate on this and make it better - use a random loop to go through the array so the order is different each time, have an external program write the questions and answers so it's like a true test.

//The Array has 3 components - title, choices and answer which are accessed in other places.

const questions = [
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>", "<javascript>", "<js>", "<scripting>"],
      answer: "<script>",
    },
    {
      title: "The condition in an if / else statement is enclosed within ________",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
    },
    {
      title: "What is the correct syntax for referring to an external script?",
      choices: [
        '<script href="xxx.js">',
        '<script name="xxx.js">',
        '<script src="xxx.js">',
        '<script file="xxx.js">',
      ],
      answer: '<script src="xxx.js">',
    },
    {
      title: "Arrays in JavaScript can be used to store ________",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above",
    },
    // I can add more questions here!
  ];
  