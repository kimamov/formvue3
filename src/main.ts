import './style.css'
import './forms/typo3Forms.js';
import initVueForms from './forms/vueForm.ts';

requestAnimationFrame(() => {

    initVueForms();
})