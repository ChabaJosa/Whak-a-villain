function popOut(character){
    character.classList.add('up');
    // console.log(character.src);
}


function shrink(character){
    character.classList.remove('up');
}

  
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomCharacter() {
    // console.log("Remaining peeps at the start are",remainingPeeps) // 0
    let index = Math.floor(Math.random() * characters.length);
    console.log('random bowl is selected');

    let random = Math.round(Math.random());
    characters[index].isVillain = !random;
    characters[index].src = random ? heroePaths[~~(Math.random() * heroePaths.length)] : villainPaths[~~(Math.random() * villainPaths.length)];
    // Ads src to random character
    console.log("Selected random character")

    popOut(characters[index]); // pops
    setTimeout( () => { 
        shrink(characters[index]);
        if(remainingPeeps) {
            randomCharacter()
            remainingPeeps--;
        }
    }, 
        randomTime(startRange,endRange)
    ); // shrinks

    if (characters[index].isVillain===true){
        countVillains++;
        console.log("Added to villains")
    }
    // remainingPeeps--; // This is the problem
    console.log("Inside the for loop remainingPeeps",remainingPeeps) // 0
    
    // console.log("REmaining peeps are",remainingPeeps) // 0
    // return characters[index];
}


function startGame() {
    console.log("start");
    console.log("Remaining peeps at the start function are",remainingPeeps) // 10
    // button.disabled = true

    button.textContent="Start";
    scoreBoard.textContent = 0;
    vScoreBoard.textContent = 0;

    MI.currentTime = 0;
    MI.play();

    window.scrollTo(0,document.body.scrollHeight);
    // console.log("Outside the while loop")
    randomCharacter();
    // for(i=0;i <= remainingPeeps;i++){
        
    // }

}


function gameStoppped(){

    main.style.display="none";
    MI.pause();

    if (score>vScore){
        // console.log("Level over");
        if (score >= countVillains){
            // console.log("Got all the villains")
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
        // console.log("Game over");
        button.textContent="Restart" // Actually start button
        button.insertAdjacentHTML('beforebegin',`<h1>${failPhrases[Math.floor(Math.random() * failPhrases.length)]}</h1>`)
        button.insertAdjacentHTML('afterend',`<button onclick=${marvel}>More  Marvel  Stuff</button>`)
    }

}

function bonk(character) {
    shrink(character)
    if (character.isVillain==false){
        vScore++;
        vScoreBoard.textContent = vScore;
    } else {
        score++;
        scoreBoard.textContent = score;
    } 

    if (remainingPeeps<=0){ // Checks peeps and if there's no more, stops game
        gameStoppped()
    }

}


