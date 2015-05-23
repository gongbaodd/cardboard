'use strict';
(function(w){
    var THREE = w.THREE;
    
    function cube(scene,args){
        THREE.Object3D.call(this);
        args = args || {
            width:5,
            color:0xffffff,
            pos:[0,-5,0],
            rot:[0,0,0]
        };
        var geo = new THREE.BoxGeometry(args.width,args.width,args.width);
        var mat = new THREE.MeshLambertMaterial({color:args.color});

        this.cube = new THREE.Mesh(geo,mat);
        this.cube.position.x = args.pos[0];
        this.cube.position.y = args.pos[1];
        this.cube.position.z = args.pos[2];
        this.cube.rotation.x = args.rot[0]*Math.PI;
        this.cube.rotation.y = args.rot[1]*Math.PI;
        this.cube.rotation.z = args.rot[2]*Math.PI;
        
        scene.add(this.cube);
        
        this.remove = function(){
            scene.remove(this.cube);
        }
        
    }
    cube.prototype = Object.create(THREE.Object3D.prototype);
    cube.prototype.constructor = cube;
    
    w.Cube = cube;
})(window);