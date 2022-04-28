
# Dokumentation   <a href="./">Zur&uuml;ck zum Bildklassifizierer</a>  <a href="https://github.com/VerrroS/ml5" id="github" target="_blank"><span class="iconify" data-icon="akar-icons:github-fill"></span></a>

## Technische Dokumentation 
F&uuml;r die Umsetzung der Aufgabe habe ich folgende Tools verwendet:

- **[ml5.js](https://ml5js.org/)**

    Ml5.js ist eine High Level API zum TensorFlow Deep Learning Model [TensorFlow.js MobileNetV2](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet). Ich habe ml5 genutz um die Kommunikation zum Modell einfach und &uuml;bersichtlich zu halten.

- **[Bootstrap](https://getbootstrap.com/)**

    Bootstrap ist eine CSS Library, die es erleichtert, Websites responsive zu gestalten. 

## Fachliche Dokumentation

### **Ansatz**
Um eine schnelle und leichtgewichtige L&ouml;sung zu erstellen, habe ich mich dazu entschieden, die Klassifikation auf 
einer statischen Webpage zu implementieren. Ich nutze dabei kein Framework, sondern schreibe nur HTML, CSS und JavaScript.
Da mir der Look und die Handhabung von Frameworks wie Plotly nicht gef&auml;llt und in diesem Falle eine Visualisierung der Ergebnisse 
mit CSS und Javascript einfach m&ouml;glich ist, habe ich mich gegen ein Framework entschieden. Mit CSS habe ich die volle 
Kontrolle &uuml;ber den Look und kann die Seite auch f&uuml;r mobile Ger&auml;te anpassen.


### **Logik**  

#### Klassifikation mit ml5

Der ml5 classifier wird beim Laden der Seite definiert und dann aufgerufen

    let classifier = ml5.imageClassifier('MobileNet');
    classifier.then(loadClassifier, loadClassifier_failed);

**loadClassifier**

    function loadClassifier(result){
        classifier = result;
    }


**loadClassifier_failed**

    function loadClassifier_failed(error) {
        alert("Classifier failed to load, please try again. " + error);
    }

Wenn ein Bild angeklick oder hochgeladen wird, wird die Funktion changeImage() mit dem Parameter url aufgerufen. Die Funktion setzt zuerst das Ladeicon auf der rechten Seite auf aktiv. Falls die Klassifikation l&auml;nger dauert, bekommt der Nutzende so Feedback, dass der Input angekommen ist. Das anf&auml;ngliche Kameraicon in der Mitte vom grauen Kasten links wird unsichtbar gestellt, da der Nutzer nun gesehen hat, an welche Stelle er ein Bild per Drag and Drop hineinziehen kann. Dann wird das Bild mit classify klassifiziert und die Ergebnisse werden in einem Promise "results" gespeichert. War das erfolgreich, wird die funktion loading_successfull aufgerufen. Diese Funktion ersetzt das Bild links mit dem ausgew&auml;hlten und erstellt die Visualisierung. Gibt es einen Fehler, wird die Funktion loading_failed aufgerufen und eine Warnung angezeigt.

**changeImage**

    function changeImage(url) {
        displayElement("toggle",loader, plot);
        displayElement("none", img_icon);
        img = document.createElement("img");
        img.src = url;
        results = classifier.classify(img);
        results.then(loading_successfull, loading_failed);
        if (results) {
            image_active.style.backgroundImage = `url(${url})`;
        } else {
            image_active.style.backgroundImage = null;
            displayElement("block", img_icon);
        }
    }

**loading_successfull**

    function loading_successfull(results) {
        results.forEach(element => {
            percent = element["confidence"] * 100;
            createBarCart(percent, element["label"]);
        });
        displayElement("block", helper_classifier);
        displayElement("toggle", loader, plot);
    }

**loading_successfull**

    function loading_failed(error) {
        alert("Classification failed, please try another image Error: " + error);
        displayElement("toggle",loader, plot);
    }

#### Visualisierung mit JS und CSS

F&uuml;r die Visualisierung der Ergebnisse habe ich die Funktion createBarCart() erstellt. Diese wird f&uuml;r jedes Ergebnis mit den Parametern percent und lable_txt aufgerufen. 

**createBarChart**

    function createBarCart(percent, lable_txt){
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

In der Funktion createBar() wird nun die L&auml;nge der Bar im style property definiert.

**createBar**

    function createBar(isChild = false){
        var newdiv = document.createElement("div");
        if (isChild){
            newdiv.style.width = `${percent}%`;
            }
        else {
            newdiv.className = "bar_parent";
        }
        return newdiv;
    }

#### Fehlerbehandlung

Der Upload wird an verschiedenen Stellen auf das passende Format gepr&uuml;ft. Bei der Verwendung des Input Buttons werden nur die Dateiformate png und jpg akzeptiert.

    <input class="mt-2" id="image_input" type='file' accept="image/png, image/jpg"/>

Beim Upload der Datei wird dann nocheinmal im JS gepr&uuml;ft ob es sich um eine Bilddatei handelt.

    if (uploaded_image.startsWith("data:image")){
        changeImage(uploaded_image);
        } else {
        alert("Please upload an image");
    }


## Resultate

### Resultate der Aufgabe
<div class="row">
<p class="col-lg-4">
Durch die Verwendung der ml5.js API und mithilfe des ml5 ImageClassification Tutorials war die Implementierung der Grundfunktionen relativ schnell gemacht. Viel Zeit in Anspruch genommen hat vor allem die Gestaltung im Bezug auf Nutzerfreundlichkeit und Responsiveness. 
Dem Resultat k&ouml;nnte man weitere Funktionen hinzuf&uuml;gen. Beispielsweise die M&ouml;glichkeit dien Anzahl der gezeigten Klassifizierungsergebnisse selbst zu bestimmen. Im Allgemeinen bin ich mit dem Resultat zufrieden. Auch auf dem Smartphone l&auml;sst es sich gut nutzen und bietet sogar die M&ouml;glichkeit, direkt ein Bild aufzunehmen und es anschlie&szlig;end Klassifizieren zu lassen. 
</p>
<img class="col-xl-3 col-lg-6" src="images/screenshot.PNG" alt="mobile screenshot">
</img>
</div>

### Resultate der Klassifizierung

Der ml5 Bildklassifizierer kann vor allem gut ausgeleuchtete Bilder mit einem klaren Objekt im Vordergrund richtig erkennen. Dabei spielt es keine Rolle, ob es sich um Fotos, Zeichnungen oder Grafiken handelt. Was nicht so gut funktioniert, sind Bilder mit &Uuml;berlagerungen oder mehrern Motiven. Auch bei Bildern, die Menschen zeigen, werden meistens falsche Ergebnisse ausgegeben. Wohingegen Tiermotive besonders gut funktionieren. Das hat sehr wahrscheinlich mit den Trainingsdaten des Modells zutun. 

## Quellen

- [ml5 ImageClassification Tutorial](https://learn.ml5js.org/#/tutorials/hello-ml5)
- [p5 Referenzen](https://p5js.org/reference)
- [Stackoverflow - Touchscreen Detection](https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript)
- [Smashingmagazine- Darg and Drop File](https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/)
