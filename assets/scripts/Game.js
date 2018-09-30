// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var common = require('Common');
var GLB = require('Glb');

cc.Class({
    extends: cc.Component,

    properties: {
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        snake: {
            default: null,
            type: cc.Prefab
        },

        food: {
            default: null,
            type: cc.Prefab
        },

        // 背景节点
        main: {
            default: null,
            type: cc.Node
        },

        // 结束后菜单
        menu: {
            default: null,
            type: cc.Node
        },

        // 方向盘
        joystick: {
            default: null,
            type: cc.Node
        },

        players: [],
        foods: []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // init
        common.game = this;        

        // cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().gravity = cc.v2()

        this.startGame();
    },    

    start () {
    },

    update (dt) {
        if (!this.snakeMain) {
            return;
        }

        // 根据主玩家的位置更新背景位置
        var pos = this.snakeMain.node.position.neg();
        this.main.setPosition(pos);
    },

    setDirection(posDir) {        
        this.snakeMain.baseInfo.direction = posDir.normalize();

        // send move event to other players
        var msg = {
            action: GLB.SNAKE_MOVE_EVENT,
            userId: GLB.userInfo.id,
            snakeInfo: this.snakeMain.baseInfo
        };
        Game.GameManager.sendEvent(msg);
    },

    onDestroy() {
        // close matchvs receivers
        clientEvent.off(clientEvent.eventType.sendEventResponse, this.sendEventResponse, this);
        clientEvent.off(clientEvent.eventType.sendEventNotify, this.sendEventNotify, this);
        clientEvent.off(clientEvent.eventType.gameServerNotify, this.gameServerNotify, this);
    },

    /**
     * start game with new snake
     */
    startGame() {
        // hide the menu layer
        this.menu.active = false;

        // init matchvs receivers
        clientEvent.on(clientEvent.eventType.sendEventResponse, this.sendEventResponse, this);
        clientEvent.on(clientEvent.eventType.sendEventNotify, this.sendEventNotify, this);
        clientEvent.on(clientEvent.eventType.gameServerNotify, this.gameServerNotify, this);

        var posInit = cc.v2(0, 0);

        // send game start event to the users
        var msg = {
            action: GLB.GAME_START_EVENT,
            userInfo: GLB.userInfo,
            position: posInit
        };
        Game.GameManager.sendEvent(msg, true);

        // this.initMainSnake(posInit);
    },

    /**
     * init main player snake
     */
    initMainSnake(pos) {
        this.snakeMain = this.initSnakeWithPosition(pos);            
    },

    initSnakeWithPosition(pos) {
        var snake = cc.instantiate(this.snake);
        this.main.addChild(snake, Game.MAX_SNAKE_LEN);
        var snakeObj = snake.getComponent('Snake');
        snakeObj.initHead(pos);

        return snakeObj;
    },

    /**
     * add new plyaer with user info
     * @param {*} userInfo 
     * @param {*} snake 
     */
    addNewPlayer(userInfo, snake) {
        snake.userInfo = userInfo;
        this.players.push(snake);
    },

    getPlayerByUserId(userId) {
        var res = this.players.find(function(element) {
            return element.userInfo.id == userId;
        });

        return res;
    },

    showGameOver() {
        this.snakeMain = null;

        var self = this;
        // show game over after 1s
        setTimeout(function() {
            self.menu.active = true;
        }, 1000);        
    },

    // button events
    onButRestart() {
        this.startGame();
    },

    onButBack() {
        // Go to menu scene
        cc.director.loadScene("menu");
    },

    addFood(position, weight = 1) {
        var foodNew = cc.instantiate(this.food);
        this.main.addChild(foodNew);
        var foodObj = foodNew.getComponent('Food');

        // foodObj.id = foodInfo.id;

        foodObj.initWithPosition(position, weight)

        this.foods.push(foodObj);
    },


    //
    // Matchvs receivers
    //
    sendEventResponse: function(sendEventRsp) {
        if (!sendEventRsp || !sendEventRsp.status || sendEventRsp.status != 200) {
            console.log('发送事件信息失败:' + sendEventRsp.status);
        }

        var event = GLB.events[sendEventRsp.sequence];

        if (event && event.action === GLB.GAME_START_EVENT) {
            // init main player snake
            this.initMainSnake(event.position);
        }        
        
        delete GLB.events[sendEventRsp.sequence];
    },

    sendEventNotify: function(info) {
        var cpProto = JSON.parse(info.cpProto);

        // received new user's start
        if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
            // add new user's snake
            var userInfo = cpProto.userInfo;
            var pos = cpProto.position;

            var snakeNew = this.initSnakeWithPosition(pos);
            this.addNewPlayer(userInfo, snakeNew);

            // send my existence to that user
            var msg = {
                action: GLB.SNAKE_INFO_EVENT,
                userInfo: GLB.userInfo,
                snakeInfo: this.snakeMain.baseInfo
            };
            Game.GameManager.sendEventEx(msg, userInfo.id);
        }
        else {            
            var snakeInfo = cpProto.snakeInfo;

            // init other players
            if (info.cpProto.indexOf(GLB.SNAKE_INFO_EVENT) >= 0) {
                var userInfo = cpProto.userInfo;

                // add new user's snake
                var snakeNew = this.initSnakeWithPosition(snakeInfo.position);
                snakeNew.baseInfo.setValues(snakeInfo);

                this.addNewPlayer(userInfo, snakeNew);
            }
            // move event of other snakes
            else if (info.cpProto.indexOf(GLB.SNAKE_MOVE_EVENT) >= 0) {
                var userId = cpProto.userId;

                // get the specified player
                var snake = this.getPlayerByUserId(userId);
                if (!snake) {
                    return;
                }

                snake.baseInfo.setValues(snakeInfo);
            }
        }
    },

    gameServerNotify: function(info) {
        cc.log('gameServerNotify');

        if (!info || !info.cpProto) {
            return;
        }

        var cpProto = JSON.parse(info.cpProto);

        if (info.cpProto.indexOf(GLB.FOOD_INIT_EVENT) >= 0) {
            for (var i = 0; i < cpProto.foods.length; i++) {
                var foodInfo = cpProto.foods[i];
                
                // generate food
                var x = foodInfo.point.x - GLB.GROUND_WIDTH / 2;
                var y = foodInfo.point.y - GLB.GROUND_HEIGHT / 2;

                this.addFood(cc.v2(x, y));                
            }

            cc.log('init foods: ' + cpProto.foods.length);
        }
    }
});
