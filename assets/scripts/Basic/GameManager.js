var mvs = require("Matchvs");
var GLB = require("Glb");
var Config = require("Config");

cc.Class({
    extends: cc.Component,

    blockInput() {
        Game.GameManager.getComponent(cc.BlockInputEvents).enabled = true;
        setTimeout(function() {
            Game.GameManager.node.getComponent(cc.BlockInputEvents).enabled = false;
        }, 1000);
    },

    onLoad() {
        Game.GameManager = this;
        clientEvent.init();
    },

    matchVsInit: function() {        
        mvs.response.initResponse = this.initResponse.bind(this);
        mvs.response.errorResponse = this.errorResponse.bind(this);
        mvs.response.joinRoomResponse = this.joinRoomResponse.bind(this);
        mvs.response.joinRoomNotify = this.joinRoomNotify.bind(this);
        mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
        mvs.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
        mvs.response.joinOverResponse = this.joinOverResponse.bind(this);
        mvs.response.createRoomResponse = this.createRoomResponse.bind(this);
        mvs.response.getRoomListResponse = this.getRoomListResponse.bind(this);
        mvs.response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
        mvs.response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
        mvs.response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
        mvs.response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
        mvs.response.registerUserResponse = this.registerUserResponse.bind(this);
        mvs.response.loginResponse = this.loginResponse.bind(this); // 用户登录之后的回调
        mvs.response.logoutResponse = this.logoutResponse.bind(this); // 用户登录之后的回调
        mvs.response.sendEventNotify = this.sendEventNotify.bind(this);
        mvs.response.networkStateNotify = this.networkStateNotify.bind(this);

        mvs.response.sendEventResponse = this.sendEventResponse.bind(this);

        var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, Config.gameId);
        if (result !== 0) {
            console.log('初始化失败,错误码:' + result);
        }
        // Game.GameManager.blockInput();
    },

    networkStateNotify: function(netNotify) {
        clientEvent.dispatch(clientEvent.eventType.leaveRoomMedNotify, netNotify);
    },

    kickPlayerNotify: function(kickPlayerNotify) {
        var data = {
            kickPlayerNotify: kickPlayerNotify
        }
        clientEvent.dispatch(clientEvent.eventType.kickPlayerNotify, data);
    },

    kickPlayerResponse: function(kickPlayerRsp) {
        if (kickPlayerRsp.status !== 200) {
            console.log("失败kickPlayerRsp:" + kickPlayerRsp);
            return;
        }
        var data = {
            kickPlayerRsp: kickPlayerRsp
        }
        clientEvent.dispatch(clientEvent.eventType.kickPlayerResponse, data);
    },

    getRoomListExResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 rsp:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomListExResponse, data);
    },

    getRoomDetailResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 rsp:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomDetailResponse, data);
    },

    getRoomListResponse: function(status, roomInfos) {
        if (status !== 200) {
            console.log("失败 status:" + status);
            return;
        }
        var data = {
            status: status,
            roomInfos: roomInfos
        }
        clientEvent.dispatch(clientEvent.eventType.getRoomListResponse, data);
    },

    createRoomResponse: function(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 createRoomResponse:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        }
        clientEvent.dispatch(clientEvent.eventType.createRoomResponse, data);
    },

    joinOverResponse: function(joinOverRsp) {
        if (joinOverRsp.status !== 200) {
            console.log("失败 joinOverRsp:" + joinOverRsp);
            return;
        }
        var data = {
            joinOverRsp: joinOverRsp
        }
        clientEvent.dispatch(clientEvent.eventType.joinOverResponse, data);
    },

    joinRoomResponse: function(status, roomUserInfoList, roomInfo) {
        if (status !== 200) {
            console.log("失败 joinRoomResponse:" + status);
            return;
        }
        var data = {
            status: status,
            roomUserInfoList: roomUserInfoList,
            roomInfo: roomInfo
        }
        clientEvent.dispatch(clientEvent.eventType.joinRoomResponse, data);
    },

    joinRoomNotify: function(roomUserInfo) {
        var data = {
            roomUserInfo: roomUserInfo
        }
        clientEvent.dispatch(clientEvent.eventType.joinRoomNotify, data);
    },

    leaveRoomResponse: function(leaveRoomRsp) {
        if (leaveRoomRsp.status !== 200) {
            console.log("失败 leaveRoomRsp:" + leaveRoomRsp);
            return;
        }
        var data = {
            leaveRoomRsp: leaveRoomRsp
        }
        clientEvent.dispatch(clientEvent.eventType.leaveRoomResponse, data);
    },

    leaveRoomNotify: function(leaveRoomInfo) {
        var data = {
            leaveRoomInfo: leaveRoomInfo
        }
        clientEvent.dispatch(clientEvent.eventType.leaveRoomNotify, data);
    },

    logoutResponse: function(status) {
        Game.GameManager.network.disconnect();
        cc.game.removePersistRootNode(this.node);
        cc.director.loadScene('lobby');
    },

    errorResponse: function(error, msg) {
        if (error === 1001 || error === 0) {
        }
        console.log("错误信息：" + error);
        console.log("错误信息：" + msg);

        var data = {
            error: error,
            msg: msg
        }
        clientEvent.dispatch(clientEvent.eventType.errorResponse, data);
    },

    initResponse: function() {
        console.log('初始化成功，开始注册用户');
        var result = mvs.engine.registerUser();
        if (result !== 0) {
            console.log('注册用户失败，错误码:' + result);
        } else {
            console.log('注册用户成功');
        }
    },

    registerUserResponse: function(userInfo) {
        var deviceId = 'abcdef';
        var gatewayId = 0;
        GLB.userInfo = userInfo;

        console.log('开始登录,用户Id:' + userInfo.id)

        var result = mvs.engine.login(
            userInfo.id, userInfo.token,
            Config.gameId, Config.gameVersion,
            Config.appKey, Config.secret,
            deviceId, gatewayId
        );
        if (result !== 0) {
            console.log('登录失败,错误码:' + result);
        }
    },

    loginResponse: function(info) {
        if (info.status !== 200) {
            console.log('登录失败,异步回调错误码:' + info.status);
        } 
        else {
            console.log('登录成功');
        }

        clientEvent.dispatch(clientEvent.eventType.loginResponse, info);
    },

    // 玩家行为通知--
    sendEventNotify: function(info) {
        clientEvent.dispatch(clientEvent.eventType.sendEventNotify, info);
    },

    sendEventResponse: function(sendEventRsp) {
        clientEvent.dispatch(clientEvent.eventType.sendEventResponse, sendEventRsp);
    },


    sendEvent: function(msg) {
        var result = mvs.engine.sendEvent(JSON.stringify(msg));
        if (result.result !== 0) {
            console.log(msg.action, result.result);
        }

        GLB.events[result.sequence] = msg;
    },
    
    sendEventEx: function(msg, userId) {
        var result = mvs.engine.sendEventEx(0, JSON.stringify(msg), 0, [userId]);
        if (result.result !== 0) {
            console.log(msg.action, result.result);
        }

        GLB.events[result.sequence] = msg;
    },

});