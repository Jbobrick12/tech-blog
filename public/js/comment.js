const commentText = document.querySelector("#comment-text");

const commentHandler = async (event) => {
  event.preventDefault();

  const comment = commentText.value.trim();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to comment");
    }
  }
};

document.querySelector("#comment-form").addEventListener("submit", commentHandler);