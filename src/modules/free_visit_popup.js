'use strict';

const freeVisitPopUp = () => {
    const freeVisitForm = document.getElementById('free_visit_form');
    const clickPopupHandler = (e) => {
        const target = e.target;
        if (target.classList.contains('overlay') || target.closest('.close-form')) {
            freeVisitForm.style.display = 'none';
            freeVisitForm.removeEventListener('click', clickPopupHandler);
        }
    };
    freeVisitForm.style.display = 'block';
    freeVisitForm.addEventListener('click', clickPopupHandler);
};

export default freeVisitPopUp;