'use strict';

const clickPopupHandler = (e, form) => {
    const target = e.target;
    if (target.classList.contains('overlay') || target.closest('.close-form')) {
        form.style.display = 'none';
    }
};

export default clickPopupHandler;