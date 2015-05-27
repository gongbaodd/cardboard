var cardboard = new window.Cardboard();
var cursor = new window.Cursor(cardboard.camera);
var mainController = new window.MainController(cardboard.camera,cursor);

cardboard.scene.add(mainController);
cardboard.scene.controller = mainController;
cardboard.camera.add(cursor);
cursor.position.z = -9;
cursor.lookAt(cardboard.camera.position);
cardboard.effect.separation = 0.6;

if(!window.has.mobile){
    setTimeout(function() {
        cardboard.orbitControls.target.set(0,0.3,1);
    },0);
}

cardboard.update = function() {
        window.Cardboard.prototype.update.call(this);
            mainController.update();
};

var router = new window.Router(cardboard.scene,cardboard.camera,cursor);

window.cardboard = cardboard;
window.scene = cardboard.scene.controller;
window.cursor = cursor;
window.camera = cardboard.camera;
