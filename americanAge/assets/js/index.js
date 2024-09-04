// 공통
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDate = today.getDate();

// Input 버전
const userAgeField = document.querySelector('#getAge');
const getAgeBtn = document.querySelector('.btn-getAge');

const getAmericanAge = () => {
    const userAge = userAgeField.value;
    
    if (userAge.length !== 6) {
        alert('올바른 생년월일을 입력해주세요');
        return;
    }

    const userYear = parseInt(userAge.slice(0, 2));
    const userMonth = parseInt(userAge.slice(2, 4));
    const userDate = parseInt(userAge.slice(4, 6));

    if (userMonth < 1 || userMonth > 12 || userDate < 1 || userDate > 31) {
        alert('올바른 생년월일을 입력해주세요');
        return;
    }

    const birthYear = userYear >= parseInt(String(todayYear).slice(2, 4)) ? 1900 + userYear : 2000 + userYear;
    let age = todayYear - birthYear;

    if (userMonth > todayMonth || (userMonth === todayMonth && userDate > todayDate)) {
        age--;
    }

    return age;
}

getAgeBtn.addEventListener('click', () => {
    document.querySelector('#userAge span').textContent = getAmericanAge();
});
