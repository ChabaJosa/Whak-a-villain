let characters      = document.querySelectorAll('.character');
let bowls           = document.querySelector(".bowl");
let button          = document.querySelector('button');
let scoreBoard      = document.querySelector('#score');
let vScoreBoard     = document.querySelector('#villainScore');
let levelBoard      = document.querySelector('#Level');
let score           = 0;
let vScore          = 0;
let level           = 1;
let remainingPeeps  = 10;
let heroePaths      = ["./images/heroes/cap.png","./images/heroes/ironman.png","./images/heroes/drstrange.png"];
let villainPaths    = ["./images/villains/doom.png","./images/villains/thanos.png","./images/villains/galactus.png"];
let elements        = document.getElementsByClassName("character");
let main            = document.querySelector("#main")
let coolPhrases     = ["Step it up","I can do a little faster","That was easy"]
let MI              = new Audio("./audio/MI.mp3");
// let bonkSound       = new Audio("./audio/MI.mp3"); // Add bonk sound
let startRange      = 200;
let endRange        = 2000;
let time;






// The following is for adding divs (Bowls & Character pairs)

// document.body.style.cursor = "url('./images/cap.png')";
// console.log(document.body.style)

// function addStuff () {
//   let bowl = 
//   `<div class="character-bowl">
//     <img src="" class="bowl">
//     <img src="" class="character" onclick="bonk(this)">
//   </div>`;

//   document.querySelector("body > main").innerHTML += row
// }
