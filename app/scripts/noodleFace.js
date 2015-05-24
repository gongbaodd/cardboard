'use strict';
(function(w) {
    var THREE = w.THREE;
    function NoodleFace(scene){
        THREE.Object3D.call(this);
        
        var video = document.createElement('video');
        video.autoplay = true;
        
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        
        $('#back').append(video);
        $('#back').append(canvas);
        
        this.resizeHandle = function(){
            $('#back').width(w.innerWidth);
            $('#back').height(w.innerHeight);
            $('#back video').height(w.innerHeight);
            $('#back video').width(w.innerHeight/3*4);
            $('#back canvas').height(w.innerHeight);
            $('#back canvas').width(w.innerHeight/3*4);
        };
        
        this.resizeHandle();
        
        navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        navigator.getUserMedia({audio: false,video: true}, function (stream) {
            window.stream = stream; // make stream available to browser console
            if (window.URL) {
                video.src = window.URL.createObjectURL(stream);
            } else {
                video.src = stream;
            }
            video.style.height = w.innerHeight;
            video.style.width = w.innerHeight/3*4;
            video.style.cssText = video.style.cssText + 'position:absolute;top:0;left:0;';
//            video.style.transform = 'translate(-25%,0)';
            canvas.style.height = w.innerHeight;
            canvas.style.width = w.innerHeight/3*4;
            canvas.style.cssText = canvas.style.cssText + 'position:absolute;top:0;left:50%;';
        },function (error) {
            console.log('navigator.getUserMedia error: ', error);
        });
        
        this.timer = setInterval(function(){
            context.drawImage(video,0,0,canvas.width,canvas.height);
        },1000/16);
        
        
        w.addEventListener('resize',this.resizeHandler,false);
        
        this.remove = function(){
            w.removeEventListener('resize',this.resizeHandler,false);
            clearInterval(this.timer);
            $('#back').html();
            scene.removeFace(this);
        };
    }
    NoodleFace.prototype = Object.create(THREE.Object3D.prototype);
    NoodleFace.prototype.constructor = NoodleFace;
    
    w.NoodleFace = NoodleFace;
})(window);