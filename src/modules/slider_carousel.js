'use strict';
const carousel = () => {
    const main = document.querySelector('.services-slider');
    const tempHtmlContent = main.innerHTML;
    main.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'service-slide__wrapper';
    wrap.innerHTML = tempHtmlContent;
    main.insertAdjacentElement('afterbegin', wrap);
    let position = 0;
    const slidesToShow = 5;
    let next, prev;
    const sliders = wrap.querySelectorAll('.slide');
    const widthSlide = Math.floor(50 / slidesToShow);

    const addGloClass = () => {
        main.classList.add('glo-slider');
        wrap.classList.add('glo-slider__wrap');
        for (const item of sliders) {
            item.classList.add('glo-slider__item');
        }
    };
    const prevSlide = () => {
        if (position > 0) {
            --position;
            if (position < 0) {
                position = sliders.length - slidesToShow;
            }
            wrap.style.transform = `translateX(-${position * widthSlide}%)`;
        }
    };

    const nextSlide = () => {
        if (position < sliders.length - slidesToShow) {
            ++position;
            if (position > sliders.length - slidesToShow) {
                position = 0;
            }
            wrap.style.transform = `translateX(-${position * widthSlide}%)`;
        }
    };


    const controlSlider = () => {
        prev.addEventListener('click', () => prevSlide());
        next.addEventListener('click', () => nextSlide());

    };

    const addArrow = () => {
        prev = document.createElement('div');
        next = document.createElement('div');
        prev.className = 'slider-arrow prev';
        next.className = 'slider-arrow next';
        prev.innerHTML = '<span><img src="./images/arrow-left.png" alt=""></span> ';
        next.innerHTML = '<span><img src="./images/arrow-right.png" alt=""></span> ';
        main.insertAdjacentElement('beforeend', prev);
        main.insertAdjacentElement('beforeend', next);

    };

    addGloClass();
    addArrow();
    controlSlider();

};

export default carousel;