// Declarations
var submit_btn1=document.getElementById("submit1");
var submit_btn2=document.getElementById("submit2");
var submit_btn3=document.getElementById("submit3");
var submit_btn4=document.getElementById("submit4");
var submit_btn5=document.getElementById("submit5");
var save_btn6=document.getElementById("save6")
var allDiv= document.getElementsByTagName("div");
var startDiv = document.getElementById("start");
var time = document.querySelector(".time");
var penaltyMessage = document.querySelector(".penalty");
var qDiv = document.getElementsByClassName("q");
var start_btn=document.getElementById("start_button");
var scorecard = document.getElementById("score");
var startScorecard = document.getElementById("startscore");

var countdown = 300;
var timerInterval = 0;
var penaltyTimeout = setInterval(function(){
    penaltyMessage.textContent="";
    },4000);
var highScore = {
    initial: "AAA",
    score: "100"
    }
var count = 0;
var qIndex = 0;
var answerkey = ["A","B","C","D","A"];
var userAnswer= [];

// init state of page. display only first div
function init(){
    for (i=0; i<allDiv.length;i++){   
    allDiv[i].style.display="none";
    }
allDiv[0].style.display="block";
}

// runs the timer 
function runTimer(){
    countdown--
    time.textContent = countdown + " seconds left";

    if (countdown === 0){
        clearInterval(timerInterval);
    }
}

// stops timer and subtract 10 sec 
function timerPenalty(){
    clearInterval(timerInterval);
    countdown = countdown - 10;
    timerInterval = setInterval(runTimer,1000);
}

// start quiz and timer
function start(event){
    event.preventDefault();
    allDiv[0].style.display="none";
    qDiv[0].style.display="block";
    timerInterval = setInterval(runTimer,1000);   
}

// wrapper functions 
function submit(event){
    next(event);
    evalAnswer();
}

function score(event){
    next(event);
    calcScore();
}

// progresses index to move to next question 
function next(event){
    event.preventDefault();
    qIndex++;

    for (i=0; i<qDiv.length;i++){
        qIndex2 = qDiv[i].getAttribute("index");
        if (qIndex2 == qIndex){
            qDiv[i].style.display="block";    
        }
        else {
            qDiv[i].style.display="none";
        }
    }
    qIndex2="";
}

// evaluates correctness of answer 
function evalAnswer(){
    var userAnswerInput = document.querySelector('input[name="answer"]:checked').value; 
    var intqIndex = (parseInt(qIndex)-2);
        if (userAnswerInput == answerkey[intqIndex]){
            console.log("CORRECT");
            userAnswer.push(1);
        }
        else {
            console.log("WRONG");
            timerPenalty();
            penaltyMessage.textContent = "Incorrect answer. 10 seconds removed."
            userAnswer.push(0);
        }
}

// calculates score 
function calcScore(){
    let sum = 0;
    for (i=0; i<userAnswer.length;i++){
        sum += userAnswer[i];
        }
    var currentScore = (sum / 5) * 100;
    console.log(currentScore);
    scorecard.textContent= "Your score is "+ currentScore;
}

// saves score to local storage 
function saveScore(event){
    // TODO: fix saving to local storage 
    // var userInitials = document.querySelector('input[name="initials"]').value;
    // highScore.initial.push(userInitials);
    // highScore.score.push(currentScore);
    console.log(highScore);
    console.log(currentScore);
    localStorage.setItem("highScore", JSON.stringify(highScore));

    renderScore();
}

// writes score to page 
function renderScore(){
    var lastScore = JSON.parse(localStorage.getItem("highScore"));
    startScorecard.textContent="person with last score was "+lastScore;
}

// set and get attribute index so questions are indexed runs at init
for (i=0; i<qDiv.length; i++){
    count ++;
    qDiv[i].setAttribute("index",count);
}
qIndex = parseInt(qDiv[0].getAttribute("index"));

init(); 

// event listeners 
start_btn.addEventListener("click",start);
submit_btn1.addEventListener("click",submit);
submit_btn2.addEventListener("click",submit);
submit_btn3.addEventListener("click",submit);
submit_btn4.addEventListener("click",submit);
submit_btn5.addEventListener("click",score);
save_btn6.addEventListener("click",saveScore);