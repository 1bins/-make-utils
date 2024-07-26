let animationController;
let userPoint = 0;
let computerPoint = 0;
let isPlaying = true;
const winnerScore = 3;

const userButtons = document.querySelectorAll('.btn-box button');
const userPlayBox = document.querySelector('.play-box div.user');
const computerPlayBox = document.querySelector('.play-box div.computer');
const userPlayImg = document.querySelector('.play-box .user img.-rps');
const computerPlayImg = document.querySelector('.play-box .computer img.-rps');
const userPointText = document.querySelector('.points-box .user');
const computerPointText = document.querySelector('.points-box .computer');
const resultBox = document.querySelector('.result-box');
const resultData = document.querySelector('.result-data');
const restartButton = document.querySelector('.result-box .restart-game');
const winnerImg = document.createElement('img');
winnerImg.src = './assets/images/win-effect.png';
winnerImg.classList.add('-win');

const RockScissorsPaper = [
    { name: '가위', data: 'scissors', imgSource: './assets/images/scissors.png' },
    { name: '바위', data: 'rock', imgSource: './assets/images/rock.png' },
    { name: '보', data: 'paper', imgSource: './assets/images/paper.png' }
];
const resetPlaying = () => {
    computerPlayImg.style.display = 'none';
    userPlayImg.style.display = 'none';
    winnerImg.remove();
    isPlaying = true;
}

// 첫화면 무작위 돌기
const gameAnimation = () => {
    let intervalId;
    let i = 0;
    computerPlayImg.style.display= 'block';

    intervalId = setInterval(() => {
        i = (i >= 2) ? 0 : i + 1;
        computerPlayImg.src = RockScissorsPaper[i].imgSource;
    }, 150)

    const clearAnimation = () => clearInterval(intervalId);

    return { clearAnimation };
}
const startAnimation = () => {
    animationController = gameAnimation();
}

// 결과 얻기
const getResult = (userData, computerData) => {
    const results = {
        scissors: { rock: 'computer', paper: 'user' },
        rock: { scissors: 'user', paper: 'computer' },
        paper: { scissors: 'computer', rock: 'user' }
    };
    
    const result = results[userData]?.[computerData];
    
    if (result === 'user') {
        userPoint++;
        userPointText.textContent = userPoint;
        userPlayBox.appendChild(winnerImg);

    } else if (result === 'computer') {
        computerPoint++;
        computerPointText.textContent = computerPoint;
        computerPlayBox.appendChild(winnerImg);
    }
}

// 게임결과
const getGameResult = (userScore, computerScore) => {
    
    if (userScore === winnerScore || computerScore === winnerScore) {
        resultData.textContent = userScore === winnerScore ? 'WIN!' : 'LOSE!';
        
        if (animationController) {
            animationController.clearAnimation();
        }
        resultBox.style.display = 'flex';
    } else {
        setTimeout(() => {
            resetPlaying();
            startAnimation();
        }, 800);
    }
};

// 점수계산
const getScore = (button) => {
    computerPlayImg.style.display= 'block';
    userPlayImg.style.display= 'block';

    // 컴퓨터 데이터
    let random = Math.floor(Math.random() * 3);
    let computerPlay = RockScissorsPaper[random];
    let computerData = computerPlay.data;
    computerPlayImg.src = computerPlay.imgSource;

    // 유저 데이터
    let userData = button.dataset.type;
    userPlayImg.src = RockScissorsPaper.filter(elem => elem.data === userData)[0].imgSource;

    getResult(userData, computerData);
}

// 유저 버튼 클릭시
const playGame = () => {
    userButtons.forEach(function(button){
        button.addEventListener('click', function(){
            if(isPlaying){
                if (animationController) {
                    animationController.clearAnimation();
                }
                
                isPlaying = false;

                getScore(button);
                getGameResult(userPoint, computerPoint);
            }
            console.log(userPoint)
        });
    })
}

// 게임 다시 시작하기
const restartGame = () => {
    restartButton.addEventListener('click', function(){
        resultBox.style.display = 'none';

        userPoint = 0;
        computerPoint = 0;
        userPointText.textContent = userPoint;
        computerPointText.textContent = computerPoint;
        
        resetPlaying();
    });
}


playGame();
restartGame();