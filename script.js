const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// 
// 

//List of words for game
const words = [
    'avoid touching eyes',
    'avoid touching face',
    'avoid touching nose',
    'avoid touching mouth',
    'wash hands',
    'discard used tissue',
    'cover mouth nose while sneezing',
    'wear mask',
    'avoid alarmist news',
    'seek medical advice if fever',
    'clean home regularly',
    'stay physically fit',
    'exercise regularly',
    'stay home',
    'stay positive',
    'maintain distance one metre',
    'respect health workers',
    'covid19 does not discriminate',
    'postpone travel',
    'no cinemas',
    'no malls',
    'no crowded market',
    'careful at parlour',
    'covid19 threat',
    'stay safe',
    'no belt',
    'change begins in your heart'
];

// Init word
let randomWord;

// Init score
let score = 5;

// Init time
let time = 20;

// Set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generates random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore() {

    score--;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval)
        //end game

        gameOver()
        // coronaDestroyed()

    }

    if (score === 0) {
        time++;
    }


}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <h2>Your remaining items are ${score}</h2>
        <button onclick="location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

function coronaDestroyed() {

    endgameEl.innerHTML = `
        <h1>Hoorah!</h1>
        <h2>You are safe from COVID-19</h2>
        <button onclick="location.reload()">Play Again</button>
    `;


    endgameEl.style.display = 'flex';
}




addWordToDOM();

// Event listeners


// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();


        // Clear
        e.target.value = '';
        if (difficulty === 'hard') {

            time += 5;
        } else if (difficulty === 'medium') {

            time += 7;
        } else {

            time += 9;
        }
        updateTime()
    }

    if (score === 0) {

        coronaDestroyed()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'))

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})

