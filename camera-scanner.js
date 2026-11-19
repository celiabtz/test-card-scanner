/* ==========================================
   VESUBIA - CAMERA TEST
========================================== */

const openButton = document.getElementById("open-camera-button");
const captureButton = document.getElementById("capture-card-button");
const closeButton = document.getElementById("close-camera-button");

const panel = document.getElementById("camera-panel");
const video = document.getElementById("camera-video");
const canvas = document.getElementById("camera-canvas");

const result = document.getElementById("photo-result");
const capturedImage = document.getElementById("captured-image");

let cameraStream = null;


// OUVRIR LA CAMERA
async function openCamera() {

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: false
        });

        video.srcObject = cameraStream;

        panel.hidden = false;
        openButton.hidden = true;

        result.style.display = "none";

        await video.play();

    } catch (error) {

        console.error(error);

        alert("Impossible d'ouvrir la caméra. Vérifie les autorisations.");

    }

}


// FERMER LA CAMERA
function closeCamera() {

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;

    }

    video.srcObject = null;

    panel.hidden = true;
    openButton.hidden = false;

}


// CAPTURE
function capturePhoto() {

    if (!video.videoWidth || !video.videoHeight) {

        alert("La caméra n'est pas encore prête.");
        return;

    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const photo = canvas.toDataURL("image/jpeg", 0.95);

    capturedImage.src = photo;

    result.style.display = "block";

    closeCamera();

}


// EVENTS
openButton.addEventListener("click", openCamera);
captureButton.addEventListener("click", capturePhoto);
closeButton.addEventListener("click", closeCamera);

