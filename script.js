let qtdCartas;
let tipos = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot"
];

let baralho = [];
let primeiraCarta, segundaCarta;
let acertos = 0;
let jogadas = 0;
let tempo = 0;
let idTimer;

function jogoIlegal() {
  if (
    isNaN(qtdCartas) ||
    qtdCartas < 4 ||
    qtdCartas > 14 ||
    qtdCartas % 2 !== 0
  ) {
    return true;
  }
  return false;
}

function random() {
  return Math.random() - 0.5;
}

function desvirarCarta(carta) {
  if (idTimer === undefined) {
    idTimer = setInterval(timer, 1000);
  }

  if (carta.classList.contains("virada")) {
    return;
  }

  if (primeiraCarta !== undefined && segundaCarta !== undefined) {
    return;
  }
  carta.classList.add("virada");
  jogadas++;
  if (primeiraCarta === undefined) {
    primeiraCarta = carta;
  } else {
    if (segundaCarta === undefined) {
      segundaCarta = carta;

      if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
        //CARTAS IGUAIS
        resetarCartas();
        acertos += 2;
        verificarFim();
      } else {
        //CARTAS DIFERENTES
        setTimeout(virarCartas, 1000);
      }
    }
  }
}
function encerrar() {
  alert(`Fim do jogo com ${jogadas} jogadas em ${tempo} s`);
  const resposta = confirm("Você quer jogar de novo?");
  if (resposta === true) {
    window.location.reload();
  } else {
    console.log("😥");
  }
}

function verificarFim() {
  if (acertos === baralho.length) {
    setTimeout(encerrar, 1200);
    clearInterval(idTimer);
  } else {
    console.log("TA NO JOGO");
  }
}

function resetarCartas() {
  primeiraCarta = undefined;
  segundaCarta = undefined;
}

function virarCartas() {
  primeiraCarta.classList.remove("virada");
  segundaCarta.classList.remove("virada");
  resetarCartas();
}

function renderizarBaralho() {
  let tabuleiro = document.querySelector(".boardgame");

  for (let i = 0; i < baralho.length; i++) {
    let cartaTemplate = `
        <li class="carta virada" onClick="desvirarCarta(this)">
            <div class='front-face face'>
                <img src='imagens/front.png'>
            </div>
            <div class='back-face face'>
                <img src='imagens/${baralho[i]}.gif'>
            </div>
        </li>
    `;
    tabuleiro.innerHTML += cartaTemplate;
  }

  setTimeout(desvirarTodasCartas, 1000);
}

function desvirarTodasCartas() {
  const cartas = document.querySelectorAll(".virada");

  for (let i = 0; i < cartas.length; i++) {
    cartas[i].classList.remove("virada");
  }
}

function comecarJogo() {
  //qtdCartas = 6 cartas

  for (let i = 0; i < qtdCartas / 2; i++) {
    let carta = tipos[i];
    baralho.push(carta);
    baralho.push(carta);
  }
  baralho.sort(random);
  renderizarBaralho();
}

function timer() {
  document.querySelector(".timer").classList.add("show-timer");
  tempo++;
  document.querySelector(".timer").innerHTML = tempo;
}

function numCartas() {
  //qtdCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  qtdCartas = 0;
  while (jogoIlegal()) {
    qtdCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  }

  comecarJogo();
}

numCartas();
