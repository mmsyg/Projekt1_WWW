// Pobranie danych JSON z pliku za pomocą fetch
fetch("../assets/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const dogName = params.get("name");

    const chosenDog = data.dogs.find((dog) => dog.name === dogName);

    if (chosenDog) {
      const dogInfoDiv = document.getElementById("dog-info");
      const dogInfoHTML = `
        <h2>${chosenDog.name}</h2>
       
          <img src="${chosenDog.image}" alt="zdjęcie ${chosenDog.name}">
         
        <div class="dog-info-container">
        <p><b>Wiek:</b> ${chosenDog.age}</p>
        <p><b>Płeć:</b> ${chosenDog.sex}</p>
         <p><b>Opis:</b> ${chosenDog.opis}</p>
        </div>
      `;
      dogInfoDiv.innerHTML = dogInfoHTML;
    } else {
      console.error("Nie znaleziono informacji o psie");
    }
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}
