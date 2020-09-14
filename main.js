var utcOffSet;

/* Initializes page */
function loadPage(){
	var form = document.getElementById("utcOffsetInput"); 
	form.addEventListener('submit', updateUTCOffset);
	updateClock();
	setInterval(updateClock, 1000);
}

/* Updates the clock HTML */
function updateClock(){
	document.getElementById("clockText").innerHTML = formatTime();
}

/* Formats the clock using default UTC offset or UTC offset from user input */
/* Credit for math to update date based on UTC Offset: https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/ */
function formatTime(){
	var currentDate = new Date();

	if(utcOffSet){
		var localTime = currentDate.getTime();
		var localOffset = currentDate.getTimezoneOffset() * 60000;
		var utc = localTime + localOffset;
		var newDate = utc + (3600000 * utcOffSet);
		var currentDate = new Date(newDate);
	}

	var isAfternoon = false;
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	var formattedTime;

	if(currentDate.getHours() > 12){
		hours = hours - 12;
		isAfternoon = true;
	}
	if(currentDate.getHours() < 10){
		hours = "0" + hours;
	}

	if(currentDate.getMinutes() < 10){
		minutes = "0" + minutes;
	}

	formattedTime = hours + ":" + minutes;
	
	if(isAfternoon){
		formattedTime += " PM";
	}
	else{
		formattedTime += " AM";
	}

	return formattedTime;
}

/* Updates the UTC offset on form submit */
function updateUTCOffset(event){
	event.preventDefault();

	var sign = document.getElementById("utcOffsetInput-sign").value;
	var hours = document.getElementById("utcOffsetInput-hours").value;
	var minutes = document.getElementById("utcOffsetInput-minutes").value;

	if(!hours){
		return false;
	}

	var newOffSet = parseInt(hours);
	if(minutes === "30"){
		newOffSet += .5;
	}
	if(sign === "-"){
		newOffSet *= -1;
	}

	utcOffSet = newOffSet;

	updateClock();
}