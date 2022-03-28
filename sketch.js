// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

var exampleimages = ['images/clouds.png', 'images/portrait.png', 'images/bird.png', 'images/laptop.png', 'images/salad.png', 'images/tree.png'];
classifier = ml5.imageClassifier('MobileNet');

const image_active = document.getElementById('image_active');
const inmage_input = document.getElementById('image_input');

function setup(){}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    //createDiv(`Label: ${results[0].label}`);
    //createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
  
  var trace1 = {
    x: [results[2]["confidence"], results[1]["confidence"], results[0]["confidence"]],
    y: [results[2]["label"], results[1]["label"], results[0]["label"]],
    orientation: 'h',
    marker: {
      color: 'rgba(55,128,191,0.6)',
      width: 1
    },
    type: 'bar'
  };
  
  var trace2 = {
    x: [1-results[2]["confidence"], 1-results[1]["confidence"], 1-results[0]["confidence"]],
    y: [results[2]["label"], results[1]["label"], results[0]["label"]],
    orientation: 'h',
    type: 'bar',
    marker: {
      color: 'rgba(255,153,51,0.6)',
      width: 1
    }
  };

    var layout = {
        barmode: 'stack',
        showlegend: false,
        height: 400,
        width: 400,
      };

    var data = [trace1, trace2];
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
    console.log(uploaded_image);
    changeImage(uploaded_image);
  });
  reader.readAsDataURL(this.files[0]);
  }
