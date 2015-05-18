'use strict';
(function(w) {
    var T = w.THREE;

    function Cardboard() {
        //renderer
        this.renderer = new T.WebGLRenderer({antialias:true});
        this.renderer.setSize(w.innerWidth,w.innerHeight);
        this.renderer.shadowMapEnabled = true;
        //scene
        this.scene = new T.Scene();
        this.effect = new T.StereoEffect(this.renderer);
        //camera
        this.camera = new T.PerspectiveCamera(90,w.innerWidth/w.innerHeight,0.001,700);

        this.scene.add(this.camera);

        //controls
        this.controls = new T.DeviceOrientationControls(this.camera, true);
        this.orbitControls = new T.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.noZoom = true;
        this.orbitControls.noPan = true;
        this.orbitControls.autoRotate = false;

        w.addEventListener('resize',this.resize.bind(this),false);

        this._initControls = this.initControls.bind(this);
        w.addEventListener('deviceorientation',this._initControls,false);

        setTimeout(this.resize.bind(this),0);

        this.animate = this.animate.bind(this);
        setTimeout(this.play.bind(this),0);
    }

    Cardboard.prototype.initControls = function(e) {
        if(e.alpha) {
            w.removeEventListener('deviceorientation',this._initControls,false);
            this.renderer.domElement.addEventListener('click',this.fullscreen.bind(this),false);

            this.orbitControls.enable = false;

            this.controls.connect();
            this.controls.update();
        }
    };


    Cardboard.prototype.animate = function() {
        if(!this._playing){ return; }
        requestAnimationFrame(this.animate);
        this.update();
        this.render();
    };

    Cardboard.prototype.pause = function() {
        this._playing = false;
    };

    Cardboard.prototype.play = function() {
        if(this._playing){ return; }
        this._playing = true;
        this.animate();
    };

    Cardboard.prototype.update = function() {
        if(this.width!==w.innerWidth || this.height!==w.innerHeight){
            this.resize();
        }
        this.camera.updateProjectionMatrix();
        if(this.controls.freeze === false){
            this.controls.update();
        } else {
            this.orbitControls.update();
        }
    };

    Cardboard.prototype.render = function() {
        this.effect.render(this.scene,this.camera);
    };

    Cardboard.prototype.fullscreen = function() {
        if (this.renderer.domElement.requestFullscreen) {
            this.renderer.domElement.requestFullscreen();
        } else if (this.renderer.domElement.msRequestFullscreen) {
            this.renderer.domElement.msRequestFullscreen();
        } else if (this.renderer.domElement.mozRequestFullScreen) {
            this.renderer.domElement.mozRequestFullScreen();
        } else if (this.renderer.domElement.webkitRequestFullscreen) {
            this.renderer.domElement.webkitRequestFullscreen();
        }
    };

    Cardboard.prototype.resize = function() {
        this.width = w.innerWidth;
        this.height = w.innerHeight;
        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width,this.height);
        this.effect.setSize(this.width,this.height);
    };

    w.Cardboard = Cardboard;
})(window);
