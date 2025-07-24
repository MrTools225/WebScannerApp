const camera = document.getElementById("camera");
const showBtn = document.getElementById("showBtn");


async function showBtn() {
    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            camera.srcObject = stream;
        })
        .catch(error => {
            console.error("there is", error)
        })
}

showBtn.addEventListener("click"), () => showBtn();