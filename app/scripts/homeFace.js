'use strict';
(function(w){
    var THREE = w.THREE;
    function HomeFace(scene,camera){
        THREE.Object3D.call(this);
        scene.face = this;
        
        this.back = new w.Skydom(scene);
        
        this.remove = function() {
            this.back.remove();
            scene.removeFace(this);
        };
    }
    HomeFace.prototype = Object.create(THREE.Object3D.prototype);
    HomeFace.prototype.constructor = HomeFace;
    
    w.HomeFace = HomeFace;
})(window);