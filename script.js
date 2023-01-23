let library = [];

class Book {
    constructor(title,author,pages,status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function listenClicks(){
    document.addEventListener('click' , (event) =>{
        const {target} = event;
        const idx = target.parentNode.rowIndex -1;

        if(target.id == "add-book") {
            validateForm(event);
        }
    })
}
listenClicks();
// FORM VALIDATION 
function validateForm(event){
    event.preventDefault(); // default action wiill be prevented
    const form = document.querySelector('form');
    const titleInput = document.querySelector('#title');
    const nameInput = document.querySelector('#name');
    const numInput = document.querySelector('#number');
    const checkbox = document.querySelector('input[name = "status"]');

    if(titleInput == "" || titleInput == " "){
        alert('please fill the title');
        return;
    }
    if(nameInput == '' || nameInput == " "){
        alert("please fill the name");
        return;
    }
    if(numInput == '' || numInput <= 0){
        alert("please enter the correct num");
        return;
    }

    if(checkbox.checked) {
        addBookToLibrary(titleInput.value,nameInput.value,numInput.value,true);
    }else addBookToLibrary(titleInput.value,nameInput.value,numInput.value,false);

    form.reset();
}

function addBookToLibrary(title,author,pages,status){
    const book = new Book(title,author,pages,status);
    library.push(book);
    showBooksInLibrary();
}
function  showlibraryInfo(){
    const booksRead  = document.querySelector('#books-read');
    const booksUnread = document.querySelector('#books-unread');
    const totalBooks = document.querySelector('#total-books');
    // booksRead.textContent =0;
    // booksUnread.textContent = 0;
    totalBooks.textContent = library.length;
    let readCounter = 0;
    let unreadCounter = 0;

    for(let i =0;i<library.length;i++){
        if(library[i].status == true) readCounter++;
        else unreadCounter++;
    }
    booksRead.textContent = readCounter;
    booksUnread.textContent = unreadCounter;

}
function showBooksInLibrary(){
        // save books in local storage

        const booksList = document.querySelector('#table-body');
        booksList.textContent = '';
        showlibraryInfo();
        for(let i =0;i < library.length;i++){
            const bookRow = document.createElement('tr');
            bookRow.classList.add('book-info');
            booksList.appendChild(bookRow);

            // book title
            const bookTitle = document.createElement('td');
            bookTitle.textContent = library[i].title;
            bookRow.appendChild(bookTitle);

            // book author 
            const bookAuthor = document.createElement('td');
            bookAuthor.textContent = library[i].author;
            bookRow.appendChild(bookAuthor);

            // pages
            const bookPages = document.createElement('td');
            bookPages.textContent = library[i].pages;
            bookRow.appendChild(bookPages);

            // status 
            const bookStatus = document.createElement('td');
            const statusSymbol = document.createElement('span');
            statusSymbol.classList.add('material-icons');
            if(library[i].status == false){
                statusSymbol.textContent = "clear";
                
            }else statusSymbol.textContent = "done";
            bookStatus.appendChild(statusSymbol);
            bookRow.appendChild(bookStatus);

            // book removal 
            const bookDelete = document.createElement('td');
            const deleteSymbol = document.createElement('span');
            deleteSymbol.textContent = "delete";
            deleteSymbol.classList.add('material-icons');
            bookDelete.appendChild(deleteSymbol);

            bookRow.appendChild(bookDelete);
        }

}