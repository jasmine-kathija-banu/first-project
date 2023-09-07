const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: `&ltscript&gt`, correct: true },
      { text: "&ltjs&gt", correct: false },
      { text: "&ltjavascript&gt", correct: false },
      { text: "&ltscripting&gt", correct: false },
    ],
  },

  {
    question: `What is the correct JavaScript syntax to change the content of the HTML element below?
  
          &ltp id="demo"&gtThis is a demonstration.&lt/p&gt`,
    answers: [
      {
        text: `document.getElementByName("p").innerHTML = "Hello World!";`,
        correct: false,
      },
      {
        text: `document.getElementById("demo").innerHTML = "Hello World!"; `,
        correct: true,
      },
      {
        text: `document.getElement("p").innerHTML = "Hello World!";`,
        correct: false,
      },
      { text: `#demo.innerHTML = "Hello World!";`, correct: false },
    ],
  },

  {
    question: `Where is the correct place to insert a JavaScript?`,
    answers: [
      { text: `The &ltbody&gt section `, correct: false },
      {
        text: `Both the &lthead&gt section and the &ltbody&gt section are correct`,
        correct: true,
      },
      { text: `The &lthead&gt section`, correct: false },
      { text: `No need to insert`, correct: false },
    ],
  },

  {
    question: `What is the correct syntax for referring to an external script called "xxx.js"?`,
    answers: [
      { text: `&ltscript src="xxx.js"&gt `, correct: true },
      { text: `&ltscript href="xxx.js"&gt`, correct: false },
      { text: `&ltscript name="xxx.js"&gt`, correct: false },
      //{text:  ,correct:  }
    ],
  },

  {
    question: `The external JavaScript file must contain the &ltscript&gt tag.`,
    answers: [
      { text: `False  `, correct: true },
      { text: `True`, correct: false },
      //{text:  ,correct:  },
      //{text:  ,correct:  }
    ],
  },

  {
    question: `How do you write "Hello World" in an alert box?`,
    answers: [
      { text: `alert("Hello World");`, correct: true },
      { text: `msgBox("Hello World");`, correct: false },
      { text: `alertBox("Hello World");`, correct: false },
      { text: `msg("Hello World");`, correct: false },
    ],
  },
  {
    question: `How do you create a function in JavaScript?`,
    answers: [
      { text: `function myFunction()  `, correct: true },
      { text: `function = myFunction()`, correct: false },
      { text: `function:myFunction()`, correct: false },
      //{text:  ,correct:  }
    ],
  },

  {
    question: `How do you call a function named "myFunction"?`,
    answers: [
      { text: `myFunction()  `, correct: true },
      { text: `call myFunction()`, correct: false },
      { text: `call function myFunction()`, correct: false },
      { text: `my function`, correct: false },
    ],
  },

  {
    question: `How to write an IF statement in JavaScript?`,
    answers: [
      { text: `if (i == 5) `, correct: true },
      { text: `if i = 5 then`, correct: false },
      { text: `if i = 5`, correct: false },
      { text: `if i == 5 then `, correct: false },
    ],
  },

  {
    question: `How does a WHILE loop start?`,
    answers: [
      { text: `while (i &lt= 10)  `, correct: true },
      { text: `while (i &lt= 10; i++)`, correct: false },
      { text: `while i = 1 to 10`, correct: false },
      { text: `while()`, correct: false },
    ],
  },

  {
    question: `How does a FOR loop start?`,
    answers: [
      { text: `for (i = 0; i &lt= 5; i++)  `, correct: true },
      { text: `for (i &lt= 5; i++)`, correct: false },
      { text: `for i = 1 to 5`, correct: false },
      { text: `for (i = 0; i &lt= 5)`, correct: false },
    ],
  },

  {
    question: `What is the correct way to write a JavaScript array?`,
    answers: [
      { text: `var colors = ["red", "green", "blue"]  `, correct: true },
      { text: `var colors = (1:"red", 2:"green", 3:"blue")`, correct: false },
      {
        text: `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
        correct: false,
      },
      { text: `var colors = "red", "green", "blue"`, correct: false },
    ],
  },
];

//  ---------------------------------------------

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showquestion();
}

function showquestion() {
  resetState();
  let currentquestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentquestion.question;

  currentquestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//  ------------remove buttons--------------
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
// -----button color change according to answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    var audio = new Audio("music/right ans.mp3");
    audio.play();
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.classList.add("but");
    var audio = new Audio('music/wrong ans.mp3');
    audio.play();

  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// -----show score

function showScore() {
  resetState();
  if (score > 10) {
    questionElement.innerHTML = `whoohoo...Congratulations! You scored ${score} out of ${questions.length}!`;
  } else if (score >= 7 && score <= 10) {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
  } else {
    questionElement.innerHTML = `Sorry! You scored only ${score} out of ${questions.length}! Try Again...`;
  }

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

//------next button shows
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showquestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startquiz();
  }
});

startquiz();


//----------for showing date and time---------

var date = new Date();

var day =
  ("0" + date.getDate()).slice(-2) +
  "-" +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  date.getFullYear();
document.getElementById("p1").innerHTML = day;

function showTime() {
  var date = new Date(); // Create a Date object to get the current time
  var time =
    ("0" + (date.getHours() % 12)).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);
  document.getElementById("p2").innerHTML = time;
  if (date.getHours() > 12) {
    document.getElementById("p2").innerHTML = time + " PM";
  } else {
    document.getElementById("p2").innerHTML = time + " AM";
  }
}
setInterval(showTime, 1000);
