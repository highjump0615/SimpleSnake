
cc.Class({
    extends: cc.Component,

    enableButton(button, enable) {
        button.enabled = enable;
        button.node.opacity = enable ? 255 : 120.0;
    }

});
