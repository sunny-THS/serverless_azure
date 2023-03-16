const common = {
    formatDate: (date) => {
        var MM = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();

        var dateString = [date.getFullYear(),
            (MM>9 ? '' : '0') + MM,
            (dd>9 ? '' : '0') + dd
            ].join('-');

        var timeString = [
            (hh>9 ? '' : '0') + hh,
            (mm>9 ? '' : '0') + mm,
            (ss>9 ? '' : '0') + ss
        ].join(':');
        
        return `${dateString} ${timeString}`;
    },
    formatDateYMD: (date) => {
        var MM = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        var dateString = [date.getFullYear(),
            (MM>9 ? '' : '0') + MM,
            (dd>9 ? '' : '0') + dd
            ].join('-');
        
        return `${dateString}`;
    }
}

module.exports = common