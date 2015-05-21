'use strict';
(function(w){
    var THREE = w.THREE;

    function PanoFace(scene,camera){
        THREE.Object3D.call(this);

        this.pictures = [
            'PANO0.jpg',
            'PANO1.jpg',
            'PANO2.jpg',
            'PANO3.jpg',
            'PANO4.jpg',
            'PANO5.jpg',
            'PANO6.jpg'
        ];

        this.background = new w.Panorama(scene,'../images/panorama/'+this.pictures[0]);
        this.background.name = this.pictures[0];

        if(location.hash === '#!/app/panorama'){
            location.hash += '/'+this.background.name;
        }


        this.lights = new w.Lights(scene);
        this.elems = [];

        var self = this;

        this.goAfterBtn = new w.Text(scene,camera, {
		      lookAt: new THREE.Vector3( camera.position.x, -300, camera.position.z ),
		      text: '>',
		      radius: 15,
		      degree: -160,
		      verticalDegree: -10,
		      color: 0x000000,
		      size: 5
        });
        this.goAfterSpot = new w.Hotspot(scene,camera, {
		      rectLength: 5,
		      rectWidth: 5,
		      degree: -150,
		      verticalDegree: -20,
		      radius: 15,
		      showHotspot: scene.showHotspots,
		      onFocus: function(){
//                  console.log(self.background.name)
                  var index = self.pictures.indexOf(self.background.name);
                  var newIndex = (index+1)%self.pictures.length;

                  self.background.remove();
                  self.background = new w.Panorama(scene,'../images/panorama/'+self.pictures[newIndex]);
                  self.background.name = self.pictures[newIndex];
		      }
	       });
//        console.log(this)
//        console.log(this.goAfterSpot)

        this.elems.push(this.goAfterBtn);
        this.elems.push(this.goAfterSpot);

        this.goHomeBtn = new w.Text(scene,camera, {
		      lookAt: new THREE.Vector3( camera.position.x, -300, camera.position.z ),
		      text: 'O',
		      radius: 15,
		      degree: -120,
		      verticalDegree: -10,
		      color: 0x000000,
		      size: 5
        });

        this.goHomeSpot = new w.Hotspot(scene,camera, {
		      rectLength: 5,
		      rectWidth: 5,
		      degree: -110,
		      verticalDegree: -20,
		      radius: 15,
		      showHotspot: scene.showHotspots,
		      onFocus: function(){
				location.hash = '#!/';
		      }
	       });

        this.elems.push(this.goHomeBtn);
        this.elems.push(this.goHomeSpot);

        this.goPrevBtn = new w.Text(scene,camera, {
		      lookAt: new THREE.Vector3( camera.position.x, -300, camera.position.z ),
		      text: '<',
		      radius: 15,
		      degree: -80,
		      verticalDegree: -10,
		      color: 0x000000,
		      size: 5
        });

         this.goPrevSpot = new w.Hotspot(scene,camera, {
		      rectLength: 5,
		      rectWidth: 5,
		      degree: -70,
		      verticalDegree: -20,
		      radius: 15,
		      showHotspot: scene.showHotspots,
		      onFocus: function(){
				var index = self.pictures.indexOf(self.background.name);
                  var newIndex = (index+self.pictures.length-1)%self.pictures.length;

                  self.background.remove();
                  self.background = new w.Panorama(scene,'../images/panorama/'+self.pictures[newIndex]);
                  self.background.name = self.pictures[newIndex];
		      }
	       });

        this.elems.push(this.goPrevBtn);
        this.elems.push(this.goPrevSpot);

        this.remove = function() {
            this.background.remove();
            this.lights.remove();
            this.elems.forEach(function(elem){
                elem.remove();
            });
            scene.removeFace(this);
        }
    }
    PanoFace.prototype = Object.create(THREE.Object3D.prototype);
    PanoFace.prototype.constructor = PanoFace;

    w.PanoFace = PanoFace;

})(window);
