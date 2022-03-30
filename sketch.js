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
        newimage.style.width = '200';
        newimage.setAttribute('data-id', i);
        newimage.style.backgroundImage = `url(${exampleimages[i]})`;
        document.getElementById("exampleimages").appendChild(newimage);
        newimage.addEventListener("click", function() { changeImage( exampleimages[this.dataset.id]); });
        //let prediction = classifier.predict(exampleimages[i], gotResults);
    }
}


function createBarCart(percent, lable_txt){

    const plot = document.getElementById("plot");
    //remove all previous bars if thex exist
    let bars = document.getElementsByClassName("bar");
    removeChildren(bars, 3)
    // remove all previous labels if the exist
    let labels = document.getElementsByClassName("label");
    removeChildren(labels, 5)

    var newdiv = new HtmlElement('div').class('bar').appendTo(plot);
    text = percent.toFixed(2) + "% Confidence";
    var newNum = new HtmlElement('div').class('label').setText(text).setStyle({left: `${percent}%` }).appendTo(newdiv.getElement());;
    if (percent < 50){
      newNum.setStyle({marginleft: '80px'});
    }
    //create labels
    var lable = new HtmlElement('p').class('label').setText(lable_txt).appendTo(plot);
    //create new bar
    var newPercentage = HtmlElement('div').setStyle({width: `${percent}%`}).appendTo(newdiv);

}

function changeImage(url){
  toggleLoader();
    // hide Image icon
    document.getElementById("img_icon").style.display = "none";
    img = loadImage(url, () => toggleLoader(true));
    image_active.style.backgroundImage = `url(${url})`, 
    () => alert ("Classification failed, please try another image");
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
