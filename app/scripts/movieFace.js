'use strict';
(function(w){
    var THREE = w.THREE;
    
    function MovieFace(scene,camera){
        THREE.Object3D.call(this);
        
        this.scene = scene;

        this.lights = new w.Lights(scene,camera);
        
        this.plane = new w.Plane(scene);
        
        this.cubes = [];
        
        this.camPos = camera.position.clone().setY(-9);
        
        this.camera = camera;
//        var axes = new THREE.AxisHelper(20);
//        scene.add(axes);
        this.screen = {};
        
        scene.fog = new THREE.Fog(0xffffff,0.015,10);
        
        $.ajax({
            type:'GET',
            cache:false,
            url:'movie.json',
            async:true,
            context:this,
            success:function(data){
//                console.log(data);
                var that = this,
                    seats = data.seats,
                    marginLeft = 1,
                    marginTop = 2,
                    width = 5,
                    x = 0,
                    y = 0,
                    ox = 0,
                    oy = 0;
//                var wide = seats.length*(width+marginLeft);
                var long = seats[0].length*(width+marginTop);
                
                    x = ox = x-long/2;
                    y = oy = y;
                
                that.screen = new w.Plane(that.scene,{width:66,length:66*9/16,color:0xffffff,shadow:true,pos:[x+long/2,-18+66*9/32,y-10],rot:[0,0,0]});
                
                seats.forEach(function(row){
//                    console.log(row)
                    row.forEach(function(seat){
                        if(seat.isSeat){
                            that.cubes.push(new w.Seat(that.scene,{
                                width:width,
                                color:0xffffff,
                                pos:[x,-18,y],
                                rot:[-0.5,0,-1],
                                text:seat.num,
                                onFocus:function(){
                                    var selected = scene.selected.obj;
//                                    console.log(selected)
//                                    new w.Cube(scene,{width:5,color:0xffffff,pos:[selected.position.x,selected.position.y+5,selected.position.z],rot:[0,0,0]});
                                    var pos = selected.position.clone();
//                                    console.log(pos)
                                    camera.position.setX(pos.x);
                                    camera.position.setY(pos.y+3);
                                    camera.position.setZ(pos.z);
                                    
                                    camera.lookAt(that.screen.plane.position);
//                                    console.log(that.screen.plane.position);
                                },
                                onBlur:function(){
//                                    console.log('blured');
                                }
                            }));
                        }
                        x = x+marginLeft+width;
                    });
                    x = ox;
                    y = y+marginTop+width; 
                });
//                console.log(that)
            },
            error:function(req,status,err){
                console.log(status+':'+err);
            },
            dataType:'json'
        });
        
        this.remove = function () {
//            console.log(this)
            this.lights.remove();
            this.plane.remove();
            this.scene.remove();
            this.screen.remove();
            this.camera.position.setX(0);
            this.camera.position.setY(0);
            this.camera.position.setZ(0);
            this.cubes.forEach(function(elem){
                elem.remove();
            });
            scene.removeFace(this);
        };
    }
    MovieFace.prototype = Object.create(THREE.Object3D.prototype);
    MovieFace.prototype.constructor = MovieFace;
    w.MovieFace = MovieFace;
})(window);