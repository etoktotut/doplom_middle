'use strict';
import clickPopupHandler from './click_popup_handler';

const freeVisitPopUp = () => {
    const freeVisitForm = document.getElementById('free_visit_form');
    freeVisitForm.style.display = 'block';
    freeVisitForm.addEventListener('click', e => clickPopupHandler(e, freeVisitForm));
};

export default freeVisitPopUp;