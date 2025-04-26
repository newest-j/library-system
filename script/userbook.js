import { signout, setUserLayOut } from "./utils.js";
await setUserLayOut();

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



let users = JSON.parse(localStorage.getItem("users"))

// console.log(users)

// console.log(users)
const userName = document.getElementById("adminname");
const userStatus = document.getElementById("adminstatus");

const foundUser = users.find(user=> user.id === currentuser)
if(foundUser){
    userName.innerHTML = foundUser.userName;
    userStatus.innerHTML = foundUser.role;
}
