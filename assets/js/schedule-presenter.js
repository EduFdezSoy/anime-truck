class SchedulePresenter{
    constructor(data) {
        this.data = data;
        this.clear();
        this.data.forEach(chapter => {
            this.addRow(chapter)
        });
    }

    clear = function() {
        document.getElementById("schedule-table").innerHTML = "";
    }

    addRow = function(chapter) {
        document.getElementById("schedule-table").innerHTML += `
            <tr>
                <td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 216px;">${chapter.media.title.romaji}</td>
                <td class="has-text-grey is-vcentered">${TimeFormatter.getTime(new Date(chapter.airingAt*1000))}</td>
            </tr>
        `;
    }
}