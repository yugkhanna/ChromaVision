var video; 

function afterLoad() {
	console.log("running after load");
	// querySelector to get element from HTML video element
	var v = document.getElementById('videoElement');
	var c = document.getElementById('c');
	var context = c.getContext('2d');
	var cw = Math.floor(c.clientWidth);
	var ch = Math.floor(c.clientHeight);
	c.height = ch;
	c.width = cw;

	draw(v,context,cw,ch);

	video = document.querySelector("#videoElement");

	// uses getUserMedia API to see what vendor it is (browser)
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

	// Checks to see if we are getting something from the webcam, the getUserMedia function the browser prompts user for permission of webcam
	if (navigator.getUserMedia) {       
		navigator.getUserMedia({video: {facingMode: "environment"}}, handleVideo, videoError);
	}
}

// Actually handles the display of the video stream from the webcam
function handleVideo(stream) {
		video.src = window.URL.createObjectURL(stream);
}

// error checking to throw exceptions
function videoError(e) {
		// do something
} 

function draw(v,c,w,h) {
	c.drawImage(v,0,0,w,h);

	data = c.getImageData(w/2,h/2,1,1);

	hsv = rgb2hsv(data.data[0],data.data[1],data.data[2]);
	console.log(hsv);

	document.getElementById("color_indicator").innerHTML =  colorName(hsv.h,hsv.s,hsv.v);
	document.getElementById("color_swatch").style.backgroundColor = "RGB("+data.data[0]+","+data.data[1]+","+data.data[2]+")";

	setTimeout(draw,20,v,c,w,h);
}

function colorName(h,s,v) {
	s = s/100;
	v = v/100;
	if (v < 0.2) return "Black";
	if (v > 0.98) return "White";
	if (s < 0.25) return "Grey";
	if (h < 10) return "Red";
	if (h < 40) return "Orange";
	if (h < 80) return "Yellow";
	if (h < 150) return "Green";
	if (h < 210) return "Cyan";
	if (h < 270) return "Blue";
	if (h < 330) return "Magenta";
	return "Red";
}

function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}