      // Starting by applying my variables needed
      var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container");
      var containerScoreEl = document.getElementById("score-banner");
      var formInitials = document.getElementById("initials-form");
      var containerHighScoresEl = document.getElementById("high-score-container");
      var ViewHighScoreEl = document.getElementById("view-score");
      var listHighScoreEl = document.getElementById("high-score-list");
      var correctEl = document.getElementById("correct");
      var wrongEl = document.getElementById("wrong");
      
      // Setting variables for my buttons
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back"); // stands for restarting the quiz
      var btnClearScoresEl = document.querySelector("#clear-high-scores"); // stands for clearing the scores
      
      //creating variables for the questions and answers and the timer involved
      var questionEl = document.getElementById("question");
      var answerbuttonsEl = document.getElementById("answer-buttons");
      var timerEl = document.querySelector("#timer");
      var score = 0; // I'm starting my score at 0
      var timeleft;
      var gameover;
      timerEl.innerText = 0;

      // we want the array for high score
      var HighScores = [];

       //assign array details for questions 
      var arrayQuestions
      var QuestionIndex = 0

      // Questions that our quiz will have
      var questions = [
        //question 1
        { q: 'What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?', 
          a: '4. While Loop', 
          choices: [{choice: '1. Conditional Loop'}, {choice: '2. Else Loop'}, {choice: '3. Conditional Loop'}, {choice: '4. While Loop'}]
        },
           //question 2
        { q: 'In JavaScript, what is a block of code called that is used to perform a specific task?', 
          a: '3. Function', 
          choices: [{choice: '1. Declaration'}, {choice: '2. Variable'}, {choice: '3. Function'}, {choice: '4. String'}]
        },
           //question 3
        { q: 'In JavaScript, what element is used to store multiple values in a single variable?', 
          a: '1. Arrays', 
          choices: [{choice: '1. Arrays'}, {choice: '2. Variables'}, {choice: '3. Function'}, {choice: '4. all of the above'}]
        },
           //question 4
        { q: 'What syntax would call a function?', 
          a: '4. function()', 
          choices: [{choice: '1. var function'}, {choice: '2. function'}, {choice: '3. call function'}, {choice: '4. function()'}]
        },
           //question 5
        { q: 'Where is the JavaScript placed inside an HTML document or page?', 
          a: '1. In the <body> and <head> sections.', 
          choices: [{choice: '1. In the <body> and <head> sections.'}, {choice: '2. In the <footer> section.'}, {choice: '3. In the <title> section'}, {choice: '4. In the <meta> section.'}]
        },
        
      ];
      
        // Setting how my questions will be coming up by hiding or showing depending on my answers and the button I click
    var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerStartEl.classList.remove("hide")
        containerStartEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    //Setting the functio for the time that is "left" once the quiz begins
        var setTime = function () {
            timeleft = 75; //Starting the game with 75 seconds available
            
            
    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--;

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft <0) { // When I run out of time then I get directly shown the score
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
        }, 1000)
    }

    var startGame = function() {
        //add classes to show/hide start and quiz screen
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');

        //Shuffle the questions so they show in random order
        arrayQuestions = questions.sort()
        setTime()
        setQuestion()
      }
    
    //set next question for quiz
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayQuestions[QuestionIndex])
    }

    //remove answer buttons
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    //display question information (including answer buttons)
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };

    //display correct on the below screen
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  

    //display wrong on the below screen
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //check if answer is correct    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = timeleft // our points should be the amount of time we have
            }

            else {
              answerWrong()
              timeleft= timeleft - 10; //penalizing the time left
              score = timeleft; // making sure that my score is the timeleft I have in the previous value
          };

        //go to next question, check if there is more questions
          QuestionIndex++
            if  (arrayQuestions.length > QuestionIndex) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

        //Display total score screen at end of game
    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Score: " + score);
        containerScoreEl.appendChild(scoreDisplay);
    }       
    
    //what happens if they don't fill out the box and click submit? an alert should come up
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Please enter your initials.");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

      //push and sort scores
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    //have visibility on the list of the initials that were on the quiz
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }
    //save high score
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
    }

    //loading my values in the high scores
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //display high score screen from link or when intiials entered
    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    //clears high scores
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame)
      //on submit button to begin the quiz
      formInitials.addEventListener("submit", createHighScore)
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores)
      //when wanting to restarte the quiz (go-back)
      btnGoBackEl.addEventListener("click", renderStartPage)
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores)
