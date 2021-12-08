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
    // const flashcardResponse = await fetch(`/api/flashcards`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     category_id,
    //     question,
    //     answer,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    document.location.replace('/dashboard');
  } else {
    console.log('categories error');
    alert(response.statusText);
  }
}

document
  .querySelector('.new-flashcard-form')
  .addEventListener('submit', newFormHandler);
