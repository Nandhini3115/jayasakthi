const API = "http://localhost:3000/books";
function addBook() {
  fetch(API + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      author: author.value,
      category: category.value,
      publishedYear: year.value,
      availableCopies: copies.value
    })
  }).then(() => loadBooks());
}
function loadBooks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      bookList.innerHTML = "";
      data.forEach(b => {
        bookList.innerHTML += `<li>${b.title} - ${b.availableCopies}</li>`;
      });
    });
}

loadBooks();
