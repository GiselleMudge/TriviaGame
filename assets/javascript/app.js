$(document).ready(function() {
    // Starting Screen with Titles and Start Button Fuction Setup
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>GET 2 DA CHOPPA!</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //Click event on start button to start quiz
    $("#mainArea").on("click", ".start-button", function(event){
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); 
      //Closes starting click
    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        //Win or Loss scenario setup
        selectedAnswer === correctAnswers[questionCounter] ? (
            //correct scenario tree
            clearInterval(theClock),
            generateWin()) :
            //or wrong scenario tree
            (
            clearInterval(theClock),
            generateLoss()
        )
    }); 
    // Closes answering click
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    }); 
    // Closes resetting click
    
    });  //  end JQuery

    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's up!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Billy.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 5000);  //  5 second wait after loss before loading next question
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Nailed it! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 4000);  //end win
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>WOMP WOMP. The correct answer was: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Billy.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 4000); //  4 second wait after loss before loading next question
    }
    //end loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end questions
    
    function wait() {
        //10 second wait while generating next questions with 10 second counter for 10 questions and no more
    questionCounter < 9 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 10,
        timerWrapper() ):
        
       (finalScreen())
    }; //end wait
    

    //This will dictate the counter tempo of 1 second increment countdown while the question is active
    function timerWrapper() {
        theClock = setInterval(tenSec, 1000);
        function tenSec() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
     //The results display at the end of the game
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>GAME OVER. Your results:" + "</p>" + "<p class='summary-correct'>Answered Correctly: " + correctTally + "</p>" + "<p> If > 2, you might want to rewatch Predator: " + incorrectTally + "</p>" + "<p># Times you snoozed: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Let's play again!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
     //reset game function. NOT RELOAD PER HW INSTRUCTIONS!
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 10;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 10;
    var questionArray = 
    [ "What movie's cast had arguably the most impressive lineup besides 1992's US Men's Olympic Dream Team?", 
    "Which actor was the original choice for Predator before the SFX team came to their senses and made the wise decision to change the lame suit and go with the legendary Kevin Peter Hall instead?", 
    "Which country was Predator shot entirely on location?", 
    "In Predator 2, when a tribe leader hands Danny Glover a gun as trophy, what year was inscribed on the gat?", 
    "What is the name of the planet the Predators come from?", 
    "Which of these Predator alumni did NOT get into politics and serve as a government figure?", 
    "If it bleeds...", 
    "Which former Predator alum went on to direct his/her own Predator movie?",
    "Who designed the visual concept and SFX for the Predator?",
    "Will the new Predator movie suck?",
    ];

    var answerArray = [
        ["The Expendables", "Predator", "Joy Luck Club", "Nutty Professor 2: The Klumps"], 
        ["Kevin Peter Hall","Kane Hodder","Ron Perlman","Jean-Claude Van Damme"], 
        ["Mexico", "Colombia", "Brazil", "Thailand"], 
        ["1776", "1492", "2000", "1715"], 
        ["Earth", "Yautja Prime", "Jupiter", "Alpha Centaurus"], 
        ["Arnold Schwarzenegger","Jesse Ventura","Bill Duke","Sonny Landham"], 
        ["Tequilaaa!", "Dinner's ready", "Stick Around", "We can kill it"], 
        ["Jesse the Body Ventura","Danny Glover","Shane Black","Sanaa Lathan"], 
        ["Stan Winston","James Cameron","Danny Devito","Steven Spielberg"],
        ["NO WAY","LOL Yeah","I don't care","Maybe"],
                    ];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='assets/images/PredatorGrp.jpg'>";
    imageArray[1] = "<img class='center-block' src='assets/images/Van_Damme.gif'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/DancingPreds.gif'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/Gun.jpg'>";  
    imageArray[4] = "<img class='center-block' src='assets/images/YP.jpg'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/DukeHunt.gif'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/DancingPreds.gif'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/Shane_Black_Predator.jpg'>"; 
    imageArray[8] = "<img class='center-block' src='assets/images/StantheMan.gif'>";
    imageArray[9] = "<img class='center-block' src='assets/images/DancingPreds.gif'>";

    var correctAnswers = 
    [ "B. Predator", 
    "D. Jean-Claude Van Damme", 
    "A. Mexico", 
    "D. 1715", 
    "B. Yautja Prime", 
    "C. Bill Duke", 
    "D. We can kill it", 
    "C. Shane Black",
    "A. Stan Winston",
    "D. Maybe",
    ];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;