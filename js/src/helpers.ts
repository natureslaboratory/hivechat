
function getDayOfMonth(date : Date) {
    let day = date.getDate().toString();
    let suffix = "th";
    switch (day[day.length-1]) {
        case "1":
            suffix = "st";
            break;
        case "2":
            suffix = "nd";
            break;
        case "3":
            suffix = "rd";
            break;
        default:
            suffix = "th";
    }
    return `${day}${suffix}`;
}

function getMonth(date : Date) {
    let month = date.getMonth();
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2: 
            return "Mar";
        case 3: 
            return "Apr";
        case 4:
            return "May"
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9: 
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

function addZeroes(time : number) {
    let strTime = time.toString();
    if (strTime.length == 1) {
        return "0" + strTime;
    }
    return strTime;
}

export function formatDate(date) {
    return `${addZeroes(date.getHours())}:${addZeroes(date.getMinutes())}, ${getMonth(date)} ${getDayOfMonth(date)} ${date.getFullYear()}`;
}

export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}