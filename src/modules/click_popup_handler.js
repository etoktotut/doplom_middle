'use strict';

const clickPopupHandler = (e, form) => {
    const target = e.target;
    if (target.classList.contains('overlay') || target.closest('.close-form') || target.classList.contains('close-btn')) {
        form.style.display = 'none';
        form.removeEventListener('click', clickPopupHandler);
    }
};

export default clickPopupHandler;
