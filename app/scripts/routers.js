'use strict';
(function(w){
    var face = w.scene.controller.face;
    w.addEventListener('load',function(){
//        console.log(e);
        if(!location.hash){
            location.hash = '#!/';
        }else{
            var url = location.hash.split('/')[2];
            w.manifest.forEach(function(elem){
                if(url === elem.url){
                    handleUrl(elem);
                }
            });
        }

    },false);
    w.addEventListener('hashchange',function(e){
//        console.log(e);
        if(e.newURL.split('#')[1].length < 3){
            home();
        }else{
            var url = e.newURL.split('#!/')[1].split('/')[1];
            w.manifest.forEach(function(elem){
//                console.log(url)
                if(url === elem.url){
                    handleUrl(elem);
                }
            });
        }

    },false);

    function home(){
        if(!(face instanceof w.HomeFace)){
            face.remove();
            var newFace =new w.HomeFace(w.scene.controller,w.camera);
            face = newFace;
        }
    }

    function handleUrl(elem){
//        console.log(face instanceof w[elem.face])
        if(!(face instanceof w[elem.face])){
            face.remove();
            var newFace = new w[elem.face](w.scene.controller,w.camera);
            face = newFace;
        }
    }
})(window);
