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



function numCartas() {
  //qtdCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  qtdCartas = 0;
  while (jogoIlegal()) {
    qtdCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  }

  comecarJogo();
}

numCartas();
