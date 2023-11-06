// Variables
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
let totalGuanyades = parseInt(localStorage.getItem('totalGuanyades')) || 0;
let totalPerdudes = parseInt(localStorage.getItem('totalPerdudes')) || 0;


// Funció que inicia el joc 
function iniciarJoc() {
    //Varaibles
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
    
    // Demanem la paraula que volem endivinar
    do {
        paraula = prompt("Diguem una paraula: ");
    } while (!paraula.match(/^[A-Z]/gi) || paraula.includes(" "));
    paraula = paraula.toUpperCase();
    for (let n = 0; n < paraula.length; n++) {
        enigme += "_";
    }
    enigmeS = enigme.split("");
    document.getElementById("jocPenjat").innerHTML = enigmeS.join(" ");

    // Creem un boton de per cada una de les lletres 
    for (var i = 0; i < caractersPermesos.length; i++) {
        var caracter = caractersPermesos[i];
        abecedari += '<button onclick="clickLletra(\'' + caracter + '\')">' + caracter + '</button>';
    }
    document.getElementById("abecedari").innerHTML = abecedari;

    // Enseñem la forma del penjat, depenent del numero d'errors
    var imagen = document.getElementById("imatgePenjat");
    imagen.src = "imatges/penjat_" + errors + ".png";
}


// Funció que ens mostra les estadistiques de les partides 
function estadistiques() {
    let partidesTotal = totalGuanyades + totalPerdudes;
    let estats = window.open("", "_blank");
    estats.document.write('<p>Total de partides: '+ partidesTotal + 
                        '</p><br><p>Partides guayades('+ ((totalGuanyades* 100) / partidesTotal).toFixed(2) + "%): " + totalGuanyades+
                        '</p><br><p>Partides perdudes(' + ((totalPerdudes * 100) / partidesTotal).toFixed(2) + "%): " + totalPerdudes + '</p>');
}


// Funció procesa la lletre que hem fet click
function clickLletra(lletre) {
    abecedari="";
    // Comprobem que la lletra estigui en la paraula
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

    // LLetres errones
    enigmeS = enigme.split("");
    document.getElementById("jocPenjat").innerHTML = enigmeS.join(" ");
    document.getElementById("lletresUtilitzades").innerHTML = lletresFallades;

    // Bloquejem les lletres ja clicades
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

    // Control de finial de joc
    if (!enigme.includes("_")) {
        totalGuanyades++;
        localStorage.setItem('totalGuanyades', totalGuanyades);
        perdudes++;
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
        totalPerdudes++;
        localStorage.setItem('totalPerdudes', totalPerdudes);
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