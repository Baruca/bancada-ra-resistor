const video = document.getElementById("camera-video");
const botaoIniciar = document.getElementById("botao-iniciar-camera");
const botaoParar = document.getElementById("botao-parar-camera");
const statusCamera = document.getElementById("status-camera");

let cameraStream = null;

function atualizarBotoes(cameraAtiva) {
  botaoIniciar.disabled = cameraAtiva;
  botaoParar.disabled = !cameraAtiva;
}

function pararCamera() {
  if (cameraStream) {
    // Cada track representa uma fonte ativa, como a câmera do aparelho.
    cameraStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  cameraStream = null;
  video.srcObject = null;
  atualizarBotoes(false);
}

async function iniciarCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusCamera.textContent = "Este navegador não permite acessar a câmera.";
    return;
  }

  botaoIniciar.disabled = true;
  statusCamera.textContent = "Aguardando permissão para usar a câmera...";

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    video.srcObject = cameraStream;
    statusCamera.textContent = "Câmera iniciada com sucesso.";
    atualizarBotoes(true);
  } catch (erro) {
    pararCamera();

    if (erro.name === "NotAllowedError" || erro.name === "SecurityError") {
      statusCamera.textContent = "A permissão para usar a câmera foi negada.";
    } else if (erro.name === "NotFoundError" || erro.name === "OverconstrainedError") {
      statusCamera.textContent = "Nenhuma câmera compatível foi encontrada.";
    } else {
      statusCamera.textContent = "Ocorreu um erro inesperado ao iniciar a câmera.";
    }
  }
}

botaoIniciar.addEventListener("click", iniciarCamera);

botaoParar.addEventListener("click", function () {
  pararCamera();
  statusCamera.textContent = "A câmera foi parada.";
});

// Libera a câmera quando a página deixa de ser exibida.
window.addEventListener("pagehide", pararCamera);
