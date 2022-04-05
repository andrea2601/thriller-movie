const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
};

const createCard = (title, imgUrl, popularity, id, date) => {

    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pPopEl = document.createElement("p");
    const pDateEl = document.createElement("p");

    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    divEl.setAttribute("id", id);

    h3El.textContent = title;
    pPopEl.textContent = popularity;
    pDateEl.textContent = date;

    divEl.append(imgEl, h3El, pPopEl, pDateEl);

    const cardWrapper = document.querySelector(".cardWrapper");
    cardWrapper.appendChild(divEl);
};
const createMyList = (title, imgUrl, popularity, id, date) => {

    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pPopEl = document.createElement("p");
    const pDateEl = document.createElement("p");

    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    divEl.setAttribute("id", id);

    h3El.textContent = title;
    pPopEl.textContent = popularity;
    pDateEl.textContent = date;

    divEl.append(imgEl, h3El, pPopEl, pDateEl);

    const cardWrapperList = document.querySelector(".cardWrapperList");
    cardWrapperList.appendChild(divEl);
};

const pushEL = (el) => { myList.push(el) };

const myList = [];
const main = document.querySelector("main");

const apiKey = "652bd852a54702ac6a9aab4afa9bc98a";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53`;

getMovies(url).then(data => {
    const movieArray = [...data];
    console.log(movieArray);
    movieArray.map(movie => {
        createCard(
            movie.title,
            movie.backdrop_path,
            movie.popularity,
            movie.id,
            movie.release_date
        );
    })
    cards = document.querySelectorAll(".card");
    console.log(cards);
    cards.forEach(element => {
        element.addEventListener("click", () => {
            myList.push(movieArray.find(item =>
                item.id == element.id
            ));
            console.log(myList);
            const cardWrapperList = document.querySelector(".cardWrapperList");
            cardWrapperList.textContent = "";
            myList.map(movie => {
                createMyList(
                    movie.title,
                    movie.backdrop_path,
                    movie.popularity,
                    movie.id,
                    movie.release_date
                );
            })
        })
    });
});