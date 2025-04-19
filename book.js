let lib = [];
const container = document.querySelector('.container');
const bookBtn = document.querySelector('.new-book');
const modal = document.querySelector('.book-form');
const modalClose = document.querySelector('.close');
const submitBtn = document.querySelector('.submit');
const inputs = document.querySelectorAll('input[required]');
const form = document.querySelector('#new');


inputs.forEach((input) => {
    input.addEventListener('input', () => showError(input));
});

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let info = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ';
        if (this.read) {
            info += 'read';
        } else {
            info += 'not read yet';
        }
        return info;
    }
}

Book.prototype.isRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(library, title, author, pages, read) {
    library.push(new Book(title, author, pages, read));

}


function displayBooks(library) {

    for (let book of library) {
        displayBook(book);
    }
}

function displayBook(book) {
    const card = document.createElement('div');
    const bookInfo = document.createElement('span');
    card.setAttribute('class', 'card');
    const id = book.title.replace(/\s+/g, '');
    card.setAttribute('id', id);
    bookInfo.textContent = book.info();
    card.appendChild(bookInfo);

    const btns = document.createElement('div');
    const delBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    btns.appendChild(delBtn);
    btns.appendChild(readBtn);

    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => { container.removeChild(document.querySelector('#' + id)); });

    readBtn.textContent = 'Read';
    readBtn.addEventListener('click', () => { book.isRead(); bookInfo.textContent = book.info(); });

    card.appendChild(btns);

    container.appendChild(card);
}

function showError(input) {
    input.setCustomValidity('');
    if (input.validity.valueMissing || input.validity.typeMismatch) {
        input.setCustomValidity(`Please enter an ${input.type}.`);
    } else if (input.validity.rangeUnderflow) {
        input.setCustomValidity(`Please enter a value larger than ${input.min}`);
    } else if (input.validity.rangeOverflow) {
        input.setCustomValidity(`Please enter a value smaller than ${input.max}`);
    } else if (input.validity.tooShort) {
        input.setCustomValidity(`Please enter a value longer than ${input.minLength} characters.`);
    } else if (input.validity.tooLong) {
        input.setCustomValidity(`Please enter a value shorter than ${input.maxLength}`);
    }
    input.reportValidity();
}

bookBtn.addEventListener('click', () => { modal.show(); });
modalClose.addEventListener('click', () => { modal.close(); event.preventDefault(); });
submitBtn.addEventListener('click', () => {

    if (form.checkValidity()) {

        modal.close();
        event.preventDefault();

        let book = new Book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pages').value, document.querySelector('#read').checked);
        displayBook(book);
        lib.push(book);


        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#read').checked = false;
    } else {
    }
});


addBookToLibrary(lib, 'The Hobbit', 'J.R.R. Tolkien', 295, false);

displayBooks(lib);
