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
    let sliders = wrap.querySelectorAll('.slide');
    const widthSlide = Math.floor(50 / slidesToShow);

    const addGloClass = () => {
        main.classList.add('glo-slider');
        wrap.classList.add('glo-slider__wrap');
        for (const item of sliders) {
            item.classList.add('glo-slider__item');
        }
    };
    const prevSlide = () => {
        if (position >= 0) {
            --position;
            if (position === -1) {
                ++position;
                wrap.style.transition = 'transform 0s';
                wrap.style.transform = `translateX(-${(position + 1) * widthSlide}%)`;
                const slideClone = sliders[sliders.length - 1].cloneNode(true);
                wrap.insertAdjacentElement('afterbegin', slideClone);
                sliders[sliders.length - 1].remove();
                sliders = wrap.querySelectorAll('.slide');
                setTimeout(() => { wrap.style.transition = 'transform 0.5s'; }, 75);
            }
            setTimeout(() => { wrap.style.transform = `translateX(-${position * widthSlide}%)`; }, 75);
        }

    };

    const nextSlide = () => {
        if (position < sliders.length - slidesToShow) {
            ++position;
            if (position === sliders.length - slidesToShow) {
                --position;
                wrap.style.transition = 'transform 0s';
                wrap.style.transform = `translateX(-${(position - 1) * widthSlide}%)`;
                const slideClone = sliders[0].cloneNode(true);
                wrap.insertAdjacentElement('beforeend', slideClone);
                sliders[0].remove();
                sliders = wrap.querySelectorAll('.slide');
                setTimeout(() => { wrap.style.transition = 'transform 0.5s'; }, 75);
            }
            setTimeout(() => { wrap.style.transform = `translateX(-${position * widthSlide}%)`; }, 75);
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
