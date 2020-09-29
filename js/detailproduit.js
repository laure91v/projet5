
(function () {
    "use strict";

    const sauvegarde = JSON.parse(localStorage.getItem("orinoco_laure_meubles_0707"));
    const productId = sauvegarde.id_produit_choisi;



    const urlProduit = `http://localhost:3000/api/furniture/${productId}`;

    let produit_;

// elements affichés sur la partie html

    function afficherDetailProduit(produit) {
        produit_ = produit;
        let $main = document.getElementById("main");
        let $varnishPrincipal = document.getElementById("varnishPrincipal");
        let $quantityPrincipal = document.getElementById("quantityPrincipal");
        let $buttonPrincipal = document.getElementById("buttonPrincipal");

        let $name = document.createElement('h2');
        $name.innerText = produit.name;
        $main.appendChild($name);


        let $img = document.createElement('img');
        $img.src = produit.imageUrl;
        $main.appendChild($img);


        let $price = document.createElement('p');
        $price.innerText = "Prix unitaire :" + produit.price + "€";
        $main.appendChild($price);

        let $description = document.createElement('span');
        $description.innerText = produit.description;
        $main.appendChild($description);


        let $varnishSelect = document.createElement('select');
        produit.varnish.forEach(function (varnish) {
            let $varnishOption = document.createElement('option');
            $varnishOption.value = varnish;
            $varnishOption.innerText = varnish;

            $varnishSelect.appendChild($varnishOption);
        })
        $varnishPrincipal.appendChild($varnishSelect);



        let $quantitySelect = document.createElement('select');
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function (number) {
            let $quantityOption = document.createElement('option');
            $quantityOption.value = number;
            $quantityOption.innerText = number;

            $quantitySelect.appendChild($quantityOption);
        })
        $quantityPrincipal.appendChild($quantitySelect);


        let $ajouterPanierSelect = document.createElement('button');
        $ajouterPanierSelect.innerText = "Ajouter au panier" + "\n";
        $buttonPrincipal.appendChild($ajouterPanierSelect);

        $main.appendChild($varnishPrincipal);
        $main.appendChild($quantityPrincipal);
        $main.appendChild($buttonPrincipal);

// agrementer le panier de ce sur quoi l'on a cliqué

        $ajouterPanierSelect.addEventListener("click", function () {
            const indexProduit = sauvegarde.panier.findIndex(element => element.id == productId)
            if (indexProduit == -1) {
                sauvegarde.panier.push({
                    id: productId,
                    name: produit_.name,
                    image: produit_.imageUrl,
                    price: produit_.price,
                    quantity: $quantitySelect.value,
                });
            } else (sauvegarde.panier[indexProduit].quantity = $quantitySelect.value);






            localStorage.setItem("orinoco_laure_meubles_0707", JSON.stringify(sauvegarde));

        });
    }



    ajaxget(urlProduit).then(function (result) {

        afficherDetailProduit(result);
    })

})();
