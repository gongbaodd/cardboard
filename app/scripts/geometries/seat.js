'use strict';
(function(w){
    var THREE = w.THREE;
    function seat(scene,args){
        w.Cube.call(this,scene,args);
        
//        var axes = new THREE.AxisHelper(20);
//            this.cube.add(axes);
        
        var textGeo = new THREE.TextGeometry( args.text, {
            size: args.size || 1,
            height: args.height || 0.4,
            curveSegments: args.curveSegments || 1,
            font: args.font || 'helvetiker',
            bevelThickness: args.bevelThickness || 0.1,
            bevelSize: args.bevelSize || 0.1,
            bevelEnabled: args.bevelEnabled || true,
            material: 0,
            extrudeMaterial: 1,
	   });
       var textMat = new THREE.MeshFaceMaterial( [
		  new THREE.MeshPhongMaterial( { color: args.textColor || 0x000000, shading: THREE.SmoothShading, shininess: 5, transparent: args.transparent || false, opacity: args.opacity || 1 } ), // front
		  new THREE.MeshPhongMaterial( { color: args.color || 0x000000, shading: THREE.SmoothShading, shininess: 5, transparent: args.transparent || false, opacity: args.opacity || 1 } ) // side
	   ]);
        
        this.text = new THREE.Mesh( textGeo, textMat );
        this.text.position.x = args.pos[0];
        this.text.position.y = args.pos[1]+2.2;
        this.text.position.z = args.pos[2];
        this.text.rotation.x = args.rot[0]*Math.PI;
        this.text.rotation.y = args.rot[1]*Math.PI;
        this.text.rotation.z = args.rot[2]*Math.PI;
        
        scene.add(this.text);
        
        this.name = args.text;
        
        this.onFocus = args.onFocus;
        
        this.onBlur = args.onBlur;
        
        this.cube.parent = this;
        
        this.intersectable = args.onFocus!==undefined||args.onBlur!==undefined;
        if(this.intersectable){
            scene.intersectables.push(this.cube);
        }
        
        this.remove = function(){
            scene.remove(this.cube);
            scene.remove(this.text);
            if(this.intersectable){
                scene.intersectables.splice($.inArray(this.cube,scene.intersectables),1);
            }
        };
    }
    seat.prototype = Object.create(w.Cube.prototype);
    seat.prototype.constructor = seat;
    
    w.Seat = seat;
})(window);