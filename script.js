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
    const plusEl = document.createElement("span");
    const starEL = document.createElement("span");

    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");
    plusEl.classList.add("material-icons");
    plusEl.classList.add("plus");
    starEL.classList.add("material-icons");
    starEL.classList.add("star");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    divEl.setAttribute("id", id);
    plusEl.setAttribute("id", id);
    starEL.setAttribute("id", id);

    h3El.textContent = title;
    pPopEl.textContent = popularity;
    pDateEl.textContent = date;
    plusEl.textContent = "add";
    starEL.textContent = "star";


    divEl.append(h3El, imgEl, plusEl, starEL, pPopEl, pDateEl);

    const cardWrapper = document.querySelector(".cardWrapper");
    cardWrapper.appendChild(divEl);
};
const createMyList = (title, imgUrl, popularity, id, date) => {

    const divEl = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pPopEl = document.createElement("p");
    const pDateEl = document.createElement("p");
    const removeEL = document.createElement("span");

    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");
    removeEL.classList.add("material-icons");
    removeEL.classList.add("remove");

    imgEl.setAttribute("src", `https://image.tmdb.org/t/p/original/${imgUrl}`);
    imgEl.setAttribute("alt", "img poster");
    divEl.setAttribute("id", id);

    h3El.textContent = title;
    pPopEl.textContent = popularity;
    pDateEl.textContent = date;
    removeEL.textContent = "close";

    divEl.append(imgEl, removeEL, h3El, pPopEl, pDateEl);

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
    cards = document.querySelectorAll(".plus");
    console.log(cards);
    cards.forEach((element,key) => {
        element.addEventListener("click", () => {
            myList.push(movieArray.find(item =>
                item.id == element.id
            ));
            console.log(myList);

            element.classList.add("hide");

            const stars = document.querySelectorAll(".star");
            stars[key].classList.add("show");
            // stars.forEach(star => );

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