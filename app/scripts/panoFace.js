'use strict';
(function(w){
    var THREE = w.THREE;

    function PanoFace(scene,camera){
        THREE.Object3D.call(this);

        this.background = new w.Panorama(scene,'../images/panorama/PANO0.jpg');

        this.lights = new w.Lights(scene);

        this.remove = function() {
            this.background.remove();
            this.lights.remove();
            scene.removeFace(this);
        }
    }
    PanoFace.prototype = Object.create(THREE.Object3D.prototype);
    PanoFace.prototype.constructor = PanoFace;

    w.PanoFace = PanoFace;

})(window);
