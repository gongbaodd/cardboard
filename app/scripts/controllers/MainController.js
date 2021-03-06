'use strict';
(function(w){
    var THREE = w.THREE;
    var TTL = 100;
    
    function MainController(camera,cursor){
        THREE.Object3D.call(this);
        this.updatables = [];
        this.intersectables = [];
        this.raycaster = new THREE.Raycaster();
        
        var scene = this;
        this.camera = camera;
        this.cursor = cursor;
        
        //Debug
//        scene.showHotspot = false;
//        scene.showStats = false;
//        if(scene.showStats){
//            scene.updatables.push(function(){
//                w.stats.update();
//            });
//        }
//        var axes = new THREE.AxisHelper(10);
//        scene.add(axes);
//        console.log(camera)
        //Start Home

        var face = new w.HomeFace(scene,camera);
        scene.add(face);
        scene.face = face;
        
        this.removeFace = function(face) {
            scene.intersectables = [];
            scene.updatables = [];
            scene.remove(face);
        };
    }
    
    MainController.prototype = Object.create(THREE.Object3D.prototype);
    MainController.prototype.constructor = MainController;
    
    MainController.prototype.findIntersections = function() {
        var gaze = new THREE.Vector3(0,0,1);
        w.gaze = gaze;
        gaze.unproject(this.camera);
        
        this.raycaster.set(
            this.camera.position,
            gaze.sub(this.camera.position).normalize()
        );
//        debugger;
        
        var intersects = this.raycaster.intersectObjects(this.intersectables);
        
        //cursur
        this.cursor.scale.set(1,1,1);
        

        if(intersects.length>0){
            var found = intersects[0];
            
//            console.log(intersects);
            
            if(!this.selected){
                w.navigator.vibrate(30);
                this.selected = {
                    id:found.object.uuid,
                    ttl:100,
                    obj:found.object
                };
            }else{
                if(this.selected.id === found.object.uuid){
//                    console.log(this.selected)
                    if(this.selected.obj.parent.onFocus !== undefined){
                        this.selected.ttl -= 1;
                        var p = (this.selected.ttl / TTL);
                        this.cursor.scale.set(p,p,p);
                        if(this.selected.ttl<=1){
                            this.selected.obj.parent.onFocus();
                            this.selected = undefined;
                        }
                    }
                }else{
                    try {
                        this.selected.obj.parent.onBlur();
                        w.navigator.vibrate(30);
                        this.selected = {
                            id:found.object.uuid,
                            ttl:TTL,
                            obj:found.object
                        };
                    }catch(e){
                        console.log(e);
                    }
                }
            }
        }else{
            if(this.selected!==undefined){
                //Blur
                if(this.selected.obj.parent.onBlur !== undefined){
                    this.selected.obj.parent.onBlur();
                }
            }
            this.selected = undefined;
        } 
    };
    
    MainController.prototype.update = function() {
        this.findIntersections();
        
        for(var i=0;i<this.updatables.length;i++){
            var updatable = this.updatables[i];
            updatable();
        }
    };
    
    w.MainController = MainController;
})(window);










