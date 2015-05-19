'use strict';
(function(w){
    var THREE = w.THREE;
    function Text(scene,camera,args){
        THREE.Object3D.call(this);
        
        var text3d = createText(this,args);
        text3d.receiveShadow = args.receiveShadow || true;
        text3d.castShadow = false;
        
        text3d.computeBoundingBox();
        
        var phi = (args.verticalDegree)*Math.PI/180;
        var theta = (args.degree-180)*Math.PI/180;
        var centroid = getCentroid( this.textMesh );
	
        this.textMesh.position.x = (-args.radius * Math.cos(phi) * Math.cos(theta));
        this.textMesh.position.y = args.radius * Math.sin(phi);
        this.textMesh.position.z = (args.radius * Math.cos(phi) * Math.sin(theta));
    
        this.textMesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( -centroid.x, -centroid.y, -centroid.z ) );
        
        this.textMesh.lookAt(camera.position);
        
        scene.add(this.textMesh);
        
        var text = this;
        
        this.remove = function() {
            scene.remove(this);
            scene.remove(text.textMesh);
            text.textMesh.geometry.dispose();
        };
    }
    Text.prototype = Object.create(THREE.Object3D.prototype);
    Text.prototype.constructor = Text;
    
    function getCentroid(mesh){
        mesh.geometry.computeBoundingBox();
        var boundingBox = mesh.geometry.boundingBox;

        var x0 = boundingBox.min.x;
        var x1 = boundingBox.max.x;
        var y0 = boundingBox.min.y;
        var y1 = boundingBox.max.y;
        var z0 = boundingBox.min.z;
        var z1 = boundingBox.max.z;

        var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
        var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
        var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

        var centroidX = x0 + ( bWidth / 2 ) + mesh.position.x;
        var centroidY = y0 + ( bHeight / 2 )+ mesh.position.y;
        var centroidZ = z0 + ( bDepth / 2 ) + mesh.position.z;

        mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ };
        
        return mesh.geometry.centroid;
    }
    
    function createText(root,args){
        var textGeo = new THREE.TextGeometry( args.text, {
            size: args.size || 3,
            height: args.height || 0.4,
            curveSegments: args.curveSegments || 1,
            font: args.font || 'helvetiker',
            bevelThickness: args.bevelThickness || 0.1,
            bevelSize: args.bevelSize || 0.1,
            bevelEnabled: args.bevelEnabled || true,
            material: 0,
            extrudeMaterial: 1
	   });
	
	   root.textGeo = textGeo;

	   textGeo.computeBoundingBox();
	   textGeo.computeVertexNormals();
	
	   root.material = new THREE.MeshFaceMaterial( [
		  new THREE.MeshPhongMaterial( { color: args.color || 0xffffff, shading: THREE.SmoothShading, shininess: 5, transparent: args.transparent || false, opacity: args.opacity || 1 } ), // front
		  new THREE.MeshPhongMaterial( { color: args.color || 0xffffff, shading: THREE.SmoothShading, shininess: 5, transparent: args.transparent || false, opacity: args.opacity || 1 } ) // side
	   ] );
	
	   root.textMesh = new THREE.Mesh( textGeo, args.material || root.material );

	   return textGeo;
    }
    
    w.Text = Text;
})(window);