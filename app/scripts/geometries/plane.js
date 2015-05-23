'use strict';
(function(w){
    var THREE= w.THREE;
    
    function Plane(scene,args) {
        THREE.Object3D.call(this);
        
        args = args || {
            width:500,
            length:500,
            color:0xffffff,
            shadow:true,
            pos:[0,-20,0],
            rot:[-0.5,0,0]
        };
        
        var Geo = new THREE.PlaneBufferGeometry(args.width,args.length);
        var Mat = new THREE.MeshLambertMaterial({color:args.color,wireframe:false});
        
        this.plane = new THREE.Mesh(Geo,Mat);
        this.plane.position.x = args.pos[0];
        this.plane.position.y = args.pos[1];
        this.plane.position.z = args.pos[2];
        this.plane.rotation.x = args.rot[0]*Math.PI;
        this.plane.rotation.y = args.rot[1]*Math.PI;
        this.plane.rotation.z = args.rot[2]*Math.PI;    
        
//        this.plane.add(new THREE.AxisHelper(20));
        scene.add(this.plane);
        this.remove = function(){
            scene.remove(this.plane);
        }
        
    }
    Plane.prototype = Object.create(THREE.Object3D.prototype);
    Plane.prototype.constructor = Plane;
    
    w.Plane = Plane;
})(window);