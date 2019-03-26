// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        progress: {
            default: null,
            type: cc.ProgressBar
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.percent = 0;
        self = this;

        // progress
        this.progressTimer = setInterval(function() {
            self.percent += 2;

            self.progress.progress = self.percent / 100.0;

            if (self.percent > 90) {
                clearInterval(self.progressTimer);
            }
        }, 100);
    },

    start () {
        Game.GameManager.matchVsInit();

        // add event listeners
        clientEvent.on(clientEvent.eventType.loginResponse, this.didLogin, this);
        clientEvent.on(clientEvent.eventType.errorResponse, this.onMatchvsError, this);
    },

    // update (dt) {},

    didLogin: function(info) {
        // clear timer
        clearInterval(this.progressTimer);

        if (info.status == 200) {
            // set progress as 100%
            this.progress.progress = 1.0;

            // Go to menu scene
            cc.director.loadScene("menu");
        }
    },

    onMatchvsError: function(error, msg) {
        cc.log('onError');
    },

    onDestroy: function() {
        // remove event listeners
        clientEvent.off(clientEvent.eventType.loginResponse, this.didLogin, this);
        clientEvent.off(clientEvent.eventType.errorResponse, this.onMatchvsError, this);
    }
});
