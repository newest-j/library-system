import {signout ,setLayOut} from "./utils.js";
setLayOut();



let user = JSON.parse(localStorage.getItem("currentuserid"))
document.getElementById("signout").addEventListener('click' , ()=>{
    user = signout();
    window.location.href = "/index.html";
}) 



