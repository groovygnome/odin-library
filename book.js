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

theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info());
