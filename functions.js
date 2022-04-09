
function displayElement(param,...args) {
    Array.from(args).forEach(element => {
        if (param == "none"){
            if (element.classList.contains("active")){
                element.classList.remove("active");
            }
        }
        else if (param == "block"){
            if (!element.classList.contains("active")){
                element.classList.add("active");
            }
        }
        else if (param == "toggle"){
            element.classList.toggle("active");
        }
    });
}


function removeChildren(node, num) {
    while (node.length >= num) {
        node[0].parentNode.removeChild(node[0]);
    }
}


function cleanUpBars() {
    let bars = document.getElementsByClassName("bar_parent");
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

function createBar(isChild = false) {
    var newdiv = document.createElement("div");
    if (isChild) {
        newdiv.style.width = `${percent}%`;
    } else {
        newdiv.className = "bar_parent";
    }
    return newdiv;
}

function createlable(txt, islableconfidence = false) {
    var lable = document.createElement("p");
    lable.className = "label";
    lable.innerHTML = txt;
    if (islableconfidence) {
        lable.style.left = `${percent}%`;
        if (percent < 50) {
            lable.style.marginLeft = "80px"
        }
    }
    return lable;
}

function loading_successfull(results) {
    results.forEach(element => {
        percent = element["confidence"] * 100;
        createBarCart(percent, element["label"]);
    });
    helper_classifier.style.display = "block";
    displayElement("toggle", loader, plot);
}

function loading_failed(error) {
    alert("Classification failed, please try another image Error: " + error);
    displayElement("toggle",loader, plot);
}


function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

function createExamples() {
    for (var i = 0; i < exampleimages.length; i++) {
        var newimage = document.createElement("div");
        newimage.style.height = '200';
        newimage.setAttribute('data-id', i);
        newimage.setAttribute('data-prediction', exampleimages[i].prediction);
        newimage.style.backgroundImage = `url(${exampleimages[i].url})`;
        if (exampleimages[i].prediction){
            document.getElementById("exampleimages_right").appendChild(newimage);
        }
        else {
            document.getElementById("exampleimages_wrong").appendChild(newimage);
        }
        newimage.addEventListener("click", function() {
            changeImage(exampleimages[this.dataset.id].url);
        });
    }
}

function createBarCart(percent, lable_txt) {
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

function loadClassifier(result){
    classifier = result;
}

function loadClassifier_failed(error) {
    alert("Classifier failed to load, please try again." + error);
}

function changeImage(url) {
    displayElement("none", img_icon);
    img = document.createElement("img");
    img.src = url;
    displayElement("toggle",loader, plot);
    results = classifier.classify(img);
    results.then(loading_successfull, loading_failed);
    if (results) {
        image_active.style.backgroundImage = `url(${url})`;
    } else {
        image_active.style.backgroundImage = null;
        displayElement("block", img_icon);
    }
}


function handleDrop(e) {
    this.classList.remove('highlight');
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt.files;
    uploadFile(files[0], true);
}


function openHelper(e) {
    key = this.dataset.key;
    helper = document.getElementById(key);
    displayElement("toggle",helper);
}


function uploadFile(file, drop) {
    let reader = new FileReader()
    if (drop) {
        reader.readAsDataURL(file);
    }

    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        //detect if file is an image, if not show error
        if (uploaded_image.startsWith("data:image")) {
            changeImage(uploaded_image);
        } else {
            alert("Please upload an image");
        }
    });
    reader.readAsDataURL(this.files[0]);
}