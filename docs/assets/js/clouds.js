var CloudGenerator = function(el, image) {
  this.viewport = el;
  this.cloudBG = image;
  this.world = document.createElement('div');
  
  this.world.setAttribute('id', 'sky');
  this.viewport.appendChild(this.world);
  
  var margin = 300;
  this.width = this.viewport.offsetWidth - margin;
  this.height = this.viewport.offsetHeight - margin;

  this.imgLayers = [];
  
  // options
  this.numClouds = 5;
}
	
CloudGenerator.prototype.createCloud = function(x) {
  
  // place cloud center randomly
  var cloud = [];

  cloud.x = x;
  cloud.y = this.height/2 - ( Math.random() * this.height );
  cloud.z = 400 - ( Math.random() * 1024 );
  cloud.xSpeed = 0.2 + 0.05 * Math.random();

  for( var i = 0; i < 5 + Math.round( Math.random() * 10 ); i++ ) {
    var image = document.createElement( 'img' );
    var r = Math.random();
    image.setAttribute( 'src', this.cloudBG );
    image.className = 'cloudLayer';

    var x = cloud.x + 0.2*(256 - ( Math.random() * 1024 ));
    var y = cloud.y + 0.2*(256 - ( Math.random() * 1024 ));
    var z = cloud.z + 100 - ( Math.random() * 200 );
    var a = Math.random() * 360;
    var s = .25 + Math.random();

    image.data = { 
      x: x,
      y: y,
      z: z,
      a: a,
      s: s,
      xSpeed: cloud.xSpeed,
      rSpeed: .1 * Math.random()
    };
    var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
    image.style.webkitTransform = t;
    image.style.MozTransform = t;
    image.style.oTransform = t;
    image.style.zIndex = Math.floor(z);

    this.world.appendChild( image );
    this.imgLayers.push( image );
  }
}

CloudGenerator.prototype.update = function() {
  var length = this.imgLayers.length;
  
  // if there aren't enough image layers, add another cloud
  // assume ~7 images per cloud, on average
  if(length < this.numClouds*7) {
    console.log("creating cloud");
    this.createCloud(-this.width - 100);
  }

  for( var i = length - 1; i >=0; i-- ) {
    var layer = this.imgLayers[i];
    if(!layer) { continue; };
    layer.data.x += layer.data.xSpeed;
    layer.data.a += layer.data.rSpeed;
    
    // if cloud is past x threshold, remove layer
    if ( layer.data.x > (this.width + 300)) {
      console.log("deleting layer", i);
      this.world.removeChild(layer);
      this.imgLayers.splice(i, 1);
      continue;
    }
  
    var t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px )  rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
    layer.style.webkitTransform = t;
    layer.style.MozTransform = t;
    layer.style.oTransform = t;
  }

  requestAnimationFrame( this.update.bind(this) );

}

CloudGenerator.prototype.updateZoom = function(zoom) {
	var t = 'translateZ( ' + zoom + 'px )';
	this.world.style.webkitTransform = t;
	this.world.style.MozTransform = t;
	this.world.style.oTransform = t;
  $('.cloudLayer').css('opacity', 0.5);
  
  if (zoom >= 1) {
    zoom -= 100;
    requestAnimationFrame( this.updateZoom.bind(this, zoom) );
  }
}

CloudGenerator.prototype.init = function() {
  // set up requestAnimationFrame
  var lastTime = 0,
      vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) { clearTimeout(id); };
  }
  
  this.viewport.style.webkitPerspective = 400;
  this.viewport.style.MozPerspective = 400;
  this.viewport.style.oPerspective = 400;
  
	var intial_positions = [-this.width/2 + this.width*0.05, -this.width/2 + this.width*0.2, 0, this.width/2 + this.width*0.05, this.width/2 + this.width*0.35];
  for( var i = 0; i < this.numClouds; i++ ) {
    this.createCloud(intial_positions[i]);
  }
  
  // zoom in
  this.updateZoom(1000);
 
  this.update();
}

var viewport = document.getElementById( 'art-clouds' );
var clouds = new CloudGenerator(viewport, 'assets/img/cloud.png');
clouds.init();