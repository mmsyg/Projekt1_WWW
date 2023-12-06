class Dog {
    constructor(name, image, age) {
      this.name = name;
      this.image = image;
      this.age = age;
    }
  
    generateHTML() {
      return `
        <div class="dog-tile">
          <h2>${this.name}</h2>
          <img class="dog_photo" src="${this.image}" alt="${this.name}">
          <p>Wiek: ${this.age}</p>
        </div>
      `;
    }
  }
  
  class DogsApp {
    constructor() {
      this.dogs = [];
      this.filteredDogs = [];
    }
  
    async fetchData(url) {
      try {
        const response = await fetch(url);
        const dogsData = await response.json();
        this.dogs = dogsData.map(dog => new Dog(dog.name, dog.image, dog.age));
        this.filteredDogs = [...this.dogs]; // Kopiowanie psów do filtrowanej listy
        this.renderDogs();
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    }
  
    renderDogs() {
      const dogsContainer = document.getElementById('dogs-container');
      let template = '';
      this.filteredDogs.forEach(dog => {
        template += dog.generateHTML();
      });
      dogsContainer.innerHTML = template;
      this.addDogTileListeners();
    }
  
    filterDogs(searchText) {
      this.filteredDogs = this.dogs.filter(dog => {
        return dog.name.toLowerCase().includes(searchText.toLowerCase());
      });
      this.renderDogs();
    }
  
    addDogTileListeners() {
      const dogTiles = document.querySelectorAll('.dog-tile');
      dogTiles.forEach(dogTile => {
        dogTile.addEventListener('click', () => {
          const dogName = dogTile.querySelector('h2').textContent;
          this.goToDogPage(dogName);
        });
      });
    }
  
    goToDogPage(dogName) {
      window.location.href = `dog.html?name=${dogName}`;
    }
  
    initialize() {
      this.fetchData('http://localhost:3000/dogs'); // Zmień na rzeczywisty link do Twojego pliku JSON
  
      const searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput');
        const searchText = searchInput.value.trim();
        if (searchText !== '') {
          this.filterDogs(searchText);
        } else {
          this.filteredDogs = [...this.dogs]; // Przywrócenie wszystkich psów do listy filtrowanej
          this.renderDogs();
        }
      });
  
   
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const app = new DogsApp();
    app.initialize();
  });
  