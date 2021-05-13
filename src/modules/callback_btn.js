"use strict";

import clickPopupHandler from './click_popup_handler';

const callbackBtn = (target) => {
    if (target.closest('.head-main')) {

        const callbackForm = document.getElementById('callback_form');
        callbackForm.style.display = 'block';
        callbackForm.addEventListener('click', e => clickPopupHandler(e, callbackForm));
    }

};

export default callbackBtn;
