export const FormValidator = ((userName, userPhone, isAgree) => {
  const validateUserName = (userName) => 
    userName.value === '' || userName.value.length < 2 || !isNaN(userName.value);

  const validateUserPhone = (userPhone) => 
    userPhone.value === '' || userPhone.value.length < 10;

  const validateIsAgree = (isAgree) => 
    !isAgree.checked;

  const validateForm = (userName, userPhone, isAgree) => {

    if (validateUserName(userName)) {
      userName.classList.add('warn');
      alert('정확한 성함을 입력해주세요');
      return false;
    } else if (validateUserPhone(userPhone)) {
      userPhone.classList.add('warn');
      alert('정확한 핸드폰 번호를 입력해주세요');
      return false;
    } else if (validateIsAgree(isAgree)) {
      alert("개인정보 취급 및 이용 동의에 대한 동의가 필요합니다");
      return false;
    }

    return true;
  };

  return {
    validateForm
  };
})();