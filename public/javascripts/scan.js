// const { serializeUser } = require("passport");
// import {serializeUser} from "./passport";


let scanArea = document.getElementsByClassName("scan-border")[0];
let modal = document.getElementById('myModal');
let closeModal = document.getElementsByClassName("close")[0];
let userHelp = document.getElementById("user_help").value;
let timeout; 

function popup_timer_start() {
    if(userHelp == 1){
        if (document.getElementsByClassName("kurv_item_1")[0]) {
            timeout = setTimeout(open_popup, 3000);
        }
    }
    
    
}
function popup_timer_end() {
    clearTimeout(timeout);
    close_popup();
}

function show_scan() {
    scanArea.classList.add('scan-click');
}

function show_modal() {
    modal.style.display = "block";
    popup_timer_start();
}
function close_modal() {
    modal.style.display = "none";
    scanArea.classList.remove('scan-click');
    popup_timer_end();
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