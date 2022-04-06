function toggleLoader(end= false){
    document.getElementById("loader").classList.toggle("active");
    document.getElementById("plot").classList.toggle("active");
    if (end){
      classifier.classify(img, gotResult);
    }
}


function removeChildren(node, num){
    while (node.length >= num) {
      node[0].parentNode.removeChild(node[0]);
    }
  }


function cleanUpBars(){
    let bars = document.getElementsByClassName("bar");
    let labels = document.getElementsByClassName("label");

    //remove all previous bars if thex exist
    while (bars.length >= 3) {
        bars[0].parentNode.removeChild(bars[0]);
    }
    // remove all previous labels if the exist
    while (labels.length >= 5) {
        labels[0].parentNode.removeChild(labels[0]);
    }
}

function createBar(ischild = false){
    var newdiv = document.createElement("div");
    if (ischild){
        newdiv.style.width = `${percent}%`;
        }
    else {
        newdiv.className = "bar";
    }
    return newdiv;
}

function createlable(txt, islableconfidence = false){
    var lable = document.createElement("p");
    lable.className = "label";
    lable.innerHTML = txt;
    if (islableconfidence){
        lable.style.left = `${percent}%`;
        if (percent < 50){
            lable.style.marginLeft = "80px"
        }
    }
    return lable;
}
