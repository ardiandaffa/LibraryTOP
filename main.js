// Initialize Library array and constructor

let myLibrary = [];

function book(Title, Author, Pages, ReadStat){
    this.title = Title;
    this.author = Author;
    this.pages = Pages;
    this.readStat = ReadStat;
};

//   Getting value from inputs form in HTML, creates Object and push it to myLibrary Array 
function getValue(){
    // Assigning DOM and JQUery
    const title = document.getElementById('bookName').value;
    const author = document.getElementById('authorInput').value;
    const pages = document.getElementById('pagesInput').value;
    let readStat = $("#readCheckbox").is(":checked") ? "true" : "false";

    // Creating book object
    let bookObject = new book(title, author, pages, readStat);

    // Pushing object to Library array
    myLibrary.push(bookObject);
};

// Trigger getValue() when submit button clicked
const submitBtn = document.getElementById('submitBook');
const title = document.getElementById('bookName');
const author = document.getElementById('authorInput');
const pages = document.getElementById('pagesInput');
submitBtn.addEventListener("click", () => {
    const inputForm = document.getElementById('formInputDisplay');
    getValue();
    render();
    deleteBtnListener();
    saveData();
    title.value = "";
    author.value = "";
    pages.value = "";
});

// Rendering the book object from Library and create table

function render(){
    const bookTable = document.getElementById('tablebody');
    bookTable.innerHTML = "";
    for(let i = 0 ; i < myLibrary.length; i++){

        // Initialize tables
        let tableRow = document.createElement('tr')
        let number = document.createElement('th');
        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let read = document.createElement('td');
        let readbtn = document.createElement('button');
        

        // Assigning book object properties to the table
        number.innerText = i + 1;
        title.innerText = myLibrary[i].title;
        author.innerText = myLibrary[i].author;
        pages.innerText = myLibrary[i].pages;
        readbtn.innerText = myLibrary[i].readStat;

        // Appending read button to read table
        read.append(readbtn);
        // Append the tables to parent
        tableRow.append(number);
        tableRow.append(title);
        tableRow.append(author);
        tableRow.append(pages);
        tableRow.append(read);

        bookTable.append(tableRow);

        //Creating delete button
        let deleteButtonContainer = document.createElement('td');
        let deleteButton = document.createElement('button');

        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute('objectID', i);

        read.setAttribute('objectID',i);
        readbtn.classList.add('read-italic');
        
        deleteButtonContainer.append(deleteButton)
        tableRow.append(deleteButtonContainer);

        
        readbtn.addEventListener("click", () => {
            if(myLibrary[read.getAttribute('objectID')].readStat == 1) {
                myLibrary[read.getAttribute('objectID')].readStat = false;
                render();
                deleteBtnListener();
                saveData();
            } else {
                myLibrary[read.getAttribute('objectID')].readStat = true;
                render();
                deleteBtnListener();
                saveData();
            }
        })
    }
        
}


// Function to loop through all the delete buttons

function deleteBtnListener(){
    const deleteButtons = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", () => {
            objectRemover(deleteButtons[i].getAttribute('objectID'));
        })
    }
    saveData();
};

// Function to remove object from array based on array index given
function objectRemover(position){
    myLibrary.splice(position, position + 1);
    render();
    deleteBtnListener();
};

// Uses local storage to save and retrieve data
function saveData(){
    localStorage.setItem("savedData", JSON.stringify(myLibrary));
}



// execute func
if (localStorage.getItem("savedData") !== null){
    myLibrary = JSON.parse(localStorage.getItem("savedData"));
    render();
    deleteBtnListener();

}
