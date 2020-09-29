

function ajaxget(url) {

    return new Promise(function (resolve) {

        const xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send();
        xhr.addEventListener("load", function () {
            const result = JSON.parse(xhr.responseText);

            resolve(result);
        });
    });

}


function ajaxpost(url, data) {

    return new Promise(function (resolve) {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        xhr.addEventListener("load", function () {
            const result = JSON.parse(xhr.responseText);

            resolve(result);
        });
    });


}
