export default class Accordion{
    constructor(btn){
        this.btn = document.querySelectorAll(btn);
    }

    init(){
        try{
            this.btn.forEach(item => {
                item.addEventListener('click', () =>{
                    const element = item.closest('.module__info-show').nextElementSibling;
                    if(getComputedStyle(element).display == 'block'){
                        element.style.display = 'none';
                    }else{
                        element.style.display = 'block';
                        element.classList.add('animated','fadeInUp');
                    }
                });
            });
        }catch(e){}
    }
}