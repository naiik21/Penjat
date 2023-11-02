let paraula="";
let enigme = "";
let enigmeS = "";
let lletresFallades = [];
let lletresEncertades = [];
let guanyades = 0;
let perdudes = 0;
let errors = 0;
let abecedari;
var caractersPermesos = 'ABCÇDEFGHIJLMNÑOPKRSTUVWXYZ';


function iniciarJoc() {
    lletresFallades = [];
    lletresEncertades = [];
    errors = 0;
    enigme="";
    var abecedari = '';
    document.getElementById("jocPenjat").innerHTML=" ";
    document.getElementById("abecedari").innerHTML=" ";
    var imagen = document.getElementById("imatgePenjat");
    imagen.src = "";
    document.getElementById("lletresUtilitzades").innerHTML=" ";
    
    do {
        paraula = prompt("Diguem una paraula: ");
    } while (!paraula.match(/^[A-Z]/gi) || paraula.includes(" "));
    paraula = paraula.toUpperCase();
    for (let n = 0; n < paraula.length; n++) {
        enigme += "_";
    }
    enigmeS = enigme.split("");
    document.getElementById("jocPenjat").innerHTML = enigmeS.join(" ");
    //document.write(enigmeS.join(" "));

    for (var i = 0; i < caractersPermesos.length; i++) {
        var caracter = caractersPermesos[i];
        abecedari += '<button onclick="clickLletra(\'' + caracter + '\')">' + caracter + '</button>';
    }
    document.getElementById("abecedari").innerHTML = abecedari;

    var imagen = document.getElementById("imatgePenjat");
    imagen.src = "imatges/penjat_" + errors + ".png";
}


function estadistiques() {
    localStorage.setItem("guanyades", guanyades);
    localStorage.setItem("perdudes", perdudes);
    let partidesTotal = guanyades + perdudes;
    let estats = window.open("", "_blank");
    estats.document.write('<p>Total de partides: '+ partidesTotal + 
                        '</p><br><p>Partides guayades('+ ((localStorage.getItem("guanyades")* 100) / partidesTotal).toFixed(2) + "%): " + localStorage.getItem("guanyades")+
                        '</p><br><p>Partides perdudes(' + ((localStorage.getItem("perdudes") * 100) / partidesTotal).toFixed(2) + "%): " + localStorage.getItem("perdudes") + '</p>');
}

function clickLletra(lletre) {
    abecedari="";
    if (paraula.includes(lletre)) {
        for (let i = 0; i < enigme.length; i++) {
            if (lletre == paraula.charAt(i)) {
                enigme = enigme.substring(0, i) + lletre + enigme.substring(i + 1);
                lletresEncertades.push(lletre);
            }
        }
    } else {
        errors++;
        var imagen = document.getElementById("imatgePenjat");
        imagen.src = "imatges/penjat_" + errors + ".png";
        lletresFallades.push(lletre);
        
    }

    //console.log(errors);
    enigmeS = enigme.split("");
    document.getElementById("jocPenjat").innerHTML = enigmeS.join(" ");
    document.getElementById("lletresUtilitzades").innerHTML = lletresFallades;



    for (var i = 0; i < caractersPermesos.length; i++) {
        var caracter = caractersPermesos[i];
        if(lletresFallades.includes(caracter) || lletresEncertades.includes(caracter)){
            abecedari += '<button onclick="clickLletra(\'' + caracter + '\')" disabled>' + caracter + '</button>';
        }else{
            abecedari += '<button onclick="clickLletra(\'' + caracter + '\')">' + caracter + '</button>';
        }
    }
    document.getElementById("abecedari").innerHTML = " ";
    document.getElementById("abecedari").innerHTML = abecedari;







    if (!enigme.includes("_")) {
        guanyades++;
        setTimeout(function() {alert("Enhorabona ha encertat la paraula");}, 50);
        paraula;
        enigme = "";
        enigmeS = "";
        lletresEncertades = [];
        lletresFallades = [];
        errors = 0;
        document.getElementById("abecedari").innerHTML=" ";
    }
    if (errors > 5) {
        perdudes++;
        setTimeout(function() {alert("Has perdut, no has encertat la paraula");}, 50);
        paraula;
        enigme = "";
        enigmeS = "";
        lletresEncertades = [];
        lletresFallades = [];
        errors = 0;
        document.getElementById("abecedari").innerHTML=" ";
    }
}