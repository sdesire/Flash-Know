async function newFormHandler(event) {
  event.preventDefault();

  const question = document.querySelector('input[name="flashcard-question"]')
    .value;
  const answer = document.querySelector('input[name="flashcard-answer"]').value;

  const category_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/flashcards`, {
    method: 'POST',
    body: JSON.stringify({
      category_id,
      question,
      answer,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-flashcard-form')
  .addEventListener('submit', newFormHandler);
