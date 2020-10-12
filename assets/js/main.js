window.onload = function () {
    this.active = [];
    rss = new RssLoader(`https://cors-anywhere.herokuapp.com/https://nyaa.si/?page=rss&u=subsplease`);
    rss.fetch();

    breadcrumb = new BreadcrumbManager(document.getElementById("breadcrumb"));
    breadcrumb.add("test1", "#")
    breadcrumb.add("test2", "#")
    breadcrumb.add("test3", "#")
    breadcrumb.add("test4", "#")
    breadcrumb.add("test5", "#")
    breadcrumb.remove(1)

    buttonsActions()
};

//#region functions

function buttonsActions() {
    // truck logo action
    document.getElementById("logoButton").onclick = function () {
        reload();
    };

    // reload action
    document.getElementById("reloadButton").onclick = function () {
        reload();
    };
}

function reload() {
    document.getElementById("reloadButton").classList.add("fa-spin");
    document.getElementById("loading").classList.remove("is-hidden");

    rss.onLoadCompleted(() => {
        document.getElementById("reloadButton").classList.remove("fa-spin");
    })

    rss.fetch();
}

function showOneHideAll(id) {
    let show = true;

    for (let i = 0; i < this.active.length; i++) {
        const element = this.active.pop();
        if (element == id) {
            show = false;
        }
        
        document.getElementById(element).classList.add('is-hidden');
    }

    if (show) {
        this.active.push(id);
        document.getElementById(id).classList.remove('is-hidden');    
    }
}

//#endregion