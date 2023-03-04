export default class Difference{
    constructor(items,btns,btnsRemove){
        this.items = document.querySelectorAll(items);
        this.btns = document.querySelector(btns);
        this.removeBtn = document.querySelector(btnsRemove);
        this.counter = 0;
    }

    bindTriggers(){
        try{
            this.btns.addEventListener('click', () => {
                this.items[this.counter].style.display = 'flex';
                this.items[this.counter].classList.add('animated', 'fadeIn');
                this.counter++;
    
                if(this.counter == 3){
                    this.removeBtn.style.display = 'none';
                }
            });
        }catch(e){

        }
       
    }

    init(){
        this.items.forEach(item => {
            item.style.display = 'none';
        });

        this.bindTriggers();
    }
}