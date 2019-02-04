var event1 = document.getElementById("selectCuisine");
event1.addEventListener('change', Quiz.initializeQuiz, false);
 
var event1 = document.getElementById("button1");
event1.addEventListener('click', Quiz.startQuiz, false);

var event1 = document.getElementById("nextButton");
event1.addEventListener('click', Quiz.checkAnswer, false);
