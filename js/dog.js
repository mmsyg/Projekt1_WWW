// Pobranie danych JSON z pliku za pomocą fetch
fetch('../assets/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const dogName = params.get('name');

    const chosenDog = data.dogs.find(dog => dog.name === dogName);

    if (chosenDog) {
      const dogInfoDiv = document.getElementById('dog-info');
      const dogInfoHTML = `
        <h2>${chosenDog.name}</h2>
        <img src="${chosenDog.image}" alt="${chosenDog.name}">
        <p>Wiek: ${chosenDog.age}</p>
        <p>Opis: ${chosenDog.opis}</p>
        <p>Płeć: ${chosenDog.sex}</p>
      `;
      dogInfoDiv.innerHTML = dogInfoHTML;
    } else {
      console.error('Nie znaleziono informacji o psie');
    }
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
