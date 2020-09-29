(function () {
    "use strict";

const sauvegarde = JSON.parse(localStorage.getItem("orinoco_laure_meubles_0707"));



let orderId = sauvegarde.orderId;//on recupere l'id de la commande qui est dans sauvegarde

// on affiche l'id de la commande
const $idContent = document.querySelector("h2 >span");
$idContent.innerText = orderId;

//on vide le panier 
sauvegarde.panier = [];



localStorage.setItem("orinoco_laure_meubles_0707", JSON.stringify(sauvegarde));





})();
