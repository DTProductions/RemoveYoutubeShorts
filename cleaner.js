// Youtube calls the navigate event twice in the first navigation,
// with the first call navigating to the initially loaded URL.
// This flag is used to ensure that the initial URL is ignored.
let navigatedOnce = false;

window.navigation.addEventListener("navigate", (event) => {
    if(!navigatedOnce){
        navigatedOnce = true;
        return;
    }

    if (event.hashChange || event.downloadRequest !== null) {
        return;
    }

    const url = new URL(event.destination.url);

    if(url.pathname === "/results"){
        startObservingSearch();
    } else{
        stopObservingSearch();
    }

    if(url.pathname.startsWith("/shorts")){
        redirectToMainPage();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    if(window.location.href.startsWith("https://www.youtube.com/shorts")){
        redirectToMainPage();
    } else if(window.location.href.startsWith("https://www.youtube.com/results")){
        startObservingSearch();
    } else {
        stopObservingSearch();
    }
});