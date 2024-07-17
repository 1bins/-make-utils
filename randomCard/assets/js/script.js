const cards = document.querySelectorAll('.card');
const card = document.querySelector('.card');
let isMove = false;
let cardIndex = 0;

gsap.set('.card-area:nth-child(n+2)', {y: '150vh'})


// 카드에 랜덤 데이터 삽입
const getRandomCardData = () => {
    const array = [...Array(9).keys()];

    for (let i = 0; i < array.length; i++){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    // 카드에 랜덤 데이터 삽입
    cards.forEach((card, index) => card.dataset.card = array[index])
}

// mouse wheel
const animateCardTransition = () => {
    window.addEventListener('wheel', (event) => {
        if (!isMove) {
            if (event.deltaY > 0 && cardIndex < cards.length - 1) {
                isMove = true;

                gsap.timeline({
                    onComplete: () => isMove = false,
                    defaults: {duration: 1.2}
                })
                .to(cards[cardIndex].parentNode, {y: '-110vh', ease: "power3.out"})
                .to(cards[cardIndex + 1].parentNode, {y: 0, ease: "power3.out"}, '<')

                cardIndex++;

            } else if (event.deltaY < 0 && cardIndex > 0) {
                isMove = true;

                gsap.timeline({
                    onComplete: () => isMove = false,
                    defaults: {duration: 1.2}
                })
                .to(cards[cardIndex].parentNode, {y: '150vh', ease: "power3.out"})
                .to(cards[cardIndex - 1].parentNode, {y: 0, ease: "power3.out"}, '<')

                cardIndex--;
            }
        }
    });
}

// mobile touch
const touchCardTransition = () => {
    let touchstartPoint;
    let touchmovePoint;

    window.addEventListener('touchstart', (event) => {
        touchstartPoint = event.touches[0].clientY
    })

    window.addEventListener('touchmove', (event) => {
        touchmovePoint = event.touches[0].clientY;

        if(!isMove){
            if(touchstartPoint - touchmovePoint > 0 && cardIndex < cards.length - 1) {
                isMove = true;

                gsap.timeline({
                    onComplete: () => isMove = false,
                    defaults: {duration: 1.2}
                })
                .to(cards[cardIndex].parentNode, {y: '-110vh', ease: "power3.out"})
                .to(cards[cardIndex + 1].parentNode, {y: 0, ease: "power3.out"}, '<')
    
                cardIndex++;
            } else if (touchstartPoint - touchmovePoint < 0 && cardIndex > 0) {
                isMove = true;

                gsap.timeline({
                    onComplete: () => isMove = false,
                    defaults: {duration: 1.2}
                })
                .to(cards[cardIndex].parentNode, {y: '150vh', ease: "power3.out"})
                .to(cards[cardIndex - 1].parentNode, {y: 0, ease: "power3.out"}, '<')
    
                cardIndex--;
            }
        }
    })
}

// 카드 클릭했을때
const rotateCardOnClick = () => {
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('rotated');
        })
    })
}

const init = () => {
    getRandomCardData();
    animateCardTransition();
    rotateCardOnClick();
    touchCardTransition();
};

init();