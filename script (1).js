let coins = [1000, 1000];
let squads = [[], []];
let bids = [0, 0];
let time = 12;
let timer;
let current;

const positions = ["GK","RB","LB","CB","CDM","CM","CAM","RW","LW","ST"];

const players = {
  GK: [
    {n:"Yashin", r:95, e:"Legend", p:120},
    {n:"Neuer", r:92, e:"Current", p:100}
  ],
  CB: [
    {n:"Maldini", r:96, e:"Legend", p:140},
    {n:"Van Dijk", r:91, e:"Current", p:110}
  ],
  CM: [
    {n:"Xavi", r:95, e:"Legend", p:130},
    {n:"De Bruyne", r:91, e:"Current", p:115}
  ],
  ST: [
    {n:"Pele", r:98, e:"Legend", p:160},
    {n:"Haaland", r:92, e:"Current", p:130}
  ],
  RW: [
    {n:"Messi", r:98, e:"Legend", p:160},
    {n:"Salah", r:90, e:"Current", p:110}
  ],
  LW: [
    {n:"Ronaldo", r:97, e:"Legend", p:150},
    {n:"Mbappe", r:92, e:"Current", p:130}
  ]
};

function spinWheel() {
  clearInterval(timer);
  bids = [0,0];
  time = 12;

  document.getElementById("wheel").style.transform =
    `rotate(${Math.random()*720+360}deg)`;

  const pos = positions[Math.floor(Math.random()*positions.length)];
  const list = players[pos] || players["CM"];
  current = list[Math.floor(Math.random()*list.length)];

  document.getElementById("pos").innerText = "Position: " + pos;
  document.getElementById("name").innerText = current.n;
  document.getElementById("info").innerText =
    `Rating: ${current.r} | Era: ${current.e}`;
  document.getElementById("base").innerText =
    `Base Price: ${current.p}M`;

  startTimer();
}

function bid(p) {
  const val = Number(document.getElementById(p === 0 ? "b1" : "b2").value);
  if (val >= current.p && val <= coins[p]) {
    bids[p] = val;
  }
}

function startTimer() {
  document.getElementById("timer").innerText = "Time: " + time;
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = "Time: " + time;
    if (time === 0) {
      clearInterval(timer);
      finish();
    }
  },1000);
}

function finish() {
  if (bids[0] > bids[1]) win(0);
  else if (bids[1] > bids[0]) win(1);
  else document.getElementById("result").innerText = "No winner";
}

function win(p) {
  coins[p] -= bids[p];
  squads[p].push(current);
  document.getElementById("result").innerText =
    (p===0?"You":"Friend") + " bought " + current.n;

  document.getElementById("c1").innerText = coins[0];
  document.getElementById("c2").innerText = coins[1];
}