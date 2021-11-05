let playerWidth = 25;
let playerHeight = 25;
let targetWidth = 25;
let targetHeight = 25;
let bulletHeight = 10;
let bulletWidth = 10;

let code = null;
let press = null;
const game = document.getElementById('game');
const player = document.getElementById('player');

const targets = [];
const bullets = [];




player.style.width = playerWidth + 'px';
player.style.height = playerHeight + 'px';

let playerLeft = (window.innerWidth - playerWidth) / 2;
let playerTop = (window.innerHeight  - playerHeight);

window.addEventListener('keydown', function (event) {
    code = event.keyCode;
    press = true;

    if(code == 32) {
        const bullet = document.createElement('div');
        bullet.style.width = bulletWidth + 'px';
        bullet.style.height = bulletHeight + 'px';
        bullet.style.left = parseInt(player.style.left) + ((playerWidth - bulletWidth) / 2) + 'px';
        bullet.style.top = player.style.top;
        bullet.className = 'bullet';

        game.appendChild(bullet);
        bullets.push(bullet);


    };
});

window.addEventListener('keyup', function (event) {
    code = event.keyCode;
    press = false;
});

function generateTarget() {

    const target = document.createElement('div');



    target.style.width = targetWidth + 'px';
    target.style.height = targetHeight + 'px';
    target.style.left = Math.round(Math.random() * (window.innerWidth - targetWidth)) + 'px';
    // target.style.top = Math.round(Math.random() * (window.innerHeight - targetHeight)) + 'px';
    target.style.top = 0 + 'px';
    target.className = 'target';
    game.appendChild(target);
    targets.push(target);



    setTimeout(generateTarget, Math.round(Math.random() * 500)) ;
}

generateTarget();


function draw(){

    if(press && code == 39 && playerLeft <= window.innerWidth - playerWidth){
        playerLeft = playerLeft + 5;
    };

    if(press && code == 37 && playerLeft >= 0){
        playerLeft = playerLeft - 5;
    };


    if (press && code == 38 && playerTop <= window.innerHeight - playerHeight){
        playerTop = playerTop - 5 ;
    };

    if (press && code == 40 && playerTop >= 0 ){
        playerTop = playerTop + 5; 
    };


    player.style.top = playerTop + 'px';
    player.style.left = playerLeft + 'px';

    // go down 
    for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        target.style.top = (parseInt(target.style.top) + 5) + 'px';

        if(parseInt(target.style.top) > window.innerHeight - targetWidth) {
            game.removeChild(target);
            targets.splice(index, 1);
        }
    }    

    // go up bullet 
    for (let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.style.top = (parseInt(bullet.style.top) - 15) + 'px'; 
    }


    window.requestAnimationFrame(draw);
    
}

draw();


