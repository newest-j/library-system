import {signout ,setLayOut} from "./utils.js";
setLayOut();

let user = JSON.parse(localStorage.getItem("currentuserid"))
document.getElementById("signout").addEventListener('click', () => {
    user = signout();
    window.location.href = "/index.html";
})


let users = JSON.parse(localStorage.getItem("users"))

// console.log(users)
const adminName = document.getElementById("adminname");
const adminStatus = document.getElementById("adminstatus");
const heroName = document.getElementById("heroname");
const heroDate = document.getElementById("herodate");
let searchBook = document.getElementById("input");
const searchBtn = document.getElementById("searchbtn");


adminName.innerHTML = users[0].userName;
heroName.innerHTML = users[0].userName + "!";
adminStatus.innerHTML = users[0].role;
heroDate.innerHTML = new Date().toDateString();


// to fetch the book
async function getBooks(bookname) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${bookname}`)
        const data = await response.json()
        console.log(data)
        return data;
    }
    catch (err) {
        console.error("Fetching unsuccessful", err)
    }
}


const tableBody = document.querySelector("#booktable tbody");
const topChoice = document.querySelector('#topchoice');

searchBtn.addEventListener('click', async () => {
    let bookname = searchBook.value.trim();
    searchBook.value = "";


    const bookresult = await getBooks(bookname);

    if (bookresult) {

        // if (!bookname){
        //     tableBody.innerHTML = "Book not found"
        // };                  

        tableBody.innerHTML = "";
        
        // poulate my book list
        bookresult.docs.slice(0,20).forEach(book => {

            const row = document.createElement("tr");

            const coverURL = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                : "https://placehold.co/50x75?text=No+Cover&font=roboto";


            row.innerHTML = `
           <td><img class="img-fluid" src="${coverURL}" alt="Book cover" /></td>
           <td>${book.title || "No title"}</td>
           <td>${book.author_name ? book.author_name.join(", ") : "Unknown author"}</td>
           <td>${book.first_publish_year || "N/A"}</td>
           `;



            tableBody.appendChild(row);

        });

        // this is to populate the top choice after looping through the book array

        topChoice.innerHTML = "";
        bookresult.docs.slice(4,8).forEach(topchoice => {

            const choice = document.createElement("div")
            choice.className = "col"

            const topCoverURL = topchoice.cover_i
                ? `https://covers.openlibrary.org/b/id/${topchoice.cover_i}-S.jpg`
                : "https://placehold.co/50x75?text=No+Cover&font=roboto";

            choice.innerHTML = `
            <img src="${topCoverURL}" class = "w-25" alt="">
            <p class="mb-0">${topchoice.author_name ? topchoice.author_name.join(", ") : "Unknown author"}</p>
            <p>${topchoice.title || "No title"}</p>
            `

            topChoice.appendChild(choice);
        })


    }


    // console.log("hi")
})