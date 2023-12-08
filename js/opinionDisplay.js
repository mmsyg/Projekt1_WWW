class OpinionApp {
  constructor() {
    this.opinions = [];
    this.opinionIndex = 0;
    this.opinionTimer = null;
  }

  async fetchOpinions(url) {
    try {
      const response = await fetch(url);
      this.opinions = await response.json();
      this.displayOpinion();
      this.startOpinionRotation();
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  }

  displayOpinion() {
    const opinionsContainer = document.getElementById("opinions-container");
    const currentOpinion = this.opinions[this.opinionIndex];

    if (currentOpinion) {
      const template = `
          <div class="opinion">
          <h6>Opinie naszych bohaterów:</h6>
            <h5 >${currentOpinion.username}</h5>
            <p>"${currentOpinion.input}"</p>
          </div>
        `;
      opinionsContainer.innerHTML = template;
    }
  }

  startOpinionRotation() {
    this.opinionTimer = setInterval(() => {
      this.opinionIndex = (this.opinionIndex + 1) % this.opinions.length;
      this.displayOpinion();
    }, 5000); // Wyświetlanie co 5 sekund
  }

  initialize() {
    this.fetchOpinions("http://localhost:3000/opinions"); // Fetchowanie opinii
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new OpinionApp();
  app.initialize();
});

const opisy = document.querySelectorAll(".opis");
let currentIndex = 0;

function zmienNapis() {
  opisy.forEach((opis) => {
    opis.style.opacity = "0";
    opis.style.transition = "opacity 0.5s ease-in-out";
  });

  opisy[currentIndex].style.opacity = "1";
  currentIndex = (currentIndex + 1) % opisy.length;
}

// Wywołanie funkcji zmieniającej napis co sekundę (1000 ms)
zmienNapis();
setInterval(zmienNapis, 3000);

function navFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "mainnav") {
    x.className += " responsive";
  } else {
    x.className = "mainnav";
  }
}
