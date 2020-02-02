let characters      = document.querySelectorAll('.character')
let bowls           = document.querySelector(".bowl")
let scoreBoard      = document.querySelector('#score')
let button          = document.querySelector('button')
let remainingPeeps  = 10
let score           = 0
let heroePaths      = ["./images/heroes/cap.png","./images/heroes/ironman.png","./images/heroes/drstrange.png","./images/villains/doom.png","./images/villains/thanos.png","./images/villains/galactus.png"]

// Gets randomCharacter from the characters variable
// Randomizes paths to image
function randomCharacter() {
  const index = Math.floor(Math.random() * characters.length)
  return characters[index]
}

// Pics a random number between 2 parameters
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// Ads up function to css, which adds 50 px to the bottom of the image making it popOut
function popOut(character){
  character.src= heroePaths[Math.floor(Math.random() * heroePaths.length)]
  character.classList.add('up')
}

// Removes up property to get it back to it's initial spot
function shrink(character){
  character.classList.remove('up')
}

// Stated on the html is an onclick event that calls this function
// Adds to score
//  calls shrink which automatically removes the Up class
function bonk(character) {
  shrink(character)
  score++
  scoreBoard.textContent = score
}

// Calls randomTime which gives a random time/number within the values given and sets it to variable
// Calls popOut() to have the css class up added
// Uses setTimeout to call shrink after the time set in the time variable(Random)
// Has a conditional statement to check if there are still remaining peeps,
// If so, it decreases the remainingPeeps assign the variable character to a randomCharacter 
// and peeps again after time(random).
function peep(character) {
  const time = randomTime(200, 2000)
  popOut(character)
  setTimeout( () => { shrink(character) }, time)
  if(remainingPeeps > 0){
    remainingPeeps--
    const character = randomCharacter()
    setTimeout( () => { peep(character) }, time )
  }
}

// Starts game
// Sets the character variable to a random character and then calls peep.
function startGame() {
  // button.disabled = true
  // document.querySelector('#score').innerText = "0"
  let MI =  new Audio("./audio/MI.mp3")
  // MI.pause()
  scoreBoard.textContent = 0
  const character = randomCharacter()
  peep(character)
  console.log("start")
  MI.play()
}

// Until here it's the basic game

// The following is for adding divs (Bowls & Character)

//document.body.style.cursor = "url('./images/cap.png')";
//console.log(document.body.style)
// function addStuff () {
//   let bowl = 
//   `<div class="character-bowl">
//     <img src="./images/MarvelBowl.png" class="bowl">
//     <img src="./images/cap.png" class="character" onclick="bonk(this)">
//   </div>`;

//   document.querySelector("body > main").innerHTML += row
// }
