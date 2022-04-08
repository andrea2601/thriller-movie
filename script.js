// FETCH DI TUTTI I FILM THRILLER
const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    console.log("data.result.id", data.results);

    for (let i = 0; i < data.results.length; i++) {
        ids[i] = data.results[i].id;
    }
    console.log("data idis", ids);

    let id = ids[Math.floor(Math.random() * ids.length)];
    const apiKey = "652bd852a54702ac6a9aab4afa9bc98a";
    const singleUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

// FETCH DEL FILM PER LA HERO
    getMoviesHero(singleUrl).then(data => {
        createHero(
            data.title,
            data.poster_path,
            data.vote_average,
            data.overview,
            data.id,
            data.release_date
        );
        console.log(data);
    });

    return data.results;
};
// FETCH DEL SINGOLO FILM PER LA HERO
const getMoviesHero = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

// FUNZIONE PER RIDURRE IL NUMERO DEI CARATTERI
const formatMinText = (text) => text.split("").slice(0, 200).join("") + "...";

// FUNZIONE PER CREARE LA LISTA DI TUTTI I FILM
const createCard = (title, imgUrl, popularity, id, date) => {

    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pDateEl = document.createElement("p");
    const divDetailEl = document.createElement("div");
    const plusEl = document.createElement("span");
    const starEL = document.createElement("span");

    divEl.classList.add("card");
    pDateEl.classList.add("date");
    divDetailEl.classList.add("detail");
    plusEl.classList.add("material-icons");
    plusEl.classList.add("plus");
    starEL.classList.add("material-icons");
    starEL.classList.add("star");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    imgEl.setAttribute("id", id);
    divEl.setAttribute("id", id);
    plusEl.setAttribute("id", id);
    starEL.setAttribute("id", id);

    h3El.textContent = title;
    pDateEl.textContent = "Release date: " + date;
    plusEl.textContent = "add";
    starEL.textContent = "star";

    divDetailEl.append(pDateEl);
    divEl.append(h3El, imgEl, plusEl, starEL, divDetailEl);

    const cardWrapper = document.querySelector(".cardWrapper");
    cardWrapper.appendChild(divEl);
};

// FUNZIONE PER CREARE LA MYLIST
const createMyList = (title, imgUrl, popularity, id, date, movieArray) => {

    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const divDetailEl = document.createElement("div");
    const pDateEl = document.createElement("p");
    const removeEL = document.createElement("span");

    divEl.classList.add("card");
    divDetailEl.classList.add("detail");
    pDateEl.classList.add("date");
    removeEL.classList.add("material-icons");
    removeEL.classList.add("remove");
    imgEl.classList.add("cardImg");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    imgEl.setAttribute("id", id);
    divEl.setAttribute("id", id);
    removeEL.setAttribute("id", id);

    h3El.textContent = title;
    pDateEl.textContent = "Release date: " + date;
    removeEL.textContent = "close";
    divDetailEl.append(pDateEl);
    divEl.append(imgEl, removeEL, h3El, divDetailEl);

    const cardWrapperList = document.querySelector(".cardWrapperList");
    cardWrapperList.appendChild(divEl);




    const delEl = (element, key) => {
        element.addEventListener("click", () => {

            let res = 0;
            for (let i = 0; i < movieArray.length; i++) {
                if (movieArray[i].id == element.id) {
                    res = i;
                    break;
                }
            }

            const stars = document.querySelectorAll(".star");
            const plus = document.querySelectorAll(".plus");
            stars[res].classList.remove("show");
            plus[res].classList.remove("hide");

            // const index = indexOf(element.id);
            // myList.splice(index, 1);

            myList = myList.filter(e => {
                console.log("e", e.id, "element", element.id);
                if (e.id != element.id) return e;
            });

            console.log("mylist", myList)
            const cardWrapperList = document.querySelector(".cardWrapperList");
            cardWrapperList.textContent = "";
            myList.map(movie => {
                createMyList(
                    movie.title,
                    movie.backdrop_path,
                    movie.popularity,
                    movie.id,
                    movie.release_date,
                    movieArray
                );

            });
            let cardList = document.querySelectorAll(".cardImg");
            console.log(cardList);
            cardList.forEach(element => {
                element.addEventListener("click", () => {
                    const imgId = element.id;
                    console.log(imgId);
                    window.location = `./movie.html?id=${imgId}`;
                })
            })
        });
    };

    const deleteEls = document.querySelectorAll(".remove");
    deleteEls.forEach((item, key) => delEl(item, key));
};

// FUNZIONE PER CREARE LA HERO
const createHero = (title, imgUrl, popularity, overview, id, date) => {
    const divEl = document.createElement("div");
    const imgClass = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pPopEl = document.createElement("p");
    const pDateEl = document.createElement("p");
    const pOverEl = document.createElement("p");
    const pGenEl = document.createElement("p");



    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");
    pOverEl.classList.add("overview");
    pGenEl.classList.add("genre");
    imgClass.classList.add("img");


    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    imgEl.setAttribute("id", id);
    divEl.setAttribute("id", id);


    h3El.textContent = title;
    pPopEl.textContent = popularity;
    pDateEl.textContent = date;
    pOverEl.textContent = formatMinText(overview);
    pGenEl.textContent = "Thriller";

    imgClass.appendChild(imgEl);
    divEl.append(h3El, imgClass, pDateEl, pPopEl, pGenEl, pOverEl);

    const cardWrapper = document.querySelector(".hero");
    console.log(cardWrapper);
    cardWrapper.appendChild(divEl);
};

const pushEL = (el) => { myList.push(el) };

let myList = [];
const main = document.querySelector("main");



let ids = [];
const apiKey = "652bd852a54702ac6a9aab4afa9bc98a";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53`;



// RICHIAMO DELLA FUNZIONE FETCH
getMovies(url).then(data => {
    const movieArray = [...data];
    movieArray.map(movie => {
        createCard(
            movie.title,
            movie.backdrop_path,
            movie.popularity,
            movie.id,
            movie.release_date
        );
    })

    const profiles = document.querySelectorAll(".profile");
    const guest = document.querySelector("#noLogin");
    let autenticator = 0;

    // SE CLICCO SU UNO DEI PROFILI VENGO AUTENTICATO
    profiles.forEach(element => {
        element.addEventListener("click", () => {
            document.querySelector(".login").classList.add("hide");
            autenticator = 1;
        })
    })
    // SE CLICCO ENTRA COME OSPITE NON VENGO AUTENTICATO
    guest.addEventListener("click", () => {
        document.querySelector(".login").classList.add("hide");
        autenticator = 0;
    })
    console.log(autenticator);

    const home = document.querySelectorAll(".logo");
    // LINK ALLA HOME PREMENDO SUL LOGO
    home.forEach(element => {
        element.addEventListener("click", () => {
            window.location = `./index.html`;
        })
    })

    // LINK ALLA PAGINA DEL FILM PREMENDO SULL'IMMAGINE DEL FILM NELLA LISTA COMPLETA
    let cards = document.querySelectorAll(".card > img");
    cards.forEach(element => {
        element.addEventListener("click", () => {
            const imgId = element.id;
            console.log(imgId);
            window.location = `./movie.html?id=${imgId}`;
        })
    });

    // MOUSE HOVER DELLE CARD PER VEDERE LA DATA DI USCITA
    let cardsEls = document.querySelectorAll(".card");
    cardsEls.forEach(element => {
        element.addEventListener("mouseover", () => {
            element.childNodes[4].classList.add("showDetail");

        })
        element.addEventListener("mouseout", () => {
            element.childNodes[4].classList.remove("showDetail");

        })
    })

    // TASTO PER AGGIUNGERE ELEMENTI ALLA MYLIST E COMPARSA DELLA STELLA DORATA
    const plus = document.querySelectorAll(".plus");
    console.log(plus);
    plus.forEach((element, key) => {
        element.addEventListener("click", () => {
            if (autenticator == 1) {

                myList.push(movieArray.find(item =>
                    item.id == element.id
                ));
                console.log(myList);

                element.classList.add("hide");

                const stars = document.querySelectorAll(".star");
                stars[key].classList.add("show");


                // CREAZIONE DELLA MYLIST
                const cardWrapperList = document.querySelector(".cardWrapperList");
                cardWrapperList.textContent = "";
                myList.map(movie => {
                    createMyList(
                        movie.title,
                        movie.backdrop_path,
                        movie.popularity,
                        movie.id,
                        movie.release_date,
                        movieArray
                    );

                })

                // LINK ALLA PAGINA DEL FILM PREMENDO SULL'IMMAGINE DEL FILM NELLA MYLIST
                let cardList = document.querySelectorAll(".cardImg");
                console.log(cardList);
                cardList.forEach(element => {
                    element.addEventListener("click", () => {
                        const imgId = element.id;
                        console.log(imgId);
                        window.location = `./movie.html?id=${imgId}`;
                    })
                })

                // MOUSE HOVER DELLE CARD PER VEDERE LA DATA DI USCITA
                let cardsListEls = document.querySelectorAll(".cardWrapperList .card");
                cardsListEls.forEach(element => {
                    element.addEventListener("mouseover", () => {
                        element.childNodes[3].classList.add("showDetail");

                    })
                    element.addEventListener("mouseout", () => {
                        element.childNodes[3].classList.remove("showDetail");

                    })
                })


            } else { alert("Devi accedere per poter aggiungere elementi alla MyList"); }
        })
    });


})

