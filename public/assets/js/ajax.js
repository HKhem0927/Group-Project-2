var questions = [
	{
		question: "How many times have the New York Yankees won the world series?",
		answers: ["10", "18", "27", "32"],
		correctAnswer: 2
	},
	{
		question: "Which team is the oldest continuous one name, one city francise in all of American sports?",
		answers: ["Atlanta Braves", "Philadelphia Phillies", "Florida Marlins", "New York Yankees"],
		correctAnswer: 1
	},
	{
		question: "Which former mlb player is known as baseball's hit king?",
		answers: ["Barry Bonds", "Mark McGwire", "Sammy Sosa", "Pete Rose"],
		correctAnswer: 3
	},
	{
		question: "Which team has the most losses in both mlb history and all of American professional sports?",
		answers: ["Philadelphia Phillies", "Seattle Mariners", "Oakland A's", "Chicago Cubs"],
		correctAnswer: 0
	},
	{
		question: "Which of the following is the oldest ballpark in baseball?",
		answers: ["Wrigley Field (Chicago)", "Dodger Stadium (Los Angeles)", "Fenway Park (Boston)", "Turner Field (Atlanta)"],
		correctAnswer: 2
	},
	{
		question: "Which team just broke the curse of the billy goat by winning the world series?",
		answers: ["Red Sox", "Philadelphia Phillies", "Cleveland Indians", "Chicago Cubs"],
		correctAnswer: 3
	},
	{
		question: "Which team originally signed Babe Ruth?",
		answers: ["New York Yankees", "Boston Braves", "Boston Red Sox", "Baltimore Orioles"],
		correctAnswer: 3
	},
	{
		question: "Which player has the most stolen bases in mlb history?",
		answers: ["Ty Cobb", "Rickey Henderson", "Ozzy Smith", "Juan Pierre"],
		correctAnswer: 1
	},
	{
		question: "Which recent hall of fame inductee is know as 'The Big Unit'?",
		answers: ["Randy Johnson", "Pedro Martinez", "Greg Maddux", "John Smoltz"],
		correctAnswer: 0
	},
	{
		question: "Which retired player has the most saves in major league baseball?",
		answers: ["Billy Wagner", "Mariano Rivera", "Trevor Hoffman", "Francisco Rodriguez"],
		correctAnswer: 1
	},
]

var currentQuestionIndex = 0;
var currentQuestion;
var time = 20*1000;
var timer;
var score = 0;
var data = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 20 * 1000;
			$('#time').text(time/1000);

			currentQuestionIndex++;

			if (currentQuestionIndex <= questions.length - 1){
				loadQuestion();
			}else{

				data = {
					total_score: score,
				}

				$.ajax({
					url: "/scores/create", 
					method: "POST",
					data: data, 
				}).done(function(response){
					window.location = "/scores"
				});

				clearInterval(timer);
				alert('put a fork in it');
				$("#container").empty();
				$("#container").html("<p>Finito!</p>");
			}
		}
	}, 1 * 1000);
}

$('#container').hide();

$('#startGame').on('click', function(){
	countDown();
	$('#container').show();
})




function loadQuestion(){

	currentQuestion = questions[currentQuestionIndex];

	$('#displayQuestion').html("");

	var question = $('<div>').text(currentQuestion.question);
	$('#displayQuestion').append(question);

	for (var i=0; i<currentQuestion.answers.length; i++){
		var answerButton = $("<button>").attr('class', 'answer').attr('data-key', i).text(currentQuestion.answers[i]);
		$('#displayQuestion').append(answerButton);
	}
}

loadQuestion();

$(document).on('click', '.answer', function(){
	if ($(this).data('key') == currentQuestion.correctAnswer){
		alert('winner winner winner!!');
		score = score + 10;
	}else{
		alert('you are a weiner weiner weiner');
		score = score - 5;
	}

	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 20;
		$('#time').text(time/1000);
	}else{

		data = {
			total_score: score,
		}

		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});

		clearInterval(timer);
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
	}
})









