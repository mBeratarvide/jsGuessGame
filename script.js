window.onload = function() {
  const maxTries = 5;
  let num = -1;

  const message = document.querySelector(".message");
  const checkBtn = document.querySelector(".buttons > .check");
  const againBtn = document.querySelector(".buttons > .again");
  let points = document.querySelector(".score");
  let maxPoints = document.querySelector(".highscore");
  let guessInput = document.querySelector(".guess");
  const reveal = document.querySelector(".number");

  setNewGame();

  const h1 = document.querySelector(".borders > .borders").firstElementChild;
  h1.setAttribute("id", "adivinaLaWea");
  h1.innerText = "JUEGO DE ADIVINAR :/";

  againBtn.addEventListener("click", () => {
    setNewGame();
    randomColor();
    questionMark();
  });

  checkBtn.addEventListener("click", () => {
    let tryNum = guessInput.value;
    evaluar(tryNum);
  });

  function evaluar(tryNum) {
    if(tryNum > num) {
      message.innerText = "📈 STONKS!";
      restarPuntaje();
    } else if(tryNum < num) {
      message.innerText = "📉 Muy bajo!";
      restarPuntaje();
    } else if(tryNum == num) {
      message.innerText = "🎉 Es el número!";
      aumentarPuntaje();
      toggleCheckBtn(true);
      guessInput.value = "";
      cuore();
    } else {
      message.innerText = "⛔️ Ingrese Numero!";
    }
  }

  function restarPuntaje() {
    let actualPoints = parseInt(points.innerText);
    if (actualPoints > 0) {
      points.innerText = actualPoints - 1;
    } else {
      message.innerText = "Perdiste 💥 era el " + num;
      toggleCheckBtn(true);
    }
  }

  function aumentarPuntaje() {
    let actualMaxPoints = parseInt(maxPoints.innerText);
    let actualPoints = parseInt(points.innerText);
    maxPoints.innerText = actualMaxPoints + actualPoints;
  }

  function toggleCheckBtn(value) {
    let oldText = checkBtn.innerText;
    checkBtn.innerText = value == false ? "CHECK!" : "OFF";
    checkBtn.disabled = value;
  }

  function setNewGame() {
    num = Math.round(Math.random()*19+1);
    console.log(num);
    message.innerText = "Adivina...";
    points.innerText = maxTries;
    toggleCheckBtn(false);
  }

  function cuore(){
    let imageTag = document.createElement("img");
    imageTag.setAttribute("src", "./img/heart.png");
    imageTag.setAttribute("alt", "heart");
    imageTag.setAttribute("style", "width:50px; height:auto");
    imageTag.setAttribute("id", "imagenCorazon");
    reveal.innerText = "";
    reveal.appendChild(imageTag);
  }

  function questionMark() {
    let imageTag = document.getElementById("imagenCorazon");
    if(imageTag) {
      reveal.removeChild(imageTag);
      reveal.innerText = "?";
    }
  }

  function randomColor() {
    let colorHexa = "";
    for(let i = 0; i < 6; i++) {
      colorHexa += (Math.round(Math.random()*15)).toString(16);
    }
    let oppositeColor_maybe = (parseInt("ffffff", 16) - parseInt(colorHexa, 16)).toString(16);
    guessInput.setAttribute("style", "color: #" + colorHexa + "; background-color: #" + oppositeColor_maybe);
  }
}
