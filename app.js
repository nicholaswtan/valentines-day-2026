const tomato_frames = [
  "assets/tomato-frames/tomato-1.PNG",
  "assets/tomato-frames/tomato-2.PNG",
  "assets/tomato-frames/tomato-3.PNG",
  "assets/tomato-frames/tomato-4.PNG",
  "assets/tomato-frames/tomato-5.PNG",
  "assets/tomato-frames/tomato-6.PNG",
  "assets/tomato-frames/tomato-7.PNG",
];

const char_frames = [
  "assets/char-heart-frames/char-heart-1.PNG",
  "assets/char-heart-frames/char-heart-2.PNG",
  "assets/char-heart-frames/char-heart-3.PNG",
];
let i = 0;
let c_i = 0;

const img = document.getElementById("tomato");
const resetBtn = document.getElementById("reset");
const hint = document.getElementById("hint");
const title = document.querySelector(".title");
const revealedMessage = document.querySelector(".revealed-message");

const char = document.getElementById("char");

// Detect if user is on mobile/touch device
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  ) ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

const hintText = isMobile ? "(tap to take a bite)" : "(click to take a bite)";

const message_instance = new TypeIt(".revealed-message", {
  strings: "Would you like to be my Valentine?",
  speed: 100,
  waitUntilVisible: true,
  cursor: false,
  afterComplete: () => {
    // Show buttons after typing animation finishes
    char.classList.add("show");
  },
});

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

function render() {
  playSound("assets/chomp.mp3");
  img.src = tomato_frames[i];
  if (i === tomato_frames.length - 1) {
    title.classList.add("fade-out");
    img.classList.add("fade-out");
    hint.classList.add("fade-out");
    setTimeout(() => {
      title.classList.add("hide");
      img.classList.add("hide");
      hint.classList.add("hide");
      revealedMessage.classList.add("show");
      char.classList.add("hidden");
      message_instance.go();
    }, 500);
  }
}

function preload() {
  tomato_frames.forEach((src) => {
    const im = new Image();
    im.src = src;
  });
}

function pop() {
  img.classList.remove("pop");
  void img.offsetWidth;
  img.classList.add("pop");
}

img.addEventListener("click", () => {
  if (i < tomato_frames.length - 1) {
    i += 1;
    pop();
    render();
  }
});

function renderChar() {
  char.src = char_frames[c_i];
}

hint.textContent = hintText;

preload();
// render();
