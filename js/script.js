const textoBusca = document.querySelector('#texto-busca');
const botaoBusca = document.querySelector('#botao-busca');
const listaFilmesEncontrados = document.querySelector('#lista-filmes-encontrados');
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
    const filmesEncontrados = await buscarDados();
    listaFilmesEncontrados.innerHTML = '';
    if (!filmesEncontrados || filmesEncontrados.length === 0) {
        listaFilmesEncontrados.innerHTML = 'Nenhum filme encontrado';
        return;
    }
        filmesEncontrados.forEach(filme => {
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
        if(!resposta.ok || filme.Response === 'False');
            throw new Error('Erro ao buscar detalhes do filme');
    }
    
    catch (erro) {
        console.error(erro);
        detalhesFilme.innerHTML = 'Erro ao carregar detalhes do filme';
    }
}

mostrarFilme();

botaoBusca.addEventListener('click', exibirResultadosBusca);
textoBusca.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        exibirResultadosBusca();
    }
})

