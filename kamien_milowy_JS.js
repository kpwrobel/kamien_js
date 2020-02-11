/*Get https://us-central1-itfighters-movies.cloudfunctions.net/api/movie
Get https://us-central1-itfighters-movies.cloudfunctions.net/api/movie?name={title}
Get https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/{id}
Delete https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/{id}
Put https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/{id}
Post https://us-central1-itfighters-movies.cloudfunctions.net/api/movie  */

window.onload = function () {

    let filmList = document.querySelector(".ranking-table");
    let getAllFilms_URL = 'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie';

    //zmienna ma przechowywac wszystkie elementy pobrane z API
    var allFilms = [];

    /**
     * funkcja zwraca w zaleznosci od title URL do pobrania filmow; 
     * @param {string} title 
     */
    function getMovieUrl(title) {
        if (title === undefined || title === null || title === '') {
            return getAllFilms_URL
        } else {
            return getAllFilms_URL + '?name=' + title;
        }
    }

    /**
     * funkcja pobierajaca wszystkie dostepne filmy z API z koncowym wywolaniem tej funkcji
     * funkcja potrafi wyszukac wskazane w impucie filmy
     */
    function getAllFilms(title) {
        var promise = fetch(getMovieUrl(title))
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject(resp);
                }
            })
            .then(resp => {
                //console.log(resp);
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

    //getAllFilms();

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


    /**
     * funkcja sluzaca do wyswietlania tabeli na podstawie przeslanej tablicy danych
     * @param {array} parameter 
     */
    function generateTable(parameter) {
        filmList.innerHTML = '';
        console.log(parameter);
        if (parameter.length === 0) {
            filmList.innerHTML = 'Brak danych, podaj nazwe filmu i wyszukaj';
        }
        parameter.forEach(film => {
            //filmList.createElement('tr');
            // let link = document.createElement("a");
            // link.setAttribute("href",'https://us-central1-itfighters-movies.cloudfunctions.net/api/movie/' + film.id)
            let tr = document.createElement('tr');
            tr.setAttribute('filmid',film.id);
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
    };

    function search() {
        $('#searchButton').click(() => {
            let val = $('#searchInput').val();
            //alert('klik search button ' + val);
            if (val !== undefined && val !== null && val !== '') {

                getAllFilms(val);
            }

        });
        //searchInput.addEventListener('')
    }

    { }

    function showMovie(){
        $('#toggle').click(() => { $('.toggleM').toggle(); });
        $('.ranking-table').on('click', 'tr', function(){ 
            $('.toggleM').toggle(); 
            let fid = $(this).attr('filmid');
            //alert(fid);
            displayFilmInfo(fid);
        });
    };
        
        function displayFilmInfo(filmId) {
                fetch(getAllFilms_URL + "/" + filmId)
                    .then(respense => respense.json())
                    .then(result => {
                        console.log(result);
                        $('#movie-title').html(result.title);
                        $('#movie-description').html(result.description);
                        $('#movie-actors').html(result.cast.join(', '));
                    })
                    .catch(error => {
                        console.log('blad pobrania')
                    });
        };


    /**
     * funkcja inicjalizujaca aplikacje, czyli odpalajaca funkcje ladowane przy onload strony;
     */
    function __init() {
        //obluga wyswietlaniua i pobierania filmow do tabeli
        getAllFilms();
        //obsluga wyszukiwarki
        search();
        //obluga prezentacji filmu
        showMovie();
    }
    __init();

};