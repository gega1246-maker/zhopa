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
    },
    {
        title: "В КАБИНЕТЕ У ДИРЕКТОРА",
        artist: "Джем",          
        src: "music3.mp3",         
        cover: "images/vkyd.jfif" 
    },
    {
        title: " I'm so crazy for youuu ᐸ/3",
        artist: "Джем",          
        src: "music4.mp3",         
        cover: "images/iscfy.jfif" 
    },
    {
        title: " Babydoll",
        artist: "Джем",          
        src: "music5.mp3",         
        cover: "images/bd.jfif" 
    },
    {
        title: " Fake ur face",
        artist: "Джем",          
        src: "music6.mp3",         
        cover: "images/fuf.jfif" 
    },
    {
        title: " Unhappy",
        artist: "Джем",          
        src: "music7.mp3",         
        cover: "images/uh.jpg" 
    },
    {
        title: " Ангелочек",
        artist: "Джем",          
        src: "music8.mp3",         
        cover: "images/tmma.jfif" 
    },
    {
        title: " Грустинка",
        artist: "Джем",          
        src: "music9.mp3",         
        cover: "images/gr.jfif" 
    },
    {
        title: " Я одна",
        artist: "Джем",          
        src: "music10.mp3",         
        cover: "images/iod.jfif" 
    },
    {
        title: " Вызвал шлюху",
        artist: "Джем",          
        src: "music11.mp3",         
        cover: "images/vsh.jpg" 
    },
    {
        title: " Party Troll",
        artist: "Джем",          
        src: "music12.mp3",         
        cover: "images/pt.jfif" 
    },
    {
        title: " На поле боя",
        artist: "Джем",          
        src: "music13.mp3",         
        cover: "images/npb.jfif" 
    },
    {
        title: " Life Goes On",
        artist: "Джем",          
        src: "music14.mp3",         
        cover: "images/lgo.jfif" 
    },
    {
        title: " MATRIX (BL STUDIO LOOP)",
        artist: "Джем",          
        src: "music15.mp3",         
        cover: "images/m.jfif" 
    },
    {
        title: " Демоница",
        artist: "Джем",          
        src: "music16.mp3",         
        cover: "images/d.jfif" 
    },
    {
        title: " dj play this song",
        artist: "Джем",          
        src: "music17.mp3",         
        cover: "images/dj.jfif" 
    },
    {
        title: " not enough",
        artist: "Джем",          
        src: "music18.mp3",         
        cover: "images/ne.jfif" 
    },
    {
        title: " terranova",
        artist: "Джем",          
        src: "music19.mp3",         
        cover: "images/t.jfif" 
    },
    {
        title: " Calabria-2007",
        artist: "Джем",          
        src: "music20.mp3",         
        cover: "images/c.jpg" 
    },
    {
        title: " Утро",
        artist: "Джем",          
        src: "music21.mp3",         
        cover: "images/y.png" 
    },
    {
        title: " КО МНЕ ДОМОЙ",
        artist: "Джем",          
        src: "music22.mp3",         
        cover: "images/kmd.jfif" 
    },
    {
        title: " Я целую твои сломы",
        artist: "Джем",          
        src: "music23.mp3",         
        cover: "images/ictc.jfif" 
    },
    {
        title: " Улыбашка",
        artist: "Джем",          
        src: "music24.mp3",         
        cover: "images/y.jfif" 
    },
    {
        title: " All I Ever Wanted",
        artist: "Джем",          
        src: "music25.mp3",         
        cover: "images/aiew.jfif" 
    },
    {
        title: " BANG BANG BANG",
        artist: "Джем",          
        src: "music26.mp3",         
        cover: "images/bbb.jpg" 
    },
    {
        title: " Bass Da Da Da (Sentadão)",
        artist: "Джем",          
        src: "music27.mp3",         
        cover: "images/bddd.jfif" 
    },
    {
        title: " Safe And Sound",
        artist: "Джем",          
        src: "music28.mp3",         
        cover: "images/sas.jfif" 
    },
    {
        title: " Cure For Me",
        artist: "Джем",          
        src: "music29.mp3",         
        cover: "images/cfm.jfif" 
    },
    {
        title: " VLONE",
        artist: "Джем",          
        src: "music30.mp3",         
        cover: "images/vlone.jpg" 
    },
    {
        title: " give me hints",
        artist: "Джем",          
        src: "music31.mp3",         
        cover: "images/gmh.jpg" 
    },
    {
        title: " hunter eyes",
        artist: "Джем",          
        src: "music32.mp3",         
        cover: "images/he.jfif" 
    },
    {
        title: " have no friends",
        artist: "Джем",          
        src: "music33.mp3",         
        cover: "images/hnf.jfif" 
    },
    {
        title: " Маршрутка",
        artist: "Джем",          
        src: "music34.mp3",         
        cover: "images/marshrytka.jpg" 
    },
    {
        title: " Kiss Me Again",
        artist: "Джем",          
        src: "music35.mp3",         
        cover: "images/kma.png" 
    },
    {
        title: " lose her",
        artist: "Джем",          
        src: "music36.mp3",         
        cover: "images/lh.jfif" 
    },
    {
        title: " Sua Eu You Pegar",
        artist: "Джем",          
        src: "music37.mp3",         
        cover: "images/seyp.jfif" 
    },
    {
        title: " Just The Way You Are",
        artist: "Джем",          
        src: "music38.mp3",         
        cover: "images/jtwya.jfif" 
    },
    {
        title: " Mirrors demo - happy version",
        artist: "Джем",          
        src: "music39.mp3",         
        cover: "images/mdhp.jfif" 
    },
    {
        title: " More And More",
        artist: "Джем",          
        src: "music40.mp3",         
        cover: "images/mam.jpg" 
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

