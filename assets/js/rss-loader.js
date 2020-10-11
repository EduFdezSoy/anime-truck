class RssLoader {
    constructor(URL) {
        this.URL = URL;
    }

    fetch = function () {
        fetch(this.URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => new RssPresenter(data))
    }
}