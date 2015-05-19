'use strict';
(function(w){
    var THREE = w.THREE;
    
    function Hotspot(scene,args){
        THREE.Object3D.call(this);
        
        var rectShape = new THREE.Shape();
        rectShape.moveTo(0,0);
        rectShape.lineTo(0,args.rectLength);
        rectShape.lineTo(args.rectWidth,args.rectLength);
        rectShape.lineTo(args.rectWidth,0);
    }
    Hotspot.prototype = Object.create(THREE.Object3D.prototype);
    Hotspot.prototype.constructor = Hotspot;
    
})(window)