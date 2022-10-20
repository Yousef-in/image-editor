let saturate = document.getElementById("saturate"),
  contrast = document.getElementById("contrast"),
  brightness = document.getElementById("brightness"),
  sepia = document.getElementById("sepia"),
  grayscale = document.getElementById("grayscale"),
  blur = document.getElementById("blur"),
  hueRotate = document.getElementById("hue-rotate"),
  img = document.querySelector(".image-editor .img img"),
  download = document.getElementById("download"),
  rest = document.getElementById("rest"),
  upload = document.getElementById("upload"),
  filters = document.querySelectorAll(".form-range");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = progress();

rest.onclick = () => {
  "use stric";
  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  hueRotate.value = 0;
  ctx.filter = `
  saturate(${saturate.value}%)
  contrast(${contrast.value}%)
  brightness(${brightness.value}%)
  sepia(${sepia.value}%)
  grayscale(${grayscale.value})
  blur(${blur.value}px)
  hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  progress();
};

upload.onchange = () => {
  progress();
  download.style.display = "block";
  canvas.style.display = "block";
  rest.style.display = "block";
  img.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};
filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    progress();
  });
});

download.onclick = () => {
  download.href = canvas.toDataURL();
};

function progress() {
  document.getElementById("saturate-progress").style.width = `${
    ((saturate.value + 0) / 200) * 10
  }%`;
  document.getElementById("contrast-progress").style.width = `${
    ((contrast.value + 0) / 200) * 10
  }%`;
  document.getElementById("brightness-progress").style.width = `${
    ((brightness.value + 0) / 200) * 10
  }%`;
  document.getElementById("sepia-progress").style.width = `${
    ((sepia.value + 0) / 200) * 10
  }%`;
  document.getElementById("grayscale-progress").style.width = `${
    (grayscale.value / 1) * 100
  }%`;
  document.getElementById("blur-progress").style.width = `${
    (blur.value / 10) * 100
  }%`;
  document.getElementById("hue-rotate-progress").style.width = `${
    (hueRotate.value / 350) * 100
  }%`;
  // progress numper
  document.getElementById("no-saturate").innerHTML = `${saturate.value}`;
  document.getElementById("no-contrast").innerHTML = `${contrast.value}`;
  document.getElementById("no-brightness").innerHTML = `${brightness.value}`;
  document.getElementById("no-sepia").innerHTML = `${sepia.value}`;
  document.getElementById("no-grayscale").innerHTML = `${grayscale.value}`;
  document.getElementById("no-blur").innerHTML = `${blur.value}`;
  document.getElementById("no-hue-rotate").innerHTML = `${hueRotate.value}`;
}
