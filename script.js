// number of lollipops licked
let lollipops = 0;
// number of lollipops licked each second
let lps = 0;
// bonus multiplier
let multiplier = 1;

var secClock = setInterval(gameClock, 1000);
function gameClock() {
  if (multiplier > 0) {
    lollipops += lps * multiplier;
  }
  drawLicks();
  drawLPS();
  upgradeStatus();
}

let defaultArray = {
  friend: { type: "friend", qty: 0, lps: 1, cost: 10, next: 0.1 },
  dog: {
    type: "dog",
    qty: 0,
    lps: 5,
    cost: 25,
    next: 0.5,
  },
  husband: {
    type: "husband",
    qty: 0,
    lps: 30,
    cost: 300,
    next: 3.0,
  },
  wife: {
    type: "wife",
    qty: 0,
    lps: 90,
    cost: 300,
    next: 5.0,
  },
  child: {
    type: "child",
    qty: 0,
    lps: 100,
    cost: 1000,
    next: 5.0,
  },
};

let upgrades = {
  friend: {
    type: "friend",
    qty: 0,
    lps: 1,
    cost: 10,
    next: 0.1,
  },
  dog: {
    type: "dog",
    qty: 0,
    lps: 5,
    cost: 25,
    next: 0.5,
  },
  husband: {
    type: "husband",
    qty: 0,
    lps: 30,
    cost: 300,
    next: 3.0,
  },
  wife: {
    type: "wife",
    qty: 0,
    lps: 90,
    cost: 300,
    next: 5.0,
  },
  child: {
    type: "child",
    qty: 0,
    lps: 100,
    cost: 1000,
    next: 5.0,
  },
};

let activeUpgrades = [];

let bonuses = [
  { color: "blue", multiplier: 10, duration: 120, frequency: 30 },
  { color: "green", multiplier: 100, duration: 60, frequency: 60 },
  { color: "gray", multiplier: 1000, duration: 30, frequency: 120 },
];

function lick() {
  lollipops++;
  document.getElementById("red-lollipop").classList.add("fa-spin");
  document.getElementById("game-info").innerText = "";
  drawLicks();
  upgradeStatus();
}

// Enable button once cost is met
// If the cost is more than the lollipops licked, disable button
function upgradeStatus() {
  let mod = document.getElementById("btn-friend");
  if (upgrades.friend.cost <= lollipops) {
    mod.classList.add("btn-danger");
    mod.disabled = false;
  } else {
    mod.classList.remove("btn-danger");
    document.getElementById("btn-friend").disabled = true;
  }
}

// subtract purchase price from lollipops by upgrades.cost
// then upgradeStatus()
function purchaseUpgrade() {
  let cost = 0;
  let upgrade = upgrades.friend;
  cost = upgrade.cost;
  lollipops -= cost;
  upgrade.cost = Math.ceil(upgrade.cost + upgrade.cost * upgrade.next);
  //upgrades.friend.qty++;
  //upgrades.friend.lps = upgrades.friend.qty * defaultUpgrades.friend.lps;
  upgrades.friend = upgrade;
  defaultArray = defaultArray;
  addUpgrade();
  upgradeStatus();
  drawPowerUps();
}

// Pushes the upgrade into the active array
function addUpgrade() {
  let friend = defaultArray.friend;
  activeUpgrades.push(friend);
  updateLPS();
}

function sumUpgrades() {
  let sum = 0;
  let friends = activeUpgrades.filter((i) => i.type == "friend");
  upgrades.friend.qty = friends.length;
  sum = friends.length;
  console.log("sum of friends: " + friends);
}

// Updates the LPS for the items in the active array
function updateLPS() {
  let sum = 0;
  activeUpgrades.forEach((a) => (sum += a.lps));
  lps = sum;
}

function drawLicks() {
  document.getElementById("game-info-1").innerHTML = `<b>${lollipops}</br>`;
}
function drawLPS() {
  document.getElementById("game-info-2").innerHTML = `<b>${lps}</b>`;
}

function drawPowerUps() {
  document.getElementById(
    "qty-friend"
  ).innerText = upgrades.friend.qty.toString();
  document.getElementById(
    "cost-friend"
  ).innerText = upgrades.friend.cost.toString();
  document.getElementById(
    "lps-friend"
  ).innerText = upgrades.friend.lps.toString();
  document.getElementById("cost-dog").innerText = upgrades.dog.cost.toString();
  document.getElementById("qty-dog").innerText = upgrades.dog.qty.toString();
  document.getElementById("lps-dog").innerText = upgrades.dog.lps.toString();
}

function reset() {
  lollipops = 0;
  activeUpgrades.length = 0;
  lps = 0;
  document.getElementById("red-lollipop").classList.remove("fa-spin");
  document.getElementById(
    "game-info"
  ).innerHTML = `<span class="text-center" style="font-size: 20pt;">Click Lollipop to Begin!</span>`;
  document.getElementById("btn-friend").classList.add("btn-disabled");
  upgrades = defaultArray;
  drawLicks();
  drawLPS();
  drawPowerUps();
}

reset();
