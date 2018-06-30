var finWindow = $('.finWindow');
var timerDis = $('#timer');
var gameWindow = $('.gameWindow');

timerDis.hide();
gameWindow.hide();
finWindow.hide();

var questions = [
	{ id: 'one', question: 'What is my Name?', opOne: 'George', opTwo: 'Bryant', opThree: 'Kaiyer', opFour: 'Ikaika' },
	{ id: 'two', question: 'What has legs?', opOne: 'snake', opTwo: 'fish', opThree: 'worm', opFour: 'dog'},
	{ id: 'three', question: 'What island is Honolulu located on?', opOne: 'Oahu', opTwo: 'Maui', opThree: "Kaho'olawe", opFour: 'Niihau'},
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
		finWindow.text('Incorrect, correct answer is ' + $('[data-correct=true]').text());
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
	var startOver = $('<span>');
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

		time = 15;
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
			$('#opTwo').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'two') {
			$('#opFour').attr('data-correct' , true);
		} else if (questions[randomQues].id == 'three') {
			$('#opOne').attr('data-correct' , true);
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