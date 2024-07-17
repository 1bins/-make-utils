const cards = document.querySelectorAll('.card');
const card = document.querySelector('.card');
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

const animateCardTransition = () => {
    let index = 0;
    let isWheel = false;

    window.addEventListener('wheel', (event) => {
        if (!isWheel) {
            if (event.deltaY > 0 && index < cards.length - 1) {
                isWheel = true;

                gsap.timeline({
                    onComplete: () => isWheel = false,
                    defaults: {duration: 1.2}
                })
                    .to(cards[index].parentNode, {y: '-110vh', ease: "power3.out"})
                    .to(cards[index + 1].parentNode, {y: 0, ease: "power3.out"}, '<')

                index++;

            } else if (event.deltaY < 0 && index > 0) {
                isWheel = true;

                gsap.timeline({
                    onComplete: () => isWheel = false,
                    defaults: {duration: 1.2}
                })
                    .to(cards[index].parentNode, {y: '150vh', ease: "power3.out"})
                    .to(cards[index - 1].parentNode, {y: 0, ease: "power3.out"}, '<')

                index--;
            }
        }
    });
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
};

init();