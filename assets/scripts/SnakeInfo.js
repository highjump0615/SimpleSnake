class SnakeInfo {

    constructor() {
        this.speed = 2;        
        this.position = null;
        this.length = 0;

        var posDir = new cc.Vec2(1,1);
        this.direction = posDir.normalize();
    }

}


module.exports = SnakeInfo;