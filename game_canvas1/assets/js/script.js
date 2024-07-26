// 캔버스 설정
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const resizeCanvas = () => {
    canvas.width = document.querySelector('.game-inner').clientWidth;
    canvas.height = document.documentElement.clientHeight;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 게임 관련 변수
const calculatePlayerX = place => {
    return (canvas.width / 3 * place) - (canvas.width / 6) -  (playerSize / 2);
}
const calculateItemX = () => {
    let randomPlace = Math.ceil(Math.random() * 3);
    return (canvas.width / 3 * randomPlace) - (canvas.width / 6) - (itemSize / 2);
}

const playerSize = 90;
const itemSize = 70;
const blinkDuration = 500; // 깜빡임 시간 (밀리초)
const blinkRate = 100; // 깜빡임 주기 (밀리초)
const resultBox = document.querySelector('.result-inner');

let playTime = 0;
let initPlace = 1;
let player = {
    radius: playerSize / 2,
    x: calculatePlayerX(initPlace),
    y: canvas.height - playerSize - 50
};
let items = [];
let gameOver = false;
let life = 3;
let score = 0;
let speed = 5;
let isBlinking = false;

// 이미지 로드
const images = {};
const imageSources = [
    './assets/images/obj-bg.jpg',
    './assets/images/user.png',
    './assets/images/obj-item.png',
    './assets/images/obj-item2.png',
    './assets/images/obj-obstacle.png'
];
let imagesLoaded = 0;
const onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === imageSources.length) {
        requestAnimationFrame(gameLoop);
    }
};

// 이미지 객체 생성
imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoad;
    images[src] = img;
});

// 키 이벤트 핸들러 등록
document.addEventListener('keydown', function(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        initPlace = Math.min(initPlace + 1, 3);
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        initPlace = Math.max(initPlace - 1, 1);
    }
    player.x = calculatePlayerX(initPlace);
});

// 비행기 깜빡이기 함수
const startBlinking = () => {
    if (isBlinking) return; // 이미 깜빡이고 있는 경우 종료
    isBlinking = true;

    let blinkStartTime = Date.now();

    const blinkEffect = () => {
        const elapsedTime = Date.now() - blinkStartTime;

        // 투명도 설정
        ctx.globalAlpha = (Math.floor(elapsedTime / blinkRate) % 2 === 0) ? 0.2 : 1.0;

        // 배경 그리기
        ctx.drawImage(images[imageSources[0]], 0, 0, canvas.width, canvas.height);
        
        // 유저 그리기
        ctx.drawImage(images[imageSources[1]], player.x, player.y, playerSize, playerSize);

        // 아이템 그리기
        items.forEach(elem => {
            ctx.drawImage(images[imageSources[elem.item]], elem.x, elem.y, itemSize, itemSize);
        });

        if (elapsedTime < blinkDuration) {
            requestAnimationFrame(blinkEffect);
        } else {
            ctx.globalAlpha = 1.0; // 원래 투명도로 복원
            isBlinking = false;
        }
    };

    blinkEffect();
};

// 게임 루프
function gameLoop() {
    // 게임 오버
    if (gameOver) return;

    // 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 그리기
    ctx.drawImage(images[imageSources[0]], 0, 0, canvas.width, canvas.height);
    
    // 유저(비행기) 그리기
    ctx.drawImage(images[imageSources[1]], player.x, player.y, playerSize, playerSize);

    // 게임 시간에 맞춰 아이템 생성하기
    playTime++;

    if (playTime % 900 === 0) {
        speed++;
    }

    if (playTime % 50 === 0) {
        // 아이템 랜덤 선택
        let randomIndex = Math.floor(Math.random() * 3) + 2;
        items.push({
            x: calculateItemX(),
            y: 0,
            radius: itemSize / 2,
            item: randomIndex,
        });
    }

    // 아이템 효과
    items.forEach((elem, index) => {
        elem.y += speed;
        console.log(speed)
        if (elem.y > canvas.height) {
            items.splice(index, 1);
        } else {
            let distance = Math.sqrt(Math.pow(player.x - elem.x, 2) + Math.pow(player.y - elem.y, 2));
            // 충돌 검사
            if (distance < player.radius + elem.radius) {
                if (elem.item === 4) {
                    life--;
                    if(life === 0){
                        gameOver = true;
                        resultBox.style.display = 'flex';
                        document.querySelector('.result-inner .score span').textContent = score;
                    }
                    document.querySelector('#life').classList.add(`-life${life}`);
                    items.splice(index, 1);
                    startBlinking(); // 비행기 깜빡이기
                } else {
                    score += elem.item === 2 ? 10 : 20;
                    document.querySelector('#score').textContent = score;
                    items.splice(index, 1);
                }
            }
        }
    });

    // 아이템 그리기
    items.forEach(elem => {
        ctx.drawImage(images[imageSources[elem.item]], elem.x, elem.y, itemSize, itemSize);
    });

    requestAnimationFrame(gameLoop);
}

const restartGame = () => {
    document.querySelector('.btn-restart').addEventListener('click', function(){
        if(gameOver){
            resultBox.style.display = 'none';

            life = 3;
            score = 0;
            playTime = 0;
            speed = 5;
            items = [];

            document.querySelector('#score').textContent = score;
            document.querySelector('#life').setAttribute('class', 'life-box');
            
            gameOver = false;
            
            requestAnimationFrame(gameLoop);
        }
    })
}

restartGame();