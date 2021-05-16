'use strict';


const burgerPopup = (params) => {
    const popupMenu = document.querySelector('.popup-menu');
    popupMenu.setAttribute('style', 'display: flex;');

    const clickMenu = (e) => {
        const target = e.target;
        if (target.closest('.scroll') || target.closest('.close-menu-btn')) {
            popupMenu.setAttribute('style', 'display: none;');
            popupMenu.removeEventListener('click', clickMenu);

        }
    };
    popupMenu.addEventListener('click', clickMenu);
};

export default burgerPopup;