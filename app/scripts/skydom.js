'use strict';
(function(w){
    var THREE = w.THREE;
    function Skydom(scene,args){
        THREE.Object3D.call(this);
        
        args = {} || args;
        
        var geometry = new THREE.BoxGeometry(500,500,500);
        var path = '../images/skydom/';
        var format = '.jpg';
        var url = [
            path+'px'+format,path+'nx'+format,
            path+'py'+format,path+'ny'+format,
            path+'pz'+format,path+'nz'+format,
        ];
        var texture = THREE.ImageUtils.loadTextureCube(url,THREE.CubeRefractionMapping);

        var shader = THREE.ShaderLib.cube;
        shader.uniforms.tCube.value = texture;
        var material = new THREE.ShaderMaterial({
            fragmentShader:shader.fragmentShader,
            vertexShader:shader.vertexShader,
            uniforms:shader.uniforms,
            side:THREE.BackSide
        });
        var mesh = new THREE.Mesh(geometry,material);
        
        this.skydom = mesh;
        
        scene.add(mesh);
        
        this.remove = function (){
            scene.remove(mesh);
        };
    }
    Skydom.prototype = Object.create(THREE.Object3D.prototype);
    Skydom.prototype.constructor = Skydom;
    
    w.Skydom = Skydom;
    
})(window);