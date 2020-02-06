
window.onload = function () {

    //pobranie tbody z DOM

    //storzenie 'tr' za kazdym razem gdy laduje kolejny obiekt - powinno zawierac roznych 5 komorek 'td'


    let filmList = document.querySelector(".ranking-table");
    let getAllFilms_URL = 'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie';

    //zmienna ma przechowywac wszystkie elementy pobrane z API
    let allFilms = [];

    $.get(getAllFilms_URL, parameter => {
        allFilms = parameter;
        console.log(allFilms);
        generateTable(allFilms);
    });

    function generateTable(parameter) {
        parameter.forEach(film => {
            //filmList.createElement('tr');
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.innerText = film.id;
            let td2 = document.createElement('td');
            td2.innerText = film.title;
            let td3 = document.createElement('td');
            td3.innerText = film.year;
            let td4 = document.createElement('td');
            td4.innerText = film.rate;
            let td5 = document.createElement('img');
            td5.setAttribute('src', film.imgSrc );
            //let td = document.createElement('<td>'+ film.id +'</td><td>' + film.title + '</td><td>' + film.year + '</td><td>' + film.rate + '</td>');
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            filmList.appendChild(tr);
        })
    };
    
    // /**
    //  * 
    //  * @param {Array} parameter 
    //  */
    // function getAllFilms(parameter) {
    //     if (parameter.isFetched === false) {
    //         fetch(getAllFilms).then(response => response.json())
    //         .then(response => {

    //         })
    //         .catch(error =>{
    //             console.log('Unexpected error occured: ' + error );
    //         });
    //     }
    // }

};