function preload() {
    classifier = ml5.imageClassifier('MobileNet');
  }
  
  
  function setup(){
    noCanvas();
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
      alert("Error: " + error);
    }
    results.forEach(element => {
    percent = element["confidence"] * 100;
    createBarCart(percent, element["label"]);
  });
  }
  