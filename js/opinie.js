const form = document.getElementById('questionForm');
const submitButton = document.getElementById('submitButton');

const createQuestion = async (e) => {
  e.preventDefault();

 

  const doc = {
    username: form.usernameField.value,
    nr_id: form.idField.value,
    email: form.emailField.value,
    input: form.inputField.value
  };

  await fetch('http://localhost:3000/opinions', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  });

};

submitButton.addEventListener('click', createQuestion);