const textoBusca = document.querySelector('#texto-busca');
const botaoBusca = document.querySelector('#botao-busca');
const filmesEncontrados = document.querySelector('#filmes-encontrados');
const listaFilmesEncontrados = document.querySelector('#lista-filmes-encontrados');
const tituloFilme = document.querySelector('#titulo-filme');
const poster = document.querySelector('#poster');
const detalhesFilme = document.querySelector('#detalhes-filme');
const descricaoFilme = document.querySelector('#descricao-filme');
const url = `https://www.omdbapi.com/?apikey=${chave}&`;
const posterAPI = `https://img.omdbapi.com/?apikey=${chave}&`;

async function buscarDados() {
    if (!textoBusca.value.trim()) {
        return null;
    } else {
        try {
            const resposta = await fetch(`${url}s=${encodeURIComponent(textoBusca.value)}`);
            const dados = await resposta.json();
            if (!resposta.ok || !dados.Search) {
                throw new Error('Nenhum filme encontrado');
            }
            return dados.Search;
        }
        catch (erro) {
            console.error(erro);
            return null;
        }
    }
}

async function exibirResultadosBusca() {
    const resultadoBusca = await buscarDados();
    filmesEncontrados.style.display = 'block';
    tituloFilme.style.display = 'none';
    descricaoFilme.style.display = 'none';
    listaFilmesEncontrados.innerHTML = '';
    if (!resultadoBusca || resultadoBusca.length === 0) {
        listaFilmesEncontrados.innerHTML = 'Nenhum filme encontrado';
        return;
    }
        resultadoBusca.forEach(filme => {
            const itemLista = document.createElement('li');
            const linkFilme = document.createElement('a');
            linkFilme.setAttribute('href', '#');
            linkFilme.innerHTML = `${filme.Title} (${filme.Year})`;
            listaFilmesEncontrados.appendChild(itemLista);
            itemLista.appendChild(linkFilme);
            linkFilme.addEventListener('click', () => {
                mostrarFilme(filme.imdbID); // Passa o ID do filme para buscar os detalhes
            });
        });
}

async function mostrarFilme(imdbID) {
    try {
        const resposta = await fetch(`${url}i=${imdbID}`);
        const filme = await resposta.json();
        if(!resposta.ok || filme.Response === 'False') {
            throw new Error('Erro ao buscar detalhes do filme');
        }
        filmesEncontrados.style.display = 'none';
        tituloFilme.style.display = 'flex';
        descricaoFilme.style.display = 'block';
        poster.innerHTML = '';
        const imgPoster = document.createElement('img');
        imgPoster.src = filme.Poster !== 'N/A' ? filme.Poster : 'img/placeholder.jpg';
        imgPoster.style.display = 'block';
        imgPoster.style.width = '100%';
        imgPoster.style.height = '100%';
        imgPoster.style.objectFit = 'contain';
        poster.appendChild(imgPoster);
        detalhesFilme.innerHTML = '';
        descricaoFilme.innerHTML = '';
        detalhesFilme.innerHTML = `
            <h3>${filme.Title}</h3>
            <h4><i class="fa-solid fa-star"></i> ${filme.imdbRating}</h4>
            <p>${filme.Rated} ${filme.Year} ${filme.Runtime}</p>
            <span class="genero-filme">${filme.Genre}</span>
        `;
        descricaoFilme.innerHTML = `
            <h4>Trama:</h4>
            <p>${filme.Plot !== 'N/A' ? filme.Plot : 'Descrição não disponível'}</p>
            <h4>Elenco:</h4>
            <p>${filme.Actors}</p>
        `;
    }
    catch (erro) {
        console.error(erro);
        detalhesFilme.innerHTML = 'Erro ao carregar detalhes do filme'
    }
}

botaoBusca.addEventListener('click', exibirResultadosBusca);
textoBusca.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        exibirResultadosBusca();
    }
})

