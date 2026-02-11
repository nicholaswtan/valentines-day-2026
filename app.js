const tomato_frames = [
  "assets/tomato-frames/tomato-1.PNG",
  "assets/tomato-frames/tomato-2.PNG",
  "assets/tomato-frames/tomato-3.PNG",
  "assets/tomato-frames/tomato-4.PNG",
  "assets/tomato-frames/tomato-5.PNG",
  "assets/tomato-frames/tomato-6.PNG",
  "assets/tomato-frames/tomato-7.PNG",
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

const chompAudio = new Audio("assets/chomp.mp3");
chompAudio.preload = "auto"; // hint to preload

function playChomp() {
  // restart immediately
  chompAudio.pause();
  chompAudio.currentTime = 0;

  // play can fail until first user gesture; here it's called from click so it's fine
  chompAudio.play().catch(() => {});
}

function render() {
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
  chompAudio.load();
}

function pop() {
  img.classList.remove("pop");
  void img.offsetWidth;
  img.classList.add("pop");
}

img.addEventListener("click", () => {
  if (i < tomato_frames.length - 1) {
    playChomp();
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
