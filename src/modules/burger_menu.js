'use strict';

const burgerInit = () => {
    let isListener = false;
    const wrapper = document.querySelector('.header-main .wrapper');
    const menu = document.querySelector('.top-menu');

    const scrollCheck = () => {
        const wrapperRect = wrapper.getBoundingClientRect();

        if (wrapperRect.height < window.pageYOffset) {
            menu.setAttribute('style', 'position: fixed;');
        } else {
            menu.removeAttribute('style', 'position');
        }
    };

    const resizeCheck = () => {
        if (document.documentElement.clientWidth < 768) {
            if (!isListener) { window.addEventListener('scroll', scrollCheck); isListener = true; }
        } else {
            if (isListener) { window.removeEventListener('scroll', scrollCheck); isListener = false; }
            menu.removeAttribute('style', 'position');

        }
    };

    resizeCheck();
    window.addEventListener('resize', resizeCheck);


};

export default burgerInit;