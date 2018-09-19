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

export default {
    MAX_SNAKE_LEN: 10000,
    isInGameArea
}
