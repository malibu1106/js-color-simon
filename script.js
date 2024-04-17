// VARIABLES
let colors = ['red', 'green', 'yellow', 'blue']; // liste des couleurs
let colorList = new Array(); // init tableau
// FUNCTIONS
function getRandomInt() { // on fait une fonction pour tirer un nombre aléatoire
    return Math.floor(Math.random() * 4); // entre 0 et 3
}
let i = 0;
function nextColorPicker() { // on fait une fonction pour remplir le tableau colorSuite > listes des couleurs à deviner
    {
        colorList[i] = colors[getRandomInt()]; // Ligne [i] = color random
        console.log("colorlist", i, colorList[i]);
        i++;
    }
}
let y = 0;
function displayColorList() {
    setTimeout(function () {
        document.getElementById('colorList').style.background = "none";
        y++;
        if (y < colorList.length) {
            displayColorList();
        }
    }, 2000);
    setTimeout(function () {
        document.getElementById('colorList').style.background = colorList[y];
        // console.log(colorList[y]);
    }, 1000);
}
let userColorList = new Array(); // init tableau joueur
let z = 0;
function nextUserColorPicker(color) {
    userColorList[z] = color;
    console.log("userColorList", z, userColorList[z]);
    z++;
    compareLists();
}
let points = 0;
function compareLists() {
    if (arraysEqual(colorList, userColorList)) {
        points++;
        document.getElementById('points').innerHTML = points;
    }
    document.getElementById('colorListDisplay').innerHTML = "color list : " + colorList;
    document.getElementById('userColorListDisplay').innerHTML = "user color list : " + userColorList;
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

