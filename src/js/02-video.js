import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const SAVE_TIME = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('timeupdate', throttle(throttlePlay, 1488));
   
function throttlePlay ({ seconds }) {
    localStorage.setItem(SAVE_TIME, seconds)
}
setCurrentTime()
function setCurrentTime() {
    const SAVED_TIME =  localStorage.getItem(SAVE_TIME)
    if(!SAVED_TIME){
        return
    }
    player.setCurrentTime(SAVED_TIME)
}
