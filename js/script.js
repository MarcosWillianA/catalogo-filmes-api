const textoBusca = document.querySelector('#texto-busca');
const botaoBusca = document.querySelector('#botao-busca');
const listaFilmesEncontrados = document.querySelector('#lista-filmes-encontrados');
const poster = document.querySelector('#poster');
const detalhesFilme = document.querySelector('#detalhes-filme');
const descricaoFilme = document.querySelector('#descricao-filme');
const url = `http://www.omdbapi.com/?apikey=${chave}&`;
const posterAPI = `http://img.omdbapi.com/?apikey=${chave}&`;

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
        console.log(filmesEncontrados);
        filmesEncontrados.forEach(filme => {
        const itemLista = document.createElement('li');
        const linkFilme = document.createElement('a');
        linkFilme.innerHTML = `${filme.Title} (${filme.Year})`;
        listaFilmesEncontrados.appendChild(itemLista);
        itemLista.appendChild(linkFilme);
        });
}

botaoBusca.addEventListener('click', exibirResultadosBusca);
textoBusca.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        exibirResultadosBusca();
    }
})

