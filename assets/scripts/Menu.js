var uiBasePanel = require("UiBasePanel");
var GLB = require("Glb");
var mvs = require("Matchvs");

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
    extends: uiBasePanel,

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

        butInfinity: {
            default: null,
            type: cc.Button
        },

        butTime: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // disable buttons before getting room
        this.enableButtons(false);
    },

    start () {        
        clientEvent.on(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);

        // join room
        mvs.engine.joinRandomRoom(GLB.MAX_PLAYER_COUNT, '');
    },

    // update (dt) {},

    joinRoomResponse: function(data) {
        if (data.status !== 200) {
            console.log('进入房间失败,异步回调错误码: ' + data.status);
            return;
        }

        console.log('进入房间成功');
        console.log('房间号: ' + data.roomInfo.roomID);

        GLB.roomID = data.roomInfo.roomID;

        // enable buttons
        this.enableButtons(true);
    },

    enableButtons(enable) {
        this.enableButton(this.butInfinity, enable);
        this.enableButton(this.butTime, enable);
    },

    // button event
    onButInifity() {
        // Go to main game scene
        cc.director.loadScene("game");
    },

    onDestroy() {
        clientEvent.off(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    }
});
