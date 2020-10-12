class RssPresenter {
    constructor(data) {
        this.chapters = data;

        console.log(this.chapters)
        document.getElementById("release-table").innerHTML = "";
        document.getElementById("release-table").classList.remove("is-hidden");
        document.getElementById("loading").classList.add("is-hidden");

        this.chapters.forEach(element => {
            document.getElementById("release-table").innerHTML += `
            <tr>
                <td><a href="${element.site_url}">${element.anime}</a></td>
                <td>${element.chapter}</td>
                <td data-action="collapse" data-target="#test">torrent</td>
                <td>magnet
            <td>
            </tr>
            `;
            
        });
    }
}