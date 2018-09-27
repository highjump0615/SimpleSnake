var GLB = require('Glb');

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0
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
    initWithPosition(position) {        
        var x = position.x - GLB.GROUND_WIDTH / 2;
        var y = position.y - GLB.GROUND_HEIGHT / 2;

        this.node.setPosition(cc.v2(x, y));

        // add image
        var n = parseInt(Math.random() * 5) + 1;
        var self = this;
        cc.loader.loadRes("textures/snake/food" + n, cc.SpriteFrame, function(err, spriteFrame) {
            self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
});
