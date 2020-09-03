// Show form when add book button clicked

const addBookBtn = document.getElementById('addBtn');
const inputForm = document.getElementById('formInputDisplay');

addBookBtn.addEventListener("click",() => {
    if (inputForm.style.display == "none"){
        inputForm.style.display = "";
    } else {
        inputForm.style.display = "none";
    }
});

