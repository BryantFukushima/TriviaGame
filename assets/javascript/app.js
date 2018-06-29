$('.gameWindow').hide();

var optionID = ['optionOne', 'optionTwo' , 'optionThree' , 'optionFour'];

function optionButtons() {
for (var i = 0; i < 4; i++) {
	var opButton = $('<button>');
	var opDiv = $('<div>');
	opButton.addClass('options');
	opButton.attr('id' , optionID[i]);
	opButton.attr('data-answer' , false);
	opDiv.html(opButton);

	$('.choices').append(opDiv);
}
}
optionButtons();

var seconds = 30;
var timer;
$('#timeLimit').text(seconds);


function startTimer(){
		seconds--;
		$('#timeLimit').text(seconds);

		if (seconds <= 0) {
			clearInterval(timer);
			seconds = 0;
			$('#timeLimit').text(seconds);
		}
	}

$('#start').on('click' , function() {
	$(this).hide();
	$('.gameWindow').show();
	timer = setInterval(startTimer, 1000);
	questionOne();
});

function questionOne() {
	$('#question').text('What is my Name?');
	$('#optionOne').text('George');
	$('#optionTwo').text('Kaiyer');
	$('#optionThree').text('Bryant');
	$('#optionFour').text('Keoni');

	$('#optionThree').attr('data-answer' , true);
}
function questionTwo() {
	$('.choices').empty();
	optionButtons();
	$('#question').text('Who this');
	$('#optionOne').text('Geo');
	$('#optionTwo').text('Kr');
	$('#optionThree').text('Bnt');
	$('#optionFour').text('Ki');

	$('#optionFour').attr('data-answer' , true);
}
function questionThree() {
	$('.choices').empty();
	optionButtons();
	$('#question').text('Say What');
	$('#optionOne').text('asdf');
	$('#optionTwo').text('lksdn');
	$('#optionThree').text('adnj');
	$('#optionFour').text('lnasdnl');

	$('#optionOne').attr('data-answer' , true);
}

function finished() {
	$('.container').empty();
	var winDis = $('<h1>');
	winDis.text('Pau Game');
	$('.container').html(winDis);
}


var inter = 5;
var interTimer;
var onQuestion = 0;

function interTimerStart() {

	inter--;

	 if(inter <= 0) {
		seconds = 30;
		$('#timeLimit').text(seconds);
		timer = setInterval(startTimer, 1000);
		clearInterval(interTimer);
		inter = 5;

			if (onQuestion == 1) {
				questionTwo();	
			} else if (onQuestion == 2) {
				questionThree();
			} 
	}



}

$(document).on('click' , '.options' , function() {
	
	if ($(this).attr('data-answer') == "true") {

		$('#question').text('Correct!');
		$('.choices').html('You So Smart');
		clearInterval(timer);
		$('#timeLimit').text(seconds);
		interTimer = setInterval(interTimerStart, 1000);
		onQuestion++;
		if (onQuestion == 3){
			winner();
		}	

	} else {
		$('#question').text('Sorry, incorrect answer.');
		$('.choices').html('uh oh');
		clearInterval(timer);
		$('#timeLimit').text(seconds);
		interTimer = setInterval(interTimerStart, 1000);
		onQuestion++;
	}
});




		