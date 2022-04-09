
let img;
const exampleimages = [
  {url: 'images/rabbit.jpg', prediction: true},
  {url: 'images/violin.png', prediction: true},
  {url: 'images/figma_mockup.png', prediction: true},
  {url: 'images/salad.png', prediction: false},
  {url: 'images/handshake.jpg', prediction: false},
  {url: 'images/clouds.png', prediction: false}
  ];

const image_active = document.getElementById('image_active');
const inmage_input = document.getElementById('image_input');
const plot = document.getElementById("plot");
const helpIcon = document.getElementsByClassName("help-icon");
const img_icon = document.getElementById("img_icon");
const intro = document.getElementById("intro");
const helper_classifier = plot.getElementsByClassName("help-icon")[0];
const helper_examples = plot.getElementsByClassName("help-icon")[0];
let classifier = ml5.imageClassifier('MobileNet');

classifier.then(loadClassifier, loadClassifier_failed);

createExamples();


inmage_input.addEventListener("change", uploadFile, false);
image_active.addEventListener("dragover", function(ev) {ev.preventDefault(), this.classList.add('highlight')});
image_active.addEventListener("dragleave", function(ev) {ev.preventDefault(), this.classList.remove('highlight')});
image_active.addEventListener("drop", handleDrop);
Array.from(helpIcon).forEach(element => {
  if (isTouchDevice()){
    element.addEventListener("click", openHelper)
  }
  else{
    element.addEventListener("mouseover", openHelper),
    element.addEventListener("mouseout", openHelper)
  }
});