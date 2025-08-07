let amigos = [];

// Adiciona um listener para a tecla "Enter" no campo de nome
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

function adicionarAmigo() {
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value.trim();

    if (!nome) {
        alert('O campo de nome não pode estar vazio! Digite um nome.');
        return;
    }

    if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado. Digite um nome diferente.');
        return;
    }

    amigos.push(nome);
    
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML += `<li>${nome} <span class="remover" onclick="removerAmigo(this)">❌</span></li>`;
    
    campoNome.value = '';
}

function removerAmigo(botao) {
    let itemParaRemover = botao.parentNode;
    let nomeParaRemover = itemParaRemover.textContent.replace('❌', '').trim();
    
    let index = amigos.indexOf(nomeParaRemover);
    if (index > -1) {
        amigos.splice(index, 1);
    }
    
    itemParaRemover.remove();
}

function sortearAmigo() {
    let resultadoDiv = document.getElementById('resultado');

    if (amigos.length === 0) {
        alert('Adicione pelo menos um amigo para o sorteio.');
        return;
    }
    
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let nomeSorteado = amigos[indiceAleatorio];

    // Remove o nome sorteado dos arrays
    amigos.splice(indiceAleatorio, 1);
    
    // Remove o nome da lista visível
    let listaAmigos = document.getElementById('listaAmigos');
    for (let item of listaAmigos.children) {
        if (item.textContent.replace('❌', '').trim() === nomeSorteado) {
            item.remove();
            break;
        }
    }
    
    // Limpa o resultado anterior e exibe o novo
    resultadoDiv.innerHTML = `<p>${nomeSorteado}</p>`;
    
    // Se a lista estiver vazia, exibe um alerta
    if (amigos.length === 0) {
        alert('Não existem mais nomes para serem sorteados.');
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}