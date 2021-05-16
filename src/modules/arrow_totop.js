'use strict';

const arrowToTop = () => {
    const toTop = document.getElementById('totop');
    const headHeight = document.querySelector('header.header-main').offsetHeight;
    const arrowCheck = () =>
        toTop.style.display =
        window.pageYOffset < document.querySelector('header.header-main').offsetHeight ? 'none' : 'block';
    arrowCheck();

    window.addEventListener('scroll', arrowCheck);

};

export default arrowToTop;