let myLibrary = [
    {
        title: "Oliver Twist",
        author: "Charles Dickens",
        pages: "555",
        read: true
    }
];

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');

const newBookBtn = document.querySelector('#new');
const submitBtn = document.querySelector('#submit');
const returnBtn = document.querySelector('#return');

const table = document.querySelector('div.table');
const form = document.querySelector('div.form');
const tbody = document.querySelector('tbody');


submitBtn.addEventListener('click', addBookToLibrary);
returnBtn.addEventListener('click', hide);
newBookBtn.addEventListener('click', hide);


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
}

function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = getReadStatus();
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    populateTable();
    hide();
    clearForm();
}

function getReadStatus() {
    if (document.querySelector('input[name="read"]:checked').value === 'yes') return true;
    else return false;
}

function populateTable() {
    tbody.textContent = '';
    myLibrary.forEach((book) => {
        console.log(book);
        console.log(book.title, book.author, book.pages, book.read);
        let newRow = document.createElement('tr');
        
        Object.keys(book).forEach(prop => {
            let dataCol = document.createElement('td');
            dataCol.textContent = book[prop];
            if (prop == 'read') dataCol.textContent = book[prop] ? "Read" : "Not read";
            newRow.appendChild(dataCol);
            
        });
        tbody.appendChild(newRow);
    });
}

function hide() {
    newBookBtn.classList.toggle('hidden');
    table.classList.toggle('hidden');
    form.classList.toggle('hidden');
}

function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

populateTable();





// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

// console.log(theHobbit.info());