console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSongName = document.getElementById('currentSongName');
let songItemContainer = document.querySelector('.songItemContainer');
let previousBtn = document.getElementById('previous');
let nextBtn = document.getElementById('next');

let songs = [
  { songName: "Let me Love You", filePath: "1.mp3", coverPath: "cover1.png", duration: "03:26" },
  { songName: "Goodbye", filePath: "2.mp3", coverPath: "cover2.png", duration: "02:58" },
  { songName: "Salam-e-Ishq", filePath: "3.mp3", coverPath: "cover3.png", duration: "07:04" },
  { songName: "Maa", filePath: "4.mp3", coverPath: "cover4.png", duration: "05:10" },
  { songName: "Aadmi chutiya hai", filePath: "5.mp3", coverPath: "cover5.png", duration: "03:30" },
  { songName: "Hona tha Pyar", filePath: "6.mp3", coverPath: "cover6.png", duration: "05:34" },
  { songName: "De De Pyar De", filePath: "7.mp3", coverPath: "cover7.png", duration: "05:44" },
  { songName: "Humdard", filePath: "8.mp3", coverPath: "cover8.png", duration: "04:20" },
];

// Render songs
songItemContainer.innerHTML = songs.map((song, i) => `
  <div class="songItem">
    <img src="${song.coverPath}" alt="${song.songName}" />
    <span class="songName">${song.songName}</span>
    <span class="timestamp">${song.duration}
      <i class="fa-regular fa-circle-play songItemPlay" data-index="${i}"></i>
    </span>
  </div>
`).join("");

// Utility
const makeAllPlays = () => {
  document.querySelectorAll('.songItemPlay').forEach(btn => {
    btn.classList.remove('fa-circle-pause');
    btn.classList.add('fa-circle-play');
  });
};

// Song Play
const playSong = (index) => {
  songIndex = index;
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  currentSongName.innerText = songs[index].songName;
  gif.style.opacity = 0.4;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
};

// Master Play
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong(songIndex);
    document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.remove('fa-circle-play');
    document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.add('fa-circle-pause');
  } else {
    audioElement.pause();
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

// Update Progress
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

// Seek
progressBar.addEventListener('change', () => {
  audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// Song Buttons
document.querySelectorAll('.songItemPlay').forEach(btn => {
  btn.addEventListener('click', (e) => {
    let index = parseInt(e.target.dataset.index);
    if (songIndex === index && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.add('fa-circle-play');
      e.target.classList.remove('fa-circle-pause');
      masterPlay.classList.add('fa-circle-play');
      masterPlay.classList.remove('fa-circle-pause');
      gif.style.opacity = 0;
    } else {
      makeAllPlays();
      playSong(index);
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
    }
  });
});

// Next/Prev
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
  makeAllPlays();
  document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.remove('fa-circle-play');
  document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.add('fa-circle-pause');
});

previousBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
  makeAllPlays();
  document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.remove('fa-circle-play');
  document.querySelector(`.songItemPlay[data-index="${songIndex}"]`).classList.add('fa-circle-pause');
});
