class ScheduleLoader{
    constructor() {
        this.URL = "https://graphql.anilist.co";
        this.function = [];
    }

    fetch = function() {
        fetch(this.URL, this.getOptions()).then(this.handleResponse)
            .then(this.handleData);
    }

    handleResponse = function (response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    
    handleData = function (data) {
        var formattedData = data.data.Page.airingSchedules.filter(chapter => chapter.media.format == "TV");
        new SchedulePresenter(formattedData)
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

    getOptions = function() {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: this.getQuery(),
                variables: this.getVariables()
            })
        };
    }

    getVariables = function() {
        var start = new Date();
        var end = new Date();

        start.setHours(0,0,0,0);
        end.setHours(23,59,59,999);

        return {
            airingAt_greater: Math.round(start.getTime()/1000),
            airingAt_lesser: Math.round(end.getTime()/1000)
        };
    }
 
    getQuery = function() {
        return `
        query ($airingAt_greater: Int, $airingAt_lesser: Int) {
            Page (page: 1, perPage: 30) {
                airingSchedules (airingAt_greater: $airingAt_greater, airingAt_lesser: $airingAt_lesser) {
                    mediaId
                    media {
                        title {
                            romaji
                            english
                            native
                        }
                        format
                    }
                    episode
                    airingAt
                }
            }
        }
        `;
    }
}