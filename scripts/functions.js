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
        // console.log("Working")
    };
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
    console.log("pop",character.src)
    if (random===0 && remainingPeeps!=0){ 
        character.isVillain = 0;
        countVillains++
        // console.log("Villain number ",countVillains,character.src)
    }
    // console.log(character.src, character.isVillain);
    character.classList.add('up');
}

// Removes up property to get it back to it's initial spot
function shrink(character){
    setTimeout( () => { character.isVillain = undefined; character.src="" }, 200); // for portal bowl
    console.log("shrink","isVillain",character.isVillain)
    character.classList.remove('up');
}
  
// Stated on the html is an onclick event that calls this function
// Adds to score
// Calls shrink which automatically removes the Up class
function bonk(character) {
    hammer.play();
    shrink(character);
    if (character.isVillain!==0){ // If bonk hero, increase villain score
        console.log("hero bonked",character.src,character.isVillain);
        vScore++;
        vScoreBoard.textContent = vScore;
        character.isVillain = undefined;
    } else { // If bonk villain, increase hero score
        console.log("villain bonked",character.src,character.isVillain);
        score++;
        scoreBoard.textContent = score;
        character.isVillain = undefined;
    } 
    // console.log(character.src, character.isVillain);

}

// Speeds up the pop
function speedUp() {
    if (skip<1){    // When you run out of lives
        document.querySelectorAll("h1")[1].remove();
        document.querySelector("#skipButton").remove()
        gameOver();
    } else {        // While you have lives left
        endRange -= 500;
        level++;
        levelBoard.textContent = level;
        
        if(document.getElementById("skipButton")!==null){
            skip--;
        }

        skipBoard.textContent = skip;
        startGame();
    }
}
  
// Increases music
function defineMI () {
    if (level==1){
        MI = new Audio("./audio/MIx100.mp3");
    } else if (level==2){
        MI = new Audio("./audio/MIx115.mp3");
    } else if (level==3){
        MI = new Audio("./audio/MIx130.mp3");
    } else if (level==4){
        MI = new Audio("./audio/MIx145.mp3");
    } else if (level==5){
        MI = new Audio("./audio/MIx160.mp3");
    } else {
        MI = new Audio("./audio/thanos.mp3");
    }
}

function peepsOver () {

    main.style.display="none";
    MI.pause();
    button.disabled = false
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
            button.insertAdjacentHTML('afterend',`<button onclick=${"speedUp()"} id="skipButton">Skip Level</button>`);
        }
        
    } else {
        gameOver ()
    }

}

function gameOver (){
    console.log("Game over");
    // Play some audio here (Negative)
    button.textContent="Restart" // Actually start button
    button.insertAdjacentHTML('beforebegin',`<h1>${failPhrases[Math.floor(Math.random() * failPhrases.length)]}</h1>`);
    button.insertAdjacentHTML('afterend',`<button onclick=${marvel}>More  Marvel  Stuff</button>`);
    level=1;
    endRange=3000;
    skip=3;
}

// Calls randomTime which gives a random time/number within the values given and sets it to variable
// Calls popOut() to have the css class up added
// Uses setTimeout to call shrink after the time set in the time variable(Random)
// Has a conditional statement to check if there are still remaining peeps,
// If so, it decreases the remainingPeeps assign the variable character to a randomCharacter 
// and peeps again after time(random).
// The else at the end is what happens if the game is over
function peep(firstCharacter) {
    time = randomTime(startRange, endRange);
    popOut(firstCharacter); // console.log("First pop");
    setTimeout( () => { shrink(firstCharacter) }, time);
    if (remainingPeeps > 0){
        remainingPeeps--;
        let character = randomCharacter();
        setTimeout( () => { peep(character) }, time );
        console.log("peep",remainingPeeps,"remainingPeeps")
    } else { // Remaining Peeps done
        // characters[index].classList[1]==="up" // Checking if the up class has been removed might help
        peepsOver()
    }   
}

// Starts game
// Sets the character variable to a random character, scrolls and then calls peep.
// Starts music
function startGame() {
    console.log("start");
    button.textContent="Start"; // If not it will say try again after level one
    button.disabled = true

    if (main.style.display=="none"){
        main.style.display="";
        remainingPeeps=10;
        score=0;
        vScore=0;
        countVillains=0;
        skipBoard.textContent = skip;
        levelBoard.textContent = level;
        document.querySelectorAll("button")[1].remove();
        document.querySelectorAll("h1")[1].remove()

    };

    vScoreBoard.textContent = 0;
    scoreBoard.textContent = 0;
    const firstCharacter = randomCharacter();
    
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