// VARIABLES
let colors = ['#c23a3a', '#3ac243', '#c2ab3a', '#3a5ac2', '#AC7AA2', '#E7782D']; // liste des couleurs
let none = ""; // Variable de texte vide pour masquer la phrase de displayMessage
let l1 = 0; // Variable longueur tableau 1 qui sera utilisé pour comparer la taille des deux tableaux de couleurs
let l2 = 0; // Variable longueur tableau 2 qui sera utilisé pour comparer la taille des deux tableaux de couleurs
let cardsLocked = true; // Variable pour empecher le joueur de cliquer en dehors de son moment pour deviner la suite de couleur
let colorList = new Array(); // init tableau
let userColorList = new Array(); // init tableau joueur
let points = 0; // compteur de points
let z = 0; // compteur pour le tableau userColorList
let i = 0; // compteur pour le tableau colorList
let y = 0; // COmpteur pour l'affichage de l'intégralité du tableau colorlist

// VARIABLES SOUND
let audioc23a3a = new Audio("sounds/C.wav");
let audio3ac243 = new Audio("sounds/D.wav");
let audioc2ab3a = new Audio("sounds/E.wav");
let audio3a5ac2 = new Audio("sounds/F.wav");
let audioAC7AA2 = new Audio("sounds/G.wav");
let audioE7782D = new Audio("sounds/A.wav");

function audioPlay(color) {
    if (color == "#c23a3a") {
        audioStop();
        audioc23a3a.play();
    }
    else if (color == "#3ac243") {
        audioStop();
        audio3ac243.play();
    }
    else if (color == "#c2ab3a") {
        audioStop();
        audioc2ab3a.play();
    }
    else if (color == "#3a5ac2") {
        audioStop();
        audio3a5ac2.play();
    }
    else if (color == "#AC7AA2") {
        audioStop();
        audioAC7AA2.play();
    }
    else if (color == "#E7782D") {
        audioStop();
        audioE7782D.play();
    }
}

function audioStop() {
    audioc23a3a.pause();
    audio3ac243.pause();
    audioc2ab3a.pause();
    audio3a5ac2.pause();
    audioAC7AA2.pause();
    audioE7782D.pause();
    audioc23a3a.currentTime = 0;
    audio3ac243.currentTime = 0;
    audioc2ab3a.currentTime = 0;
    audio3a5ac2.currentTime = 0;
    audioAC7AA2.currentTime = 0;
    audioE7782D.currentTime = 0;
}

// FUNCTIONS
function getRandomInt() { // on fait une fonction pour tirer un nombre aléatoire
    return Math.floor(Math.random() * 6); // entre 0 et 3
}

function nextColorPicker() { // on fait une fonction pour remplir le tableau colorSuite > listes des couleurs à deviner
    {
        colorList[i] = colors[getRandomInt()]; // On ajoute une ligne au tableau en fonction de [i], avec une couleur random parmis les 4
        i++; // on passe à la ligne suivante dans notre tableau
        document.getElementById('displayMessage').innerHTML = none; // on masque le message, car le joueur doit attendre de voir la suite avant de jouer
        refreshTableLenght(); // on appelle la fonction qui rafraichit la longueur des tableaux, pour la future comparaison des tableaux
        displayColorList(); // On affiche la suite de couleur que le joueur devra deviner
    }
}

function displayColorList() {
    document.getElementById('colorList').style.scale = "1.5"; // On augmente la taille de la zone des couleurs
    document.getElementById('colorList').style.transitionDuration = "0.5s"; // Avec une petite transition pétée des familles
    setTimeout(function () {
        document.getElementById('colorList').style.background = "white"; // bg white entre les couleurs
        y++;
        if (y == colorList.length) { // une fois qu'on a affiché la liste entière
            document.getElementById('displayMessage').innerHTML = "A vous de jouer !"; // le tour du joueur commence
            document.getElementById('colorList').style.scale = "1"; // on remet la zone des couleurs en taille normale
            cardsLocked = false; // on débloque les boutons du joueurs
        }
        if (y < colorList.length) { // tant qu'on a pas affiché la liste entiere
            displayColorList(); //on répète la boucle
        }
    }, 1050); // 1 s color
    setTimeout(function () {
        document.getElementById('colorList').style.background = colorList[y]; // on applique le background correspondant à la couleur [y] dans la liste
    }, 350); // 0.5s white
    userColorList = Array(); // on reset le tableau du joueur, car il doit tout deviner depuis le début
    z = 0; // on retourne a la premiere ligne du tableau pour le joueur
}

function nextUserColorPicker(color) { // on récup la couleur via le button correspondant
    audioPlay(color);

    if (cardsLocked != true) { // on verifie que c'est au tour du joueur d'agir
        userColorList[z] = color; // on insere la couleur choisie par le joueur dans la ligne [z] du tableau joueur
        createChosenColorList(color); // on appelle la fonction qui rappelera au joueur ce qu'il vient de saisir (en cas de liste + longue surtout)
        refreshTableLenght(); // on appelle la fonction qui rafraichit la longueur des tableaux, pour la future comparaison des tableaux
        z++; // on passe à la ligne suivante du tableau pour le joueur
        if (l1 === l2) { // on compare la longueur des deux tableaux, si l'utilisateur a saisi autant de couleur qu'il doit en deviner alors
            compareLists(); // on va comparer sa saisie à celle à deviner
            cardsLocked = true; // on bloque les actions du joueur
            y = 0; // on reset le tableau du joueur comme il doit recommencer
        }
        if (!arraysEqual(colorList.slice(0, z), userColorList)) { // si une ligne des tableaux est différentes > alors le joueur a perdu
            resetGame(); // on appelle la fonction de fin du jeu
        }
    }
}

function compareLists() {

    if (arraysEqual(colorList, userColorList)) { // On lance la fonction pour voir si les deux tableaux sont identiques
        points++; // le joueur marque un point
        document.getElementById('points').innerHTML = "Points : " + points; // on rafraichit l'affichage des points
        document.getElementById('displayMessage').innerHTML = "Bravo"; // On met un message
        nextColorPicker(); // on passe à l'ajout d'une couleur dans la liste à deviner
        document.querySelectorAll(".memo").forEach(e => e.remove()); // On selectionne tous les memo, et on les supprime pour la prochaine tentative
    }
    else { // sinon le joueur a perdu
        // On selectionne tous les memo, et on les supprime pour la prochaine partie
        resetGame(); // on appelle la fonction de fin du jeu

    }
}

function arraysEqual(arr1, arr2) { // On vérifie que les tableaux sont identiques
    if (arr1.length !== arr2.length) { // Si ils font pas la même longueur, on va pas plus loin
        return false;
    }
    for (let i = 0; i < arr1.length; i++) { // Si ils ont la même longueur, alors 
        if (arr1[i] !== arr2[i]) { // on vérifie chaque ligne et si une est différente
            return false; // on return false
        }
    }
    return true; // dans les autres cas, les deux listes sont identiques
}

function refreshTableLenght() {
    l1 = colorList.length; // les variables pour la longueur des tableaux sont rafraichies avec leur nouvelles tailles
    l2 = userColorList.length; // les variables pour la longueur des tableaux sont rafraichies avec leur nouvelles tailles
}

function startGame() { // on lance le jeu donc
    nextColorPicker(); // on tire une première couleur 
    document.getElementById('startGameButton').style.visibility = "hidden"; // et on cache le bouton start
    points = 0; // on reset les points
    document.getElementById('points').innerHTML = "Points : " + points; // on rafraichit l'affichage pour la prochaine game
}

function resetGame() {
    userColorList = new Array(); // on reset le tableau de couleurs choisies par le joueur
    colorList = new Array(); // on reset le tableau des couleurs à deviner
    document.getElementById('displayMessage').innerHTML = "Perdu ! Vous avez marqué " + points + " points"; // on affiche le message de fin
    document.querySelectorAll(".memo").forEach(e => e.remove());
    document.getElementById('startGameButton').style.visibility = "visible"; // on réaffiche le bouton start
    i = 0; // on reset le tableau colorList
}
function createChosenColorList(color) {
    color = color.replace("#", "");
    let content = document.createElement("div"); // on créé une div
    content.className = "memo m-" + color; // avec une classe de la derniere couleur saisie par le joueur
    document.getElementById('displayMemo').appendChild(content); // et on push ça dans la zone voulue
}
