class Dog {
  constructor(name, image, age) {
    this.name = name;
    this.image = image;
    this.age = age;
  }

  // Method to generate HTML for displaying dog information
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
    this.dogs = []; // Array to store dog data fetched from the server
    this.filteredDogs = []; // Array to store filtered dogs
  }

  // Method to fetch dog data from the server using provided URL
  async fetchData(url) {
    try {
      const response = await fetch(url);
      const dogsData = await response.json();
      // Mapping the received dog data to Dog objects and storing them
      this.dogs = dogsData.map((dog) => new Dog(dog.name, dog.image, dog.age));
      this.filteredDogs = [...this.dogs]; // Copying dogs to the filtered list
      this.renderDogs(); // Rendering the dogs on the page
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Method to render dogs on the page
  renderDogs() {
    const dogsContainer = document.getElementById("dogs-container");
    let template = "";
    this.filteredDogs.forEach((dog) => {
      template += dog.generateHTML();
    });
    dogsContainer.innerHTML = template; // Displaying the dogs on the page
    this.addDogTileListeners(); // Adding event listeners to each dog tile
  }

  // Method to filter dogs based on search text
  filterDogs(searchText) {
    this.filteredDogs = this.dogs.filter((dog) => {
      return dog.name.toLowerCase().includes(searchText.toLowerCase());
    });
    this.renderDogs(); // Rendering the filtered dogs
  }

  // Method to add event listeners to each dog tile for click event
  addDogTileListeners() {
    const dogTiles = document.querySelectorAll(".dog-tile");
    dogTiles.forEach((dogTile) => {
      dogTile.addEventListener("click", () => {
        const dogName = dogTile.querySelector("h2").textContent;
        this.goToDogPage(dogName); // Navigating to the individual dog page
      });
    });
  }

  // Method to navigate to an individual dog's page
  goToDogPage(dogName) {
    window.location.href = `dog.html?name=${dogName}`;
  }

  // Method to initialize the DogsApp
  initialize() {
    this.fetchData("http://localhost:3000/dogs"); // Replace with the actual link to your JSON file

    // Adding an event listener to the search button
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", () => {
      const searchInput = document.getElementById("searchInput");
      const searchText = searchInput.value.trim();
      if (searchText !== "") {
        this.filterDogs(searchText); // Filtering dogs based on search text
      } else {
        this.filteredDogs = [...this.dogs]; // Restoring all dogs to the filtered list
        this.renderDogs(); // Rendering all dogs
      }
    });
  }
}

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new DogsApp(); // Creating a new instance of DogsApp
  app.initialize(); // Initializing the DogsApp
});
