/**
 * @author Carl Lange
 */

var stage,
	clouds = new Array()
	;

function main(){
	//set the stage
	stage = Sprite3D.createCenteredContainer().setClassName("stage").setSize("100%", "100%").setTransformOrigin("500px", "0px")
	
	//make some clouds
	container ="f";
	stage.addChild(new Sprite3D().setId(container).rotateY(90));
	addNoiseCanvas(1000,1000,"g",container);
	
	container ="y";
	stage.addChild(new Sprite3D().setId(container));
	addNoiseCanvas(1000,1000,"t",container);
}

/**
 * Returns a canvas with noise on it
 */
function addNoiseCanvas(width, height, id, container){
	$("#"+container).append("<canvas width="+width+" height="+height+" id="+id+"></canvas>");
	$("#"+id).css("background-color", "rgba(0,0,0,0)")
			 .css("width", width+"px")
			 .css("height", height+"px") 
	
	var then = new Date();
	perlin_noise(document.getElementById(id));
	var now = new Date();
	console.log(now - then);
}

/**
 * Stolen from http://www.ozoneasylum.com/30982
 */
function perlin_noise (canvas) {
  var canvas_ctx = canvas.getContext ("2d"),
      offscreen = document.createElement ("canvas"),
      offscreen_ctx = offscreen.getContext ("2d"),
      saved_alpha = canvas_ctx.globalAlpha

  /* Fill the offscreen buffer with random noise. */
  offscreen.width = canvas.width
  offscreen.height = canvas.height

  var offscreen_id = offscreen_ctx.getImageData (0, 0,
                                                 offscreen.width,
                                                 offscreen.height),
      offscreen_pixels = offscreen_id.data

  for (var i = 0; i < offscreen_pixels.length; i += 4) {
    offscreen_pixels[i    ] =
    offscreen_pixels[i + 1] =
    offscreen_pixels[i + 2] = Math.floor (Math.random () * 256)
    offscreen_pixels[i + 3] = 255
  }

  offscreen_ctx.putImageData (offscreen_id, 0, 0)

  /* Scale random iterations onto the canvas to generate Perlin noise. */
  for (var size = 12; size <= offscreen.width; size *= 2) {
    var x = Math.floor (Math.random () * (offscreen.width - size)),
        y = Math.floor (Math.random () * (offscreen.height - size))

    canvas_ctx.globalAlpha = 4 / size
    canvas_ctx.drawImage (offscreen, x, y, size, size,
                                     0, 0, canvas.width, canvas.height)
  }

  canvas_ctx.globalAlpha = saved_alpha
}