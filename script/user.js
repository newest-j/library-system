async function getHeaderContent() {

    try{
        const response = await fetch("/html/utils.html");
        const data = await response.text();

        document.getElementById("header").innerHTML =  data;
    }
    catch(err){
        console.error("Failed to the header",err)
    }
   
}

getHeaderContent();