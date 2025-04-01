// Дата анонса 2 сезона аниме 86 (19 марта 2022)
const announceDate = new Date('2022-03-19T00:00:00');

function updateTimer() {
    const now = new Date();
    const diff = now - announceDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const bgVideo = document.getElementById('bg-video');
let isPlaying = true;

function playMusic() {
    bgMusic.currentTime = bgVideo.currentTime;
    bgMusic.play();
}


document.addEventListener('DOMContentLoaded', () => {
    const startPlayback = () => {
        playMusic();
        document.removeEventListener('click', startPlayback);
    };
    document.addEventListener('click', startPlayback);
});


musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        playMusic();
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});


bgVideo.addEventListener('play', () => {
    if (isPlaying) {
        playMusic();
    }
});

bgVideo.addEventListener('pause', () => {
    bgMusic.pause();
});


bgVideo.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
}); 
