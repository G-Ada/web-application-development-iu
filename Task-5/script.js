let books = [];

function renderTable() {
  const tbody = document.querySelector("#bookTable tbody");
  const idSelect = document.getElementById("bookIdSelect");

  tbody.innerHTML = "";
  idSelect.innerHTML = "";

  books.forEach((book) => {
    // Populate table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.genre}</td>
    `;
    tbody.appendChild(row);

    // Populate dropdown
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = `ID: ${book.id}`;
    idSelect.appendChild(option);
  });
}

function validateInputs(inputs) {
  return inputs.every((input) => input.trim() !== "") && !isNaN(inputs[2]);
}

//Update form
document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("bookIdSelect").value);
  const title = document.getElementById("newTitle").value.trim();
  const author = document.getElementById("newAuthor").value.trim();
  const year = document.getElementById("newYear").value.trim();
  const genre = document.getElementById("newGenre").value.trim();

  if (!validateInputs([title, author, year, genre])) {
    alert("Please fill all fields and enter a valid year.");
    return;
  }

  const book = books.find((b) => b.id === id);
  if (book) {
    book.title = title;
    book.author = author;
    book.year = parseInt(year);
    book.genre = genre;
    renderTable();
  } else {
    alert("Book not found.");
  }
});

//Remove element
document.getElementById("removeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("removeId").value.trim());

  books = books.filter((b) => b.id !== id);
  renderTable();
});

// Load books from books.json
fetch("books.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load books.json");
    }
    return response.json();
  })
  .then((data) => {
    books = data;
    renderTable();
  })
  .catch((error) => {
    console.error("Error loading books:", error);
  });
