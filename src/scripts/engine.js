const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameSpeed: 1000,
        enemyPosition: 0,
        score: 0,
        timeLeft: 30,
        resetTimer: 30
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        timeLeftId: setInterval(runTimer, 1000)
    }
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    state.values.enemyPosition = randomSquare.id
    
    randomSquare.classList.add("enemy");
}

function addListenerHitbox(){    
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.enemyPosition) {
                state.values.score++                
                state.view.score.textContent = state.values.score
                state.values.enemyPosition = null;
                playSound("hit");
            }
        })
    })
}
function playSound(sound){
    let audio = new Audio(`./src/sounds/${sound}.m4a`);
    audio.volume = 0.2;
    audio.play();
}
function runTimer(){
    state.values.timeLeft--;
    state.view.timeLeft.textContent = state.values.timeLeft;

    if(state.values.timeLeft <= 0) {
        if(!confirm(`Fim de jogo! Seu resultado foi: ${state.values.score} \nDeseja jogar novamente?`)){
            clearInterval(state.actions.timeLeftId);
            clearInterval(state.actions.timerId);
        } else {
            state.values.score = 0;
            state.values.timeLeft = state.values.resetTimer;
        }
        
        
    }
}

function init(){
    addListenerHitbox()
}

init()