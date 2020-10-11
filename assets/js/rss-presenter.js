class RssPresenter {
    constructor(data) {
        this.data = data;

        console.log(this.data)
        document.getElementById("debug").innerHTML = "";

        const items = data.querySelectorAll("item");

        items.forEach(element => {
            document.getElementById("debug").innerHTML += element.querySelector("title").innerHTML + "<br>"
        });
    }
}