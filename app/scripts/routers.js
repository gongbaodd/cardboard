'use strict';
(function(w){
    function router(scene,camera,cursor){
//        console.log(scene)
        var face = {};
    w.addEventListener('load',function(){
//        console.log(e);
        face = scene.controller.face
        if(!location.hash || !/^#!\/.*/.test(location.hash)){
            location.hash = '#!/';
        }else{
            var url = location.hash.split('/')[2];
            var notFound = 1;
            w.manifest.forEach(function(elem){
                if(url === elem.url){
                    handleUrl(elem);
                    notFound--;
                }
            });
            if(notFound){
                location.hash = '#!/';
            }
        }

    },false);
    w.addEventListener('hashchange',function(e){
//        console.log(e);
        face = scene.controller.face
        if(!/^!\/.*/.test(e.newURL.split('#')[1])||e.newURL.split('#')[1].length<3){
            if(e.newURL.split('#')[1] !== '!/'){location.hash = '#!/';}
                home();
        }else{
            var url = e.newURL.split('#!/')[1].split('/')[1];
            var notFound = 1;
            w.manifest.forEach(function(elem){
//                console.log(url)
                if(url === elem.url){
                    handleUrl(elem);
                    notFound--;
                }
            });
            if(notFound){
                location.hash = '#!/';
            }
        }

    },false);

    function home(){
//        console.log(face instanceof w.HomeFace)
        if(!(face instanceof w.HomeFace)){
            face.remove();
            var newFace =new w.HomeFace(scene.controller,camera);
            scene.controller.face = newFace;
        }
    }

    function handleUrl(elem){
//        console.log(face instanceof w[elem.face])
        if(!(face instanceof w[elem.face])){
            face.remove();
            var newFace = new w[elem.face](scene.controller,camera,cursor);
            scene.controller.face = newFace;
        }
    }
    }
    router.prototype.constructor = router;
    w.Router = router;
})(window);
