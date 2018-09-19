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
var helper = require('Helpers');

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

        // init main player snake
        var snake = cc.instantiate(this.snake);
        this.main.addChild(snake, helper.MAX_SNAKE_LEN);
        snake.setPosition(cc.v2(0, 0));
        snake.getComponent("Snake").initHead();

        this.snakeMain = snake;
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
        this.snakeMain.getComponent("Snake").direction = posDir.normalize();
    }
});
