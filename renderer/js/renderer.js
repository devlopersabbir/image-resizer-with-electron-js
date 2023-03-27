const form = document.getElementById("form");
const img = document.getElementById("img");
const outPutPath = document.getElementById("outPutPath");
const fileName = document.getElementById("fileName");
const heightInput = document.getElementById("heightInput");
const widthInput = document.getElementById("widthInput");
const hidden = document.getElementById("hidden");

// load image function
const loadImage = (e) => {
  const file = e.target.files[0];
  if (!isFileImage(file)) {
    console.log("Please select an image");
    return;
  }

  hidden.style.display = "block";
  fileName.innerText = `File:- ${file.name}`;
  const outputpath = path.join(os.homedir(), "imageresizer");
  outPutPath.innerText = `Output path:- ${outputpath}`;

  // get original image height and width dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    widthInput.value = image.width;
    heightInput.value = image.height;
  };
};

// make sure uploaded file is images
const isFileImage = (file) => {
  const expectedFileType = ["image/jpeg", "image/png", "image/gif"];

  return file && expectedFileType.includes(file["type"]);
};

img.addEventListener("change", loadImage);
