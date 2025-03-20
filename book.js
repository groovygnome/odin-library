let lib = [];
const container = document.querySelector('.container');
const bookBtn = document.querySelector('.new-book');
const modal = document.querySelector('.book-form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        info = this.title + ' by ' + this.author + ', ' + pages + ' pages, ';
        if (this.read) {
            info += 'read';
        } else {
            info += 'not read yet';
        }
        return info;
    }
}

function addBookToLibrary(library, title, author, pages, read) {
    library.push(new Book(title, author, pages, read));

}

function displayBooks(library) {

    for (let book of library) {

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', book.title);
        card.textContent = book.info();
        container.appendChild(card);
    }
    document.body.appendChild(container);
}

bookBtn.addEventListener('click', () => { modal.show(); });

addBookToLibrary(lib, 'The Hobbit', 'J.R.R. Tolkien', 295, false);

displayBooks(lib);
