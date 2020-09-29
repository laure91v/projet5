(function () {
    "use strict";

const sauvegarde = JSON.parse(localStorage.getItem("orinoco_laure_meubles_0707"));
let panierId = sauvegarde.panier;
const productId = sauvegarde.id_produit_choisi;
const urlProduit = `http://localhost:3000/api/furniture/${panierId}`;


/*--------------------permet d'afficher les elements-----------------------------*/
let $total = document.createElement('div');

document.querySelector('#total').appendChild($total);



let total = 0;

function ajoutermeuble(imageUrl, name, price, quantity, indexDansPanier) {



    let $li = document.createElement('div');

    let $name = document.createElement('h2');
    $name.innerText = name;
    $li.appendChild($name);



    let $img = document.createElement('img');
    $img.src = imageUrl;
    $li.appendChild($img);

    let $price = document.createElement('p');
    $price.innerText = "Prix :" + price + "€";
    $li.appendChild($price);

    let $quantity = document.createElement('span');
    $quantity.innerText = "Quantité :" + quantity + " " + "pièces" + "\n" + "\n";
    $li.appendChild($quantity);


    let $soustotal = document.createElement('span');
    let calcul = quantity * price;
    total += calcul;
    $soustotal.innerText = "Sous-total :" + calcul + "€" + "\n" + "\n";
    $li.appendChild($soustotal);

    let $suppression = document.createElement('button');
    $suppression.innerText = "supprimer" + "\n";
    $li.appendChild($suppression);

    $suppression.addEventListener("click", function () {
        sauvegarde.panier.splice(indexDansPanier, 1)
        localStorage.setItem("orinoco_laure_meubles_0707", JSON.stringify(sauvegarde));
        document.querySelector("#panier").innerHTML = "";
        afficherListeMeubles();
    })



    document.querySelector('#panier').appendChild($li);
}

function afficherListeMeubles() {
    total = 0;
    sauvegarde.panier.forEach((element, index) => {

        ajoutermeuble(element.image, element.name, element.price, element.quantity, index);

    });
    $total.innerText = "TOTAL :" + total + "€";
}


/*----------------------------------------------------------------------*/


const orderForm = document.querySelector("#orderForm");

orderForm.addEventListener("submit", function (e) {  // on va spumettre, envoyer les infos

    e.preventDefault();


    if (sauvegarde.panier.length <= 0) {
        alert("votre panier est vide");   //--alerte si on veut aller au panier et que rien n'a été mis
        return

    }

    const lastName = document.querySelector("#name").value;//-- on recupere les valeurs données par 'lutilisateur
    const firstName = document.querySelector("#firstName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    if (isNotEmptyString(lastName) && isNotEmptyString(firstName) && isNotEmptyString(address) && isNotEmptyString(city) && isNotEmptyString(email)) {
//--on controle qu'il n'y ait pas de case non remplie
        let products = createOrderProducts();


        const objetCommande = {//-- les données sont regroupées dans objetCommande

            contact: {

                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
            },
            products: products,

        }




        ajaxpost("http://localhost:3000/api/furniture/order", objetCommande).then(function (result) {

            recuperationIdCommande(result);
        });



    } else {
        alert("remplir tous les champs");
    }

})

function isNotEmptyString(str) {  //-- on elimine le vide sur les côtés.

    return str.trim().length > 0;

}
//creation d'un tableau des produits

function createOrderProducts() {    
    let products = [];
    sauvegarde.panier.forEach((element) => {
        for (let i = 0; i < element.quantity; i++) {

            products.push(element.id)
        }

    });
    return products;
}

function recuperationIdCommande(resultatRequete) {

    const id = resultatRequete.orderId;
    sauvegarde.orderId = id;
    localStorage.setItem("orinoco_laure_meubles_0707", JSON.stringify(sauvegarde));
    window.location.href = "../pages/confirmation.html";
}






afficherListeMeubles();

})();

