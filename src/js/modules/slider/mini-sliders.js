import Slider from "./sliders";

export default class MiniSlider extends Slider{
    constructor(container,next,prev,activeClass,animate,autoPlay){
        super(container,next,prev,activeClass,animate,autoPlay);
    }

   
    decorizeSlides(){
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        for (let i = 1; i < this.slides.length; i++){
            if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
                const firstSlide = this.slides[0];
                const secondSlide = this.slides[1];
                const thirdSlide = this.slides[2];
            
                // Удаляем первые три слайда из текущей позиции
                this.container.removeChild(firstSlide);
                this.container.removeChild(secondSlide);
                this.container.removeChild(thirdSlide);
            
                // Добавляем первые три слайда в конец контейнера
                this.container.appendChild(firstSlide);
                this.container.appendChild(secondSlide);
                this.container.appendChild(thirdSlide);
                this.decorizeSlides();
            } else {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
            }
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    autoPlayGo(){
        let timeout = setInterval(() => this.nextSlide(), 5000);

        this.prev.addEventListener('mouseover', () => {
            clearInterval(timeout);
        });
        this.next.addEventListener('mouseover', () => {
            clearInterval(timeout);
        });
        this.slides[0].parentNode.addEventListener('mouseover', () => {
            clearInterval(timeout);
        });
    }

    init() {
        try{
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoPlay) {
            this.autoPlayGo();

            this.prev.addEventListener('mouseout', () => {
                this.autoPlayGo();
            });
            this.next.addEventListener('mouseout', () => {
                this.autoPlayGo();
            }); 
            this.slides[0].parentNode.addEventListener('mouseout', () => {
                this.autoPlayGo();
            }); 
        }
        }catch(e){}
        
    }
}
