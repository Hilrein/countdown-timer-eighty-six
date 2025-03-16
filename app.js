// Дата анонса 2 сезона (7 января 2024)
const announceDate = new Date('2024-01-07T00:00:00');

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

// Обновляем каждую секунду
setInterval(updateTimer, 1000);
// Запускаем сразу при загрузке
updateTimer();

// Управление музыкой
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const bgVideo = document.getElementById('bg-video');
let isPlaying = true; // По умолчанию музыка играет

// Функция для воспроизведения музыки
function playMusic() {
    bgMusic.currentTime = bgVideo.currentTime; // Синхронизируем время музыки с видео
    bgMusic.play();
}

// Автовоспроизведение при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Из-за политики браузеров, нам нужно дождаться взаимодействия пользователя
    const startPlayback = () => {
        playMusic();
        document.removeEventListener('click', startPlayback);
    };
    document.addEventListener('click', startPlayback);
});

// Обработчик кнопки музыки
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Предотвращаем срабатывание общего обработчика клика
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        playMusic();
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Синхронизация видео и аудио при воспроизведении
bgVideo.addEventListener('play', () => {
    if (isPlaying) {
        playMusic();
    }
});

bgVideo.addEventListener('pause', () => {
    bgMusic.pause();
});

// Обработка окончания видео/аудио
bgVideo.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
}); 