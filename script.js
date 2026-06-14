const canvas = document.getElementById('bokehCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
let isMoving = true;


const playlist = [
    {
        title: "Не боюсь смерти",
        artist: "Джем",
        src: "music.mp3",          
        cover: "images/ynbs.jfif"  
    },
    {
        title: "Плёнка",
        artist: "Джем",
        src: "music2.mp3",         
        cover: "images/plenka.jpg" 
    }
];


let currentTrackIndex = 0;
const audio = new Audio();
audio.volume = 0.7; 

class BokehCircle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 60 + 40;
        this.vx = (Math.random() - 0.5) * 1.3; 
        this.vy = (Math.random() - 0.5) * 1.3; 
        this.hue = Math.random() * 60 + 250;
        this.alpha = Math.random() * 0.15 + 0.05;
    }
    update() {
        if (isMoving) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.vx *= -1;
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.vy *= -1;
        }
    }
    draw() {
        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.alpha})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

function init() {
    circles = [];
    let count = Math.floor((canvas.width * canvas.height) / 30000);
    count = Math.max(20, Math.min(count, 60)); 
    for (let i = 0; i < count; i++) { circles.push(new BokehCircle()); }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen'; 
    circles.forEach(c => { c.update(); c.draw(); });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


const toggleBtn = document.getElementById('toggleBtn');
const statusText = document.getElementById('statusText');

toggleBtn.addEventListener('click', () => {
    if (isMoving) {
        isMoving = false;
        statusText.innerText = "Заморожено";
        statusText.className = "status-offline";
        toggleBtn.innerText = "Запустить фон";
    } else {
        isMoving = true;
        statusText.innerText = "Активно";
        statusText.className = "status-online";
        toggleBtn.innerText = "Заморозить фон";
    }
});


const playMusicBtn = document.getElementById('playMusicBtn');
const prevMusicBtn = document.getElementById('prevMusicBtn'); 
const nextMusicBtn = document.getElementById('nextMusicBtn'); 
const playerStatus = document.getElementById('playerStatus');
const timeline = document.getElementById('timeline');
const currentTimeLabel = document.getElementById('currentTime');
const durationTimeLabel = document.getElementById('durationTime');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');

const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackCover = document.getElementById('trackCover');

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}


function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    if (trackTitle) trackTitle.innerText = track.title;
    if (trackArtist) trackArtist.innerText = track.artist;
    if (trackCover) trackCover.src = track.cover;
    
    timeline.value = 0;
    currentTimeLabel.innerText = "0:00";
    durationTimeLabel.innerText = "0:00";
}

function playTrack() {
    audio.play().then(() => {
        playerStatus.innerText = "Воспроизведение...";
        playMusicBtn.innerText = "Поставить на паузу";
        if (trackCover) trackCover.classList.add('playing'); 
    }).catch(err => {
        playerStatus.innerText = `Ошибка: файл не найден!`;
        if (trackCover) trackCover.classList.remove('playing');
        console.error(err);
    });
}

loadTrack(currentTrackIndex);

playMusicBtn.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
    } else {
        audio.pause();
        playerStatus.innerText = "На паузе";
        playMusicBtn.innerText = "Включить музыку";
        if (trackCover) trackCover.classList.remove('playing'); 
    }
});

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

if (nextMusicBtn) nextMusicBtn.addEventListener('click', nextTrack);
if (prevMusicBtn) prevMusicBtn.addEventListener('click', prevTrack);

audio.addEventListener('ended', nextTrack);

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        timeline.value = progress;
        currentTimeLabel.innerText = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    durationTimeLabel.innerText = formatTime(audio.duration);
});

timeline.addEventListener('input', () => {
    if (!isNaN(audio.duration)) {
        const timeToSet = (timeline.value / 100) * audio.duration;
        audio.currentTime = timeToSet;
    }
});

volumeSlider.addEventListener('input', () => {
    const vol = volumeSlider.value;
    audio.volume = vol / 100;
    volumeValue.innerText = vol + "%";
});

init();
animate();

