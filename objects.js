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

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
    }
}


function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = getReadStatus();

    if (!validInput(title, author, pages)) return;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    populateTable();
    hide();
    clearForm();
}

function validInput(title, author, pages) {
    if (title == '' || author == '') return false;
    if (pages <= 0) return false;
    else return true;
}

function getReadStatus() {
    if (document.querySelector('input[name="read"]:checked').value === 'yes') return true;
    else return false;
}

function populateTable() {
    tbody.textContent = '';
    
    myLibrary.forEach((book) => {
        let newRow = document.createElement('tr');
        let index = myLibrary.indexOf(book);
        
        Object.keys(book).forEach(prop => {
            let dataCol = document.createElement('td');
            dataCol.textContent = book[prop];
            if (prop == 'read') dataCol.textContent = book[prop] ? "Read" : "Not read";
            newRow.appendChild(dataCol);
            
        });

        let readBtn = document.createElement('button');
        readBtn.textContent = 'Change status';
        readBtn.addEventListener('click', () => {
            book.read = !book.read;            
            populateTable();
        });
        let readBtnCol = document.createElement('td');
        readBtnCol.appendChild(readBtn);
        newRow.appendChild(readBtnCol);
        
        
        let delBtn = document.createElement('button');
        let delBtnCol = document.createElement('td');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            populateTable();
        });
        delBtnCol.appendChild(delBtn);
        newRow.appendChild(delBtnCol);

        tbody.appendChild(newRow);
    });
}



function hide() {
    form.classList.toggle('hidden');
    table.classList.toggle('hidden');
    newBookBtn.classList.toggle('hidden');
    
}

function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

populateTable();





// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

// console.log(theHobbit.info());