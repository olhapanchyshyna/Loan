export default class Forms{
    constructor(form) {
        this.path = 'assets/question.php';
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll("input");
        this.message = {
            loading: "Загрузка...",
            success: "Спасибо! Скоро мы с вами свяжемся",
            failure: "Что-то пошло не так...",
        };
       
        
    }
    
    async postData(url, data) {
        
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }

    clearInput(){
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkEmailInput(){
        const emailInput = document.querySelectorAll('[name="email"]');
        
        emailInput.forEach(input => {
            input.addEventListener('input',(e) => {
                const inputText = e.target.value;
                const filteredText = inputText.replace(/[^a-z 0-9 @ \.]/ig, '');
                e.target.value = filteredText;
            });
        });
    }

    mask(){
        let inputs = document.querySelectorAll('[name="phone"]');

        function setCursorPosition(pos, elem){
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
    
        function createMask(event) {
            // Чтобы с переду маски (кода страны) пользователь не смог вводить данные
            inputs.forEach(input => {
                input.addEventListener('keydown', (e) => {
                    if (e.target.selectionStart < 2 && e.keyCode !== 8 && e.keyCode !== 46) {
                        e.preventDefault();
                    }
                });
            });
            let matrix = '+1 (___) ___ ____',
                i = 0,
                def = matrix.replace(/\D/g, ''), 
                val = this.value.replace(/\D/g, ''); 
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a){
                // return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                if (/[_\d]/.test(a) && i < val.length) {
                    return val.charAt(i++); 
                } else if (i >= val.length) {
                    return '';
                } else {
                    return a;
                } 
                
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 3) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    
    
    }

    init(){
        this.checkEmailInput();
        this.mask();

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 40px;
                    font-size: 25px;
                    color: #76FF03;
                    text-align: center;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInput();
                        document.querySelector('#city').value = "New-York";
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 4000);

                    });
            });
        });
    }
        
}

      
