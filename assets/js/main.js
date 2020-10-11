window.onload = function () {
    rss = new RssLoader(`https://cors-anywhere.herokuapp.com/https://nyaa.si/?page=rss&u=subsplease`);
    rss.fetch();

    breadcrumb = new BreadcrumbManager(document.getElementById("breadcrumb"));
    breadcrumb.add("test1", "#")
    breadcrumb.add("test2", "#")
    breadcrumb.add("test3", "#")
    breadcrumb.add("test4", "#")
    breadcrumb.add("test5", "#")
    breadcrumb.remove(1)
};