const searchInput = document.querySelector('.searchInput');
const peliculasContainer = document.querySelector('.peliculas');
const searchForm = document.querySelector('.search-container');

const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
const getMovie = id =>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`)
    .then(res=>{
        const pelicula =res.data;
        const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : ''
        peliculasContainer.innerHTML =`
        <div class="peliculas-descripcion"><h2>${pelicula.title}</h2>
        ${imagen}</div>
        <p>${pelicula.overview}</p>
        `
    })
}

{axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1')
        .then(res => {
            const peliculas = res.data.results
            peliculasContainer.innerHTML = '';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : ''
            peliculasContainer.innerHTML += `
            <div class="peliculas-descripcion"><h2>${pelicula.title}</h2>
            ${imagen}
            <button onclick="getMovie(${pelicula.id})" class="VerDemo">Descripción</button>
            </div>
            `
            });
        })
}

const searchPeliculas = (busqueda) => {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + busqueda)
        .then(res => {
            const peliculas = res.data.results
            peliculasContainer.innerHTML = '';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : ''

                peliculasContainer.innerHTML += `
            <div class="peliculas-descripcion"><h2>${pelicula.title}</h2>
            ${imagen}
            
            <button onclick="getMovie(${pelicula.id})" class="VerDemo">Descripción</button>
            </div>
            
            `
            });
        })
}
searchForm.addEventListener('submit', event => event.preventDefault())
const onClickSearchPelicula = () => {
    const busqueda = searchInput.value;
    searchPeliculas(busqueda)
}
searchInput.addEventListener('keyup', event => {
    if (event.key == 'Enter') {
        event.preventDefault();
        const busqueda = event.target.value
        searchPeliculas(busqueda)
    }
})
