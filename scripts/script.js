const video = document.getElementById("video-resistor");
const botao = document.getElementById("botao-video");

botao.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    botao.textContent = "Pausar vídeo";
  } else {
    video.pause();
    botao.textContent = "Reproduzir vídeo";
  }
});