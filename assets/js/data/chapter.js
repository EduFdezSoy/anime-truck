class Chapter {
    /**
     * @param {Text} anime Anime name, title
     * @param {Number} chapter Chapter number, may have decimals
     * @param {URL} site_url Release page
     * @param {Array} download_urls URL array, may have 360p/480p, 720p and 1080p links
     * @param {Array} magnet_urls magnet url array, may have 360p/480p, 720p and 1080p links
     * @param {Date} release_date Date (timestamp equivalent) of the release
     */
constructor(anime, chapter, site_url, download_urls, magnet_urls, release_date) {
        this.anime = anime;
        this.chapter = chapter;
        this.site_url = site_url;
        this.download_urls = download_urls;
        this.download_sd = download_urls[0];
        this.download_hd = download_urls[1];
        this.download_fhd = download_urls[2];
        this.magnet_urls = magnet_urls;
        this.magnet_sd = magnet_urls[0];
        this.magnet_hd = magnet_urls[1];
        this.magnet_fhd = magnet_urls[2];
        this.release_date = release_date;
    }
}
