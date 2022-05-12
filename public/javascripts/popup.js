let popup_btn_open = document.getElementById("popup_btn");
let popup_btn_close = document.getElementById("popup_header_btn");


function open_popup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    
}

function close_popup(){
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}


popup_btn_open.addEventListener("click", open_popup);

popup_btn_close.addEventListener("click", close_popup);

