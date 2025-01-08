let level = 0;
let gamepattern = [];
let userpattern = [];
let started = false;
let keystarted = false;
let colours = ['pink', 'blue', 'orange', 'purple'];
let h1 = document.querySelector('h1');
let h2 = document.querySelector('h2');
let body = document.querySelector('body');
function levelup(){
    if(started == true){
        h1.innerText = '';
        level++;
        h2.innerText = `Level ${level}`; 
        let randidx = Math.floor(Math.random()*4);
        let thisbtn = document.querySelector(`.${colours[randidx]}`);
        gamepattern.push(colours[randidx]);
        flashbtn(thisbtn);
        console.log(thisbtn);
        userpattern = [];
    }
}

function flashbtn(kbtn){
    kbtn.classList.add('flash');
    setTimeout(() => {
        kbtn.classList.remove('flash');
    }, 250)
}
function userpress(kbtn){
    if(started == true){
        kbtn.classList.add('userflash');
        setTimeout(() => {
            kbtn.classList.remove('userflash');
        }, 250);
    }
}
document.addEventListener('keypress', () => {
    if(started == false){
        started = true;
    }
    if(keystarted == false)levelup();
    keystarted = true;
});

function buttonpress(){
    let btn = this;
    userpress(btn);
    userpattern.push(btn.getAttribute('id'));
    checkelements(userpattern.length -1);
}

let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click', buttonpress);
    
}

function checkelements(index){
    if(userpattern[index] == gamepattern[index]){
        if(index == gamepattern.length - 1){
            setTimeout(levelup, 1000);
        }
    }
    else{
        body.style.backgroundColor = 'red';
        setTimeout(function (){
            body.style.backgroundColor = 'white';
        }, 150)
        h1.innerHTML = `Game Over! <br> your score is ${level} <br> Press any key to start again`;
        resetgame();
    }
}

function resetgame(){
    started = false;
    userpattern = [];
    gamepattern = [];
    level = 0;
    keystarted = false;
}