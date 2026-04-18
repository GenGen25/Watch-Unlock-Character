const characters = [
  {
    name: "Default Character",
    status: "Default",
    img: "TemplateCharacter-x6.png",
    collected: true
  },
  {
    name: "Luffy",
    status: "Collected",
    img: "LuffyCharacter-x6.png",
    collected: true
  },
  {
    name: "Denji",
    status: "Collected",
    img: "DenjiCharacter-6x.png",
    collected: true
  },
  {
    name: "Gon",
    status: "Collected",
    img: "GonCharacter-6x.png",
    collected: true
  },
  {
    name: "Lain",
    status: "Collected",
    img: "LainCharacter-x6.png",
    collected: true
  }
];

let currentIndex = 0;

const selectedName = document.getElementById("selectedName");
const selectedStatus = document.getElementById("selectedStatus");
const selectedImage = document.getElementById("selectedImage");
const thumbnailRow = document.getElementById("thumbnailRow");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function wrapIndex(index) {
  if (index < 0) {
    return characters.length - 1;
  }

  if (index >= characters.length) {
    return 0;
  }

  return index;
}

function updateDisplay() {
  const character = characters[currentIndex];

  selectedName.textContent = character.name;
  selectedStatus.textContent = character.status;
  selectedImage.src = character.img;
  selectedImage.alt = `${character.name} character`;

  document.querySelectorAll(".thumbnail").forEach((button, index) => {
    button.classList.toggle("is-active", index === currentIndex);
    button.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });
}

function selectCharacter(index) {
  currentIndex = wrapIndex(index);
  updateDisplay();
}

function buildThumbnails() {
  thumbnailRow.innerHTML = "";

  characters.forEach((character, index) => {
    const button = document.createElement("button");
    button.className = "thumbnail";
    button.type = "button";
    button.setAttribute("aria-label", `Select ${character.name}`);

    const image = document.createElement("img");
    image.src = character.img;
    image.alt = "";

    const label = document.createElement("span");
    label.textContent = character.name.replace(" Character", "");

    button.append(image, label);
    button.addEventListener("click", () => selectCharacter(index));
    thumbnailRow.appendChild(button);
  });
}

rightBtn.addEventListener("click", () => selectCharacter(currentIndex + 1));
leftBtn.addEventListener("click", () => selectCharacter(currentIndex - 1));

buildThumbnails();
updateDisplay();
