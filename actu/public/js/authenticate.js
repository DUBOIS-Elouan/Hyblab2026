const API = window.location.origin + "/actu/api";

async function init(){
    await fetch(API + "/create-user", {
        method: "GET",
        credentials: "include"
    });
}

init();