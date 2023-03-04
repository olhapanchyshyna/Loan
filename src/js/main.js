import MainSlider from "./modules/slider/main-slider";
import MiniSlider from "./modules/slider/mini-sliders";
import VideoPlay from "./modules/videoPlay";
import Difference from "./modules/diference";
import Form from "./modules/forms";
import Accordion from "./modules/accordion";
import Download from "./modules/download";


window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // slider

    const sliders = new MainSlider({container: '.page',btns: '.next', logoBtn: '[data-logo-btn]'});
    sliders.render();

    const modulePageSliders = new MainSlider({container: '.moduleapp', btns: '.moduleapp .next', logoBtn: '[data-logo-btn]', prevModule: '.prevmodule' , nextModule: '.nextmodule'});
    modulePageSliders.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true,
        autoPlay: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoPlay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();


    // play video

    new VideoPlay('.showup .play','.overlay').init();
    new VideoPlay('.module__wrapper .play','.overlay').init(); 


    // diferense
    const diferenseOld = new Difference('[data-item-officerold]', '.officerold .plus','[data-remove-old]' );
    diferenseOld.init();

    const diferensNew = new Difference('[data-item-officernew]', '.officernew .plus', '[data-remove-new]');
    diferensNew.init();


    // form
    new Form('.form').init();


    // accordion
    new Accordion('.module__wrapper .plus').init();


    // download
    new Download('.download').init();
});