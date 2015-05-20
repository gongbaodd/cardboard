(function(w){
    var face = w.scene.controller.face;
    w.addEventListener('load',function(e){
//        console.log(e);
        if(!location.hash){
            location.hash = '#!/';
        }else{
            var url = location.hash.split('#!/')[1];
            w.manifest.forEach(function(elem,index,elems){
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
            w.manifest.forEach(function(elem,index,elems){
                if(url === elem.url){
                    handleUrl(elem);
                }
            });
        }

    },false);

    function home(){
        if(!(face instanceof HomeFace)){
            face.remove();
            new w.HomeFace(w.scene.controller,w.camera);
        }
    }

    function handleUrl(elem){

    }
})(window);
