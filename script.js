let posicaoX = 100, posicaoY = 100, velocidade = 5;
const personagemEl = document.getElementById('p');
const gameArea = document.querySelector('.game-area');
const loadingEl = document.getElementById('loading');
let imagemPersonagem = new Image();
let imagemFundo = new Image();

function preload() {
  return new Promise((resolve, reject) => {
    let carregados = 0;

    imagemPersonagem.onload = () => {
      carregados += 1;
      if (carregados === 2) resolve();
    };
    imagemPersonagem.onerror = () => reject(new Error('Erro ao carregar personagem.png'));

    imagemFundo.onload = () => {
      carregados += 1;
      if (carregados === 2) resolve();
    };
    imagemFundo.onerror = () => reject(new Error('Erro ao carregar fundo.jpg'));

    imagemPersonagem.src = 'personagem.png';
    imagemFundo.src = 'fundo.jpg';
  });
}

function startGame() {
  personagemEl.src = imagemPersonagem.src;
  personagemEl.style.display = 'block';
  personagemEl.style.left = posicaoX + 'px';
  personagemEl.style.top = posicaoY + 'px';
  gameArea.style.backgroundImage = `url('${imagemFundo.src}')`;
  gameArea.style.backgroundSize = 'cover';
  gameArea.style.backgroundPosition = 'center';
  loadingEl.style.display = 'none';
}

function movimentacao() {
  document.addEventListener('keydown', function(event) {
    const larguraPersonagem = personagemEl.offsetWidth;
    const alturaPersonagem = personagemEl.offsetHeight;
    const limiteX = gameArea.clientWidth - larguraPersonagem;
    const limiteY = gameArea.clientHeight - alturaPersonagem;

    if (event.key === 'ArrowUp' || event.key === 'w') {
      posicaoY = Math.max(0, posicaoY - velocidade);
    } else if (event.key === 'ArrowDown' || event.key === 's') {
      posicaoY = Math.min(limiteY, posicaoY + velocidade);
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      posicaoX = Math.max(0, posicaoX - velocidade);
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
      posicaoX = Math.min(limiteX, posicaoX + velocidade);
    }

    personagemEl.style.left = posicaoX + 'px';
    personagemEl.style.top = posicaoY + 'px';
  });
}

preload()
  .then(startGame)
  .catch(error => {
    loadingEl.textContent = error.message;
  });

movimentacao();