const searchInput = document.querySelector('.searchInput');
const peliculasContainer = document.querySelector('.peliculas');
const searchForm = document.querySelector('.search-container')

const searchPeliculas = (busqueda) => {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + busqueda)
        .then(res => {
            const peliculas = res.data.results
            peliculasContainer.innerHTML = '';
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : ''

                peliculasContainer.innerHTML += `
            <div class="peliculas-descripcion"><h2>${pelicula.title}</h2>
            ${imagen}</div>
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