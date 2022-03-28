// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

var exampleimages = ['images/clouds.png', 'images/portrait.png', 'images/bird.png', 'images/laptop.png', 'images/salad.png', 'images/tree.png'];
classifier = ml5.imageClassifier('MobileNet');

const image_active = document.getElementById('image_active');
const inmage_input = document.getElementById('image_input');

function setup(){
  noCanvas();
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
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
        //let prediction = classifier.predict(exampleimages[i], gotResults);
    }
}

function createBarCart(percent, lable_txt){
    //remove all previous bars if thex exist
    let bars = document.getElementsByClassName("bar");
    while (bars.length >= 3) {
        bars[0].parentNode.removeChild(bars[0]);
    }
    // remove all previous labels if the exist
    let labels = document.getElementsByClassName("label");
    while (labels.length >= 5) {
        labels[0].parentNode.removeChild(labels[0]);
    }
    var newdiv = document.createElement("div");
    newdiv.className = "bar";
    var newNum = document.createElement("p");
    newNum.className = "label";
    newNum.innerHTML = percent.toFixed(2) + "% Confidence";
    newNum.style.left = `${percent}%`;
    if (percent < 50){
      newNum.style.marginLeft = "80px"
    }
    newdiv.appendChild(newNum);
    //create labels
    var lable = document.createElement("p");
    lable.innerHTML = lable_txt;
    lable.classList.add("label");
    document.getElementById("plot").appendChild(lable);
    //create new bar
    var newPercentage = document.createElement("div");
    newPercentage.style.width = `${percent}%`;
    newdiv.appendChild(newPercentage);
    document.getElementById("plot").appendChild(newdiv);
}

function changeImage(url){
    startLoader();
    // hide Image icon
    document.getElementById("img_icon").style.display = "none";
    img = loadImage(url, () => endLoader());
    image_active.style.backgroundImage = `url(${url})`;
}

function startLoader(){
    document.getElementById("loader").style.display = "block";
    document.getElementById("plot").style.display = "none";
}

function endLoader(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("plot").style.display = "block";
    classifier.classify(img, gotResult);
}

createExamples();

inmage_input.addEventListener("change", uploadFile, false);
image_active.addEventListener("dragover", function(ev) {ev.preventDefault(), this.classList.add('highlight')});
image_active.addEventListener("dragleave", function(ev) {ev.preventDefault(), this.classList.remove('highlight')});
image_active.addEventListener("drop", handleDrop);

function handleDrop(e) {
  this.classList.remove('highlight');
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  console.log(files);
  uploadFile(files[0], true);
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
