
// MAIN CONTAINER
const mainContainer = document.getElementById('main-container');
// PLAYER CONTAINER
const plyr = document.getElementById('player');
// SHOOT CONTAINER - Use to add the created shoot divs
const shootMainContainer = document.getElementById('shoot-main-container');
// CUBES CONTAINER - Use to add the created cubes divs
const cubesMainContainer = document.getElementById('cubes-main-container');

// UPDATE LEVEL & POINTS 
// HI-SCORE
const hiScoreNum = document.querySelector('.hi-score-num');
// SCORE
const scoreNum = document.querySelector('.score-num');
// LEVEL
const levelNum = document.querySelector('.level-num');

// START GAME
const startGame = document.getElementById('start-game');
// GAME OVER
const gameOver = document.getElementById('game-over')

// Saved Score
hiScoreNum.innerText = localStorage.getItem('score'); // Change to localStorage

                    // PLAYER MOVEMENT AND POSITION
// Hides the player until you start the game
plyr.style.display = 'none'


let T = 660;
let L = 240;
// Player Initial Position
plyr.style.top = T + 'px';
plyr.style.left = L + 'px';

// MOVE LEFT
function moveL() {
    if (L > 0) {
        L -= 20
        plyr.style.left = +L + 'px';
    }
}
// MOVE RIGHT
function moveR() {
    if (L < 480) {
        L += 20
        plyr.style.left = +L + 'px';
    }
}

let plyrMove = (e) => {
    if (e.keyCode === 65) { // A
        moveL();
    } else if (e.keyCode === 68) { // D
        moveR();
    } else if (e.target == startGame) { // Click
        cubesFallingTimer()
        // Shows the player
        plyr.style.display = 'flex'
        // Hides Start Game
        startGame.style.display = 'none'
        // Add player shoot
        addPlyrShoot()
    } else if (e.target == gameOver) { // Click
        window.location.reload()
    }
}

window.addEventListener('keydown', plyrMove);
window.addEventListener('click', plyrMove);

let plyrShoot = (e) => {
    if (e.keyCode === 74) { // J
        shootFx();
        window.removeEventListener('keyup', plyrShoot);
    }
}
function addPlyrShoot() {
    window.addEventListener('keyup', plyrShoot);
}


// START GAME

let startGameBttn = (e) => {
    if (e.key === 'Enter') { // Enter
        cubesFallingTimer()
        // Shows the player
        plyr.style.display = 'flex'
        // Hides Start Game
        startGame.style.display = 'none'
        // Quit bttn pressing
        window.removeEventListener('keydown', startGameBttn);
        // Add player shoot
        addPlyrShoot()
    } 
}

window.addEventListener('keydown', startGameBttn);


                    // FAST SPEED MOVEMENT L & R


    // MOVE FAST LEFT
let idL = '';
function moveFastL() {
     if (L > 0) {
        L -= 20
        plyr.style.left = +L + 'px';
    } else {
    }
}
    // MOVE FAST RIGHT
let idR = '';
function moveFastR() {
    if (L < 480) {
        L += 20
        plyr.style.left = +L + 'px';
    } else {
    }
}
    // BUTTONS CONTROLLER
// KEYDOWN
let moveFastKeyDOWN = (e) => {
    if (e.keyCode === 81) { // Q
        moveFastL();
        clearInterval(idL);
        idL = setInterval(moveFastL, 40);
        clearInterval(idR);
    } else if (e.keyCode === 69) { // E
        moveFastR();
        clearInterval(idR);
        idR = setInterval(moveFastR, 40);
        clearInterval(idL);
    }
}
// Event Listener
addKeydown();
function addKeydown() {
window.addEventListener('keydown', moveFastKeyDOWN);
}
// KEYUP - Stops the cannon movement
let moveFastKeyUP = (e) => {
    if (e.keyCode === 81) { // Q
        clearInterval(idL);
    } else if (e.keyCode === 69) { // E
        clearInterval(idR);
    }
    addKeydown()
}
// Event Listener
window.addEventListener('keyup', moveFastKeyUP);



                        // SHOOT FX



// Create and animate the divs
function shootFx() {

    // Create the div parent of the pixel shoot
    let shootContainer = document.createElement('div');
    shootContainer.classList.add('shoot-container'); // Add Class="shoot-fx"
    shootMainContainer.append(shootContainer); // Add it to the HTML

    let shootFx = document.createElement('div'); // Create element DIV
    shootFx.classList.add('shoot-fx'); // Add clas="pixel-box"
    shootContainer.append(shootFx); // Add it to the shootFxContainer DIV
    // Put the shootFxContainer in the position of the player canyon 
    shootContainer.style.top = 0 + 'px';
    shootContainer.style.left = L + 'px';
    // Referencing the elementto remove with the collision
    let shoot = shootContainer.firstElementChild;    

    let topShoot = 700;

    animateCannon()
    id1 = '';
    function animateCannon() {
        
        id1 = requestAnimationFrame(animateCannon);
    
        // Runs This Code Every 1000ms
            if (topShoot > 0) {
                topShoot -= 20
                shoot.style.top = topShoot + 'px';
            } else {
                cancelAnimationFrame(id1);
                // RESET Default position RED
                topShoot = 660;
                shoot.style.top = topShoot + 'px';
                // Reload the button press
                window.addEventListener('keyup', plyrShoot);
                // Removes the shoot after shooting
                shootMainContainer.firstElementChild.remove();
        }
        collision(shoot);
    }
}

id1 = '';

                 // FALLING CUBES FROM THE TOP


// Random number
function rndmNum() {
 return Math.floor(Math.random() * 26)   
}
// Random width position
function rndmWidthPstn() {
    // Makes an array with the for loop
    let arrayWidth = [];
    
    for (let i = 0; i < 500; i+=20) {
    arrayWidth.push(i);
    }
    // Picks a random number from the array
    return arrayWidth[rndmNum()] + 'px';
}



                    // CREATE CUBES


let TOP = -740;

function cubeCreator() {
        
    // Create the div parent of the pixel shoot
    let cubesContainer = document.createElement('div');
    cubesContainer.classList.add('cube-container'); // Add Class="shoot-fx"
    cubesMainContainer.appendChild(cubesContainer); // Add it to the HTML

    let cube = document.createElement('div'); // Create element DIV
    cube.classList.add('cube'); // Add class="pixel-box"
    cubesContainer.appendChild(cube); // Add it to the shootFxContainer DIV
    // Put the shootFxContainer in the position of the player canyon 
    
    cubesContainer.style.top = TOP + 'px';
    cubesContainer.style.left = rndmWidthPstn();
    
    // Returning the cube DIV value to access it outside
    return cubes = document.querySelectorAll('.cube');
}


// Creates Multiple Cubes In The Bottom
function createMltpleCubes() {
    for (let i = 0; i < 4; i++) {
         cubeCreator();
    }
}

// Animates the cubes to move upwards... 
// ...while the cubesMainContainer move downwards
let cntnrTOP = 720; // mainCubesContainer initial position 
cubesMainContainer.style.top = cntnrTOP + 'px';
let timeoutID = ''; // Stop the cubes from falling

let speedLevel = 2000;

function cubesFallingTimer() {

    createMltpleCubes();
    let cubes = cubeCreator();
    timeoutID = setTimeout(runThis, speedLevel);// vEasy=2000 Easy=1500 Med=1000 Hard=800 vHard=600
    
    function runThis() {
       // Moves the main container downwards
       if (cntnrTOP < 3600) {
           cntnrTOP += 20;
           cubesMainContainer.style.top = cntnrTOP + 'px';
           // Stops and resets the cubes from falling
           clearTimeout(timeoutID);
           cubesFallingTimer()
       } else {
         clearTimeout(timeoutID);
       }
        
       // Creates each line of falling cubes 
       if (TOP > -3600) {
           TOP -= 20
           cubes.forEach(cube => {
           cube.style.top = TOP + 'px'
               
                   // GAME OVER - YOU LOSE
               
           // If cube touches the bottom stops running 
           let cannon = document.querySelector('.cannon')
           if (cube.getBoundingClientRect().top > cannon.getBoundingClientRect().bottom) {
               clearTimeout(timeoutID);
               // Shows game over 
               gameOver.style.display = 'flex'
               // Removes movement buttons
               window.removeEventListener('keydown', plyrMove);
               window.removeEventListener('keydown', moveFastKeyDOWN);
               window.removeEventListener('keyup', moveFastKeyUP);
               // Remove the shootMainContainer so it doesnt shoot
               shootMainContainer.remove() 
               // Reset the game
               window.addEventListener('keydown', resetGame);
           }});
        }        
    }
}

                // RESET GAME

function resetGame(e) {
    if (e.key == 'Enter') {
        window.location.reload()
        window.removeEventListener('keydown', resetGame);
    }
}


                    // COLLISION DETECTION


function collision(shoot) {
    let cubes = document.querySelectorAll('.cube')
    let cannon = document.querySelector('.cannon')
    shoot;
    
    cubes.forEach(cube => {
        // Comparing the cube position with the shoot position
        if (cube.getBoundingClientRect().top <= shoot.getBoundingClientRect().bottom &&
            cube.getBoundingClientRect().bottom >= shoot.getBoundingClientRect().bottom &&
            cube.getBoundingClientRect().x == shoot.getBoundingClientRect().x) {

            // Reload the button press
            window.addEventListener('keyup', plyrShoot);
            // Removes the cube and it parent
            cube.parentElement.remove();
            cube.remove();
            // Hides the shoot
            shoot.style.display = 'none';
            
            // Score counter
            scoreCounter();
        }        
    })
}


                    // SCORE COUNTER & LEVEL UPDATE


function scoreCounter() {
    scoreNum.innerText = (+scoreNum.innerText + +10)
        
    if (scoreNum.innerText > 10000000) { // MASTER - master sergeant
        scoreNum.innerText = (+scoreNum.innerText + +50000); // Bonus Shoot Value
        speedLevel = 400; // Difficulty
        var level = 5
        levelNum.innerText = level;
    } else if (scoreNum.innerText > 1000000) { // AMAZING - sergeant first class
        scoreNum.innerText = (+scoreNum.innerText + +10000); // Bonus Shoot Value
        speedLevel = 600; // Difficulty
        var level = 4
        levelNum.innerText = level;
    } else if (scoreNum.innerText > 100000) { // EXCELLENT - sergeant
        scoreNum.innerText = (+scoreNum.innerText + +5000); // Bonus Shoot Value
        speedLevel = 800; // Difficulty
        var level = 3
        levelNum.innerText = level;
    } else if (scoreNum.innerText > 10000) { // GREAT - private first class
        scoreNum.innerText = (+scoreNum.innerText + +1000); // Bonus Shoot Value
        speedLevel = 1000; // Difficulty
        var level = 2
        levelNum.innerText = level;
    } else if (scoreNum.innerText > 1000) { // COOL - Private
        scoreNum.innerText = (+scoreNum.innerText + +100); // Bonus Shoot Value
        speedLevel = 1500; // Difficulty
        var level = 1
        levelNum.innerText = level;
    }
                        // SCORE SAVER
    if (+scoreNum.innerText > +hiScoreNum.innerText) {
        // Saves the score
        localStorage.setItem('score', scoreNum.innerText); // Change to localStorage
    }   
}

hiScoreNum.innerText = +localStorage.getItem('score'); // Change to localStorage

