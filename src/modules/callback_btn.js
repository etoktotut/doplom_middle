"use strict";

const callbackBtn = (target) => {
    if (target.closest('.head-main')) {
        const callbackForm = document.getElementById('callback_form');
        const clickPopupHandler = (e) => {
            const target = e.target;
            if (target.classList.contains('overlay') || target.closest('.close-form')) {
                callbackForm.style.display = 'none';
                callbackForm.removeEventListener('click', clickPopupHandler);
            }
        };
        callbackForm.style.display = 'block';
        callbackForm.addEventListener('click', clickPopupHandler);
    }

};

export default callbackBtn;
