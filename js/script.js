const textoBusca = document.querySelector('#texto-busca');
const botaoBusca = document.querySelector('#botao-busca');
const poster = document.querySelector('#poster');
const detalhesFilme = document.querySelector('#detalhes-filme');
const descricaoFilme = document.querySelector('#descricao-filme');
const url = `http://www.omdbapi.com/?apikey=${chave}&`;
const posterAPI = `http://img.omdbapi.com/?apikey=${chave}&`;

async function buscarDados() {
    if (textoBusca.value === '') {
        alert('Por favor, digite um nome válido')
        return;
    } else {
        try {
            const resposta = await fetch(`${url}s=${encodeURIComponent(textoBusca.value)}`);
            const dados = await resposta.json();
            console.log(dados.Search[0]);
            if (!resposta.ok) {
                throw new Error('Não achou');
            }
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

botaoBusca.addEventListener('click', buscarDados);
textoBusca.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        buscarDados();
    }
})