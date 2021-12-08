async function newFormHandler(event) {
  event.preventDefault();

  const category_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// document
//   .querySelector('.new-flashcard-form')
//   .addEventListener('submit', newFormHandler);
