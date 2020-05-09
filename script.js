let lollipops = 0;
let lps = 0;

let upgrades = [
  { type: "friend", qty: 0, lps: 1, cost: 10, next: 0.1 },
  { type: "dog", qty: 0, lps: 5, cost: 15, next: 0.1 },
  { type: "husband", qty: 0, lps: 30, cost: 50, next: 1 },
  { type: "wife", qty: 0, lps: 30, cost: 50, next: 2 },
  { type: "child", qty: 0, lps: 10, cost: 100, next: 0.5 },
];

let bonuses = [
  { color: "blue", multiplier: 10, duration: 120, frequency: 30 },
  { color: "green", multiplier: 100, duration: 60, frequency: 60 },
  { color: "gray", multiplier: 1000, duration: 30, frequency: 120 },
];

function lick() {
  lollipops++;
  document.getElementById("red-lollipop").classList.add("fa-spin");
  drawLicks();
}

function drawLicks() {
  document.getElementById(
    "game-info-1"
  ).innerHTML = `<b>${lollipops}</b>  : lollipops licked`;
  document.getElementById(
    "game-info-1"
  ).innerHTML = `<b>${lps}</b>  : licks/second`;
}

function reset() {
  document.getElementById("red-lollipop").classlist.remove("fa-spin");
}
