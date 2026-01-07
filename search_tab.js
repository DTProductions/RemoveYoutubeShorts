let searchObserver;
let nonShortsNodeSet;

function startObservingSearch(){
    nonShortsNodeSet = new Set();
    searchObserver = new MutationObserver(mutations => {
        mutations.forEach((mutation)=>{
            const renderers = document.querySelectorAll("ytd-video-renderer");
            renderers.forEach((renderer) => {
                if(!nonShortsNodeSet.has(renderer) && isShort(renderer)){
                    nonShortsNodeSet.add(renderer);
                    renderer.remove();
                }
            });
        });
    });

    searchObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function isShort(element){
    const links = element.querySelectorAll("a");
    for(let i = 0; i < links.length; i++){
        const url = links[i].href;
        const isShort = url.startsWith("https://www.youtube.com/shorts/");
        if(isShort){
            return true;
        }
    }

    return false;
}

function stopObservingSearch(){
    if(searchObserver != null){
        searchObserver.disconnect();
        searchObserver = null;
    }

    if(nonShortsNodeSet != null){
        nonShortsNodeSet = null;
    }
}