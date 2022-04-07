const params = new URLSearchParams(window.location.search)
let id = 0;
console.log(params)

id = params.get("id");
console.log(id);

const formatMinText = (text) => text.split("").slice(0, 350).join("") + "...";

const createMain = (title, imgUrl, popularity, overview, id, date) => {
    const divEl = document.createElement("div");
    const imgClass = document.createElement("div");
    const h3El = document.createElement("h3");
    const imgEl = document.createElement("img");
    const pPopEl = document.createElement("p");
    const pDateEl = document.createElement("p");
    const pOverEl = document.createElement("p");
    const pGenEl = document.createElement("p");
    const btnEl = document.createElement("div");
    const btnPEl = document.createElement("p");
    const palyEl = document.createElement("span");



    divEl.classList.add("card");
    pPopEl.classList.add("popularity");
    pDateEl.classList.add("date");
    pOverEl.classList.add("overview");
    pGenEl.classList.add("genre");
    btnEl.classList.add("btn");
    palyEl.classList.add("play");
    palyEl.classList.add("material-icons");
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
    btnPEl.textContent = "Play";
    palyEl.textContent = "play_arrow";

    btnEl.append(palyEl, btnPEl);
    imgClass.appendChild(imgEl);
    divEl.append(h3El, imgClass, pDateEl, pPopEl, pGenEl, pOverEl, btnEl);

    const cardWrapper = document.querySelector("main.cardWrapperMovie");
    cardWrapper.appendChild(divEl);
};

const apiKey = "652bd852a54702ac6a9aab4afa9bc98a";
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const stopVideo = ( element ) => {
	let iframe = element.querySelector( 'iframe');
	let video = element.querySelector( 'video' );
	if ( iframe ) {
		let iframeSrc = iframe.src;
		iframe.src = iframeSrc;
	}
	if ( video ) {
		video.pause();
	}
};

getMovie(url)
    .then(data => {
        createMain(
            data.title,
            data.poster_path,
            data.vote_average,
            data.overview,
            data.id,
            data.release_date
        );
        console.log(data);

        const play = document.querySelector(".btn");
        const trailerContainer = document.querySelector(".trailerContainer");
        const trailer = document.querySelector(".trailer");
        const home = document.querySelector(".logo");

        home.addEventListener("click", ()=>{
            window.location = `./index.html`;
        });

        play.addEventListener("click", ()=>{
            trailerContainer.classList.add("showTrailer");

            const bgOverlay = document.querySelector(".bgOverlay");

            bgOverlay.addEventListener("click", ()=>{
                trailerContainer.classList.remove("showTrailer");
                stopVideo(trailer);
            })
        })
    });