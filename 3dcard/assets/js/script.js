const cards = document.querySelectorAll('.card');
const card = document.querySelector('.card');

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

getRandomCardData();

const tweenAnimation = (elem) => {
    const tl = gsap.to(elem, {y: '-150vh', duration: 3, ease: "power3.out",});
    return tl;
}

const wheelEvent = (elem) => {
    window.addEventListener('wheel', () => {
        tweenAnimation(elem)
    })
}

// 카드 클릭했을때
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        card.classList.add('rotated');
        if (index < cards.length - 1){
            cards[index + 1].classList.add('active');
            wheelEvent(card.parentNode)
        }
    })
})