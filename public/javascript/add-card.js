async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="category-title"]').value;
  const question = document.querySelector('input[name="flashcard-question"]')
    .value;
  const answer = document.querySelector('input[name="flashcard-answer"]').value;

  const response = await fetch(`/api/categories`, {
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log(response.body);

    const flashcardResponse = await fetch(`/api/flashcards`, {
      method: 'POST',
      body: JSON.stringify({
        question,
        answer,
        category_id,
        user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    document.location.replace('/dashboard');
  } else {
    console.log('flashcard creation error');
    alert(response.statusText);
  }
}

function nextButton(event) {
  event.preventDefault();
  document.getElementById('flashcardCategory').classList.add('hide');
  document.getElementById('flashcardQA').classList.remove('hide');
}

function doneButton(event) {
  event.preventDefault();
}

document
  .querySelector('.new-flashcard-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('#next').addEventListener('click', nextButton);

document.querySelector('#done').addEventListener('click', doneButton);
