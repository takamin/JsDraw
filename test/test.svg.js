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
	var bgcolors = ["#ffbb00", "#ccdd00", "#00ddcc", "#00bbff", "#bb00ee", "#ff00bb", "#444444", ];
	var d = document.getElementsByTagName('BODY')[0];
	for(var i = 0; i < bgcolors.length; i++) {
		svg.push(Svg.createElement('svg', {
			"width":"80px","height":"60px",
			"style":"display:block;margin:1px;background-color:"+bgcolors[i]+";"
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
			Svg.createPathElement("M10 10 Q30 80 40 30 Q50 -20 70 50",{"stroke":"#ffffff","stroke-width":"2","fill":"#ee88ff"}));
});

onload(function() {
	svg[5].appendChild(
			Svg.createPolygonElement("10,50 70,50 40,10",{"stroke":"#ffffff","stroke-width":"2","fill":"#ff88ee"}));
});

onload(function() {
	svg[6].appendChild(
			Svg.createPolylineElement("10,50 70,50 40,10",{"stroke":"#ffffff","stroke-width":"2","fill":"#888888"}));
});
