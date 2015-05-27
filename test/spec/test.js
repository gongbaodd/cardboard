/* global describe, it */
(function () {
  'use strict';
    describe('核心',function(){
       describe('初始化检查',function(){
           it('加载之后，全局场景内应该有3个对象',function(){
              cardboard.scene.children.length.should.equal(3);
           });
           it('加载之后，总容器内应该有HomeFace的对象',function(){
               cardboard.scene.controller.face.should.be.an.instanceof(HomeFace);
           });
       })
    });

     describe('主界面',function(){
        describe('退出检查',function(){
            it('主界面退出后，场景内应该没有相关元素',function(done){
                setTimeout(function(){
                    var scene = new window.MainController(window.camera,window.cursor);
                    var added = scene.children.length;
                    scene.face.remove();
                    var removed = scene.children.length;
                    scene = {};
                    var zero = added - removed;
                    zero.should.equal(13);
                    done();
                },1)
            })
        })
    });

    describe('Panorama',function(){
        describe('退出检查',function(){
            it('Panorama退出后，场景内应该没有相关元素',function(){
                setTimeout(function(){
                    var scene = new window.MainController(window.camera,window.cursor);
                    var face = new window.PanoFace(scene,window.camera);
                    scene.add(face);
                    scene.face = face;
                    var added = scene.children.length;
                    face.remove();
                    var removed = scene.children.length;
                    var zero = added - removed;
                    zero.should.equal(12);
                },5);
            })
        })
    });

    describe('Movie',function(){
        describe('退出检查',function(){
            it('Movie退出后，场景内应该没有相关元素',function(){
                setTimeout(function(){
                    var scene = new window.MainController(window.camera,window.cursor);
                    var face = new window.MovieFace(scene,window.camera);
                    scene.add(face);
                    var added = scene.children.length;
                    face.remove();
                    var removed = scene.children.length;
                    var zero = added - removed;
                    zero.should.equal(6);
                },10);
            })
        })
    });

    describe('路由',function(){
        describe('跳转到Panorama',function(){
            it('跳转之后，总容器内应该有PanoFace的实例',function(done){
                setTimeout(function(){
                    location.hash = '#!/app/panorama';
                    setTimeout(function(){
                        cardboard.scene.controller.face.should.be.an.instanceof(PanoFace);
                        done();
                    },10)
                },10)
            });
        });
        describe('跳转到Movie',function(){
            it('跳转之后，总容器应该有MovieFace的实例',function(done){
                setTimeout(function(){
                    location.hash = '#!/app/movie';
                    setTimeout(function(){
                        cardboard.scene.controller.face.should.be.an.instanceof(MovieFace);
                        done();
                    },4)
                },500)
            });
        });
        describe('跳转到NoodleFace',function(){
            it('跳转之后，总容器应该有NoodleFace的实例',function(done){
                setTimeout(function(){
                    location.hash = '#!/app/noodle_face';
                    setTimeout(function(){
                    cardboard.scene.controller.face.should.be.an.instanceof(NoodleFace);
                    done()
                },4)
                },600)
            });
        });
        describe('跳转到主界面',function(){
            it('进入不存在的应用，如helloWorld',function(done){
                setTimeout(function(){
                    location.hash = '#!/app/helloWorld';
                    setTimeout(function(){
                        cardboard.scene.controller.face.should.be.an.instanceof(HomeFace);
                        done();
                    },20)
                },700)
            });
            it('进入非法的锚点，如#id',function(done){
                setTimeout(function(){
                    location.hash = '#id';
                    setTimeout(function(){
                        cardboard.scene.controller.face.should.be.an.instanceof(HomeFace);
                        done();
                    },20)
                },750)
            });
        });
    });

})();

