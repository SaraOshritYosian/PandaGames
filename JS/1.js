let move_speed = 5, gravity = 0.4;
let startTime, endTime;
let playAgain = false;
let panda = document.querySelector('.panda');
let img = document.getElementById('panda-1');
let score_g = document.getElementById('score');
let level_g = document.getElementById('level');
let time_g = document.getElementById('time');

let panda_props;
let selectedLevel = document.querySelector('input[name="level"]:checked');
let chooseLevel = document.querySelector('.level-selection');
let background = document.querySelector('.background').getBoundingClientRect();
let message = document.querySelector('.message');
let score_val = document.querySelector('.score_val');
let level_val = document.querySelector('.level_val');
let time_val = document.querySelector('.time_val');
let gameOverScore = document.querySelector('.game-over-container');

let level_d ='Easy';
let game_state = 'Start';
img.style.display = 'none';
message.style.display = 'none';
gameOverScore.style.display = 'none';
message.classList.add('messageStyle');

function padNumber(num) {
    return (num < 10 ? '0' : '') + num;
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
    time_val.innerText = formattedTime;
    requestAnimationFrame(updateTimer);
}

function startGame() {
    let easy = document.getElementById('easy');
    let medium = document.getElementById('medium');
    let hard = document.getElementById('hard');
    
    message.style.display='block';
    message.innerHTML = 'Enter To Start Game' + '<span>&uarr;</span>'.fontcolor('red') + '<br>Press Enter To Restart';
    message.classList.add('messageStyle');
    chooseLevel.style.display = 'none';

    if(medium.checked) {
        level_d = 'Medium';
        move_speed = 3;
        gravity = 0.7;
    }
    if(hard.checked) {
        move_speed = 3;
        gravity = 1;
        level_d = 'Hard';
    }

    startTime = new Date().getTime();
    updateTimer();
    play();
}

function play() {
    // Your existing play function

    function game_end() {
        // Your existing game_end function

        endTime = new Date().getTime();
        const elapsedTime = (endTime - startTime) / 1000; // in seconds
        time_g.innerHTML = 'Time: ' + elapsedTime.toFixed(2) + ' seconds';
        gameOverScore.style.display = 'block';
        message.style.display = 'none';
        message.classList.remove('messageStyle');
        playAgain = true;
    }

    // Rest of your existing code
}

document.addEventListener('keydown', (e) => {
    if (playAgain == false && chooseLevel.style.display == 'none' && e.key == 'Enter' && game_state !== 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });

        img.style.display = 'block';
        panda.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score: ';
        score_val.innerHTML = '0';
        level_title.innerHTML = 'Level: ';
        level_val.innerHTML = level_d;
        time_title.innerHTML = 'Time: ';
        time_val.innerHTML = '00:00';
        startTime = new Date().getTime();
        message.classList.remove('messageStyle');
        updateTimer();
        play();
    }

    if (playAgain == true && e.key == 'Enter' && game_state !== 'Play') {
        gameOverScore.style.display = 'block';
        message.style.display = 'none';
        message.classList.remove('messageStyle');
    }
});
