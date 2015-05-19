'use strict';
(function(w){
    function main(){
        var cardboard = new w.Cardboard();
        var cursor = new w.Cursor(cardboard.camera);
        var mainController = new w.MainController(cardboard.camera,cursor);
        
//        console.log(cardboard.camera.position)
        
        cardboard.scene.add(mainController);
        cardboard.camera.add(cursor);
        cursor.position.z = -9;
	    cursor.lookAt(cardboard.camera.position);
        cardboard.effect.separation = 0.6;
        
//        console.log(cardboard);
        
        if(!w.has.mobile){
            setTimeout(function() {
                cardboard.orbitControls.target.set(0,0.3,1);
            },0);
        }
        
        cardboard.update = function() {
            w.Cardboard.prototype.update.call(this);
            mainController.update();
        };
        

        document.getElementById('scene').appendChild(cardboard.renderer.domElement);
    }main();
})(window);
