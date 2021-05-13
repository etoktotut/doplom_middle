"use strict";

import chooseClubButton from './choose_club_btn.js';
import freeVisitPopUp from './free_visit_popup.js';




const pageClickHandler = () => {

    const bodyClickReact = [
        {
            elem: '.club-select',
            fun: chooseClubButton
        },
        {
            elem: '.open-popup',
            fun: freeVisitPopUp
        }
    ];


    const wbody = document.querySelector('body');
    const bodyClickHandler = (event) => {
        const target = event.target;

        for (let i = 0; i < bodyClickReact.length; i++) {

            if (target.closest(bodyClickReact[i].elem) !== null) {
                bodyClickReact[i].fun(target);
                break;
            }
        }
    };

    wbody.addEventListener('click', (e) => { bodyClickHandler(e); });
    console.log('tets');

};

export default pageClickHandler;