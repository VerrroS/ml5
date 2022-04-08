
# Dokumentation<a href="https://github.com/VerrroS/ml5" id="github" target="_blank"><span class="iconify" data-icon="akar-icons:github-fill"></span></a>

## Technische Dokumentation 
Für die Umsetzung der Aufgabe habe ich folgende Tools verwendet:

- **[p5.js](https://p5js.org/)**

    p5.js habe ich verwendet um die Bilder zu laden und zu verarbeiten

- **[ml5.js](https://ml5js.org/)**

    ml5 habe ich verwendet um die Bilder zu verarbeiten

- **[Bootstrap](https://getbootstrap.com/)**

    Bootstrap habe ich verwendet um das User Interface zu gestalten

## Fachliche Dokumentation
### Ansatz
Um eine schnelle und leichtgewichtige Lösung zu erstellen habe ich mich dazu entschieden die Klassifikation auf 
einer statischen WebPage zu implementieren. Ich nutze dabei kein Framework sondern schreibe nur HTML, CSS und JavaScript.

**Visualisieren**

Da mir der Look und die Handhabung von Frameworks wie Plotly nicht gefällt und in diesem Falle eine visualisierung der Ergebnisse 
mit CSS und Javascript einfach möglich ist, habe ich mich gegen ein Framework entschieden. Mit Css habe ich die volle 
Kontrolle über den Look und kann die Seite auch für mobile Geräte anpassen.


### Logik   

**Klassifikation mit ml5**

Zuerst wird der ml5 Classifier mit preload geladen

    function preload() {
    let classifier = ml5.imageClassifier('MobileNet');
    }

Um p5 zu starten wird die funktion setup aufgerufen. Da ich kein Canvas nutze um das Bild anzuzeigen rufe ich die Funktion noCanvas(); darin auf

    function setup(){
    noCanvas();
    }

Wenn ein Bild angeclick oder hochgeladen wird, wird die Funktion changeImage() mit dem Parameter url aufgerufen. Die Funktion setzt zuerst das Ladeicon auf der rechten Seite auf aktiv. So bekommt der Nuetzer das Feedback, dass der Input angekommen ist. Das anfängliche Kamera Icon in der Mitte vom grauen Kasten links wird unsichtbar gestellt, da der Nutzer nun gesehen hat, an welche Stelle er ein Bild per Drak and Drop hineinziehen kann. Mit loadImage wird nun das Bild and ml5 weitergegeben. Ist es erfolgreich geladen worden wird es links angezeigt. Gibt es beim laden einen Fehler, wird eine Warnung angezeigt.

    function changeImage(url){
    toggleLoader();
    img_icon.style.display = "none";
    img = loadImage(url, () => loading_sucessful(url), () => loading_failed());
    }

**Visualisierung mit JS und CSS**

Ist die Klassifikation abgeschlossen oder ein Fehler tritt auf wird die Funktion gotResult aufgerufen. Bei einem Fehler gibt es eine Warnung mit der entsprechenden Fehlermeldung. Für die Visualisierung der Ergebnisse habe ich die Funktion createBarCart() erstellt. Diese wird für jedes Ergebnis mit den Parametern percent und lable_txt aufgerufen. 

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

In der Funktion createBar() wird nun die Länge der Bar im style property definiert.

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

**Fehlerbehandlung**

Der Upload wird an verschiedenen Stellen auf das passende Format geprüft. Bei der Verwendung des Input Buttons werden nur die Dateiformate png und jpg akzeptiert.

    <input class="mt-2" id="image_input" type='file' accept="image/png, image/jpg"/>

Beim Upload der Datei wird dann nocheinmal im JS geprüft ob es sich um eine Bilddatei handelt.

    if (uploaded_image.startsWith("data:image")){
        changeImage(uploaded_image);
        } else {
        alert("Please upload an image");
    }

### Resultate



### Quellen

- [ml5 Tutorial](https://learn.ml5js.org/#/tutorials/hello-ml5)
- [p5 Referenzen](https://p5js.org/reference)
