const alvoResistor = document.getElementById("alvo-resistor-video");
const videoResistor = document.getElementById("video-resistor-ra");
const botaoReproduzir = document.getElementById("botao-reproduzir-ra");
const statusVideo = document.getElementById("status-video");

let alvoVisivel = false;

alvoResistor.addEventListener("targetFound", function () {
  alvoVisivel = true;
  botaoReproduzir.hidden = false;
  statusVideo.textContent = "Imagem reconhecida. Toque para reproduzir o vídeo.";
});

alvoResistor.addEventListener("targetLost", function () {
  alvoVisivel = false;
  videoResistor.pause();
  botaoReproduzir.hidden = true;
  botaoReproduzir.textContent = "Reproduzir vídeo";
  statusVideo.textContent = "Imagem perdida. Aponte novamente para o resistor.";
});

botaoReproduzir.addEventListener("click", function () {
  if (!alvoVisivel) {
    return;
  }

  if (videoResistor.paused) {
    // Navegadores móveis permitem a reprodução com som após o clique do usuário.
    videoResistor.play()
      .then(function () {
        botaoReproduzir.textContent = "Pausar vídeo";
      })
      .catch(function () {
        botaoReproduzir.textContent = "Reproduzir vídeo";
        statusVideo.textContent = "Não foi possível iniciar o vídeo. Toque novamente.";
      });
  } else {
    videoResistor.pause();
    botaoReproduzir.textContent = "Reproduzir vídeo";
  }
});

videoResistor.addEventListener("ended", function () {
  botaoReproduzir.textContent = "Reproduzir vídeo";
  videoResistor.currentTime = 0;
});

// Libera o arquivo de vídeo quando o usuário deixa a página.
window.addEventListener("pagehide", function () {
  videoResistor.pause();
  videoResistor.removeAttribute("src");
  videoResistor.load();
});
