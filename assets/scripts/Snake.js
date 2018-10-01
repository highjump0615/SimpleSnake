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

                // add last position to the next node
                if (this.next) {
                    this.next.paths.unshift(posLast);
                }
                // the last element, check the current length and try to make new elemnt
                else {
                    this.addBodyElement();
                }
            }
        }
        else {
            // head
            if (!this.prev) {
                // hit the border, game over
                this.die();
                common.game.showGameOver();

                return;
            }
        }

        // 
        // only consider head
        //
        if (this.prev) {
            return;
        }

        // check if eats food
        var i = common.game.foods.length
        while (i--) {
            var food = common.game.foods[i];

            if (this.getDistanceTo(food.node.position) < Game.DIST_FOOD_EAT) {
                // restrict angle, so it can only it in its direction
                if (this.getAngleTo(food.node.position) > 45) {
                    continue;
                }

                //
                // eat food
                //

                // action
                var actionMove = cc.moveTo(0.1, this.getNextPosition()).easing(cc.easeCubicActionOut());
                var callback = cc.callFunc(function(target, data) {
                    // remove food
                    data.node.removeFromParent();
                    data.destroy();
                }, this, food);

                var action = cc.sequence(actionMove, callback);
                food.node.runAction(action);

                // score
                this.baseInfo.incrementScore(food.weight);

                // remove from array
                common.game.foods.splice(i, 1);
            }
        }
    },

    addBodyElement() {
        // already added next element, no need to add again
        if (this.next) {
            return;
        }

        // get the head
        var head = this.getHeadElement();

        // check current length; if it is same as total length, return
        var currentLength = this.seqIndex + 1;
        if (head.baseInfo.length <= currentLength) {
            return;
        }

        var newBody = cc.instantiate(common.game.snake);
        var newBodyObj = newBody.getComponent('Snake');
        this.node.parent.addChild(newBody, Game.MAX_SNAKE_LEN - currentLength);

        newBodyObj.baseInfo.length = this.baseInfo.length - 1;
        newBodyObj.prev = this;
        newBodyObj.seqIndex = currentLength;
        newBodyObj.initBody(this.initPosition);
        
        this.next = newBodyObj;
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
        this.baseInfo.length = 6;
        this.baseInfo.score = Game.LENGTH_WEIGHT * this.baseInfo.length;
    },

    /**
     * get head element of the snake element chain
     */
    getHeadElement() {
        var element = this;
        while (element.prev) {
            element = element.prev;
        }

        return element;
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
    },

    /**
     * calculate distance
     * @param {vec2} pos 
     */
    getDistanceTo(pos) {
        var dist = pos.sub(this.node.position).mag();
        return dist;
    },

    getAngleTo(pos) {
        var diff = pos.sub(this.node.position);
        var angle = diff.angle(this.baseInfo.direction);
        return angle / Math.PI * 180;        
    },    

    /**
     * remove from game ground
     */
    die() {
        // generate foood; 2 foods for 5 lengths
        if (this.seqIndex % 5 == 1 || this.seqIndex % 5 == 4) {
            common.game.addFood(this.node.position, Game.LENGTH_WEIGHT);
        }

        if (this.next) {
            this.next.die();
        }

        this.node.removeFromParent();
        this.destroy();
    }
});
