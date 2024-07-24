const myLibrary = [];

const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".showDialog");
const closeButton = document.querySelector(".closeButton");
const submitButton = document.querySelector(".submitButton");
const tableContent = document.querySelector("tbody");
const newBookForm = document.querySelector("form");

function Book(title, author, numberOfPages, read = false) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function getDataAttribute(node) {
    return node.classList[0].split('-')[2];
}

function addBook(book) {
    myLibrary.push(book);

    const row = document.createElement("tr");
    row.classList.add("data-attribute-" + String(myLibrary.length - 1))

    row.appendChild(document.createElement("td"));
    row.lastChild.textContent = book.title;
    row.appendChild(document.createElement("td"));
    row.lastChild.textContent = book.author;
    row.appendChild(document.createElement("td"));
    row.lastChild.textContent = book.numberOfPages;
    row.appendChild(document.createElement("td"));
    row.lastChild.textContent = (book.read) ? "Yes" : "No";
    
    row.appendChild(document.createElement("td"));
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', (e) => {
        const parentRow = e.target.parentNode.parentNode;
        const index = getDataAttribute(parentRow);
        myLibrary[index] = null;
        parentRow.remove();
    });
    row.lastChild.appendChild(deleteButton);

    row.appendChild(document.createElement("td"));
    const toggleButton = document.createElement("button")
    toggleButton.textContent = "Toggle Read";
    toggleButton.classList.add('toggleButton');
    toggleButton.addEventListener('click', (e) => {
        const parentRow = e.target.parentNode.parentNode;
        const index = getDataAttribute(parentRow);
        myLibrary[index].read = !myLibrary[index].read;
        parentRow.querySelector(":nth-child(4)").textContent = myLibrary[index].read ? "Yes" : "No";
    });
    row.lastChild.appendChild(toggleButton);

    tableContent.appendChild(row)
}

showDialog.addEventListener('click', () => {
    dialog.showModal()
});

closeButton.addEventListener('click', () => {
    dialog.close();
})

newBookForm.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    const book = new Book(formData.get('title'),
                          formData.get('author'),
                          formData.get('pages'),
                          formData.get('read') === "on")
    addBook(book);
})

addBook(new Book("Harry Potter and the Goblet of Fire",
                 "J. K. Rowling",
                 734,
                 true));
addBook(new Book("Harry Potter and the Order of the Phoenix",
                 "J. K. Rowling",
                 870,
                 true));
addBook(new Book("Harry Potter and the Half-Blood Prince",
                 "J. K. Rowling",
                 652,
                 true));
addBook(new Book("Harry Potter and the Deathly Hallows",
                 "J. K. Rowling",
                 759,
                 true));