let player = "X";
let playerTurn;
let boxes;
window.addEventListener("load", () => {
  boxes = document.querySelectorAll(".box");
  attachBoxListeners(boxes);
  playerTurn = document.querySelector("#turn");
  playerTurn.innerHTML = `Player ${player}'s turn`;
});

function attachBoxListeners(boxes) {
  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (e.target.classList.contains("disabled")) return;

      e.target.innerHTML = player;
      player = player === "X" ? "O" : "X";

      box.classList.add("player-added");
      box.classList.add("disabled");
      playerTurn.innerHTML = `Player ${player}'s turn`;
    });
    box.addEventListener("mouseenter", (e) => {
      if (e.target.classList.contains("disabled")) return;
      e.target.innerHTML = player;
      box.classList.add("player-added");
    });
    box.addEventListener("mouseleave", (e) => {
      if (e.target.classList.contains("disabled")) return;
      e.target.innerHTML = "";
      box.classList.remove("player-added");
    });
  });
}
function resetBoard() {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("player-added");
    box.classList.remove("disabled");
  });
  player = "X";
  playerTurn.innerHTML = `Player ${player}'s turn`;
}
