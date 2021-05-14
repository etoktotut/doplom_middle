'use strict';


const mainSlider = () => {

    let timer,
        currentSlide = 0;

    const bigslider = document.querySelector('.head-slider');
    const slider = document.querySelector('.main-slider');
    const slides = slider.querySelectorAll('.main-slider .slide');


    const slideON = (index) => {
        slides[index].style.display = 'flex';
    };

    const slideOFF = (index) => {
        slides[index].style.display = 'none';

    };

    const autoPlaySlide = () => {
        slideOFF(currentSlide);
        currentSlide++;
        currentSlide = currentSlide >= slides.length ? 0 : currentSlide;
        slideON(currentSlide);
    };

    const startSlide = (latency = 1500) => {
        timer = setInterval(autoPlaySlide, latency);
    };

    const stopSlide = () => clearInterval(timer);

    slider.addEventListener('mouseover', () => stopSlide());
    slider.addEventListener('mouseout', () => startSlide());

    startSlide(2000);

};

export default mainSlider;