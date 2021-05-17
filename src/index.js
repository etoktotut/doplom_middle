'use strict';

import pageClickHandler from './modules/page_click_handler.js';
import mainSlider from './modules/main_slider.js';
import carousel from './modules/slider_carousel';
import sendForm from './modules/send_form';
import validations from './modules/validations';
import { calc, clearCalc } from './modules/calc';
import burgerInit from './modules/burger_menu';
import arrowToTop from './modules/arrow_totop';
import gallerySlider from './modules/gallery_slider';

// обработчик кликов
pageClickHandler();

//главный слайдер
mainSlider();

//servise slider
carousel();

//валидации
validations();

//слайдер галереи
gallerySlider();

//бургер меню
burgerInit();

//отправка форм
sendForm(document.querySelector('form[name="free-visit-form"]'), true);
sendForm(document.querySelector('form[name="callback-form"]'), true);
sendForm(document.querySelector('form[name="banner-form"]'), false, document.querySelector('#thanks'));
sendForm(document.querySelector('#card_order'), false, document.querySelector('#thanks'), clearCalc);
sendForm(document.querySelector('#footer_form'), false, document.querySelector('#thanks'));

//калькулятор
if (document.getElementById('price-total')) {
    calc();
}

//стрелка перехода вверх
arrowToTop();





