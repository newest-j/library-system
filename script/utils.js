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


export const signout = () => {
    console.log(JSON.parse(localStorage.getItem("currentuserid")))
    localStorage.removeItem("currentuserid");
}