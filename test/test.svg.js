function onload(f){
	(function(f,w,i){
		if(!onload.l) {onload.l=[];}
		onload.l.push(f);
		if(!onload.t){
			onload.t=w.setInterval(
					function(){
						if(document.getElementsByTagName('BODY')[0]){
							w.clearInterval(onload.t);
							for(;i<onload.l.length;i++){
								onload.l[i]();
							}
						}
					},1);
		}
	})(f,window,0);
}
var svg = [];
onload(function() {
	var bgcolors = [
	                "#ffbb00", "#ccdd00", "#00ddcc", "#00bbff", "#bb00ee", "#ff00bb", "#444444",
	                "#ffff00", "#dddd00", "#00dddd", "#00ffff", "#8800dd", "#ff00ff", "#222222",
	                ];
	var d = document.getElementsByTagName('BODY')[0];
	for(var i = 0; i < bgcolors.length; i++) {
		svg.push(Svg.createElement('svg', {
			"width":"80px","height":"60px",
			"style":"margin:1px;background-color:"+bgcolors[i]+";"
		}));
		d.appendChild(svg[i]);
	}
});

onload(function() {
	svg[0].appendChild(
			Svg.createLineElement(0,0,80,60,{"stroke":"#ffffff","stroke-width":"2",}));
});

onload(function() {
	svg[1].appendChild(
			Svg.createRectElement(10,10,60,40,{"stroke":"#ffffff","stroke-width":"2","fill":"none"}));
});

onload(function() {
	svg[2].appendChild(
			Svg.createCircleElement(40,30,20,{"stroke":"#ffffff","stroke-width":"2","fill":"none"}));
});

onload(function() {
	svg[3].appendChild(
			Svg.createEllipseElement(40,30,30,20,{"stroke":"#ffffff","stroke-width":"2","fill":"none"}));
});

onload(function() {
	svg[4].appendChild(
			new Svg.Path(
					new Svg.Path.d()
						.moveTo(10,10)
						.quadBezierTo(30,80,40,30)
						.quadBezierTo(70,50)
						.toString(),
					{"stroke":"#ffffff","stroke-width":"2","fill":"#ee88ff"}
				).element
		);
});

onload(function() {
	svg[5].appendChild(
			Svg.createPolygonElement("10,50 70,50 40,10",{"stroke":"#ffffff","stroke-width":"2","fill":"#ff88ee"}));
});

onload(function() {
	svg[6].appendChild(
			Svg.createPolylineElement("10,50 70,50 40,10",{"stroke":"#ffffff","stroke-width":"2","fill":"#888888"}));
});

onload(function() {
	svg[7].appendChild(
			new Svg.Path(
					new Svg.Path.d()
						.moveTo(10,10)
						.lineRel(20,40)
						.hlineTo(50)
						.vlineTo(10)
						.hlineRel(20)
						.vlineRel(40)
						.cubicBezierTo(70, 10, 10, 10)
						.toString(),
					{"stroke":"#ffffff","stroke-width":"2","fill":"#ee88ff"}
				).element
		);
});

onload(function() {
	svg[8].appendChild(
			new Svg.Path(
					new Svg.Path.d()
						.moveTo(10,10)
						.quadBezierRel(60, 0, 60, 40)
						.moveRel(-60,-40)
						.cubicBezierRel(0, 50, 60, 40)
						.lineRel(-60,-40)
						.toString(),
					{"stroke":"#ffffff","stroke-width":"2","fill":"#ee88ff"}
				).element
		);
});

onload(function() {
	var turtle = new Svg.TurtlePath(5, 5, 0, true);
	var width = 70;
	var height = 50;
	var d = 5;
	for(var i = 0; i < 5; i++) {
		turtle.go(width)
		.right(90).go(height)
		.right(90).go(width)
		.right(90).go(height-d)
		.right(90).go(d);
		width -= d * 2;
		height -= d * 2;
	}
	svg[9].appendChild(
			new Svg.Path(
					turtle.getPath().toString(),
					{"stroke":"#ffffff","stroke-width":"2","fill":"none"}
				).element
		);
});
function goTurtle(turtle, distance, level) {
	if(level == 0) {
		turtle.go(distance);
		return;
	} else {
		goTurtle(turtle, distance / 4, level - 1);
		turtle.left(90);
		goTurtle(turtle, distance / 4, level - 1);
		turtle.right(90);
		goTurtle(turtle, distance / 4, level - 1);
		turtle.right(90);
		goTurtle(turtle, 2 * distance / 4, level - 1);
		turtle.left(90);
		goTurtle(turtle, distance / 4, level - 1);
		turtle.left(90);
		goTurtle(turtle, distance / 4, level - 1);
		turtle.right(90);
		goTurtle(turtle, distance / 4, level - 1);
	}
}
onload(function() {
	var turtle = new Svg.TurtlePath(0, 30, 0, true);
	goTurtle(turtle, 80, 2);
	svg[10].appendChild(
			new Svg.Path(
					turtle.getPath().toString(),
					{"stroke":"#ffffff","stroke-width":"2","fill":"none"}
				).element
		);
});
