let fileUpload = document.getElementsByName("billede")[0];
let contenttype = document.getElementsByName("contenttype")[0];

function file() {
  const file = fileUpload.files[0];

  contenttype.value = file.type;
  console.log(file);
}

fileUpload.addEventListener("change", file);
