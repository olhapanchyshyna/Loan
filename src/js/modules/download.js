export default class Download{
    constructor(btns){
        this.btns = document.querySelectorAll(btns);
        this.way = {
            mod1: "assets/img/slide_1_m.jpg",
            mod2: "assets/img/slide_2_m.jpg",
            mod3: "assets/img/slide_3_m.jpg"
        };
    }
    download(path,pictureName){
        const element = document.createElement('a');

        element.setAttribute('href', path);
        element.setAttribute('download', pictureName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) =>{
                const num = btn.dataset.num;

                switch (num) {
                    case '1':
                        this.download(this.way.mod1, 'picture-1');
                        e.preventDefault();
                        e.stopPropagation();
                      break;
                    case '2':
                        this.download(this.way.mod2, 'picture-2');
                        e.preventDefault();
                        e.stopPropagation();
                      break;
                    case '3':
                        this.download(this.way.mod3, 'picture-3');
                        e.preventDefault();
                        e.stopPropagation();
                    break;
                  }
            });
        });
    }
}