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


function createHtmlElement(tag, className, text){
    var element = document.createElement(tag);
    element.className = className;
    element.innerHTML = text;
    return element;
}

class HtmlElement {
    constructor(tag, className) {
        this.element = document.createElement(tag);
    }
    class (className) {
        this.element.className = className;
        return this;
    }
    appendTo(parent) {
        parent.appendChild(this.element);
        return this;
    }
    setText(text) {
        this.element.innerHTML = text;
        return this;
    }
    setStyle(style) {
        for (var key in style) {
            this.element.style[key] = style[key];
        }
        return this;
    }
    //return DOM object
    getElement() {
        return this.element;
    }
}