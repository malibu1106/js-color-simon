// VARIABLES
let colors = ['red', 'green', 'yellow', 'blue']; // liste des couleurs
let colorSuite = Array(); // init tableau

// FUNCTIONS
function getRandomInt() { // on fait une fonction pour tirer un nombre aléatoire
    return Math.floor(Math.random() * 4); // entre 0 et 3
}
function colorSuiteChooser() { // on fait une fonction pour remplir le tableau colorSuite 
    for (let i = 0; i < 10; i++) {
        colorSuite[i] = colors[getRandomInt()]; // Ligne [i] = color random

    }
}

colorSuiteChooser(); // on lance la fonction obv (j'avais oublié ..)

