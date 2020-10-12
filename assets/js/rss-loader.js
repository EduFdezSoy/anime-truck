class RssLoader {
    constructor(URL) {
        this.URL = URL;
        this.functions = [];
        this.chapters = [];
    }

    fetch = function () {
        fetch(this.URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                this.chapters = [];
                data.querySelectorAll("item").forEach(element => {
                    let full_title = element.querySelector("title").innerHTML;
                    // remove checksum and file extension
                    let chop_title = full_title.replace(/\s\[.*\]\..{3}$/, '');
                    // remove group tag
                    chop_title = chop_title.replace(/\[SubsPlease\]\s/, '');

                    // split name from number and quality
                    let splited_title = chop_title.split(/\-(?=[^\-]+$)/);

                    let title = splited_title[0].trim();

                    // split chapter number from quality
                    let splited_chapter = splited_title[1].trim().split(' ');

                    let chapter = splited_chapter[0];
                    let quality = splited_chapter[1].replace('(', '').replace(')', '').replace('p', '');

                    // pick urls
                    let nyaa_url = element.querySelector("guid").innerHTML;
                    let torrent = element.querySelector("link").innerHTML;

                    // form magnet
                    let hash = element.querySelector("infoHash").innerHTML;
                    let magnet = `magnet:?xt=urn:btih:${hash}&dn=${full_title}&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce`

                    // pick date
                    let upload_date = element.querySelector("pubDate").innerHTML;

                    // set chapter (search if already added or insert a new one)
                    let search_res = this.chapters.findIndex(o => o.anime === title && o.chapter === chapter)
                    if (search_res >= 0) {
                        switch (parseInt(quality)) {
                            case 1080:
                                this.chapters[search_res].download_fhd = torrent;
                                this.chapters[search_res].magnet_fhd = magnet;
                                break;
                            case 720:
                                this.chapters[search_res].download_hd = torrent;
                                this.chapters[search_res].magnet_hd = magnet;
                                break;
                            default:
                                this.chapters[search_res].download_sd = torrent;
                                this.chapters[search_res].magnet_sd = magnet;
                                break;
                        }
                    } else {
                        let o = new Chapter(
                            title,
                            chapter,
                            nyaa_url,
                            [],
                            [],
                            new Date(upload_date)
                        );
                        switch (parseInt(quality)) {
                            case 1080:
                                o.download_fhd = torrent;
                                o.magnet_fhd = magnet;
                                break;
                            case 720:
                                o.download_hd = torrent;
                                o.magnet_hd = magnet;
                                break;
                            default:
                                o.download_sd = torrent;
                                o.magnet_sd = magnet;
                                break;
                        }
                        this.chapters.push(o);
                    }
                })

                console.log(this.chapters);
                // new RssPresenter(data);
                console.log(data);
            })
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