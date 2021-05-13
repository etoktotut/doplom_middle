"use strict";

const chooseClubButton = (target) => {
    const clubSelectList = target.closest('.club-select').querySelector('.clubs-list ul');
    if (clubSelectList.style.display === 'block') {
        clubSelectList.style.display = 'none';
    } else {
        clubSelectList.style.display = 'block';
    }
};

export default chooseClubButton;
