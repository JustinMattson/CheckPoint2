// number of lollipops licked
let lollipops = 0;
// number of lollipops licked each second
let lps = 0;
// bonus multiplier
let multiplier = 1;

var secClock = setInterval(gameClock, 1000);

let defaultUpgrades = {
  friend: { type: "friend", qty: 0, lps: 1, cost: 10, next: 0.1 },
  dog: {
    type: "dog",
    qty: 0,
    lps: 5,
    cost: 50,
    next: 0.5,
  },
  husband: {
    type: "husband",
    qty: 0,
    lps: 50,
    cost: 300,
    next: 3.0,
  },
  wife: {
    type: "wife",
    qty: 0,
    lps: 50,
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
    lps: 50,
    cost: 300,
    next: 3.0,
  },
  wife: {
    type: "wife",
    qty: 0,
    lps: 50,
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

let blueBonusTemplate = /*html*/ `
  <button id="blue-bonus" class="btn btn-button border-0">
    <img
    class="rounded-circle bonux10x"
    onclick="activateBonus10x()"
    src="img/blue-lolli.png"
    alt=""
    style="height: 80px; width: 80px;"/>
  </button>
  `;
let greenBonusTemplate = /*html*/ `
  <button id="green-bonus" class="btn btn-button border-0">
    <img
    class="rounded-circle bonux100x"
    onclick="activateBonus100x()"
    src="img/green-lolli.png"
    alt=""
    style="height: 80px; width: 80px;"
    />
  </button>
`;
let grayBonusTemplate = /*html*/ `
  <button id="blue-bonus" class="btn btn-button border-0">
    <img
    class="rounded-circle bonux1000x"
    onclick="activateBonus1000x()"
    src="img/gray-lolli.png"
    alt=""
    style="height: 80px; width: 80px;"/>
  </button>
 `;

let bonuses = [
  { color: "blue", multiplier: 10, duration: 120, frequency: 30 },
  { color: "green", multiplier: 100, duration: 60, frequency: 60 },
  { color: "gray", multiplier: 1000, duration: 30, frequency: 120 },
];

let bonusActive = false;

function randomNumberGenerator(x) {
  return Math.floor(Math.random() * x);
}

// use the number generator to get a bonusObject
function getRandomBonus() {
  let x = randomNumberGenerator(3);
  let bonusObj = bonuses[x];
  multiplier = bonusObj.multiplier;
  let color = bonusObj.color;
  return color;
}
function getRandomLocation() {
  let x = 1 + randomNumberGenerator(10);
  let location = "location-" + x;
  document.getElementById(location).innerHTML = blueBonusTemplate;
}

function giveBonus() {
  var x = document.getElementById("game-info");
  var y = 15;
  setTimeout(function () {
    x.innerText = "Play On!";
  }, 1000);
  setTimeout(function () {
    y = randomNumberGenerator(3);
    let bonusObj = bonuses[y];
    multiplier = bonusObj.multiplier;
    console.log(bonusObj);
    randomNumberGenerator(10);
    x.innerText = "Bonus Time!";
    randomNumberGenerator(3);
  }, y * 1000);
}

function gameClock() {
  if (multiplier > 0) {
    lollipops += lps * multiplier;
  }
  drawLicks();
  drawLPS();
  upgradeStatus();
}

function lick() {
  lollipops++;
  document.getElementById("red-lollipop").classList.add("fa-spin");
  document.getElementById("game-info").innerText = "";
  drawLicks();
  upgradeStatus();
  giveBonus();
}

// Enable button once cost is met
// If the cost is more than the lollipops licked, disable button
// TODO refactor
function upgradeStatus() {
  let mod1 = document.getElementById("btn-friend");
  if (upgrades.friend.cost <= lollipops) {
    mod1.classList.add("btn-danger");
    mod1.disabled = false;
  } else {
    mod1.classList.remove("btn-danger");
    document.getElementById("btn-friend").disabled = true;
  }
  let mod2 = document.getElementById("btn-dog");
  if (upgrades.dog.cost <= lollipops) {
    mod2.classList.add("btn-danger");
    mod2.disabled = false;
  } else {
    mod2.classList.remove("btn-danger");
    document.getElementById("btn-dog").disabled = true;
  }
  let mod3 = document.getElementById("btn-wife");
  if (upgrades.wife.cost <= lollipops) {
    mod3.classList.add("btn-danger");
    mod3.disabled = false;
  } else {
    mod3.classList.remove("btn-danger");
    document.getElementById("btn-wife").disabled = true;
  }
  let mod4 = document.getElementById("btn-husband");
  if (upgrades.husband.cost <= lollipops) {
    mod4.classList.add("btn-danger");
    mod4.disabled = false;
  } else {
    mod4.classList.remove("btn-danger");
    document.getElementById("btn-husband").disabled = true;
  }
  let mod5 = document.getElementById("btn-child");
  if (upgrades.child.cost <= lollipops) {
    mod5.classList.add("btn-danger");
    mod5.disabled = false;
  } else {
    mod5.classList.remove("btn-danger");
    document.getElementById("btn-child").disabled = true;
  }
}

// subtract purchase price from lollipops by upgrades.cost
// then upgradeStatus()
// TODO refactor
function purchaseUpgradeFriend() {
  let cost = 0;
  let upgradeObj = upgrades.friend;
  upgradeObj.qty++;
  upgradeObj.lps = upgradeObj.qty * defaultUpgrades.friend.lps;
  cost = upgradeObj.cost;
  lollipops -= cost;
  upgradeObj.cost = Math.ceil(
    upgradeObj.cost + upgradeObj.cost * upgradeObj.next
  );
  upgrades.friend = upgradeObj;
  addUpgradeFriend();
  upgradeStatus();
  drawPowerUps();
}
function purchaseUpgradeDog() {
  let cost = 0;
  let upgradeObj = upgrades.dog;
  upgradeObj.qty++;
  upgradeObj.lps = upgradeObj.qty * defaultUpgrades.dog.lps;
  cost = upgradeObj.cost;
  lollipops -= cost;
  upgradeObj.cost = Math.ceil(
    upgradeObj.cost + upgradeObj.cost * upgradeObj.next
  );
  upgrades.dog = upgradeObj;
  addUpgradeDog();
  upgradeStatus();
  drawPowerUps();
}
function purchaseUpgradeWife() {
  let cost = 0;
  let upgradeObj = upgrades.wife;
  upgradeObj.qty++;
  upgradeObj.lps = upgradeObj.qty * defaultUpgrades.wife.lps;
  cost = upgradeObj.cost;
  lollipops -= cost;
  upgradeObj.cost = Math.ceil(
    upgradeObj.cost + upgradeObj.cost * upgradeObj.next
  );
  upgrades.wife = upgradeObj;
  addUpgradeWife();
  upgradeStatus();
  drawPowerUps();
}
function purchaseUpgradeHusband() {
  let cost = 0;
  let upgradeObj = upgrades.husband;
  upgradeObj.qty++;
  upgradeObj.lps = upgradeObj.qty * defaultUpgrades.husband.lps;
  cost = upgradeObj.cost;
  lollipops -= cost;
  upgradeObj.cost = Math.ceil(
    upgradeObj.cost + upgradeObj.cost * upgradeObj.next
  );
  upgrades.husband = upgradeObj;
  addUpgradeHusband();
  upgradeStatus();
  drawPowerUps();
}
function purchaseUpgradeChild() {
  let cost = 0;
  let upgradeObj = upgrades.child;
  upgradeObj.qty++;
  upgradeObj.lps = upgradeObj.qty * defaultUpgrades.child.lps;
  cost = upgradeObj.cost;
  lollipops -= cost;
  upgradeObj.cost = Math.ceil(
    upgradeObj.cost + upgradeObj.cost * upgradeObj.next
  );
  upgrades.child = upgradeObj;
  addUpgradeChild();
  upgradeStatus();
  drawPowerUps();
}

// Pushes the upgrade into the active array
// TODO refactor
function addUpgradeFriend() {
  let friend = defaultUpgrades.friend;
  activeUpgrades.push(friend);
  updateLPS();
}
function addUpgradeDog() {
  let dog = defaultUpgrades.dog;
  activeUpgrades.push(dog);
  updateLPS();
}
function addUpgradeWife() {
  let wife = defaultUpgrades.wife;
  activeUpgrades.push(wife);
  updateLPS();
}
function addUpgradeHusband() {
  let husband = defaultUpgrades.husband;
  activeUpgrades.push(husband);
  updateLPS();
}
function addUpgradeChild() {
  let child = defaultUpgrades.child;
  activeUpgrades.push(child);
  updateLPS();
}

// scans the active upgrades and sums the LPS for all upgrades
function updateLPS() {
  let sum = 0;
  activeUpgrades.forEach((i) => (sum += i.lps));
  lps = sum;
  console.log(lps);
  return lps;
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
  document.getElementById(
    "cost-wife"
  ).innerText = upgrades.wife.cost.toString();
  document.getElementById("qty-wife").innerText = upgrades.wife.qty.toString();
  document.getElementById("lps-wife").innerText = upgrades.wife.lps.toString();
  document.getElementById(
    "cost-husband"
  ).innerText = upgrades.husband.cost.toString();
  document.getElementById(
    "qty-husband"
  ).innerText = upgrades.husband.qty.toString();
  document.getElementById(
    "lps-husband"
  ).innerText = upgrades.husband.lps.toString();
  document.getElementById(
    "cost-child"
  ).innerText = upgrades.child.cost.toString();
  document.getElementById(
    "qty-child"
  ).innerText = upgrades.child.qty.toString();
  document.getElementById(
    "lps-child"
  ).innerText = upgrades.child.lps.toString();
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
  // TODO learn why this does not work!
  // upgrades = defaultUpgrades
  drawLicks();
  drawLPS();
  drawPowerUps();
}

reset();
