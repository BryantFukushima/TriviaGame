var finWindow = $('.finWindow');
var timerDis = $('#timer');
var gameWindow = $('.gameWindow');

timerDis.hide();
gameWindow.hide();
finWindow.hide();

var questions = [
	{ id: 'one', question: 'In the 1989 film "Back to the Future: Part II", what day in the future did Marty McFly and Doc Brown travel to?', opOne: 'December 21, 2012', opTwo: 'August 7, 2020', opThree: 'October 21, 2015', opFour: 'April 14, 2010' },
	{ id: 'two', question: "What are the colors of the Irish Flag?", opOne: 'Red and White', opTwo: 'Red, White, and Green', opThree: 'Red, Black, and Yellow', opFour: 'Green, White, and Orange'},
	{ id: 'three', question: 'What is depicted in the Starbucks logo?', opOne: 'Siren, the two tailed Mermaid', opTwo: 'Cecilia, the Mother of Coffee', opThree: 'Aurelia, Queen Starbucks', opFour: 'Amphitrite, goddess-Queen of the Sea'},
	{ id: 'four', question: 'What is the hidden symbol in the FedEx logo?', opOne: 'A truck', opTwo: 'An arrow', opThree: 'A plane', opFour: 'There is no hidden symbol'},
	{ id: 'five', question: 'What is Harry Potters Patronus?', opOne: 'Phoenix', opTwo: 'Stag', opThree: "Doe", opFour: 'Horse'},
	{ id: 'six', question: 'Who is on the front of the golden dollar coin?', opOne: 'Thomas Jefferson', opTwo: 'John F. Kennedy', opThree: "Grover Cleveland", opFour: 'Sacagawea'},
	{ id: 'seven', question: 'How many colors are in a rainbow?', opOne: '6', opTwo: '7', opThree: "8", opFour: '9'},
];

var questionsDone = [];

var seconds = 3;
var intTimer;
function intervalTimer() {
	seconds--;

	if (seconds == 0) {
		clearInterval(intTimer);
		seconds = 3;
		questionGen();
	}
}

var time;
var timer;
$('#timeLimit').text(time);

function mainTimer() {
	time--;
	$('#timeLimit').text(time);

	if (time <= 0) {
		clearInterval(timer);
		time = 0;
		$('#timeLimit').text(time);
		gameWindow.hide();
		finWindow.show();
		finWindow.text('Time is up. Correct answer is ' + $('[data-correct=true]').text());
		intTimer = setInterval(intervalTimer , 1000);
	}
}

var wins = 0;
var losses = 0;

function pauGame() {
	clearInterval(timer);
	clearInterval(intTimer);
	gameWindow.hide();
	timerDis.hide();
	finWindow.empty();
	finWindow.show();
	var pau = $('<h2>');
	pau.addClass('pau');
	pau.text('Pau Game');
	finWindow.append(pau);
	var results = $('<p>');
	results.text('Correct: ' + wins + ' Incorrect: ' + losses);
	finWindow.append(results);
	var startOver = $('<p>');
	startOver.addClass('restart');
	startOver.text('Start Over?')
	finWindow.append(startOver);
}
var randomQues;
function questionGen() {
	timerDis.show();
	gameWindow.show();
	finWindow.hide();
	$('.choices').empty();

	if (questions.length == 0) {
		pauGame();
	} else {

		time = 30;
		$('#timeLimit').text(time);
		timer = setInterval(mainTimer, 1000);

		randomQues = Math.floor(Math.random() * questions.length);
		$('#question').text(questions[randomQues].question);

		var opID = ['opOne' , 'opTwo' , 'opThree' , 'opFour'];
		for (var i = 0; i < 4; i++){
			var opSelect = $('<div>');
			opSelect.addClass('options');
			opSelect.attr('id' , opID[i]);
			opSelect.attr('data-correct' , false);
			$('.choices').append(opSelect);
		}
		
		if (questions[randomQues].id == 'one') {
			$('#opThree').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'two') {
			$('#opFour').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'three') {
			$('#opOne').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'four') {
			$('#opTwo').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'five') {
			$('#opTwo').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'six') {
			$('#opFour').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'seven') {
			$('#opTwo').attr('data-correct' , true);
		}

		$('#opOne').text(questions[randomQues].opOne);
		$('#opTwo').text(questions[randomQues].opTwo);
		$('#opThree').text(questions[randomQues].opThree);
		$('#opFour').text(questions[randomQues].opFour);
		
		questionsDone.push(questions[randomQues]);

	}
}

$('#start').on('click' , function() {
	$(this).hide();
	timerDis.show();
	gameWindow.show();
	questionGen();
});

$(document).on('click' , '.options' , function() {
	if ($(this).attr('data-correct') == "true") {
		gameWindow.hide();
		finWindow.show();
		finWindow.text('Correct');
		intTimer = setInterval(intervalTimer , 1000);
		questions.splice(randomQues, 1);
		wins++;
	} else {
		gameWindow.hide();
		finWindow.show();
		finWindow.text('Incorrect, correct answer is ' + $('[data-correct=true]').text());
		intTimer = setInterval(intervalTimer , 1000);
		questions.splice(randomQues, 1);
		losses++;
	}
clearInterval(timer);

});

$(document).on('click' , '.restart' , function() {
	finWindow.empty();
	finWindow.hide();
	for (var index in questionsDone) {
		questions.push(questionsDone[index]);
	}
	questionsDone.splice(0,questionsDone.length);
	wins = 0;
	losses = 0;
	questionGen();
});