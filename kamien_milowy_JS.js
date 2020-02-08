
window.onload = function () {

    let filmList = document.querySelector(".ranking-table");
    let getAllFilms_URL = 'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie';

    //zmienna ma przechowywac wszystkie elementy pobrane z API
    var allFilms = [];


    /**
     * funkcja pobierajaca wszystkie dostepne filmy z API z koncowym wywolaniem tej funkcji
     */
    function getAllFilms() {
        var promise = fetch(getAllFilms_URL)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject(resp);
                }
            })
            .then(resp => {
                console.log(resp);
                allFilms = resp;
                generateTable(resp);
            })
            .catch(error => {
                if (error.status === 404) {
                    console.log('Unexpected error occured: ' + error);
                    alert(':((((( Api does not exist or wrong api url, please, contact your administrator!');
                } if (error.status === 500) {
                    console.log('Unexpected server error occured: ' + error);
                    alert('Service temporary unavailable, please check later !');
                    window.location.reload();
                }
                //console.log(resp);
                //return Promise.reject(resp);
            });
        return promise;
    };
    getAllFilms();

    /**
     * pierwsze cwiczeniowe pobranie zawartosci database z API
     */
    // $.get(getAllFilms_URL, parameter => {
    //     allFilms = parameter;
    //     console.log(allFilms);

    //     generateTable(allFilms);
    // });

    /* 
    pr.then(resp => {
        console.log('wywyluję then promisa po porawnej odpowiedzi serwera, dostaje respone w formacie json', resp);
        if(resp !== this.undefined){
            generateTable(JSON.parse(resp));
        }
    });
    */


    function generateTable(parameter) {
        parameter.forEach(film => {
            //filmList.createElement('tr');
            // let link = document.createElement("a");
            // link.setAttribute("href",'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/' + film.id)
            let tr = document.createElement('tr');
            tr.addEventListener('click', () => {
                fetch(getAllFilms_URL + "/" + film.id)
                    .then(respense => respense.json())
                    .then(result => {
                        // tr.setAttribute("class", "btn btn-primary");
                        tr.setAttribute("data-toggle", "collapse");
                        tr.setAttribute("href", "#collapseExample");
                        console.log(result)
                            let div1 = document.createElement('div')
                            div1.setAttribute('class', "collapse")
                            div1.setAttribute('id', "collapseExample")
                            let div2 = document.createElement('div')
                            div2.setAttribute('class', "card card-body")
                            div2.innerText = result.description;
                            div1.appendChild(div2);
                            tr.appendChild(div1);
                    })
                    .catch(error => {
                        console.log('blad pobrania')
                    });
            })
            let td1 = document.createElement('td');
            td1.innerText = film.id;
            // td1.setAttribute('title', 'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/' + film.id);

            let td2 = document.createElement('td');
            td2.innerText = film.title;
            let td3 = document.createElement('td');
            td3.innerText = film.year;
            let td4 = document.createElement('td');
            td4.innerText = film.rate;
            let td5 = document.createElement('img');

            fetch(film.imgSrc)
                .then(resp => {
                    console.log
                    if (resp.ok) {
                        td5.setAttribute('src', film.imgSrc);
                    } else {
                        td5.setAttribute('src', 'https://images.sk-static.com/images/media/img/col3/20170622-214227-141571.jpg')
                        //console.log('wrong response', resp);
                    }
                })
                .catch(error => { //5xx || 4xx ???
                    console.log('ERROR', error);
                    if (error.status === 404) {
                        console.log(404);
                    }
                });

            //let td = document.createElement('<td>'+ film.id +'</td><td>' + film.title + '</td><td>' + film.year + '</td><td>' + film.rate + '</td>');
            tr.appendChild(td1);
        
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            // link.appendChild(tr);
            filmList.appendChild(tr);
        });
        //checkDescription();
    };


    // function checkDescription (ccc) {
    //     document.querySelector('tr').addEventListener('click', function(){
    //         ccc.setAttribute('onmouseover', () => {

    //         });
    //     });
    // }; 


};