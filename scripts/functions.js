// Gets randomCharacter from the characters variable
// Randomizes paths to image
// Ads a random src to the image which could come either form the villain array or the hero array
// Random gives you either 0 or 1
// Character.isVillain is set to not equal random so it is set to a falsey value (0)
// If random is 1 (truthy) then it'll be a hero image because random is true, else it will return false 
// and a src from the villain array
// Character.isVillain is just an attributeused to track which are villains an not.
function randomCharacter() {
    let index = Math.floor(Math.random() * characters.length);
    while(characters[index].classList[1]==="up"){
        index = Math.floor(Math.random() * characters.length);
    };
    console.log('random bowl is called');
    // characters[index].isVillain = !random;
    return characters[index];
  }
  
// Pics a random number between 2 parameters
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Ads up function to css, which adds 50 px to the bottom of the image making it popOut
function popOut(character){
    let random = Math.round(Math.random());
    character.src = random===1 ? heroePaths[~~(Math.random() * heroePaths.length)] : villainPaths[~~(Math.random() * villainPaths.length)];
    if (random===0){
        character.isVillain = 0;
        countVillains++
    }
    // console.log(character.src, character.isVillain);
    character.classList.add('up');
}

// Removes up property to get it back to it's initial spot
function shrink(character){
    character.classList.remove('up');
}
  
// Stated on the html is an onclick event that calls this function
// Adds to score
// Calls shrink which automatically removes the Up class
function bonk(character) {
    hammer.play();
    shrink(character)
    if (character.isVillain!==0){ // If bonk hero, increase villain score
        vScore++;
        vScoreBoard.textContent = vScore;
    } else { // If bonk villain, increase hero score
        score++;
        scoreBoard.textContent = score;
    } 

}

// Speeds up the pop
function speedUp() {
    endRange -= 500;
    level++;
    startGame();
    levelBoard.textContent = level;
}
  
// Calls randomTime which gives a random time/number within the values given and sets it to variable
// Calls popOut() to have the css class up added
// Uses setTimeout to call shrink after the time set in the time variable(Random)
// Has a conditional statement to check if there are still remaining peeps,
// If so, it decreases the remainingPeeps assign the variable character to a randomCharacter 
// and peeps again after time(random).
// The else at the end is what happens if the game is over

function defineMI () {
    if (level==1){
        MI = new Audio("./audio/MIx100.mp3");
        console.log(MI);
    } else if (level==2){
        MI = new Audio("./audio/MIx115.mp3");
        console.log(MI);
    } else if (level==3){
        MI = new Audio("./audio/MIx130.mp3");
        console.log(MI);
    } else if (level==4){
        MI = new Audio("./audio/MIx145.mp3");
        console.log(MI);
    } else if (level==5){
        MI = new Audio("./audio/MIx160.mp3");
        console.log(MI);
    } else {
        MI = new Audio("./audio/thanos.mp3");
        console.log(MI);
    }

}

function peep(firstCharacter) {
    time = randomTime(startRange, endRange);
    // console.log(time)
    popOut(firstCharacter);
    setTimeout( () => { shrink(firstCharacter) }, time);
    if (remainingPeeps > 0){
        // console.log(remainingPeeps)
        remainingPeeps--;
        let character = randomCharacter();
        setTimeout( () => { peep(character) }, time );
        
    } else { // Remaining Peeps done
        main.style.display="none";
        MI.pause();
        if (score>vScore){
            console.log("Level over");
            // Play some audio here (Postive)
            if (score >= countVillains){
                console.log("Got all the villains")
                button.textContent="Play level again" // Actually start button
                button.insertAdjacentHTML('beforebegin',`<h1>${victoryPhrases[Math.floor(Math.random() * victoryPhrases.length)]}</h1>`);
                button.insertAdjacentHTML('afterend',`<button onclick=${"speedUp()"}>${coolPhrases[Math.floor(Math.random() * coolPhrases.length)]}</button>`);
            } else {
                console.log("Got a good Hero score")
                button.textContent="Try again" // Actually start button
                button.insertAdjacentHTML('beforebegin',`<h1>You missed ${countVillains-score} villains</h1>`);
                button.insertAdjacentHTML('afterend',`<button onclick=${"speedUp()"}>Skip Level</button>`);
            }
            
        } else {
            console.log("Game over");
            // Play some audio here (Negative)
            button.textContent="Restart" // Actually start button
            button.insertAdjacentHTML('beforebegin',`<h1>${failPhrases[Math.floor(Math.random() * failPhrases.length)]}</h1>`);
            button.insertAdjacentHTML('afterend',`<button onclick=${marvel}>More  Marvel  Stuff</button>`);
            level=1;
            endRange=3000;
        }
        
    }   
}
  
// Starts game
// Sets the character variable to a random character and then calls peep.
// Starts music
function startGame() {
    console.log("start");

    button.textContent="Start";

    if (main.style.display=="none"){
        main.style.display="";
        remainingPeeps=10;
        score=0;
        vScore=0;
        countVillains=0;
        // level=1;
        levelBoard.textContent = level;
        document.querySelectorAll("button")[1].remove();
        document.querySelectorAll("h1")[1].remove()

    };

    // button.disabled = true

    scoreBoard.textContent = 0;
    const firstCharacter = randomCharacter();
    // peep(firstCharacter);
    
    
    let height = 0; 
    
    let scrollInterval = setInterval(()=>{
        height+=3
        window.scrollTo(0,height);
        
        if(height >= document.body.scrollHeight){
            clearInterval(scrollInterval)
            peep(firstCharacter);
        }
        
        
    },1)
    
    
    defineMI()
    MI.currentTime = 0;
    MI.play();


}
  


// [...elements].forEach(el =>
//   el.addEventListener("click",function(){
//     console.log('am I a villian ',el.isVillain ? 'true' : 'false');
// })
// )