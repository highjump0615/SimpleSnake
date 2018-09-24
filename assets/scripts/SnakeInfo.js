class SnakeInfo {

    constructor() {
        this.speed = 2;        
        this.position = null;
        this.length = 0;

        var posDir = new cc.Vec2(1,1);
        this.direction = posDir.normalize();
    }

    /**
     * set values from object
     * @param {object} obj 
     */
    setValues(obj) {
        this.speed = obj.speed;        
        this.position = cc.v2(obj.position.x, obj.position.y);
        this.length = obj.length;
        this.direction = cc.v2(obj.direction.x, obj.direction.y);
    }

}


module.exports = SnakeInfo;