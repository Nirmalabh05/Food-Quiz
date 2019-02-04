var Quiz = {
    currentQuestion: 0,
    score: 0,
    
    quizConatiner: document.getElementById('quizContainer'),
    resultContainer: document.getElementById('resultContainer'),
    nextButton: document.getElementById('nextButton'),
    
    startQuiz: function startQuiz(){
        Quiz.quizConatiner.style.display = 'none';
        
        Quiz.displayQuestion();
        
        document.getElementById("selectQuiz").style.display = "none";
        document.getElementById("playQuizButton").style.display = "none";
    },
    
    buildData: function buildData(){
        dataRequest = "https://api.myjson.com/bins/1416dc";
       // dataRequest = "js/quiz.json";
         
        dataReturned = "";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                dataReturned = xhttp.responseText;
                quizData = JSON.parse(dataReturned);
                
                var selectedCuisine = document.getElementById("selectCuisine").value;
                //console.log(selectedCuisine);
                if(selectedCuisine == 'british'){
                    document.getElementById("selectQuiz").style.color = "black";
                    document.getElementById("introText").style.color = "black";
                    document.getElementById("imageBackground").style.backgroundImage = "url('images/british.jpg')";
                }
                else if(selectedCuisine == 'indian'){
                    document.getElementById("selectQuiz").style.color = "#ffffff";
                    document.getElementById("introText").style.color = "#ffffff";
                    document.getElementById("imageBackground").style.backgroundImage = "url('images/indian.jpeg')";
                }
                else if(selectedCuisine == 'mexican'){
                    document.getElementById("selectQuiz").style.color = "black";
                    document.getElementById("introText").style.color = "black";
                    document.getElementById("imageBackground").style.backgroundImage = "url('images/mexican.jpg')";
                }
                else if(selectedCuisine == 'itallian'){
                    document.getElementById("selectQuiz").style.color = "#ffffff";
                    document.getElementById("introText").style.color = "#ffffff";
                    document.getElementById("imageBackground").style.backgroundImage = "url('images/italian.jpg')";
                    
                }
                for(var i = 0; i < quizData.length; i++){
                  // console.log(quizData[i].cuisine);
                   if(selectedCuisine === quizData[i].cuisine){
                        var img = new Image();
                        img.src = quizData[i].image; 

                        var Q1 = new Question(quizData[i].question, quizData[i].option1, quizData[i].option2, quizData[i].option3, quizData[i].option4, 
                        quizData[i].answer, img.src);

                        QuestionSet.push(Q1);
                   }
                }

            }//end of if loop
        };//end of onreadystatechange function
        xhttp.open("GET", dataRequest, true);
        xhttp.send();
    }, //end of buildData function
    
    checkAnswer: function checkAnswer(){
        var selectedOption = document.querySelector('input[name = "option"]:checked');
        if(!selectedOption){
            alert('Please select your option');
        }
        var userAnswer = selectedOption.value;
        
        if (userAnswer == QuestionSet[Quiz.currentQuestion].theAnswer){
            
            document.getElementById("feedback").innerHTML = "Correct ! \n\n The correct answer is " + QuestionSet[Quiz.currentQuestion].theAnswer;
            
            Quiz.score++;
            document.getElementById("score").innerHTML = "Score: " + Quiz.score + "/" + (Quiz.currentQuestion + 1); 
        }
        else{
            document.getElementById("feedback").innerHTML = "Sorry ! \n\n The correct answer is " + QuestionSet[Quiz.currentQuestion].theAnswer;
            document.getElementById("score").innerHTML = "Score: " + Quiz.score + "/" + (Quiz.currentQuestion + 1);
        }
    
        if (Quiz.currentQuestion < QuestionSet.length - 1){
            selectedOption.checked = false;
            Quiz.currentQuestion++;
            Quiz.displayQuestion();
        }
        else{
            Quiz.quizConatiner.style.display = 'none';
            Quiz.resultContainer.style.display = '';
            document.getElementById("selectQuiz").style.display = "block";
            
            var str = "Indian Veg Recipes";
            
            if(Quiz.score > 3){
                Quiz.resultContainer.innerHTML = 'Excellent! Well done!! <br><br> Your Score is ' + Quiz.score + ' out of '+QuestionSet.length+ ' ! <ion-icon name="happy"></ion-icon> <br><br> <b><i>HEALTH</b></i> requires <b><i>healthy</b></i> food. So, <b><i>EAT</b></i> better <b><i>FEEL</b></i> better. <br><br> <i class="far fa-hand-point-up"></i> Why dont you play quiz on other cuisines to test your knowledge of food. <i class="far fa-hand-point-up"></i>';
            }
            else{
                Quiz.resultContainer.innerHTML = 'Not bad! Better Luck Next time!! <br><br> Your Score is ' + Quiz.score + ' out of '+QuestionSet.length+ ' ! <ion-icon name="sad"></ion-icon> <br><br> <b><i>HEALTH</i></b> requires <b><i>healthy</i></b> food. So, <b><i>EAT</b></i> better <b><i>FEEL</b></i> better. <br><br> <i class="far fa-hand-point-up"></i> Why dont you play quiz on other cuisines to test your knowledge of food. <i class="far fa-hand-point-up"></i>';
            } 
            return;
        }
        document.getElementById("playQuizButton").style.display = "none";
    }, //end of checkAnswer function
    
    initializeQuiz: function initializeQuiz(){
        QuestionSet = [];
        Quiz.buildData();
        document.getElementById("options1").checked = false;
        document.getElementById("options2").checked = false;
        document.getElementById("options3").checked = false;
        document.getElementById("options4").checked = false;
        
        document.getElementById("score").innerHTML = '';
        document.getElementById("feedback").innerHTML = '';
        
        Quiz.currentQuestion = 0;
        Quiz.score = 0;
        
        document.getElementById("playQuizButton").style.display = "block";
        Quiz.resultContainer.style.display = 'none';
    },
    
    displayQuestion: function displayQuestion(){
        document.getElementById("question").innerHTML = QuestionSet[Quiz.currentQuestion].theQuestion;

        document.getElementById("options1").value = QuestionSet[Quiz.currentQuestion].choice1;
        document.getElementById("opt1").innerHTML = QuestionSet[Quiz.currentQuestion].choice1;
        
        document.getElementById("options2").value = QuestionSet[Quiz.currentQuestion].choice2;
        document.getElementById("opt2").innerHTML = QuestionSet[Quiz.currentQuestion].choice2;
        
        document.getElementById("options3").value = QuestionSet[Quiz.currentQuestion].choice3;
        document.getElementById("opt3").innerHTML = QuestionSet[Quiz.currentQuestion].choice3;

        document.getElementById("options4").value = QuestionSet[Quiz.currentQuestion].choice4;
        document.getElementById("opt4").innerHTML = QuestionSet[Quiz.currentQuestion].choice4;
        
        document.getElementById("imageBackground").style.backgroundImage = 'url('+QuestionSet[Quiz.currentQuestion].src+')';
        
        document.getElementById("quizContainer").style.display = "block";
    }
    
    
}