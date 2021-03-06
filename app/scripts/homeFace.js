'use strict';
(function(w){
    var THREE = w.THREE;
    function HomeFace(scene,camera){
        THREE.Object3D.call(this);
        scene.face = this;
        
        this.background = new w.Skydom(scene);
        
        this.Lights = new w.Lights(scene,camera);
        
        this.cards = new w.Cards(scene,camera,w.manifest);

//        scene.add(self);
//        camera.position.set(0,0,0)
     
        this.remove = function() {
            this.background.remove();
            this.Lights.remove();
            this.cards.remove();
            scene.removeFace(this);
        };
    }
    HomeFace.prototype = Object.create(THREE.Object3D.prototype);
    HomeFace.prototype.constructor = HomeFace;
    
    w.HomeFace = HomeFace;
})(window);
