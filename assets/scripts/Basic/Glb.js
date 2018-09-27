var obj = {
    channel: 'MatchVS',
    platform: 'alpha',

    MAX_PLAYER_COUNT: 20,

    GROUND_WIDTH: 3000,
    GROUND_HEIGHT: 2000,

    userInfo: null,
    playerUserIds: [],

    roomId: 0,

    // game event
    GAME_START_EVENT: "ev_gameStart",
    SNAKE_INFO_EVENT: "ev_snakeInfo",
    SNAKE_MOVE_EVENT: "ev_snakeMove",
    FOOD_INIT_EVENT: "ev_foodInit",

    events: {},
};

module.exports = obj;