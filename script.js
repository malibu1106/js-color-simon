// VARIABLES
let colors = ['red', 'green', 'yellow', 'blue']; // liste des couleurs
let colorList = new Array(); // init tableau
// FUNCTIONS
function getRandomInt() { // on fait une fonction pour tirer un nombre aléatoire
    return Math.floor(Math.random() * 4); // entre 0 et 3
}
let none = "";
let l1 = 0;
let l2 = 0;
let cardsLocked = true;

let userColorList = new Array(); // init tableau joueur
let z = 0;


let i = 0;
function nextColorPicker() { // on fait une fonction pour remplir le tableau colorSuite > listes des couleurs à deviner
    {
        colorList[i] = colors[getRandomInt()]; // Ligne [i] = color random
        console.log("colorlist", i, colorList[i]);
        i++;
        document.getElementById('displayMessage').innerHTML = none;
        refreshTableLenght();
        displayColorList();
    }
}



let y = 0;
function displayColorList() {
    document.getElementById('colorList').style.scale = "1.5";
    document.getElementById('colorList').style.transitionDuration = "0.5s";
    setTimeout(function () {
        document.getElementById('colorList').style.background = "white";
        y++;
        if (y == colorList.length) {
            document.getElementById('displayMessage').innerHTML = "A vous de jouer !";
            document.getElementById('colorList').style.scale = "1";
            cardsLocked = false;
        }
        if (y < colorList.length) {
            displayColorList();
        }
    }, 1500);
    setTimeout(function () {
        document.getElementById('colorList').style.background = colorList[y];
        // console.log(colorList[y]);
    }, 500);
    userColorList = Array();
    z = 0;
}


function nextUserColorPicker(color) {
    if (cardsLocked != true) {
        userColorList[z] = color;



        //console.log("userColorList", z, userColorList[z]);
        refreshTableLenght();

        z++;

        if (l1 === l2) {
            compareLists();
            cardsLocked = true;
            y = 0;
        }
    }
}



let points = 0;
function compareLists() {
    if (arraysEqual(colorList, userColorList)) {
        points++;
        document.getElementById('points').innerHTML = "Points : " + points;
        document.getElementById('displayMessage').innerHTML = "Bravo";
        nextColorPicker();
    }
    else {
        document.getElementById('displayMessage').innerHTML = "Perdu ! Vous avez marqué " + points + " points";
        resetGame();

    }
    //document.getElementById('colorListDisplay').innerHTML = "color list : " + colorList;
    //document.getElementById('userColorListDisplay').innerHTML = "user color list : " + userColorList;
}
function arraysEqual(arr1, arr2) {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }
    // Check if all elements in the arrays are equal
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function refreshTableLenght() {
    l1 = colorList.length;
    l2 = userColorList.length;

}

function startGame() {
    nextColorPicker();
    document.getElementById('startGameButton').style.visibility = "hidden";

}
function resetGame() {
    userColorList = new Array();
    colorList = new Array();
    points = 0;
    document.getElementById('points').innerHTML = "Points : " + points;
    document.getElementById('startGameButton').style.visibility = "visible";
    i = 0;
}
