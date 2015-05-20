'use strict';
(function(w){
    var THREE = w.THREE;
    function Lights(scene){
        THREE.Object3D.call(this);
        
        
        this.direct = new THREE.DirectionalLight(0xffffff,0.125);
        this.direct.position.set(0,0,0);
        scene.add(this.direct);
        
        this.point = new THREE.PointLight(0xffffff,1.0);
        this.point.position.set(5,0,0);
        scene.add(this.point);
        
        var self = this;
        
        this.remove = function(){
            scene.remove(self.direct);
            scene.remove(self.point);
        };
    }
    Lights.prototype = Object.create(THREE.Object3D.prototype);
    Lights.prototype.constructor = Lights;
    
    w.Lights = Lights;
})(window);