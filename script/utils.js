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

// html header
export async function getHeaderContent() {

    try {
        const response = await fetch("/html/header.html");
        const data = await response.text();

        document.getElementById("header").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to the header", err)
    }

}



// html sidebar
export async function getSidebarContent() {

    try {
        const response = await fetch("/html/sidebar.html");
        const data = await response.text();

        document.getElementById("sidebar").innerHTML = data;
    }
    catch (err) {
        console.error("Failed to the header", err)
    }

}
export async function setLayOut() {
    await getHeaderContent()
    await getSidebarContent()
}


