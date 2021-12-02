async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="flashcard-title"]').value;
    const post_text = document.querySelector(
      'textarea[name="flashcard-text"]'
    ).value;
  
    const response = await fetch(`/api/flashcard`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  
  document
    .querySelector(".new-flashcard-form")
    .addEventListener("submit", newFormHandler);
  