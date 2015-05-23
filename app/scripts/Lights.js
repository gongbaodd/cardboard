'use strict';
(function(w){
    var THREE = w.THREE;
    function Lights(scene,camera){
        THREE.Object3D.call(this);
        
        
        this.direct = new THREE.DirectionalLight(0xffffff,0.125);
        this.direct.position.set(0,0,0);
        scene.add(this.direct);
        
        this.point = new THREE.PointLight(0xffffff,1.0);
        this.point.position.set(5,0,0);
        scene.add(this.point);
        
        this.ambient = new THREE.AmbientLight(0x333333);
        scene.add(this.ambient);

        this.spot = new THREE.SpotLight(0xffffff);
        this.spot.position.set(camera.position);
        this.spot.castShadow = true;
        this.spot.shadowCameraNear = 2;
        this.spot.shadowCameraFar = 200;
        this.spot.shadowCameraFov = 30;
        this.spot.distance = 0;
        this.spot.angle = 0.4;
        scene.add(this.spot);
        
        var self = this;
        
        this.remove = function(){
            scene.remove(self.direct);
            scene.remove(self.point);
            scene.remove(self.ambient);
            scene.remove(self.spot);
        };
    }
    Lights.prototype = Object.create(THREE.Object3D.prototype);
    Lights.prototype.constructor = Lights;
    
    w.Lights = Lights;
})(window);