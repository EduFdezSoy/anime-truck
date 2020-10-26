class TimeFormatter{
    static getTime(date) {
        var hour = date.getHours();
        var min = date.getMinutes();
        return `${this.formatNumber(hour)}:${this.formatNumber(min)}`;
    }

    static getTimeWithSeconds(date) {
        var sec = date.getSeconds();
        return `${this.getTime(date)}:${this.formatNumber(sec)}`;
    }

    static formatNumber(n) {
        if (n < 10) 
            return `0${n}`;
        
        return `${n}`;
    }
}