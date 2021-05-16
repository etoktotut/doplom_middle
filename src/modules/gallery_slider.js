'use strict';

const gallerySlider = () => {
    const slide = document.querySelectorAll('.gallery-slider .slide'),
        slider = document.querySelector('.gallery-slider');

    const buttonsInsert = () => {
        const buttonLeft = document.createElement('div'),
            buttonRight = document.createElement('div');

        buttonLeft.className = 'slider-arrow prev';
        buttonRight.className = 'slider-arrow next';
        buttonLeft.id = 'arrow-left';
        buttonRight.id = 'arrow-right';
        buttonLeft.innerHTML = `<span><img src="./images/arrow-left.png" alt=""></span>`;
        buttonRight.innerHTML = `<span><img src="./images/arrow-right.png" alt=""></span>`;
        slider.insertAdjacentElement('beforeend', buttonLeft);
        slider.insertAdjacentElement('beforeend', buttonRight);
    };

    buttonsInsert();

    let currentSlide = 0,
        interval, dot;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove('super');
        elem[index].classList.remove(strClass);

    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
        setTimeout(() => {
            elem[index].classList.add('super');
        }, 100);
    };

    nextSlide(slide, currentSlide, 'active');

    const autoPlaySlide = () => {

        prevSlide(slide, currentSlide, 'active');
        prevSlide(dot, currentSlide, 'slick-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'active');
        nextSlide(dot, currentSlide, 'slick-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    //dot add
    const dotInsert = () => {
        const dotUl = document.createElement('ul');
        dotUl.className = "slider-dots";
        slider.insertAdjacentElement('beforeend', dotUl);

        slide.forEach(item => {
            const newDot = document.createElement('li');
            newDot.className = 'dot';
            newDot.innerHTML = '<button></button>';
            if (item.classList.contains('active')) {
                newDot.classList.add('slick-active');
            }
            dotUl.insertAdjacentElement('beforeend', newDot);
        });
        dot = document.querySelectorAll('.dot');
    };

    dotInsert();

    slider.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;

        if (!target.closest('.slider-arrow') && !target.closest('.dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'active');
        prevSlide(dot, currentSlide, 'slick-active');

        if (target.closest('#arrow-right')) {
            currentSlide++;
        } else if (target.closest('#arrow-left')) {
            currentSlide--;
        } else if (target.closest('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target.closest('.dot')) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'active');
        nextSlide(dot, currentSlide, 'slick-active');
    });

    slider.addEventListener('mouseover', event => {
        if (event.target.closest('.slider-arrow') || event.target.closest('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', event => {
        if (event.target.closest('.slider-arrow') || event.target.closest('.dot')) {
            startSlide(1500);
        }
    });

    startSlide();

};

export default gallerySlider;