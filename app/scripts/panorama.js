'use strict';
(function(w){
    var THREE = w.THREE;
    
    function Panorama(scene,textureUrl,args) {
        args = {} || args;
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(args.depth||100,32,32),
            new THREE.MeshBasicMaterial({
                map:THREE.ImageUtils.loadTexture(textureUrl),
                transparent:args.transparent || false,
                opacity:1
            })
        );
        
        sphere.scale.x = -1;
        
        this.sphere = sphere;
        
        scene.add(sphere);
        
        this.remove = function(){
            scene.remove(sphere);
        };
    }
    Panorama.prototype = Object.create(THREE.Object3D.prototype);
    Panorama.prototype.constructor = Panorama;
    
    w.Panorama = Panorama;
})(window);