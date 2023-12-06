const form = document.getElementById('questionForm');
const submitButton = document.getElementById('submitButton');

const createQuestion = async (e) => {
  e.preventDefault();

 

  const doc = {
  
    date: form.dateField.value,
    email: form.emailField.value,
    input: form.inputField.value
  };

  await fetch('http://localhost:3000/mails', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  });

};

submitButton.addEventListener('click', createQuestion);
