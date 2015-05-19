'use strict';
(function(w) {
	// STATS
		var stats = new w.Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		stats.domElement.style.zIndex = 100;
		document.getElementById('scene').appendChild( stats.domElement );
        
        w.stats = stats;
})(window);