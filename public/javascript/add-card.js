async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="category-title"]').value;
  const question = document.querySelector('input[name="flashcard-question"]')
    .value;
  const answer = document.querySelector('input[name="flashcard-answer"]').value;

  const response = await fetch(`/api/flashcards`, {
    method: 'POST',
    body: JSON.stringify({
      title,
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
