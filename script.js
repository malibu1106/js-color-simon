// VARIABLES
let colors = ['red', 'green', 'yellow', 'blue']; // liste des couleurs
let colorSuit = Array(); // init tableau

// FUNCTIONS
function getRandomInt() { // on fait une fonction pour tirer un nombre aléatoire
    return Math.floor(Math.random() * 4); // entre 0 et 3
}
function colorSuiteChooser() { // on fait une fonction pour remplir le tableau colorSuite > listes des couleurs à deviner
    for (let i = 0; i < 10; i++) {
        colorSuit[i] = colors[getRandomInt()]; // Ligne [i] = color random

    }
}

colorSuiteChooser(); // on lance la fonction pour générer la suite de couleur à deviner


let y = 0;

function displayColorSuit() {
    setTimeout(function () {
        document.getElementById('colorSuite').style.background = "none";

        y++;
        if (y < colorSuit.length) {
            displayColorSuit();
        }
    }, 2000);
    setTimeout(function () {
        document.getElementById('colorSuite').style.background = colorSuit[y];
        console.log(colorSuit[y]);

    }, 1000);
}

displayColorSuit();


