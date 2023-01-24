// This is for DOM elements
let questionTitle = document.querySelector("#question-title")
let choicesDiv = document.querySelector("#choices")
let timeEl = document.querySelector("#time")
let saved = document.querySelector(".saved");
let error = document.querySelector(".error");
let endScreen = document.querySelector('#end-screen')
let finalScore = document.querySelector("#final-score")
let submitBtn = document.querySelector('#submit')
let initials = document.querySelector('#initials')
let toggleSoundBtn = document.querySelector("#toggleSound")
let feedbackEl = document.querySelector(".feedback")
let soundOn = true;
let correctSound = new Audio ('/assets/sfx/correct.wav');
let incorrectSound = new Audio ('/assets/sfx/incorrect.wav')
let startBtn = document.querySelector('#start');
let startScreen = document.querySelector('#start-screen')
let questionsScreen = document.querySelector('#questions')

let questionIndex = 0;
let timeLeft = 90
let intervalId = null
let score = 0;
let highScoresArray = []


/// This is for all questions, options and correct answers

let answersArray = []
answersArray[0] = questions[0].options[1];
answersArray[1] = questions[1].options[0];
answersArray[2] = questions[2].options[3];
answersArray[3] = questions[3].options[3];
answersArray[4] = questions[4].options[3];
answersArray[5] = questions[5].options[1];
answersArray[6] = questions[6].options[3];

// FUNCTIONS 
let countDown = () => {

    if (timeLeft <= 0){               // This is to check is there is any time left, if not, finish the game
        clearInterval(intervalId)
        questionsScreen.classList.toggle("hide");
        endScreen.classList.toggle("hide")
        finalScore.textContent = score;
        timeEl.textContent = `0`;
        timeEl.style.color = "red";


    } else {                    // This is for, if any time left, continue the countdown
        timeLeft --
        timeEl.textContent = timeLeft;
    }
}

//This is to display the questions

let displayQuestion = () => {
    feedbackEl.textContent = ""
    
    if (questionIndex >= questions.length){
        questionsScreen.classList.toggle("hide");
        endScreen.classList.toggle("hide")
        finalScore.textContent = score;
        clearInterval(intervalId)

    } else if (choicesDiv.childElementCount > 0){
        questionTitle.textContent = questions[questionIndex].question
        for (let i = 0; i < choicesDiv.childElementCount; i++){
            choicesDiv.children[i].innerHTML = questions[questionIndex].options[i];
        } 
    }

    // This is to create needed buttons
    else { 
        questionTitle.textContent = questions[questionIndex].question
        let btn = []

            // create a new button for each option
            for (let i = 0; i < questions[questionIndex].options.length; i++){
        
                // if no elements, create them
                if(choicesDiv.childElementCount < 4){
                    btn[i] = document.createElement("button");
                    btn[i].innerText = questions[questionIndex].options[i];
                    choicesDiv.appendChild(btn[i]);
                } else {
                    btn[i].textContent = questions[questionIndex].options[i];
                }

                // click event for each button
                btn[i].addEventListener("click", function (e){

                    // if correct
                    if (e.target.innerText === answersArray[questionIndex]){
                        if (soundOn) {
                            correctSound.play()
                            feedbackEl.textContent = "Correct!"
                            
                        }
                        feedbackEl.textContent = "Correct!"
                        score ++;
                        questionIndex ++;

                    // if incorrect
                    } else {
                        if (soundOn){
                            incorrectSound.play()
                        }
                        feedbackEl.textContent = "Wrong"
                        questionIndex ++;
                        timeLeft -= 10;
                    }
                    // next question
                    setTimeout(displayQuestion,1000)
                    
                })
            }   
    }
} 


// EVENTS 
startBtn.addEventListener('click', function() {
    
    //reset timer to 90
    timeLeft = 90;

    // start timer
    intervalId = setInterval(countDown, 1000)

    // Hide start section
    startScreen.classList.toggle("hide")

    // show question section and call a function that will now toggle questions
    questionsScreen.classList.toggle("hide")
    displayQuestion()

})


// Button that adds initials and highscore to local storage
submitBtn.addEventListener("click", function(event){

    event.preventDefault()
    // stop multiple clicks
    submitBtn.disabled = true;

    // validate input
    
    let string = initials.value
    let regex = /^[A-Za-z]+$/i;
    console.log(string.match(regex));

    if ( !string.match(regex)){
        error.style.display = "block";
        error.style.color = "red";
        return;
    }
    

  //This function is displaying the total final score 
function showFinalScore() {
    finalScore.textContent = totalPoints;
  }
  

  //This function is setting the initials  and redirects to next highscores page.
  function submit() {
  
      submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
  
      
       finalScore();
       setScore();
       redirect();
       
    })
  }
  

  function redirect() {
    window.location.href = "highscores.html";
  }
  submit();
})