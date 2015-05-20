'use strict';
(function(w){
    var THREE = w.THREE;
    function HomeFace(scene,camera){
        THREE.Object3D.call(this);
        scene.face = this;
        
        this.background = new w.Skydom(scene);
        
        this.Lights = new w.Lights(scene);
        
        this.cards = new w.Cards(scene,camera,w.manifest);
        
        
//        self.cards = new w.Cards(scene,camera,[]);
//        
//        scene.add(self);
        
//        console.log(scene);
        
     
        this.remove = function() {
            this.background.remove();
            this.Lights.remove();
            
            scene.removeFace(this);
        };
    }
    HomeFace.prototype = Object.create(THREE.Object3D.prototype);
    HomeFace.prototype.constructor = HomeFace;
    
    w.HomeFace = HomeFace;
})(window);