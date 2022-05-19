let scanArea = document.getElementsByClassName("scan-border")[0];
let modal = document.getElementById('myModal');
let closeModal = document.getElementsByClassName("close")[0];

function show_scan() {
    scanArea.classList.add('scan-click');
}

function show_modal() {
    modal.style.display = "block";
}
function close_modal() {
    modal.style.display = "none";
    scanArea.classList.remove('scan-click');
}

function close_modal_window(event){
    if (event.target == modal) {
        close_modal();
      }
}

document.addEventListener("click", close_modal_window);
closeModal.addEventListener("click", close_modal);
scanArea.addEventListener("mouseup", show_modal);
scanArea.addEventListener("mousedown", show_scan);