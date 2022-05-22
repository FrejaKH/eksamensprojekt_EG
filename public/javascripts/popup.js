let popup_btn = document.getElementById("popup_btn");
let popup_btn_close = document.getElementById("popup_header_btn");
let popup = document.getElementById("popup");

function open_popup() {
    if (!popup.classList.contains("show")) {
        popup.classList.add("show");
    }
    else return;
}

function toggle_popup() {
    popup.classList.toggle("show");
}

function close_popup(){
        popup.classList.remove("show"); 
}

popup_btn.addEventListener("click", toggle_popup);
popup_btn_close.addEventListener("click", close_popup);
