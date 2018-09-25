//after the page is loaded fully start function init
window.addEventListener('load', init);
//set local variables to be used in whole code
var cardvalue = [
    ['bat', 0, 0],
    ['bug', 0, 0],
    ['cat', 0, 0],
    ['dog', 0, 0],
    ['fly', 0, 0],
    ['frog', 0, 0],
    ['monkey', 0, 0],
    ['spider', 0, 0]
];
//array where playingdata is temporary stored
var temparray = [];
//calculate with this variable when to check for a pair.
var turn = 0;
//the point each player starts of with.
var player1points = 0;
var player2points = 0;
//Which player is allowed to play first
var playturn = 1;
// which difficulty get played on.
var mode = 0;

/**
 *this function adds an eventlistener to the button.
 */
function init() {
    //add event listener to button
    var button = document.getElementById("button");
    button.addEventListener('click', play);
}

/**
 *in this function the variables i need to play the game are set and i get all info from the input fields
 */
function play() {
    //get the difficulty level
    mode = document.getElementById("level").value;

    //get the names of the players
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;

    //Remove the old eventlistener and add a new one so it resets the board.
    var button = document.getElementById("button");
    button.removeEventListener('click', play);
    button.addEventListener('click', reset);

    setscoreboard(player1, player2);
    addcards();
}

/**
 * with this function i add text to the scoreboard so it can be used later.
 * @param player1
 * @param player2
 */
function setscoreboard(player1, player2) {

    //after play button has been pressed hide the form and show the scoreboard.
    document.getElementById("scoreboardstart").style.display = 'none';
    document.getElementById("scoreboard").style.display = 'block';

    //put all variables i have in the text for scoreboard.
    document.getElementById("player1score").innerHTML = player1;
    document.getElementById("player2score").innerHTML = player2;

    document.getElementById("1scorecount").innerHTML = player1points;
    document.getElementById("2scorecount").innerHTML = player2points;

    document.getElementById("p1st").innerHTML = "geraden."
    document.getElementById("p2st").innerHTML = "geraden.";
}

/**
 *with this function i add the cards depending on the difficulty.
 * i also add the eventlisteners in this function.
 */
function addcards() {

    //variable to be used to see how man times a different image has to be chosen.
    var times = 0;
    //get the classnames for the cards
    var numbercards = document.getElementsByClassName("card");

    //if difficulty mode is 1 change the variable else also change but to different number.
    if (mode == 1) {
        times = 8;
    }
    else {
        times = 12;
    }

    //create the number of cards needed by using the difficulty
    var i = 0;
    while (i < times) {
        var carditem = document.createElement("div");
        carditem.setAttribute("class", "card");
        carditem.setAttribute("id", i);
        document.getElementById('playfield').appendChild(carditem);

        //add the eventlisteners per card.
        numbercards[i].addEventListener('click', cardclick);
        i++;
    }
    cardselection(times);
}

/**
 * this function selects which cards are going to be used in this game
 * because there are 9 different cards and on the hardest difficulty only 6 can be used
 * with this function we limit the cards that are going to be used to 6 or 4.
 *
 * @param times
 */
function cardselection(times) {
    //empty array to push information is later
    var selected = [];

    //reset the global variables for every shuffle
    cardvalue = [
        ['bat', 0, 0],
        ['bug', 0, 0],
        ['cat', 0, 0],
        ['dog', 0, 0],
        ['fly', 0, 0],
        ['frog', 0, 0],
        ['monkey', 0, 0],
        ['spider', 0, 0]
    ];

    //calculation variables needed for while loop
    var i = 0;
    var cardtimes = times / 2 - 1;

    while (i <= cardtimes) {

        //a random number generator between 1 and 8 to select image
        var math = Math.random() * 8 + 1;
        //making sure its a full number to avoid errors
        var rand = math.toFixed(0);

        //a if else loop it has to walk through to select the images
        if (rand == 1) {
            if (cardvalue[0][1] == 0) {
                cardvalue[0][1]++;
                i++;
                selected.push("bat");
            } else {
            }
        }
        if (rand == 2) {
            if (cardvalue[1][1] == 0) {
                cardvalue[1][1]++;
                i++;
                selected.push("bug");
            } else {
            }
        }
        if (rand == 3) {
            if (cardvalue[2][1] == 0) {
                cardvalue[2][1]++;
                i++;
                //Cat is put in pool
                selected.push("cat");
            } else {
            }
        }
        if (rand == 4) {
            if (cardvalue[3][1] == 0) {
                cardvalue[3][1]++;
                i++;
                selected.push("dog");
            } else {
            }
        }
        if (rand == 5) {
            if (cardvalue[4][1] == 0) {
                cardvalue[4][1]++;
                i++;
                selected.push("fly");
            } else {
            }
        }
        if (rand == 6) {
            if (cardvalue[5][1] == 0) {
                cardvalue[5][1]++;
                i++;
                selected.push("frog");
            } else {
            }
        }
        if (rand == 7) {
            if (cardvalue[6][1] == 0) {
                cardvalue[6][1]++;
                i++;
                selected.push("monkey");
            } else {
            }
        }
        if (rand == 8) {
            if (cardvalue[7][1] == 0) {
                cardvalue[7][1]++;
                i++;
                selected.push("spider");
            } else {
            }
        }
    }
    //start cardselection with difficulty and the pushed cards.
    shuffle(times, selected);
}

/**
 * with this function i shuffle the cards on the divs to randommize every game.
 * @param times
 * @param cards
 */
function shuffle(times, cards) {
    //set/get all variables before starting the shuffle.
    var numbercards = document.getElementsByClassName("card");
    var slenght = cardvalue.length;

    //two times a 0 variable because i need them later in the code and cant use 1 for the same function
    var i = 0;
    var j = 0;

    // i let this loop run until i is the same as times which wil be 12 or 8 depending on difficulty
    while (i < times) {
        //once again a random number to calculate with.
        var math = Math.random() * 5 + 1;
        var rand = math.toFixed(0);
        //make it possible for rand to be zero so the if else can be a lot shorter.
        rand = rand - 1;
        j = 0;
        while (j < slenght) {
            //if j is the same as the random selected card continue otherwise increase j and try again.
            if (cardvalue[j][0] == cards[rand]) {
                //if cardvalue recent array and the third value is lower than 2 then execute code.
                if (cardvalue[j][2] < 2) {
                    //increase recent cardvalue and set attribute.
                    cardvalue[j][2]++;
                    numbercards[i].setAttribute("value", cardvalue[j][0]);
                    i++;
                    j++;
                }
                else {
                    j++;
                }
            } else {
                j++;
            }
        }
    }
}

/**
 *this function is used when the player clicks a card.
 *and switches the value and class to show another image.
 *then it checks if 2 turns have already passed. if yes then go to check()
 * otherwise just end the function.
 */
function cardclick() {
    //get the id of clicked card
    var id = this.id;
    //get set value of clicked card
    var val = document.getElementById(id).getAttribute('value');

    //switch the attributes and show the depicted animal.
    document.getElementById(id).setAttribute("class", val);
    document.getElementById(id).setAttribute("value", "card");

    //push the variable id and val in an array
    temparray.push(id);
    temparray.push(val);

    //a check to see if all cards are alreadt clicked if yes then go to check otherwise do nothing and continue
    var numbercards = document.getElementsByClassName("card");
    if (numbercards.length == 0) {
        check(id, val);
    } else {
    }

    // if the turn is 1 then wait for 5 seconds to execute rest of code to give player feedback of second clicked card.
    if (turn == 1) {
        setTimeout(function () {
            check(id, val);
        }, 400)
    }
    else {
        // otherwise contineu and remove the clicked element eventlistener to remove unnecessary errors.
        document.getElementById(id).removeEventListener("click", cardclick);
        turn++;
    }
}

/**
 * with this function you check if the 2 cards that you clicked have the same class
 * if the do you remove the event listeners so the cant be clicked again and you add the
 * <span> element to see which player guessed the card right.
 *
 * otherwise set the class to the one it was previusly and add eventlisteners again.
 */
function check() {

    //create the elements to add to the images
    var winitem1 = document.createElement("span");
    var winitem2 = document.createElement("span");

    //set the class to get te css to load for element
    winitem1.setAttribute("class", "playerwon");
    winitem2.setAttribute("class", "playerwon");

    console.log(temparray);
    /*
     *if the are the same remove the eventlisteners and add the guessers number to the picture.
     * otherwise switch the value and the class again and also add the eventlisteners again.
     */
    if (temparray[1] == temparray[3]) {
        document.getElementById(temparray[0]).removeEventListener("click", cardclick);
        document.getElementById(temparray[2]).removeEventListener("click", cardclick);

        document.getElementById(temparray[0]).appendChild(winitem1).innerHTML = playturn;
        document.getElementById(temparray[2]).appendChild(winitem2).innerHTML = playturn;

        /*
         *if its player 1 turn add the points to him otherwise add playerpoints to player 2
         */
        if (playturn == 1) {
            player1points++;
            document.getElementById("1scorecount").innerHTML = player1points;
        }
        else {
            player2points++;
            document.getElementById("2scorecount").innerHTML = player2points;
        }
        turn = 0;
    }
    else {
        document.getElementById(temparray[0]).setAttribute("class", "card");
        document.getElementById(temparray[0]).setAttribute("value", temparray[1]);
        document.getElementById(temparray[2]).setAttribute("class", "card");
        document.getElementById(temparray[2]).setAttribute("value", temparray[3]);

        document.getElementById(temparray[0]).addEventListener('click', cardclick);
        document.getElementById(temparray[2]).addEventListener('click', cardclick);

        /*
         *if playerturn is 1 add playerturn otherwise set playerturn to 1
         */
        turn = 0;
        if (playturn == 1) {
            playturn++;
        } else {
            playturn = 1;
        }
    }
    //empty temparray
    temparray = [];
}

/**
 *with reset() you make every variable that is essential for the game to be played
 * set back to the default value it has.
 */
function reset() {
    var i = 0;
    var times = 0;
    player1points = 0;
    player2points = 0;

    if (mode == 1) {
        times = 8;
    } else {
        times = 12;
    }

    /*
     *as long i is smaler than times keep putting eventlisteners on the elements to avoid errors
     *and then remove the element.
     */
    while (i < times) {
        var rem = document.getElementById(i);
        var remi = rem.id;
        document.getElementById(remi).addEventListener("click", cardclick);
        rem.parentNode.removeChild(rem);
        i++;
    }

    temparray = [];
    turn = 0;
    playturn = 1;

    //switch the display around so another name can be placed.
    document.getElementById("scoreboardstart").style.display = 'block';
    document.getElementById("scoreboard").style.display = 'none';

    var button = document.getElementById("button");
    button.addEventListener('click', play);
}