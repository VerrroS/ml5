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
    Plotly.newPlot('pie', data, layout);
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
    img = loadImage(url, () => classifier.classify(img, gotResult));
    image_active.style.backgroundImage = `url(${url})`;
}

function upload_image(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      changeImage(uploaded_image);
 });
    reader.readAsDataURL(this.files[0]);
}

createExamples();

inmage_input.addEventListener("change", upload_image);
image_active.addEventListener("dragover", function(ev) {ev.preventDefault()});
image_active.addEventListener("drop", function(ev) {ev.preventDefault(), upload_image});

 function dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        upload_image(ev);
      }
    }
  }
