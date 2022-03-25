// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

var exampleimages = ['images/clouds.png', 'images/portrait.png','images/sofa.png']

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img = loadImage('images/bird.png');
}

function setup() {
  canvas = createCanvas(700, 400);
  canvas.parent("canvas");
  classifier.classify(img, gotResult);
  image(img, 0, 0);
}


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
    x: [results[0]["label"], results[1]["label"],results[2]["label"]],
    y: [results[0]["confidence"], results[1]["confidence"],results[2]["confidence"]],
    type: 'bar'
  };
  
  var trace2 = {
    x: [results[0]["label"], results[1]["label"],results[2]["label"]],
    y: [1-results[0]["confidence"], 1-results[1]["confidence"],1-results[2]["confidence"]],
    type: 'bar'
  };

    var layout = {
        barmode: 'stack',
        showlegend: false,
        height: 400,
        width: 400,
      };

    var data = [trace1, trace2];
    Plotly.newPlot('pie', data, layout);
}

function createExamples(){
    for (var i = 0; i < exampleimages.length; i++) {
        var newimage = document.createElement("div");
        newimage.style.height = '200';
        newimage.style.width = '200';
        newimage.setAttribute('data-id', i);
        newimage.style.backgroundImage = 'url("' + exampleimages[i] + '")';
        document.getElementById("exampleimages").appendChild(newimage);
        newimage.addEventListener("click", changeImage);
        //let prediction = classifier.predict(exampleimages[i], gotResults);
    }
}


function changeImage(){
    img = loadImage(exampleimages[this.dataset.id]);
    classifier.classify(img, gotResult);
    let prediction = classifier.predict(img, gotResult);
    console.log(prediction);
    image(img, 0, 0);
}

createExamples();
