var toggleButton = document.getElementById("sidebar-toggle");
var nav = document.getElementById("navbar");

toggleButton.onclick = function () {
    nav.classList.toggle("activate-sidebar");
};

function lightmode() {
    var element = document.body;
    element.classList.remove("dark-mode");

    var elements = document.querySelectorAll(".card, .topnav, .card-content");
    for (i = 0; i <= elements.length - 1; i++) {
        elements[i].classList.remove("card-dark-mode", "topnav-dark-mode");
    }

}

function darkmode() {
    var element = document.body;
    element.classList.add("dark-mode");

    var elements = document.querySelectorAll(".card, .topnav, .card-content");
    for (i = 0; i <= elements.length - 1; i++) {
        elements[i].classList.add("card-dark-mode", "topnav-dark-mode");
    }
}

/////////////////////Search Form////////////////////////
const searchEl = document.getElementById('search-box');
const formEl = document.getElementById('search-form');
var onlinePic = document.getElementById("online-pic");
var onlineName = document.getElementById("online-name");
var onlineCity = document.getElementById("online-city");
var lastOnline = document.getElementById("last-online");
var dateJoined = document.getElementById("date-joined");
var followers = document.getElementById("followers");
var rapidRating = document.getElementById("rapid-rating");
var blitzRating = document.getElementById("blitz-rating");
var bulletRating = document.getElementById("bullet-rating");


function runSearch(e) {

    e.preventDefault();
    fetch("https://api.chess.com/pub/player/" + searchEl.value + "/stats").then(function (response) {
        response.json().then(function (data) {
            rapidRating.innerHTML = data.chess_rapid.best.rating;
            blitzRating.innerHTML = data.chess_blitz.best.rating;
            bulletRating.innerHTML = data.chess_bullet.best.rating;
            console.log(data)
        });
    })
    fetch("https://api.chess.com/pub/player/" + searchEl.value).then(function (response) {

        response.json().then(function (data) {

            //Displays Profile Picture
            onlinePic.src = data.avatar;
            //Display online name
            onlineName.innerHTML = data.name;
            //display city
            onlineCity.innerHTML = data.location;
            //date last online
            var timestampLastOnline = data.last_online;
            var convertedDateLastOnline = new Date(timestampLastOnline * 1000);
            var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var formattedDateLastOnline = month[convertedDateLastOnline.getMonth()] + ' ' + convertedDateLastOnline.getDate() + ', ' + convertedDateLastOnline.getFullYear();
            lastOnline.innerHTML = formattedDateLastOnline;
            //date joined
            var timestampJoined = data.joined;
            var convertedDateJoined = new Date(timestampJoined * 1000);
            var formattedDateJoined = month[convertedDateJoined.getMonth()] + ' ' + convertedDateJoined.getDate() + ', ' + convertedDateJoined.getFullYear();
            dateJoined.innerHTML = formattedDateJoined;
            console.log(data)


        });
    })
    onlineName.classList.remove("placeholder");
    onlineCity.classList.remove("placeholder");
    lastOnline.classList.remove("placeholder");
    dateJoined.classList.remove("placeholder");
    blitzRating.classList.remove("placeholder");
    rapidRating.classList.remove("placeholder");
    bulletRating.classList.remove("placeholder");
    onlinePic.classList.remove("placeholder");
}

formEl.addEventListener("submit", runSearch);


//////////////Validation//////////////////
function validate() {
    if (document.myForm.username.value == "") {
        alert("Please provide a username!");
        document.myForm.username.focus();
        return false;
    }
    if (document.myForm.email.value == "" || validateEmail() == false) {
        alert("Please enter a valid email address!");
        document.myForm.email.focus();
        return false;
    }
    if (document.myForm.password.value == "") {
        alert("Please provide your password!");
        document.myForm.password.focus();
        return false;
    } else {
        alert("Success");
    }
}

function validateEmail() {
	var emailID = document.myForm.email.value;
	atpos = emailID.indexOf("@");
	//alert(atpos)
	dotpos = emailID.lastIndexOf(".");
	if (atpos < 1 || (dotpos - atpos < 2)) {
		return false;
	} else {
		return true;
	}
}

