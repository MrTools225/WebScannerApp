const camera = document.getElementById("camera");
const ShowBtn = document.getElementById("show-camera");

async function showCamera() {
    await navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            camera.srcObject = stream;
        })
    .catch(error => {
        console.error("Erreur Acces Camera")
    })
}

ShowBtn.addEventListener("click", () => showCamera())