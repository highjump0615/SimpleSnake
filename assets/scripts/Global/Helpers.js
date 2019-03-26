var common = require('Common');

function isInGameArea(point) {
    var szBg = common.game.main.getContentSize();

    if (point.x <= -szBg.width / 2) {
        return false;
    }
    if (point.x >= szBg.width / 2) {
        return false;
    }
    if (point.y <= -szBg.height / 2) {
        return false;
    }
    if (point.y >= szBg.height / 2) {
        return false;
    }

    return true;    
}

/**
 * convert to string with leading zeros
 * @param {*} num 
 * @param {*} size 
 */
function stringPad(num, size) {
    var s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }

    return s;
}

function timestampSecond() {
    return parseInt(new Date().getTime() / 1000);
}


export default {
    isInGameArea,
    stringPad,
    timestampSecond
}
