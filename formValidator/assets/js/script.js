import {FormValidator} from './validator.js'

const formSubmit = () => {
  const userName = document.querySelector('#user_name');
  const userPhone = document.querySelector('#user_phone');
  const isAgree = document.querySelector('#isAgree');

  if (FormValidator.validateForm(userName, userPhone, isAgree)) {
    // Loader

    // try / catch / finally
    alert("성공")
  }
}

document.querySelector('button').addEventListener('click', formSubmit);