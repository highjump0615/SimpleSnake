// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var helper = require('Helpers');
var common = require('Common');
var SnakeInfo = require('SnakeInfo');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        baseInfo: null,

        thickness: 20,
        spacing: 40,

        paths: [],
        seqIndex: 0,

        userInfo: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.baseInfo = new SnakeInfo();        
    },

    start () {
    },

    update (dt) {                
        if (helper.isInGameArea(this.node.position)) {
            var posOld = this.node.position;

            // head, calculate the new position
            if (!this.prev) {
                var posNext = this.getNextPosition();
                this.updatePosition(posNext);

                // push new point at the beginning
                this.paths.unshift(posNext)
            }
            // body, follow the prev path
            else {
                this.updatePosition(this.paths[0]);
            }

            // rotate image
            var posAngle = this.node.position.sub(posOld);
            var angle = Math.atan2(posAngle.y, posAngle.x) / Math.PI * 180;
            this.node.rotation = -angle;

            // reached the length of current element
            if (this.paths.length >= this.spacing / this.baseInfo.speed) {
                var posLast = this.paths.pop();
                
                // try to make new elemnt
                this.addBodyElement();

                if (this.next) {
                    // add last position to the next node
                    var next = this.next.getComponent('Snake');
                    next.paths.unshift(posLast);
                }
            }
        }
    },

    addBodyElement() {
        // already added prev element, no need to add again
        if (this.next) {
            return;
        }

        // 生成身体部分
        if (this.baseInfo.length <= 1) {
            return;
        }

        var newBody = cc.instantiate(common.game.snake);
        var newBodyObj = newBody.getComponent('Snake');
        this.node.parent.addChild(newBody, Game.MAX_SNAKE_LEN - this.seqIndex - 1);

        newBodyObj.baseInfo.length = this.baseInfo.length - 1;
        newBodyObj.prev = this.node;
        newBodyObj.seqIndex = this.seqIndex + 1;
        newBodyObj.initBody(this.initPosition);
        
        this.next = newBody;
    },

    initWithPosition(position) {
        this.updatePosition(position);
        this.initPosition = position;
    },

    /**
     * Initialize snake head
     * @param {v2} position 
     */
    initHead(position) {        
        this.initWithPosition(position);

        // add head image
        var self = this;
        cc.loader.loadRes("textures/snake/snakeHead", cc.SpriteFrame, function(err, spriteFrame) {
            self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        // set base info
        this.baseInfo.length = 10;
    },

    initBody(position) {        
        this.initWithPosition(position);
        
        // add body image
        var self = this;
        cc.loader.loadRes("textures/snake/snakeBody", cc.SpriteFrame, function(err, spriteFrame) {
            self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });        
    },

    /**
     * 根据方向计算下一个移动位置
     */
    getNextPosition() {
        var posCur = this.node.position;
        var posOffset = this.baseInfo.direction.mul(this.baseInfo.speed);

        return posCur.add(posOffset);
    },

    /**
     * update position
     * @param {vec2} pos 
     */
    updatePosition(pos) {
        this.node.setPosition(pos);
        this.baseInfo.position = pos;
    }
});
