import { getAllUsers, setInitialUsersData } from "./utils.js";

const signIn = document.getElementById("signin");

const users = JSON.parse(localStorage.getItem("users"))

if (!users) {
    await setInitialUsersData()
    users = getAllUsers();
}

const isLoggedIn = localStorage.getItem('currentuserid');

if (isLoggedIn) {
    const currentUser = JSON.parse(isLoggedIn);
    if (currentUser.role === "admin") {
        window.location.href = "/html/admin-dashboard.html";
    } else {
        window.location.href = "/html/user-dashboard.html";
    }
}

signIn.addEventListener('click', (e) => {
    e.preventDefault();



    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    if (password == "" || email == "") {
        alert("Input required");
        return;
    }


    const myUser = users.find(user => user.email === email && user.password === password)




    localStorage.setItem("currentuserid", JSON.stringify(myUser.id))


    if (myUser.role === "admin") {
        window.location.href = "/html/admin-dashboard.html";
    } else if (myUser.role === "member") {
        window.location.href = "/html/user-dashboard.html";
    } else {
        alert("Unknown user role.");
    }


})
