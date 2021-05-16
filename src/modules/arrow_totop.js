'use strict';

const arrowToTop = () => {
    const headSliderRect = document.querySelector('header.header-main').getBoundingClientRect();
    const toTop = document.getElementById('totop');
    const arrowCheck = () => toTop.style.display = window.pageYOffset < headSliderRect.bottom ? 'none' : 'block';
    arrowCheck();
    window.addEventListener('scroll', arrowCheck);

};

export default arrowToTop;