const camera = document.getElementById("camera");
const showBtn = document.getElementById("show-camera");
async function showCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        camera.srcObject = stream;
    } catch (error) {
        console.error("Erreur Accès Camera", error);
    }
}
ShowBtn.addEventListener("click", () => show-camera());
