import {signout ,setLayOut} from "./utils.js";
await setLayOut();



let currentuser = JSON.parse(localStorage.getItem("currentuserid"))
document.getElementById("signout").addEventListener('click' , ()=>{
  
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
const adminName = document.getElementById("adminname");
const adminStatus = document.getElementById("adminstatus");
// let searchBook = document.getElementById("input");
// const searchBtn = document.getElementById("searchbtn");


adminName.innerHTML = users[0].userName;
adminStatus.innerHTML = users[0].role;