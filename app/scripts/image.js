'use strict';
(function(w){
    var THREE = w.THREE;
    
    function Image3D(scene,camera,texture,args){
        THREE.Object3D.call(this);
        
        var geometry = new THREE.PlaneBufferGeometry(texture.image.width/args.scale||10,texture.image.height/args.scale||10);
        var material = new THREE.MeshBasicMaterial({
            map:texture,
            transparent:true,
            opacity:1.0
        });
        var mesh = new THREE.Mesh(geometry,material);
        
        this.mesh = mesh;
        this.camera = camera;
        this.add(mesh);
        this.args = args;
        this.onFocus = args.onFocus;
        this.onBlur = args.onBlur;
        this.degree = args.degree;
        this.updatePosition();
        this.intersectable = this.args.onFocus!==undefined||this.args.onBlur!==undefined;
        
        scene.add(this);
        
        if(this.intersectable){
            scene.intersectables.push(this.children[0]);
        }
        this.remove = function(){
            if(this.intersectable){
                scene.iintersectables.splice($.inArray(this.children[0],scene.intersectables),1);
            }
            scene.remove(this);
        };
    }
    Image3D.prototype = Object.create(THREE.Object3D.prototype);
    Image3D.prototype.constructor = Image3D;
    
    Image3D.prototype.updatePosition = function(){
        var phi = (this.args.verticalDegree)*Math.PI/180;
		var theta = (this.args.degree-180)*Math.PI/180;
		
		this.position.x = -this.args.radius * Math.cos(phi) * Math.cos(theta);
		this.position.y = this.args.radius * Math.sin(phi);
		this.position.z = this.args.radius * Math.cos(phi) * Math.sin(theta);
		
		this.lookAt(this.camera.position);
    };
    
    w.Image3D = Image3D;
})(window);
