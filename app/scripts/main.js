'use strict';
(function(w){
    function main(){
        var cardboard = new w.Cardboard();
        console.log(cardboard);

        document.getElementById('scene').appendChild(cardboard.renderer.domElement)
    }main();
})(window);
