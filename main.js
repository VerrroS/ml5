let classifier = ml5.imageClassifier('MobileNet');
let img;
const exampleimages = ['images/clouds.png', 'images/portrait.png', 'images/bird.png', 'images/laptop.png', 'images/salad.png', 'images/tree.png'];
const image_active = document.getElementById('image_active');
const inmage_input = document.getElementById('image_input');
const plot = document.getElementById("plot");
const helpIcon = document.getElementsByClassName("help-icon");

//set up p5 without a canvas
function setup(){
  noCanvas();
}


function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  results.forEach(element => {
  percent = element["confidence"] * 100;
  createBarCart(percent, element["label"]);
});
}


function createExamples(){
    for (var i = 0; i < exampleimages.length; i++) {
        var newimage = document.createElement("div");
        newimage.style.height = '200';
        newimage.setAttribute('data-id', i);
        newimage.style.backgroundImage = `url(${exampleimages[i]})`;
        document.getElementById("exampleimages").appendChild(newimage);
        newimage.addEventListener("click", function() { changeImage( exampleimages[this.dataset.id]); });
    }
}

function createBarCart(percent, lable_txt){
  cleanUpBars();
  bar_parent = createBar();
  lable_confidence = createlable(percent.toFixed(2) + "% Confidence", true);
  lable_txt = createlable(lable_txt);
  bar_parent.appendChild(lable_confidence);
  plot.appendChild(lable_txt); 
  bar_child = createBar(true);
  bar_parent.appendChild(bar_child);
  plot.appendChild(bar_parent);
}


function changeImage(url){
  toggleLoader();
  // hide Image icon
  document.getElementById("img_icon").style.display = "none";
  plot.getElementsByClassName("help-icon")[0].style.display = "block";
  img = loadImage(url, () => toggleLoader(true));
  image_active.style.backgroundImage = `url(${url})`, 
  () => alert ("Classification failed, please try another image");
}



createExamples();


function handleDrop(e) {
  this.classList.remove('highlight');
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  console.log(files);
  uploadFile(files[0], true);
}


function openHelper(e){
  key = this.dataset.key;
  helper = document.getElementById(key);
  helper.classList.toggle("active");
}


function uploadFile(file, drop) {
  let reader = new FileReader()
  if (drop){
    reader.readAsDataURL(file);
}

reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    //detect if file is an image, if not show error
    if (uploaded_image.startsWith("data:image")){
    changeImage(uploaded_image);
    } else {
      alert("Please upload an image");
    }
  });
  reader.readAsDataURL(this.files[0]);
}


inmage_input.addEventListener("change", uploadFile, false);
image_active.addEventListener("dragover", function(ev) {ev.preventDefault(), this.classList.add('highlight')});
image_active.addEventListener("dragleave", function(ev) {ev.preventDefault(), this.classList.remove('highlight')});
image_active.addEventListener("drop", handleDrop);
Array.from(helpIcon).forEach(element => {
  element.addEventListener("click", openHelper);
});