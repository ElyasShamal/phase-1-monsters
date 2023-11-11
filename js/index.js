let monsters = [];
let currentPage = 1;

function renderMonsters() {
  const monsterList = document.getElementById("monster-container");
  monsterList.innerHTML = "";

  monsters.slice(0, 50 * currentPage).forEach((monster) => {
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster");
    monsterDiv.innerHTML = `<strong>Name:</strong> ${monster.name}<br>
                            <strong>Age:</strong> ${monster.age}<br>
                            <strong>Description:</strong> ${monster.description}`;
    monsterList.appendChild(monsterDiv);
  });
}

async function loadMoreMonsters() {
  currentPage++;
  await fetchMonsters();
  renderMonsters();
}

async function loadlessMonsters() {
  currentPage--;
  await fetchMonsters();
  renderMonsters();
}
async function createMonster(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const description = document.getElementById("description").value;

  const newMonster = { name, age, description };

  await fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMonster),
  });

  monsters.push(newMonster);
  renderMonsters();
}

async function fetchMonsters() {
  const response = await fetch(
    `http://localhost:3000/monsters?page=${currentPage}`
  );
  const data = await response.json();
  monsters = monsters.concat(data);
}

window.onload = async function () {
  await fetchMonsters();
  renderMonsters();
};
