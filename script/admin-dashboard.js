import { signout, setLayOut } from "./utils.js";
await setLayOut();

let currentuser = JSON.parse(localStorage.getItem("currentuserid"))
document.getElementById("signout").addEventListener('click', () => {
    currentuser = signout();
    window.location.href = "/index.html";
})

// offcanvas signout

document.getElementById("offcanvassignout").addEventListener('click' , ()=>{
    currentuser = signout();
    window.location.href = "/index.html";
}) 


// header

let users = JSON.parse(localStorage.getItem("users"))
// console.log(users)

// console.log(users)
const adminName = document.getElementById("adminname");
const adminStatus = document.getElementById("adminstatus");
const heroName = document.getElementById("heroname");
const heroDate = document.getElementById("herodate");
// let searchBook = document.getElementById("input");
// const searchBtn = document.getElementById("searchbtn");


adminName.innerHTML = users[0].userName;
heroName.innerHTML = users[0].userName + "!";
adminStatus.innerHTML = users[0].role;
heroDate.innerHTML = new Date().toDateString();

// header end

// to fetch the book

const subjects = ['fiction', 'history', 'romance', 'fantasy', 'science', 'biographies'];
const tableBody = document.querySelector("#booktable tbody");
const topChoice = document.querySelector('#topchoice');

// Fetch books from all subjects and transform using map
async function getBooksFromSubjects() {
    const allBooks = [];

    for (let subject of subjects) {
        const response = await fetch(`https://openlibrary.org/subjects/${subject}.json`);
        const data = await response.json();
        console.log(data)

        const books = data.works.map(book => {
            const authorNames = book.authors
                ? book.authors.map(author => author.name).join(', ')
                : "Unknown author";

            const coverURL = book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                : "https://placehold.co/150x200?text=No+Cover";

            return {
                title: book.title || "No title",
                author: authorNames,
                year: book.first_publish_year || "N/A",
                coverURL: coverURL,
                
            };
        });

        allBooks.push(...books); // flatten all into one array
    }
    return allBooks;
}

// Display books in table and top choices
async function showBooks() {
    const books = await getBooksFromSubjects();

    localStorage.setItem('books', JSON.stringify(books)); // Store in localStorage

    // Populate book table
    tableBody.innerHTML = "";
    books.slice(0, 20).forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img class="img-fluid" src="${book.coverURL}" alt="Book cover" /></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
        `;
        tableBody.appendChild(row);
    });

    // Populate top choice section
    topChoice.innerHTML = "";
    books.slice(4, 8).forEach(book => {
        const choice = document.createElement("div");
        choice.className = "col";
        choice.innerHTML = `
            <img src="${book.coverURL}" class="w-25" alt="">
            <p class="mb-0">${book.author}</p>
            <p>${book.title}</p>
        `;
        topChoice.appendChild(choice);
    });
}

showBooks();



const form = document.getElementById("bookForm");
const tableBody2 = document.querySelector("#booktable tbody");
const coverInput = document.getElementById("bookCover");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Retrieve existing books from local storage
    let books = JSON.parse(localStorage.getItem('books')) || [];

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const year = document.getElementById("bookYear").value.trim();
    const file = coverInput.files[0]; // actual File object

    // Build a blob URL if a file was chosen
    const coverURL = file ? URL.createObjectURL(file)
        : "https://placehold.co/50x75?text=No+Cover&font=roboto";

    // Create a new book object
    const newBook = {
        title: title,
        author: author,
        year: year,
        coverURL: coverURL
    };

    // Add the new book to the books array
    books.push(newBook);

    // Save the updated books array to local storage
    localStorage.setItem('books', JSON.stringify(books));

    // Create a new row for the table
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${coverURL}" alt="Cover" style="height:60px"></td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
    `;

    tableBody2.appendChild(row);

    if (file) {
        row.querySelector("img").addEventListener("load", () =>
            URL.revokeObjectURL(coverURL)
        );
    }

    // Reset the form
    form.reset();
});


// // Load existing books from local storage when the page loads
// window.addEventListener('load', () => {
//     // Retrieve existing books from local storage
//     const books = JSON.parse(localStorage.getItem('books')) || [];

//     books.forEach(book => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td><img src="${book.coverURL}" alt="Cover" style="height:60px"></td>
//             <td>${book.title}</td>
//             <td>${book.author}</td>
//             <td>${book.year}</td>
//         `;
//         tableBody2.appendChild(row);
//     });
// });