export default class VideoPlay{
    constructor(btnsSelector,overlay){
        this.btns = document.querySelectorAll(btnsSelector);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    createPlayer(url){
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    onPlayerStateChange(state){
        try{
            const blockElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            if(state.data === 0){
                if(blockElem.querySelector('.play__circle').classList.contains('closed')){
                    blockElem.querySelector('.play__circle').classList.remove('closed');
                    blockElem.querySelector('svg').remove();
                    blockElem.querySelector('.play__circle').appendChild(playBtn);
                    blockElem.querySelector('.play__text').textContent = 'play video';
                    blockElem.querySelector('.play__text').classList.remove('attention');
                }
                blockElem.style.cssText = `
                    filter: unset;
                    opacity: 1;
                `;
            }
        }catch(e){}
    }

    init(){
        this.bindTriggers();
        this.closeTrigger();
        
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }


    bindTriggers(){
        this.btns.forEach(btn =>{
            btn.addEventListener('click', ()=> {
                if(!btn.querySelector('.closed')){
                    this.activeBtn = btn;
                    this.overlay.classList.add('animated','fadeInDown');
                    if(document.querySelector('iframe#frame')){
                        this.overlay.style.display = 'flex';
                        // проверяется, является ли путь к видео, 
                        // указанный в атрибуте data-url у выбранной кнопки, 
                        // другим от текущего пути this.path. 
                        if(this.path !== btn.getAttribute('data-url')){
                            // Если пути различаются, то значение текущего пути обновляется, 
                            this.path = btn.getAttribute('data-url');
                            // а видео перезапускается с новым путём.
                            this.player.loadVideoById({videoId: this.path});
                        }
                        // Если на странице еще нет видео, то значение текущего пути обновляется, 
                        // и запускается создание нового плеера с указанным путём.
                    }else{
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            });
        });   
    }

    closeTrigger(){
        this.close.addEventListener('click', () =>{
            this.overlay.classList.remove('animated','fadeInDown');
            this.overlay.style.display = 'none';
            if (this.player && this.player.getPlayerState() !== null) {
                this.player.stopVideo();
              }
            // this.player.stopVideo();
        });
    }
}
