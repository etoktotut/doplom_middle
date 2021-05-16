'use strict';

const calculate = () => {
    const priceList = {
        schelkovo: {
            1: 2990,
            6: 14990,
            9: 21990,
            12: 24990
        },
        mozaika: {
            1: 1999,
            6: 9900,
            9: 13900,
            12: 19900
        },
    };
    const clubItems = document.querySelectorAll('#card_order input[name="club-name"]');
    const cardItems = document.querySelectorAll('#card_order .time input');
    const priceTotal = document.getElementById('price-total');
    const promo = document.querySelector('.price-message input[name="name"]');

    const discount = promo.value.trim().toUpperCase() === 'ТЕЛО2020' ? 0.7 : 1;
    let club;
    clubItems.forEach(item => {
        if (item.checked) { club = item.value; }
    });

    for (let i = 0; i < cardItems.length; i++) {
        if (cardItems[i].checked) {
            priceTotal.textContent = Math.floor(priceList[club][cardItems[i].value] * discount);

        }
    }
};

const calc = () => {
    const clubItems = document.querySelectorAll('#card_order input[name="club-name"]');
    const cardItems = document.querySelectorAll('#card_order .time input');
    const promo = document.querySelector('.price-message input[name="name"]');

    clubItems.forEach(item => item.addEventListener('input', () => { calculate(); }));
    cardItems.forEach(item => item.addEventListener('input', () => { calculate(); }));
    promo.addEventListener('input', () => { calculate(); });
    calculate();
};

const clearCalc = () => {
    document.getElementById('price-total').textContent = '';
    calculate();
};


export { calc, clearCalc };


