export const setInitialUsersData = async () => {
    const data = await fetch("../data/data.json")
    const users = await data.json();

    if (users) {
        localStorage.setItem("users", JSON.stringify(users))
    }
}

export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users"))
}

// signout
export const signout = () => {
    console.log(JSON.parse(localStorage.getItem("currentuserid")))
    localStorage.removeItem("currentuserid");
}

//admin html header
export async function getHeaderContent() {

    try {
        const response = await fetch("/html/adminheader.html");
        const data = await response.text();

        document.getElementById("adminheader").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to fetch the header", err)
    }

}



//admin html sidebar
export async function getSidebarContent() {

    try {
        const response = await fetch("/html/adminsidebar.html");
        const data = await response.text();

        document.getElementById("adminsidebar").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to fetch  the sidebar", err)
    }

}
export async function setLayOut() {
    await getHeaderContent()
    await getSidebarContent()
}


// user html header
export async function getUserHeader() {

    try {
        const response = await fetch("/html/userheader.html");
        const data = await response.text();

        document.getElementById("userheader").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to fetch the header", err)
    }

}

//user html sidebar
export async function getUserSidebar() {

    try {
        const response = await fetch("/html/usersidebar.html");
        const data = await response.text();

        document.getElementById("usersidebar").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to fetch  the sidebar", err)
    }

}

export async function setUserLayOut() {
    await getUserHeader()
    await getUserSidebar()
}


