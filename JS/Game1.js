let move_speed = 5, gravity = 0.4;
let startTime, endTime;//זמן משחק
let palyAgain =false;//אם השחקן רוצה לשחק שוב אז מתחיל משחק חדש
let timerRunning = true;//שאם המשחק נגמר אז שהיימר יפסיק גם
let panda = document.querySelector('.panda');
let img = document.getElementById('panda-1');
let score_g = document.getElementById('score');
let level_g = document.getElementById('level');
let time_g = document.getElementById('time');

let panda_props;
var selectedLevel = document.querySelector('input[name="level"]:checked');
let chooseLevel = document.querySelector('.level-selection');
let background = document.querySelector('.background').getBoundingClientRect();
let message = document.querySelector('.message');
let score_val = document.querySelector('.score_val');
let score_title = document.querySelector('.score_title');
let level_title = document.querySelector('.level_title')
let level_val = document.querySelector('.level_val');
let time_title = document.querySelector('.time_title')
let time_val = document.querySelector('.time_val');
let gameOverScore = document.querySelector('.game-over-container');
//איפוס נתונים אתחלתיים 
let level_d ='Easy'
let game_state = 'Start';
img.style.display = 'none';
message.style.display = 'none';
gameOverScore.style.display = 'none';
message.classList.add('messageStyle');

//שומר את הרמה שהשחקן בחר
function startGame() {
    let easy = document.getElementById('easy');
    let Medium = document.getElementById('medium');
    let hard = document.getElementById('hard'); 
    message.style.display='block';
    message.innerHTML =
        ' Enter To Start Game'+ '<span>&uarr;</span>'.fontcolor('red')+'<br>Press Enter To Restart';
        message.classList.add('messageStyle');
        chooseLevel.style.display = 'none'; 
    if(Medium.checked == true){
        level_d=Medium.value;
        move_speed=3;
        gravity=0.7;
    }
    if(hard.checked == true){
        move_speed=3;
        gravity=1;
        level_d=hard.value;
    }
}
//אחרי שהמשחק נגמר אז אם הלחצן לוחץ על אפשרות שהוא רוצה לחזור לעמוד הראשי
function homeClick(){
    window.location.href = 'games.html';
    }
   
//אחרי שהמשחק נגמר אז אם הלחצן לוחץ על אפשרות שהוא רוצה לשחק שוב אז מביאים אותו לפתיחת אפשרויות
function AgainPlayClick(){
    //אתחול הנתונים
     move_speed = 5;
    gravity = 0.4;
    palyAgain=false;
    level_d ='Easy'
    game_state = 'Start';
    img.style.display = 'none';
    chooseLevel.style.display = 'block';
    gameOverScore.style.display = 'none';
    document.querySelectorAll('.pipe_sprite').forEach((e) => {//להוציא את העצים
    e.remove();
});
}

function padNumber(num) {
    return (num < 10 ? '0' : '') + num;
}
function updateTimer() {
    if(timerRunning){
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
        time_val.innerText = formattedTime;
        requestAnimationFrame(updateTimer);
    }
   
}

/*פונקציה זו מופעלת כאשר המשתמש לוחץ על מקש "Enter" כדי להתחיל או להפעיל מחדש את המשחק. הוא מבצע את הפעולות הבאות:

- מסיר את כל רכיבי הצינור הקיימים על המסך.
- מציג את דמות הפנדה וקובע את מיקומה ההתחלתי.
- משנה את מצב המשחק ל"שחק".
- מנקה את ההודעה ומאפס את תצוגת הניקוד.
- מסיר את הסגנון של המשחק מעל ההודעה.
- קורא לפונקציית "הפעל" כדי להתחיל את לולאת המשחק.*/

document.addEventListener('keydown', (e) => {
    if (palyAgain==false &&chooseLevel.style.display =='none' &&e.key == 'Enter' && game_state !== 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        timerRunning = true;
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
        message.classList.remove('messageStyle');
        startTime = new Date().getTime();
        updateTimer();
        play();
    }
    if ( palyAgain ==true && e.key == 'Enter' && game_state !== 'Play'){
        gameOverScore.style.display = 'block';
        message.style.display = 'none';
        message.classList.remove('messageStyle');
        
    }
});



function play() {

    /*פונקציה זו מטפלת בתנועת הצינורות ובודקת התנגשויות עם הפנדה. זה חלק מלולאת המשחק ומבצע את המשימות הבאות:

- עובר דרך כל אלמנט צינור על המסך.
- מסיר צינורות שזזו מהצד השמאלי של המסך.
- בודק התנגשויות בין הפנדה לכל צינור.
- אם מזוהה התנגשות, מצב המשחק מוגדר ל"סיום", ומוצגת הודעת משחק מעבר.
- אם לא מזוהה התנגשות, הצינורות ממשיכים לנוע שמאלה, והניקוד מתעדכן אם הפנדה עוברת צינור בהצלחה.*/
    function move() {
        if (game_state !== 'Play') return;

        panda_props = panda.getBoundingClientRect();
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');

        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (
                    panda_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    panda_props.left + panda_props.width > pipe_sprite_props.left &&
                    panda_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    panda_props.top + panda_props.height > pipe_sprite_props.top
                ) {
                    game_state = 'End';
                   game_end(); 
                } else {
                    if (
                        pipe_sprite_props.right < panda_props.left &&
                        pipe_sprite_props.right + move_speed >= panda_props.left &&
                        element.increase_score === '1'
                    ) {
                        score_val.innerHTML = +score_val.innerHTML + 1;
                    }

                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
// סיום המשחק העתקת מלוח את הנתונים על המשחק ומראה לשחק ונותן לו אפשרות אם רוצה להמשיך או לא
function game_end(){
        score_title.innerHTML = '';
        level_title.innerHTML = '';
        level_val.innerHTML = '';
        time_title.innerHTML = '';
        score_g.innerHTML = score_val.innerHTML;
        level_g.innerHTML = level_d;
        time_g.innerHTML = time_val.innerHTML;
        score_val.innerHTML = '';
        time_val.innerHTML = '';
        message.innerHTML =
        'Game Over'.fontcolor('red') ;//+
       // '<br>Press Enter To Restart';
       message.classList.add('messageStyle');
       img.style.display = 'none';
       palyAgain =true;
       timerRunning=false;
   
    }

/*
פונקציה זו מדמה את השפעת כוח הכבידה על הפנדה, וגורמת לו ליפול למטה. זה חלק מלולאת המשחק ומבצע את המשימות הבאות:

- מעדכן את המיקום האנכי של הפנדה על סמך כוח הכבידה.
- מאזין לאירועי מפתח ("ArrowUp" או מקש רווח) כדי לגרום לפנדה לקפוץ על ידי התאמת המיקום האנכי שלה.
- בודק אם הפנדה פוגע בחלק העליון או התחתון של המסך. אם כן, מצב המשחק מוגדר ל"סיום", ומוצגת הודעת משחק מעבר.*/
let panda_by = 0;
function apply_gravity() {
        if (game_state !== 'Play') return;

        panda_by = panda_by + gravity;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                panda_by = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                // Optionally, you can add some logic here if needed
            }
        });
//
        if (panda_props.top <= 0 || panda_props.bottom >= background.bottom) {
            game_state = 'End';
            game_end(); 
        }

        panda.style.top = panda_props.top + panda_by + 'px';
        panda_props = panda.getBoundingClientRect();

        requestAnimationFrame(apply_gravity);
    }

    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 35;
/*פונקציה זו יוצרת ומזיזה את הצינורות מימין לשמאל על המסך. זה חלק מלולאת המשחק ומבצע את המשימות הבאות:

- יוצר זוגות של צינורות עליונים ותחתונים במיקומים אקראיים.
- מגדיר את המיקום ההתחלתי של הצינורות בצד ימין של המסך.
- ממשיך להזיז את הצינורות שמאלה, יוצר אפקט גלילה.
- מאפס את יצירת הצינור כאשר מגיעים להפרדה מסוימת.*/
    function create_pipe() {
        if (game_state !== 'Play') return;

        if (pipe_separation > 115) {
            pipe_separation = 0;
            let pipe_position = Math.floor(Math.random() * 43) + 8;

            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_position - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_position + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }

        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }

    requestAnimationFrame(create_pipe);
}
function showInformation() {
    // You can modify this function to display game information as needed
    alert("This is a panda running game. Press Enter to start and play. Press the up arrow to jump, and try not to touch the trees!");
}


function exit(){
    window.location.href = 'Games.html';
}
