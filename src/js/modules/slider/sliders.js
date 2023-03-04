export default class Slider{
    constructor({container = null, btns = null, next = null, prev = null, prevModule = null, nextModule = null, logoBtn = null, activeClass = '', animate = false, autoPlay = false} = {}){
        this.container = document.querySelector(container);
        try{this.slides = this.container.children;}catch(e){}
        this.btns =  document.querySelectorAll(btns);
        this.logoBtn = document.querySelectorAll(logoBtn);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.prevModule = document.querySelectorAll(prevModule);
        this.nextModule = document.querySelectorAll(nextModule);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoPlay = autoPlay;
        this.slideIndex = 1;
    }
}
