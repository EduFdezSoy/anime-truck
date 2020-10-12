class RssPresenter {
    constructor(data) {
        this.chapters = data;
        this.active = [];

        document.getElementById("release-table").innerHTML = "";
        document.getElementById("release-table").classList.remove("is-hidden");
        document.getElementById("loading").classList.add("is-hidden");

        let count = 0;
        this.chapters.forEach(element => {
            count++;
            document.getElementById("release-table").innerHTML += `
            <tr>
                <td><a href="${element.site_url}">${element.anime}</a></td>
                <td>${element.chapter}</td>
                <td><a onclick="showOneHideAll('hideRowTorrent${count}')">Torrent</a></td>
                <td><a onclick="showOneHideAll('hideRowMagnet${count}')">Magnet</a></td>
            </tr>
            <tr id="hideRowTorrent${count}" class="is-hidden">
                <td>Torrent</td>
                <td><a href="${element.download_sd}" title="480p or less">SD</a></td>
                <td><a href="${element.download_hd}" title="720p">HD</a></td>
                <td><a href="${element.download_fhd}" title="1080p">Full HD</a></td>
            </tr>
            <tr id="hideRowMagnet${count}" class="is-hidden">
                <td>Magnet</td>
                <td><a href="${element.magnet_sd}" title="480p or less">SD</a></td>
                <td><a href="${element.magnet_hd}" title="720p">HD</a></td>
                <td><a href="${element.magnet_fhd}" title="1080p">Full HD</a></td>
            </tr>
            `;
        });
    }
}