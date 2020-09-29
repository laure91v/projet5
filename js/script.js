
(function () {
"use strict";


//-- affichage des infos voulues

    function ajoutermeuble(description, imageUrl, name, price, varnish, id) {

        let $li = document.createElement('li');
        $li.addEventListener('click', function () {
            let sauvegarde = JSON.parse(localStorage.getItem('orinoco_laure_meubles_0707'));
            sauvegarde.id_produit_choisi = id;

            window.localStorage.setItem("orinoco_laure_meubles_0707", JSON.stringify(sauvegarde));
            window.location.href = "pages/detail-produit.html";
        })

        let $name = document.createElement('h2');
        $name.innerText = name + " " + " - " + " " + price + "€";
        $li.appendChild($name);

        let $price = document.createElement('span');
        $li.appendChild($price);



        let $img = document.createElement('img');
        $img.src = imageUrl;
        $li.appendChild($img);



        let $text = document.createElement("p");
        $text.innerText = "cliquez sur la photo pour voir le detail";
        $li.appendChild($text);
        document.querySelector('#principalblock').appendChild($li);



    }

    function afficherListeMeubles(meubles) {
        meubles.forEach(element => {
            ajoutermeuble(element.description, element.imageUrl, element.name, element.price, element.varnish, element._id);
        });
    }

    /*---------------------------------------------------------*/
    function verifPanier() {
        let sauvegarde = localStorage.getItem('orinoco_laure_meubles_0707');
        let nbr_articles_choisis = 0;
        //si pas d'id alors je crée les deux items idpc+panier et je stringify sauvegarde
        if (!sauvegarde) {
            sauvegarde = {
                id_produit_choisi: "",
                panier: []
            }
            localStorage.setItem('orinoco_laure_meubles_0707', JSON.stringify(sauvegarde));

        } else {

            //--je dezippe, je regarde la qtté d'id du tableau panier et le mets dans insidepanier/html via nbr articleschoisis 

            const sauvegarde_dezippee = JSON.parse(sauvegarde);


            nbr_articles_choisis = sauvegarde_dezippee.panier.length;

        }
        document.querySelector("#insidePanier").innerText = nbr_articles_choisis;

    }
    verifPanier();
    /*---------------------------------------------------*/




    ajaxget("http://localhost:3000/api/furniture").then(function (result) {

        afficherListeMeubles(result);
    });
})();