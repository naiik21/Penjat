let opcio;
let guanyades=0;
let perdudes=0;
do{
    //console.clear();
console.log("1-Iniciar un joc");
console.log("2-Estadístiques");
console.log("3-Sortir");

do{
    opcio= prompt("Diguem un numero per saber que fer: ");
}while(opcio>3 || opcio<1);
console.clear();
if(opcio==1){
    iniciarJoc();
}else if (opcio == 2){
    estadistiques();
}
//console.clear();
}while(opcio != 3);




function iniciarJoc(){
    let lletresFallades=[];
    let paraula;
    let lletre;
    let enigme="";
    let enigmeS="";
    let errors=0;

    do{
        paraula= prompt("Diguem una paraula: ");
    }while(!paraula.match(/^[A-Z]/gi) || paraula.includes(" "));
    for(let n=0; n<paraula.length; n++){

        enigme += "_";
    }
    enigmeS=enigme.split("");
    console.log(enigmeS.join(" "));
    do{
        do{
            lletre= prompt("Diguem una lletre: ");
        }while(!lletre.match(/^[A-Z]/gi) || lletre.length>1 );
        console.log(lletre);
        if(paraula.includes(lletre)){
            for(let i =0; i<enigme.length;i++){
                //console.log(paraula.charAt(i));
               // console.log(i);
                if(lletre == paraula.charAt(i)){
                    enigme= enigme.substring(0, i) + lletre + enigme.substring(i+1);
                    //console.log(enigme);
                }
            }
        }else{
            lletresFallades.push(lletre);
            errors++;
            console.log(errors);
        }
        
        //console.log(errors);
        enigmeS=enigme.split("");
        console.log(lletresFallades);
        console.log(enigmeS.join(" "));
    }while(enigme.includes("_") && errors<7);
    if(!enigme.includes("_")){
        guanyades++;
    }else{
        perdudes++;
    }
    console.log("S'ha acabat el broquil");
    
}


function estadistiques(){
    console.log(guanyades);
    console.log(perdudes);
}