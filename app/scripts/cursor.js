'use strict';

(function(w){
    var THREE = w.THREE;
    var SCALE = 3;
    function Cursor(camera) {
        var geometry = new THREE.RingGeometry(0.85*Cursor.SIZE*SCALE,1*Cursor.SIZE*SCALE,32);
        var material = new THREE.MeshBasicMaterial({
            color:0xffffff,
            blending:THREE.AdditiveBlending,
            side:THREE.DoubleSide
        });
        THREE.Mesh.call(this,geometry,material);
        
        this.camera = camera;
        this.position.z = -3 * SCALE;
        this.lookAt(this.camera);
    }
    Cursor.SIZE = 0.1 * SCALE;
    Cursor.prototype = Object.create(THREE.Mesh.prototype);
    Cursor.prototype.constructor = Cursor;
    
    w.Cursor = Cursor;
})(window);