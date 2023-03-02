const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const minutos = document.querySelector(".minutos");
const iniciar = document.querySelector(".inicial");
const reiniciar = document.querySelector(".reiniciar");
const setRecordMinutos = document.querySelector(".set-record-minutos");
const setRecordSeconds = document.querySelector(".set-record-seconds");
const pontuacaoTotal = document.querySelector(".user-config .descricao");
const gameLogar = document.querySelector(".game-logar");
let recordMinuts = 19;
let recordSeconds = 59;
const loading = document.querySelector("#loading");
const imgEditar = document.querySelector(".img-editar");

const rank = document.querySelector(".rank-geral");
const logarCadastrar = document.querySelector(".logar-cadastrar");
const signOut = document.querySelector(".signOut");

const nameGame = document.querySelector(".name");

let pontuacao = +localStorage.getItem("pontuacao");

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

//Uma função que cria elementos
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

//Finaliza o game
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 20 || +minutos.innerHTML === 20) {
    clearInterval(this.loop);
    alert(
      `${spanPlayer.innerHTML} seu tempo foi de: ${minutos.innerHTML}:${timer.innerHTML}`
    );
    verificaNovoRecord();
    minutos.innerHTML = "00";
    timer.innerHTML = "00";

    iniciar.removeAttribute("disabled");
    iniciar.removeAttribute("id");
  }
};

//Verifica a compatibilidade das duas cartas viradas
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

//Revela as cartas toda ao click
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

//Criação de todas as cartas
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

//Embaralha as cartas quando inisia o game ou reinicia ele e mostra na tela
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });

  this.allCards = document.querySelectorAll(".grid .card");
  this.allCardsFace = document.querySelectorAll(".grid .card .face");
};

//Configuraçôes do timer
const startTimer = () => {
  this.loop = setInterval(() => {
    if (timer.innerHTML === "59") {
      timer.innerHTML = "-1";
      let minutosAtul = +minutos.innerHTML + 1;
      minutos.innerHTML = zeroTimer(minutosAtul);
    }

    let currentTime = +timer.innerHTML + 1;
    timer.innerHTML = zeroTimer(currentTime);

    if (timer.innerHTML === "00") {
      checkEndGame();
    }

    if (timer.innerHTML === "58") {
      pontuacao += 20;
      localStorage.setItem("pontuacao", pontuacao);
      atualizaPontuacao();
    }
  }, 1000);
};

// Cria ou pega o valor no localStorage
const storage = () => {
  let verificaStorage = localStorage.getItem("recordMinuts");
  if (verificaStorage === null) {
    localStorage.setItem("recordMinuts", recordMinuts);
    localStorage.setItem("recordSeconds", recordSeconds);
    localStorage.setItem("pontuacao", pontuacao);
  } else {
    recordMinuts = localStorage.getItem("recordMinuts");
    recordSeconds = localStorage.getItem("recordSeconds");

    setarRecordDom();
  }
};

// verifica se houve um record no tempo do usuário
const verificaNovoRecord = () => {
  let calcularStorageMi = localStorage.getItem("recordMinuts");
  let calcularStorageSe = localStorage.getItem("recordSeconds");

  let somarStogare = calcularStorageMi + calcularStorageSe;
  let ConcatenarTimeTela = minutos.innerHTML + timer.innerHTML;

  if (+ConcatenarTimeTela < +somarStogare) {
    localStorage.setItem("recordMinuts", minutos.innerHTML);
    localStorage.setItem("recordSeconds", timer.innerHTML);
    pontuacao += 200;
    localStorage.setItem("pontuacao", pontuacao);
    setarRecordDom();
  }
};

//Atualiza o record na tela do usuário
const setarRecordDom = () => {
  let storageMinut = localStorage.getItem("recordMinuts");
  let storageSecond = localStorage.getItem("recordSeconds");

  setRecordMinutos.innerHTML = storageMinut;
  setRecordSeconds.innerHTML = storageSecond;
};

// atualiza a pontuação do usuário
const atualizaPontuacao = () => {
  pontuacaoTotal.innerHTML = localStorage.getItem("pontuacao");
};

// Reinicia o game
const resetarGame = () => {
  allCards.forEach((item) => {
    item.classList.remove("reveal-card");
  });
  allCardsFace.forEach((item) => {
    item.classList.remove("disabled-card");
  });
  grid.innerHTML = "";
  loadGame();
};

// Adiciona o zeno no timer
const zeroTimer = (timer) => {
  if (timer <= 9) {
    return "0" + timer;
  } else {
    return timer;
  }
};

iniciar.addEventListener("click", () => {
  startTimer();
  iniciar.setAttribute("disabled", "");
  iniciar.setAttribute("id", "disabled-button");
});

reiniciar.addEventListener("click", () => {
  resetarGame();

  minutos.innerHTML = "00";
  timer.innerHTML = "00";
});

gameLogar.addEventListener("click", () => {
  window.location = "../pages/form-login.html";
});


const manipularRank = (user) => {
  showItem(rank);
  showItem(imgEditar);
  hideItem(logarCadastrar);
};

const domAposSairConta = (user) => {
  showItem(logarCadastrar);
  hideItem(rank);
  hideItem(imgEditar);
};

function setElementDom() {
  nameGame.innerHTML = localStorage.getItem("player");
  spanPlayer.innerHTML = localStorage.getItem("player");
}

// sair da conta do usuário
signOut.addEventListener("click", () => {
  firebase.auth().signOut();
  localStorage.setItem("player", "Senhor Niguem");
  let valorInitial = localStorage.getItem("nameInial");
  localStorage.setItem("player", valorInitial);
  setElementDom();
});

//Inicial funções ao carregar a tela
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  storage();
  loadGame();
  atualizaPontuacao();
  setElementDom();
};

