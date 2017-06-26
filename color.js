var numSqrs = 6;
var colors = [];
var pickedColor = "#ffff00";
var squares = $('.squares');
var colorDisplay = $('#colorDisplay');
var messageDisplay = $('#message');
var h1 = $('h1');
var resetBtn = $('#reset');
var modeBtns = $('.mode');
var codeBtns = $('.code');

console.log(pickedColor);

init();

function init() {
	// code button setup
	setupCode();
	// mode button setup
	setupMode();
	// squares setup
	setupSquares();
	
	reset();
}

// Setup code buttons
function setupCode(){
	codeBtns.on("click", function() {
		codeBtns.removeClass("default");
		$(this).addClass("default");
		
		if($(this).text() === "HEX"){
			colorDisplay.text("HEX" + rgb2hex(pickedColor));
		} else {
			colorDisplay.text(pickedColor);
		}
	});
	
}

// Setup mode buttons
function setupMode(){
	modeBtns.on("click", function() {
		modeBtns.removeClass("selected");
		$(this).addClass("selected");
		$(this).text() === "Easy" ? numSqrs = 3: numSqrs = 6;
		
		reset();
	});
}

// Setup squares when clicked
function setupSquares(){
	squares.on("click", function(){

		// Retrieve cliked color
		var clickedColor = $(this).css("background-color");

		console.log(clickedColor, pickedColor);
		
		if(clickedColor === pickedColor) {
			messageDisplay.text("Correct!");
			squares.css("background-color", pickedColor);
			h1.css("background-color", pickedColor);
			resetBtn.text("Play Again?");
		} else {
			messageDisplay.text("Try Again!");
			$(this).css("background-color", "#232323");
		}
	});
}

function reset() {
	colors = generateRandomColors(numSqrs);
	
	// pick new random colors from arrays
	pickedColor = pickColor();
	// change colorDisplay to new picked;
	console.log(pickedColor);
	colorDisplay.text(pickedColor);
	resetBtn.text("New Colors");
	
	// reset code buttons
	$(".code:first-of-type").addClass("default");
	$(".code:nth-of-type(2)").removeClass("default");
	
	messageDisplay.text("");
	
	
	// change colors of the squares
	squares.each(function(i){
		if(colors[i]) {
			$(this).css({
				display: "block",
				backgroundColor: colors[i]
			});
		} else {
			$(this).css("display", "none");
		}
	});
	
	h1.css("background-color", "steelblue");
}

resetBtn.on("click", function(){
	reset();
});

colorDisplay.text(pickedColor);

// Generate squares with different colors for both modes
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	
	for(var i = 0; i < num; i++) {
		// get random colors and push into arrays
		arr.push(getRandomRGB());	
	}

	return arr;
}

// Get RGB of colors
function getRandomColor() {
	if($('.default').text() === "RGB"){
		getRandomRGB();
	} else {
		getRandomHex();
	}
}

// Get RGB of colors
function getRandomRGB() {
	// pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Function to convert hex format to a rgb color
function rgb2hex(rgb){
	rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	
	return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

// Get hexcode of colors
function getRandomHex() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
  	}
	
  	return color;
}