/* jslint esnext: true */

//////////////////////////////////
// GET ELEMENTS FROM DOM
//////////////////////////////////

export const DOM = {
    grid: document.querySelector('.game__board'),
    cell: document.querySelector('.game__cell'),
    btnPlay: document.querySelector('.controls__button--play'),
    btnIterate: document.querySelector('.controls__button--iterate'),
    btnResize: document.querySelector('.controls__size-button'),
    inputHeight: document.getElementById('height'),
    inputWidth: document.getElementById('width'),
};