'use strict';
(function(w){
    var face = w.scene.controller.face;
    w.addEventListener('load',function(){
//        console.log(e);
        if(!location.hash){
            location.hash = '#!/';
        }else{
            var url = location.hash.split('#!/')[1];
            w.manifest.forEach(function(elem){
                if(url === elem.url){
                    handleUrl(elem);
                }
            });
        }

    },false);
    w.addEventListener('hashchange',function(e){
//        console.log(e);
        if(e.newURL.split('#')[1].length === 2){
            home();
        }else{
            var url = e.newURL.split('#!/')[1];
            w.manifest.forEach(function(elem){
                if(url === elem.url){
                    handleUrl(elem);
                }
            });
        }

    },false);

    function home(){
        if(!(face instanceof w.HomeFace)){
            face.remove();
            new w.HomeFace(w.scene.controller,w.camera);
        }
    }

    function handleUrl(elem){
        if(!(face instanceof w[elem.face])){
            face.remove();
            new w[elem.face](w.scene,w.camera);
        }
    }
})(window);
