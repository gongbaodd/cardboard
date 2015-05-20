'use strict';
(function(w){
    var THREE = w.THREE;
    function Cards(scene,camera,args){
        THREE.Object3D.call(this);
        
        args = null || args;
        
        this.elems = [];
        var self = this;
        
        args.forEach(function(elem,index,elems){
            THREE.ImageUtils.loadTexture(elem.icon,undefined,function(texture){
                var obj=function(){};
                obj.prototype = Object.create(THREE.Object3D.prototype);
                obj.constructor = obj;
                
                var degree = -80+180/(elems.length+1)*index;
//                console.log(degree)
                var radius = 15;
                var vdegree = -15;
                var text = new w.Text(scene,camera,{
                    text:elem.title,
                    radius:radius,
                    degree:degree,
                    verticalDegree:vdegree,
                    color:0x000000,
                    size:1
                });
                var image = new w.Image3D(scene,camera,texture,{
                    scale:4,
                    degree:degree,
                    verticalDegree:vdegree+20,
                    radius:radius,
                    onFocus:function(){
                        console.log(1);
                    }
                });
//                var hotspot = new w.Hotspot(scene,camera,{
//                    rectLength:10,
//                    rectWidth:10,
//                    degree:degree,
//                    radius:radius,
//                    verticalDegree:vdegree,
//                    showHotspot:scene.showHotspot,
//                    onFocus:function(){
//                        console.log('focused');
//                    }
//                });
                obj.text = text;
                obj.image = image;
//                obj.hotspot = hotspot;
                self.elems.push(obj);
            });
        });
        
        scene.add(this);
        
        this.remove = function(){
            this.elems.forEach(function(elem){
                elem.text.remove();
                elem.image.remove();
//                elem.hotspot.remove();
            });
            scene.remove(self);
        };
    }
    Cards.prototype = Object.create(THREE.Object3D.prototype);
    Cards.prototype.constructor = Cards;
    
    w.Cards = Cards;
})(window);

