const text = [
"Mechanical Technical Office Engineer",
"Mechanical Design Engineer",
"BIM Engineer",
"HVAC Engineer",
"Plumbing Engineer",
"Fire Fighting Engineer"
];

let index = 0;

function typeEffect() {

    document.getElementById("typing").innerHTML =
        text[index];

    index++;

    if(index >= text.length){
        index = 0;
    }
}

setInterval(typeEffect,2000);

typeEffect();