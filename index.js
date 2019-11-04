var Word = require("./word");
var inquirer = require('inquirer');
var colors = require('colors');


wordList = ["RAIDEN", "SUB ZERO", "SCORPION", "LIU KANG", "JOHNNY CAGE", "SHAO KAHN", "KITANA", "SONYA BLADE", "KANO", "SHANG TSUNG", "JAX", "KUNG LAO", "JADE", "KABAL"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {
    if (wordList.length<2) {
        wordList = ["RAIDEN", "SUB ZERO", "SCORPION", "LIU KANG", "JOHNNY CAGE", "SHAO KAHN", "KITANA", "SONYA BLADE", "KANO", "SHANG TSUNG", "JAX", "KUNG LAO", "JADE", "KABAL"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 9 letter guesses to find the Mortal kombat Character.\n".magenta)
    promptUser();
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter<8) {
        console.log(gameWord.showWord().blue.bold);
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter.".magenta
            }
        ]).then(function(data) {
                checkAnswer(data);
                
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n".red);
        console.log(`The correct Character is:  ${chosenWord}`.green.bold);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks if user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".red);
            counter++;
            console.log(((8 - counter) + " guesses remaining".magenta));
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n");
        promptUser();
    }
}

//If the user's guess is correct, the word array displays the word with the guessed letter(s), 
//If all guesses are correct, the game restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green.bold);
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(`Guessed Character:  ${gameWord.showWord()}`.rainbow.bold);
        console.log("\nYou win!!\n".green.bold);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();