import MediaPlayer from "./MediaPlayer";

// plugins
import AutoPlay from "./plugins/Autoplay"
import AutoPause from "./plugins/AutoPause"
import AdsPlugin from "./plugins/Ads";


const video = document.querySelector('video');
const player = new MediaPlayer({
  el: video, plugins: [
    new AutoPlay(),
    new AutoPause(),
    new AdsPlugin()
  ]
});



const playButton: HTMLElement = document.querySelector('#playButton');
playButton.onclick = () => player.togglePlay();


const muteButton: HTMLElement = document.querySelector('#muteButton');
muteButton.onclick = () => {
  if (player.media.muted) {
    player.unmute();
  } else {
    player.mute();
  }
};


if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .catch(e => console.log(e.message))
}
