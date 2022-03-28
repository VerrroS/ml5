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
  element["confidence"] = element["confidence"] * 100;
});

      var data = [{
        x: [results[2]["confidence"], results[1]["confidence"], results[0]["confidence"]],
        y: [results[2]["label"], results[1]["label"], results[0]["label"]],
        name: 'Classification',
        type: 'bar',
        hoverinfo: 'x',
        orientation: 'h'
      }]

var layout = {
       xaxis: {title: 'Confidence'},
       xaxis: { 
         range: [0, 100], 
         fixedrange: true,
         hoverformat: '.2f',
         title: 'Confidence (%)'
        },
       yaxis: {
         automargin: true,
       },
      }

    Plotly.newPlot('plot', data, layout);
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
