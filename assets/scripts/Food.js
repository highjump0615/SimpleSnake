var GLB = require('Glb');

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        weight: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * Initialize
     * @param {v2} position 
     */
    initWithPosition(position, weight) {
        this.node.setPosition(position);

        this.weight = weight

        // add image
        var self = this;

        if (weight > 1) {
            // food from snake body
            cc.loader.loadRes("textures/snake/food_body", cc.SpriteFrame, function(err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        else {
            var n = parseInt(Math.random() * 5) + 1;            
            cc.loader.loadRes("textures/snake/food" + n, cc.SpriteFrame, function(err, spriteFrame) {
                self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    }
});
