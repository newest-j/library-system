import { signout, setUserLayOut } from "./utils.js";
await setUserLayOut();

let currentuser = JSON.parse(localStorage.getItem("currentuserid"))
document.getElementById("signout").addEventListener('click', () => {
    currentuser = signout();
    window.location.href = "/index.html";
})

// offcanvas signout
document.getElementById("offcanvassignout").addEventListener('click', () => {
    currentuser = signout();
    window.location.href = "/index.html";
})


// for the header 
let users = JSON.parse(localStorage.getItem("users"))

// console.log(users)

// console.log(users)
const userName = document.getElementById("adminname");
const userStatus = document.getElementById("adminstatus");
const heroName = document.getElementById("heroname");
const userDate = document.getElementById("herodate");

const foundUser = users.find(user => user.id === currentuser)
if (foundUser) {
    userName.innerHTML = foundUser.userName;
    userStatus.innerHTML = foundUser.role;
    heroName.innerHTML = foundUser.userName;
    userDate.innerHTML = new Date().toDateString();
}
// header end



const searchBook = document.getElementById("input");
const searchBtn = document.getElementById("searchbtn");

const tableBody = document.querySelector("#booktable tbody");
const topChoice = document.querySelector('#topchoice');




const books = JSON.parse(localStorage.getItem("books"));


// display the totalbooks
// document.getElementById("totalbooks").innerHTML = books.length;
document.getElementById("borrowedbooks").innerHTML = foundUser.borrowedBooks.length;
// console.log(books)
const displayedTitles = new Set(); // Track searched book titles

// to get the user borrowedbook to populate the table instead of reloading
function getUserBorrowedBooks(){
    const userBooks = foundUser.borrowedBooks
    const savedTotal = localStorage.getItem('usertotalBooks');


    if (savedTotal !== null) {
        document.getElementById("totalbooks").innerText = savedTotal;
    } else {
        // set book total value to default
        document.getElementById("totalbooks").innerHTML = books.length;
    }

    userBooks.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img class="img-fluid w-25" src="${book.coverURL}" alt="Book cover" /></td>
            <td>${book.title || "No title"}</td>
            <td>${book.author ? book.author : "Unknown author"}</td>
            <td>${book.year || "N/A"}</td>
        `;
        tableBody.appendChild(row);
    });
}

getUserBorrowedBooks()


searchBtn.addEventListener('click', () => {
    const bookName = searchBook.value.trim().toLowerCase();


    if (bookName === "") {
        alert("Please enter a book name to search!");
        return;
    }

    searchBook.value = "";

    if (displayedTitles.has(bookName)) {
        alert("You have already added  this book to your list");
        searchBook.value = "";
        return;
    }



    const foundBook = books.find(book => book.title.trim().toLowerCase().includes(bookName))

    if (foundBook) {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img class="img-fluid w-25" src="${foundBook.coverURL}" alt="Book cover" /></td>
          <td>${foundBook.title || "No title"}</td>
          <td>${foundBook.author ? foundBook.author : "Unknown author"}</td>
          <td>${foundBook.year || "N/A"}</td>
        
          `

        tableBody.appendChild(row);
        displayedTitles.add(bookName);

        topChoice.innerHTML = "";
        books.slice(4, 8).forEach(book => {
            const choice = document.createElement("div");
            choice.className = "col";
            choice.innerHTML = `
                  <img src="${book.coverURL}" class="w-50" alt="">
                  <p class="mb-0">${book.author}</p>
                  <p>${book.title}</p>
              `;
            topChoice.appendChild(choice);
            displayedTitles.add(bookName);
        });


        // add the book to save books 

        if (!foundUser.borrowedBooks.some(book => book.title === foundBook.title)) {
            foundUser.borrowedBooks.push(foundBook);
            localStorage.setItem('users', JSON.stringify(
                users.map(user => user.id === foundUser.id ? foundUser : user)
            ));

            let currentTotal = parseInt(document.getElementById("totalbooks").innerText);
            if (currentTotal > 0) {
                currentTotal -= 1;
                document.getElementById("totalbooks").innerHTML = currentTotal;

                localStorage.setItem('usertotalBooks', currentTotal);
            }
            

        } else {
            alert("You have already added this book to your saved books.");
        }


    }



    else {
        alert("Book not found in the library")
    }



})