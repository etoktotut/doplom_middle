"use strict";

const chooseClubButton = (target) => {
    target.closest('.club-select').querySelector('.clubs-list ul').style.display = 'block';
};

export default chooseClubButton;
