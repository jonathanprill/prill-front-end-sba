var toggleButton = document.getElementById("sidebar-toggle");
var nav = document.getElementById("navbar");

toggleButton.onclick = function () {
    nav.classList.toggle("activate-sidebar");
};

function lightmode() {
    var element = document.body;
    element.classList.remove("dark-mode");
    var tableEl = document.getElementById('mytab1');
    tableEl.classList.remove("table-dark")

    var elements = document.querySelectorAll(".card, .topnav, .card-content");
    for (i = 0; i <= elements.length - 1; i++) {
        elements[i].classList.remove("card-dark-mode", "topnav-dark-mode");
    }

}

function darkmode() {
    var element = document.body;
    element.classList.add("dark-mode");
    var tableEl = document.getElementById('mytab1');
    tableEl.classList.add("table-dark")

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
var blitzRatio = document.getElementById("blitz-ratio");
var bulletRatio = document.getElementById("bullet-ratio");
var rapidRatio = document.getElementById("rapid-ratio");


function runSearch(e) {

    e.preventDefault();
    fetch("https://api.chess.com/pub/player/" + searchEl.value + "/stats").then(function (response) {
        response.json().then(function (data) {
            rapidRating.innerHTML = data.chess_rapid.best.rating;
            blitzRating.innerHTML = data.chess_blitz.best.rating;
            bulletRating.innerHTML = data.chess_bullet.best.rating;
            console.log(data)
            ///////////////progress bars/////////////////
            // https://www.w3schools.com/howto/howto_js_progressbar.asp
            // blitz bar
            var blitzWLRatio = (data.chess_blitz.record.win / data.chess_blitz.record.loss) / 2 * 100;
            var blitzWLRatioRounded = Math.round(blitzWLRatio * 100) / 100
            var blitzEl = document.getElementById("blitzBar");
            var blitzWidth = 1;
            var blitzId = setInterval(frame1, 10);
            if (blitzWLRatio > 100) {
                blitzWLRatio = 100;
            }
            function frame1() {
                if (blitzWidth >= blitzWLRatio) {
                    clearInterval(blitzId);
                } else {
                    blitzWidth++;
                    blitzEl.style.width = blitzWidth + "%";
                }
            }
            blitzRatio.innerHTML = "Blitz Win/Loss Ratio: " + blitzWLRatioRounded;
            // bullet bar
            var bulletWLRatio = (data.chess_bullet.record.win / data.chess_bullet.record.loss) / 2 * 100;
            var bulletWLRatioRounded = Math.round(bulletWLRatio * 100) / 100
            var bulletEl = document.getElementById("bulletBar");
            var width = 1;
            var id = setInterval(frame2, 10);
            if (bulletWLRatio > 100) {
                bulletWLRatio = 100;
            }
            function frame2() {
                if (width >= bulletWLRatio) {
                    clearInterval(id);
                } else {
                    width++;
                    bulletEl.style.width = width + "%";
                }
            }
            bulletRatio.innerHTML = "bullet Win/Loss Ratio: " + bulletWLRatioRounded;
            // rapid bar
            var rapidWLRatio = (data.chess_rapid.record.win / data.chess_rapid.record.loss) / 2 * 100;
            var rapidWLRatioRounded = Math.round(rapidWLRatio * 100) / 100
            var rapidEl = document.getElementById("rapidBar");
            var rapidWidth = 1;
            var rapidId = setInterval(frame, 10);
            if (rapidWLRatio > 100) {
                rapidWLRatio = 100;
            }
            function frame() {
                if (rapidWidth >= rapidWLRatio) {
                    clearInterval(rapidId);
                } else {
                    rapidWidth++;
                    rapidEl.style.width = rapidWidth + "%";
                }
            }
            rapidRatio.innerHTML = "rapid Win/Loss Ratio: " + rapidWLRatioRounded;


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
    blitzRatio.classList.remove("placeholder");
    bulletRatio.classList.remove("placeholder");
    rapidRatio.classList.remove("placeholder");
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





