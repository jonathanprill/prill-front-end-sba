var table = document.getElementById("t-body");
var selectedNum = 10;
/////////select number///////////////
function selectNumber() {
    var mylist = document.getElementById("myList");
    selectedNum = mylist.options[mylist.selectedIndex].text;
    console.log(selectedNum)
    table.innerHTML="";
    runQuery()
}


function runQuery() {


    fetch("https://api.chess.com/pub/leaderboards").then(function (response) {
        response.json().then(function (data) {
            for (i = 0; i < selectedNum; i++) {

                var tr = document.createElement('tr');
                table.append(tr);
                // Rank
                var tdRank = document.createElement('td');
                tdRank.innerHTML = data.live_blitz[i].rank;
                tr.append(tdRank);
                // Picture
                var tdPic = document.createElement('td');
                tr.append(tdPic);
                var imageEl = document.createElement('img');
                imageEl.setAttribute("class", "leaderboard-pic")
                imageEl.src = data.live_blitz[i].avatar;
                tdPic.append(imageEl);
                // Title
                var tdTitle = document.createElement('td');
                tdTitle.innerHTML = data.live_blitz[i].title;
                tr.append(tdTitle);
                // Name
                var tdName = document.createElement('td');
                tdName.innerHTML = data.live_blitz[i].name;
                tr.append(tdName);
                // Elo
                var tdElo = document.createElement('td');
                tdElo.innerHTML = data.live_blitz[i].score;
                tr.append(tdElo);
                // Username
                var tdUsername = document.createElement('td');
                tdUsername.innerHTML = data.live_blitz[i].username;
                tr.append(tdUsername);

            }
            // console.log(data.live_blitz)
        });
    })

}

runQuery()