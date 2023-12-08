const form = document.getElementById("questionForm");
const submitButton = document.getElementById("submitButton");

const createQuestion = async (e) => {
  e.preventDefault();

  const doc = {
    date: form.dateField.value,
    email: form.emailField.value,
    input: form.inputField.value,
  };

  await fetch("http://localhost:3000/mails", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "Content-Type": "application/json" },
  });
};

submitButton.addEventListener("click", createQuestion);

// JavaScript to change images every 3 seconds
const images = [
  "../assets/wol4.jpg",
  "../assets/wo3.jpg",
  "../assets/wol2.jpg",

  // Add more image paths as needed
];

let imageIndex = 0;
const sliderImage = document.getElementById("sliderImage");

function changeImage() {
  sliderImage.src = images[imageIndex];
  imageIndex = (imageIndex + 1) % images.length;
}

setInterval(changeImage, 4000); // Change image every 3 seconds (3000 milliseconds)
