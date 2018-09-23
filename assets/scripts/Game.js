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

        // 背景节点
        main: {
            default: null,
            type: cc.Node
        },

        // 方向盘
        joystick: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // init
        common.game = this;

        // cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().gravity = cc.v2()

        // init matchvs receivers
        clientEvent.on(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
        clientEvent.on(clientEvent.eventType.sendEventResponse, this.sendEventResponse, this);
        clientEvent.on(clientEvent.eventType.sendEventNotify, this.sendEventNotify, this);

        var posInit = cc.v2(0, 0);

        // game start event
        var msg = {
            action: GLB.GAME_START_EVENT,
            userInfo: GLB.userInfo,
            position: posInit
        };
        Game.GameManager.sendEventEx(msg);

        // this.initMainSnake(posInit);
    },

    start () {
    },

    update (dt) {
        if (!this.snakeMain) {
            return;
        }

        // 根据主玩家的位置更新背景位置
        var pos = this.snakeMain.position.neg();
        this.main.setPosition(pos);
    },

    setDirection(posDir) {        
        this.snakeMain.getComponent("Snake").baseInfo.direction = posDir.normalize();
    },

    onDestroy() {
        // close matchvs receivers
        clientEvent.off(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
        clientEvent.off(clientEvent.eventType.sendEventResponse, this.sendEventResponse, this);
        clientEvent.off(clientEvent.eventType.sendEventNotify, this.sendEventNotify, this);
    },

    /**
     * init main player snake
     */
    initMainSnake(pos) {
        var snake = cc.instantiate(this.snake);
        this.main.addChild(snake, Game.MAX_SNAKE_LEN);            
        snake.getComponent("Snake").initHead(pos);

        this.snakeMain = snake;            
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

        if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
        }
    },

    joinRoomNotify: function(data) {
        console.log("joinRoomNotify, roomUserInfo:" + JSON.stringify(data.roomUserInfo));
        // var playerIcon = null;
        // for (var j = 0; j < this.playerIcons.length; j++) {
        //     playerIcon = this.playerIcons[j].getComponent('playerIcon');
        //     if (playerIcon && !playerIcon.userInfo) {
        //         playerIcon.setData(data.roomUserInfo);
        //         break;
        //     }
        // }
    },
});
