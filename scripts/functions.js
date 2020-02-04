// Gets randomCharacter from the characters variable
// Randomizes paths to image
function randomCharacter() {
    let index = Math.floor(Math.random() * characters.length)
    while(characters[index].classList[1]==="up"){
        console.log("Hi")
        index = Math.floor(Math.random() * characters.length)
    }
    return characters[index]
  }
  
  // Pics a random number between 2 parameters
  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
  
  // Ads up function to css, which adds 50 px to the bottom of the image making it popOut
  // Ads a random src to the image which could come either form the villain array or the hero array
  // Random gives you either 0 or 1
  // Character.isVillain is set to not equal random so it is set to a falsey value (0)
  // If random is 1 (truthy) then it'll be a hero image because random is true, else it will return false 
  // and a src from the villain array
  // Character.isVillain is just an attributeused to track which are villains an not.
  function popOut(character){
    let random = Math.round(Math.random());
    character.isVillain = !random;
    character.src = random ? heroePaths[Math.floor(Math.random() * heroePaths.length)]: villainPaths[Math.floor(Math.random() * villainPaths.length)];
    character.classList.add('up')
    console.log(character.classList)
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
    if (character.isVillain==true){
        vScore++;
        vScoreBoard.textContent = vScore;
    } else {
        score++;
        scoreBoard.textContent = score;
    } 
    
  }

  // Speeds up the pop
  function speedUp(time) {
        endRange -= 300
  }
  
  // Calls randomTime which gives a random time/number within the values given and sets it to variable
  // Calls popOut() to have the css class up added
  // Uses setTimeout to call shrink after the time set in the time variable(Random)
  // Has a conditional statement to check if there are still remaining peeps,
  // If so, it decreases the remainingPeeps assign the variable character to a randomCharacter 
  // and peeps again after time(random).
  // The else at the end is what happens if the game is over
  let time            = randomTime(startRange, endRange)

  function peep(character) {
    popOut(character)
    setTimeout( () => { shrink(character) }, time)
    if(remainingPeeps > 0){
        // console.log(remainingPeeps)
        remainingPeeps--;
        const character = randomCharacter();
        setTimeout( () => { peep(character) }, time );
    } else{
        console.log("Game over")
        main.style.display="none";
        MI.pause()
        button.textContent="Try Level 1 again" // Actually start button
        // Play some audio here

        button.insertAdjacentHTML('afterend',`<button ${onclick="speedUp(), startGame()"}>${coolPhrases[Math.floor(Math.random() * coolPhrases.length)]}</button>`)
    }   // SpeedUp not really woring
  }
  
  // Starts game
  // Sets the character variable to a random character and then calls peep.
  // Starts music
  function startGame() {

    if (main.style.display=="none"){
        main.style.display="";
        remainingPeeps=10;
        score=0;
        vScore=0;
        document.querySelectorAll("button")[1].remove() 
    } 

    // button.disabled = true
    
    scoreBoard.textContent = 0;
    const character = randomCharacter();
    peep(character);
    console.log("start");
    MI.currentTime = 0;
    MI.play();
    
  }
  


// [...elements].forEach(el =>
//   el.addEventListener("click",function(){
//     // console.log('am I a villian ',el.isVillain ? 'true' : 'false');
// })
// )