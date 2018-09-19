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

        length: 1,
        thickness: 20,
        speed: 2,
        direction: null,
        spacing: 40,

        paths: [],
        seqIndex: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initPosition = this.node.position;
    },

    start () {
    },

    update (dt) {                
        if (helper.isInGameArea(this.node.position)) {
            // head, calculate the new position
            if (!this.prev) {
                var posNext = this.getNextPosition();
                this.node.setPosition(posNext);

                // push new point at the beginning
                this.paths.unshift(posNext)
            }
            // body, follow the prev path
            else {
                this.node.setPosition(this.paths[0]);
            }

            // reached the length of current element
            if (this.paths.length >= this.spacing / this.speed) {
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
        if (this.length <= 1) {
            return
        }

        var newBody = cc.instantiate(common.game.snake);
        var newBodyObj = newBody.getComponent('Snake');
        this.node.parent.addChild(newBody, helper.MAX_SNAKE_LEN - this.seqIndex - 1);

        newBody.setPosition(this.initPosition);
        newBodyObj.length = this.length - 1;
        newBodyObj.prev = this.node;
        newBodyObj.seqIndex = this.seqIndex + 1;
        newBodyObj.initBody();
        
        this.next = newBody;
    },

    initHead() {
        var posDir = new cc.Vec2(1,1);
        this.direction = posDir.normalize();

        // add head image
        var self = this;
        cc.loader.loadRes("textures/snake/snakeHead", cc.SpriteFrame, function(err, spriteFrame) {
            self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });        
    },

    initBody() {
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
        var posOffset = this.direction.mul(this.speed);

        return posCur.add(posOffset);
    }
});
