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
            if (myLibrary[index]['read'] == true) myLibrary[index]['read'] = false;
            else myLibrary[index]['read'] = true;
            populateTable();
        });
        newRow.appendChild(readBtn);
        
        
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            populateTable();
        });
        newRow.appendChild(delBtn);

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