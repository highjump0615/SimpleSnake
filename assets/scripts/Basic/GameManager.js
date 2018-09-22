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

        var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, Config.gameId);
        if (result !== 0) {
            console.log('初始化失败,错误码:' + result);
        }
        Game.GameManager.blockInput();
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
        var cpProto = JSON.parse(info.cpProto);

        if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
            var remoteUserIds = JSON.parse(info.cpProto).userIds;
            // 分队--
            if (remoteUserIds.length % 2 !== 0) {
                return console.log("人数不为偶数, 无法开战！");
            }
            var selfCamp = 0;
            var index;
            for (index = 0; index < remoteUserIds.length; index++) {
                if (GLB.userInfo.id === remoteUserIds[index]) {
                    if (index < remoteUserIds.length / 2) {
                        selfCamp = 0;
                    } else {
                        selfCamp = 1;
                    }
                    break;
                }
            }
            this.enemyIds = [];
            this.friendIds = [GLB.userInfo.id];
            for (index = 0; index < remoteUserIds.length; index++) {
                var camp = 0;
                if (index < remoteUserIds.length / 2) {
                    camp = 0;
                } else {
                    camp = 1;
                }
                if (camp === selfCamp) {
                    if (remoteUserIds[index] !== GLB.userInfo.id) {
                        this.friendIds.push(remoteUserIds[index]);
                    }
                } else {
                    this.enemyIds.push(remoteUserIds[index]);
                }
            }
            GLB.playerUserIds = this.friendIds.concat(this.enemyIds);
            console.log("remoteUserIds:" + remoteUserIds);
            console.log("GLB.playerUserIds:" + GLB.playerUserIds);

            this.startGame();
        }

        var player = null;
        if (info.cpProto.indexOf(GLB.PLAYER_FLY_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(info.srcUserId);
            if (player) {
                player.flyNotify();
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_FIRE_EVENT) >= 0) {
            for (var i = 0; i < GLB.playerUserIds.length; i++) {
                player = Game.PlayerManager.getPlayerByUserId(GLB.playerUserIds[i]);
                if (player) {
                    for (var j = 0; j < cpProto.data.length; j++) {
                        if (cpProto.data[j].playerId === player.userId) {
                            player.fireNotify(cpProto.data[j].bulletPointY);
                        }
                    }
                }
            }
        }

        if (info.cpProto.indexOf(GLB.NEW_ITEM_EVENT) >= 0) {
            Game.ItemManager.spawnItemNotify(cpProto);
        }

        if (info.cpProto.indexOf(GLB.PLAYER_GET_ITEM_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(cpProto.playerId);
            if (player) {
                player.getItemNotify(cpProto);
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_REMOVE_ITEM_EVENT) >= 0) {
            player = Game.PlayerManager.getPlayerByUserId(info.srcUserId);
            if (player) {
                player.removeItemNotify(cpProto);
            }
        }

        if (info.cpProto.indexOf(GLB.PLAYER_HURT_EVENT) >= 0) {
            if (Game.GameManager.gameState !== GameState.Over) {
                player = Game.PlayerManager.getPlayerByUserId(cpProto.playerId);
                if (player) {
                    player.hurtNotify(cpProto.murderId);
                }
                // 检查回合结束--
                var loseCamp = Game.PlayerManager.getLoseCamp();
                if (loseCamp != null) {
                    Game.GameManager.gameState = GameState.Over
                    if (GLB.isRoomOwner) {
                        this.sendRoundOverMsg(loseCamp);
                    }
                }
            }
        }

        if (info.cpProto.indexOf(GLB.ROUND_OVER) >= 0) {
            Game.GameManager.gameState = GameState.Over;
            // 如果发送方为敌方--
            var loseCamp1 = cpProto.loseCamp;
            if (this.friendIds.indexOf(info.srcUserId) < 0) {
                if (loseCamp1 === Camp.Friend) {
                    loseCamp1 = Camp.Enemy;
                } else if (loseCamp1 === Camp.Enemy) {
                    loseCamp1 = Camp.Friend;
                }
            }
            clientEvent.dispatch(clientEvent.eventType.roundOver, {loseCamp: loseCamp1});
        }

        if (info.cpProto.indexOf(GLB.ROUND_START) >= 0) {
            Game.GameManager.gameState = GameState.Play;
            clientEvent.dispatch(clientEvent.eventType.roundStart);
        }

        if (info.cpProto.indexOf(GLB.READY) >= 0) {
            this.readyCnt++;
            if (GLB.isRoomOwner && this.readyCnt >= GLB.playerUserIds.length) {
                this.sendRoundStartMsg();
            }
        }

        if (info.cpProto.indexOf(GLB.TIME_OVER) >= 0) {
            Game.GameManager.gameState = GameState.Over;
            for (var m = 0; m < GLB.playerUserIds.length; m++) {
                player = Game.PlayerManager.getPlayerByUserId(GLB.playerUserIds[m]);
                if (player) {
                    player.dead();
                }
            }
            clientEvent.dispatch(clientEvent.eventType.roundOver, {loseCamp: Camp.None});
        }
    },

});