class SearchTabObserver{
    #observer;
    #nonShortsNodeSet;
    #isActive = false;

    constructor(){
        this.#nonShortsNodeSet = new Set();
        this.#observer = new MutationObserver(mutations => {
            mutations.forEach((mutation)=> {
                const renderers = document.querySelectorAll("ytd-video-renderer");
                renderers.forEach((renderer) => {
                    if(!this.#isActive){
                        return;
                    }
                    if(this.#nonShortsNodeSet.has(renderer)){
                        return;
                    }

                    if(this.#isShort(renderer)){
                        renderer.remove();
                    } else {
                        this.#nonShortsNodeSet.add(renderer);
                    }
                });
            });
        });
    }

    #isShort(element){
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

    start(){
        if(this.#isActive){
            return;
        }

        this.#observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.#isActive = true;
    }

    stop(){
        if(this.#observer !== null){
            this.#observer.takeRecords();
            this.#observer.disconnect();
        }

        this.#nonShortsNodeSet.clear();
        this.#isActive = false;
    }
}