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

        // background
        fixedPoint: {
            default: null,
            type: cc.Node
        },

        movePoint: {
            default: null,
            type: cc.Node
        },

        anglePreDirQuadrant: 23,
        movePointMoveRadius: 100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var nodeSize = this.node.getContentSize();

        // 固定点位置范围
        this.fixedPointMoveCenterPos = new cc.Vec2(0, 0);
        this.movePointMoveRadius = nodeSize.width / 2;

        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            if (this.touchID == -1) {
                //触摸位置
                this.setMarkerPosition(event.getLocation());

                this.touchID = event.getID();
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this.touchID == event.getID()){
                //触摸位置
                this.setMarkerPosition(event.getLocation());
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.init();
        }, this);
 
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.init();
        }, this);
 
        this.init();
    },    

    start () {

    },

    // update (dt) {},

    /**
     * 初始化
     */
    init(){
        this.touchID = -1;
        
        this.setMovePointPos(this.fixedPointMoveCenterPos)
    },

    /**
     * 圆形限制，防止溢出
     * @param {cc.Vec2} pos 需要固定位置
     * @param {cc.Vec2} centerPos 限制中心位置
     * @param {number} radius 限制半径
     */
    clampPos(pos, centerPos, radius) {
        var dpos = pos.sub(centerPos);
        if (dpos.mag() > radius) {
            return dpos.normalize().mul(radius).add(centerPos);
        } 
        else {
            return pos;
        }
    },

    /**
     * 设置移动点位置
     * @param {cc.Vec2} pos 
     */
    setMovePointPos(pos) {
        this.movePoint.setPosition(pos);
    },

    setMarkerPosition(pt) {
        let _pos = new cc.Vec2(pt.x,pt.y);
        _pos.subSelf(this.node.position);

        //控制位置
        let pos = this.clampPos(_pos, this.fixedPointMoveCenterPos, this.movePointMoveRadius);
        //设置固定点位置
        this.setMovePointPos(pos);
    },
});
