'use strict';
import clickPopupHandler from './click_popup_handler';

const giftPopup = (target) => {
    target.style.display = 'none';
    const gift = document.getElementById('gift');
    gift.style.display = 'block';
    gift.addEventListener('click', e => clickPopupHandler(e, gift));
};

export default (giftPopup);