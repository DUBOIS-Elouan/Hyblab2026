// const API = "https://hyblab.polytech.univ-nantes.fr/actu/api" 
const API = "http://localhost:8080/actu/api"

async function init(){
    await fetch(API + "/create-user", {
        method: "GET",
        credentials: "include"
    });
}

init();