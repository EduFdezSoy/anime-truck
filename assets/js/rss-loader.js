class RssLoader {
    constructor(URL) {
        this.URL = URL;
        this.functions = [];
    }

    fetch = function () {
        fetch(this.URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => new RssPresenter(data))
            .then(data => this.done())
    }

    /**
     * Can be called multiple times, will do all the functions sent when the fetch is done.
     * Once executed will clear the current function queue.
     * 
     * @param {Function} param anonymous function without params expected
     */
    onLoadCompleted = function (params) {
        this.functions.push(params)
    }

    done = function () {
        for (let i = 0; i < this.functions.length; i++) {
            this.functions[i]();
        }

        // clear functions array
        this.functions = [];
    }
}