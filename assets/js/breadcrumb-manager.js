class BreadcrumbManager {
    constructor(element) {
        this.breadcrumb = element;
    }

    add = function (page, url) {
        this.breadcrumb.lastElementChild.className = "";
        this.breadcrumb.innerHTML += "<li class=\"is-active\"><a href\"" + url + "\">" + page + "</a></li>";
    }

    remove = function (number = 1) {
        for (let i = 0; i < number; i++) {
            this.breadcrumb.removeChild(this.breadcrumb.lastElementChild);
        }
        this.breadcrumb.lastElementChild.className = "is-active";
    }
}