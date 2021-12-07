async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="category-title"]').value;

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
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
