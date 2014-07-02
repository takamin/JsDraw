
if(!Drawing.NO_SVG) { (function(){

/**
 * class SvgDrawing
 */
SvgDrawing = function() {
	this.shapeRendering = "crispEdges";
};

SvgDrawing.createElement = function() {
	var svg = Svg.createElement('svg', {"xmlns": Svg.NS});
	return svg;
};
SvgDrawing.prototype = new Drawing();
SvgDrawing.prototype.setScale = function(x, y) {
	Drawing.prototype.setScale.call(this, x, y);
	var width = parseInt(this.element.getAttribute('width'));
	var height = parseInt(this.element.getAttribute('height'));
	//this.element.setAttributeNS(Svg.NS, "viewBox", "0,0," + width * x + "," + height * y);
	this.element.setAttribute("viewBox", "0,0," + width * x + "," + height * y);
	this.drawingElements = [];
	this.autoId = 0;
};
SvgDrawing.prototype.getNewId = function() {
	return "SvgDrawingId" + this.autoId++;
};
SvgDrawing.prototype.saveContext = function() {
	Drawing.prototype.saveContext.call(this);
	this.drawingElements.push(this.element);
};
SvgDrawing.prototype.restoreContext = function() {
	Drawing.prototype.restoreContext.call(this);
	this.element = this.drawingElements.pop();
};
SvgDrawing.prototype.getSvgElement = function() {
	if(this.drawingElements.length > 0) {
		return this.drawingElements[0];
	}
	return this.element;
};
SvgDrawing.prototype.getDefsElement = function() {
	var defsElement = null;
	var svgElement = this.getSvgElement();
	var defsArray = svgElement.getElementsByTagNameNS(Svg.NS, 'defs');
	if(defsArray && defsArray.length > 0) {
		defsElement = defsArray[0];
	} else {
		defsElement = Svg.createElement('defs');
		svgElement.appendChild(defsElement);
	}
	return defsElement;
};
/**
 * クリップ領域として矩形を設定する。
 * restoreContextが呼ばれるまで有効。
 */
SvgDrawing.prototype.setClipRect = function(x,y,width,height) {
	Drawing.prototype.setClipRect.call(this,x,y,width,height);
	
	//SVG中のdefs要素を得る
	var defs = this.getDefsElement();
	
	//clipPath要素をdefsへ定義する。
	var clipPathId = this.getNewId();
	var clipPath = Svg.createElement('clipPath', { 'id': clipPathId } );
	defs.appendChild(clipPath);
	
	//clipPath内に矩形を生成
	var clipRect = Svg.createRectElement(
			x * this.scale.x,
			y * this.scale.y,
			width * this.scale.x,
			height * this.scale.y);
	clipPath.appendChild(clipRect);
	
	//g要素を生成し、今後のSVG要素の生成は、この中へappendされるようにする。
	//HTMLページでbaseタグが使われていると、「url(...)で参照する先は他の文書」と仮定されるため、
	//表示中ページ内の要素を指定するには、絶対パスで表現しなくてはならないらしい。
	//ClipPathの参照でもこの問題が発生。Chromeでクリップが正しく動作しなかった。IEは大丈夫だった。
	var g = Svg.createElement('g', {'clip-path': 'url(' + document.URL + '#'+ clipPathId +')' });
	this.element.appendChild(g);
	this.element = g;
};
SvgDrawing.prototype.setTextAlign = function (textAlign) {
	if(textAlign == "center") {
		textAlign = 'middle';
	}
	Drawing.prototype.setTextAlign.call(this, textAlign);
};
/**
 * 線分を描画。
 * @param x1 始点X座標
 * @param y1 始点Y座標
 * @param x2 終点X座標
 * @param y2 終点Y座標
 * @param color 色。CSSの色指定 #ffeedd
 * @param strokeWidth ストローク幅
 */
SvgDrawing.prototype.line = function(x1, y1, x2, y2, strokeColor, strokeWidth) {
	var attrbutes = {};
	attrbutes['stroke-width'] = ((strokeWidth != null) ? strokeWidth : this.getStrokeWidth()) * this.getTotalScale();
	attrbutes['stroke'] = (strokeColor != null) ? strokeColor : this.getStrokeColor();
	attrbutes['stroke-linecap'] = this.lineCap;
	attrbutes['shape-rendering'] = this.shapeRendering;
	this.element.appendChild(
			Svg.createLineElement(
					x1 * this.scale.x,
					y1 * this.scale.y,
					x2 * this.scale.x,
					y2 * this.scale.y,
					attrbutes));
};

/**
 * 矩形を描く
 */
SvgDrawing.prototype.rect = function(x1, y1, w, h, fillColor, strokeWidth, strokeColor) {
	var attrbutes = {};
	attrbutes['fill'] = (fillColor != null) ? fillColor : this.getFillColor();
	attrbutes['stroke-width'] = ((strokeWidth != null) ? strokeWidth : this.getStrokeWidth()) * this.getTotalScale();
	attrbutes['stroke'] = (strokeColor != null) ? strokeColor : this.getStrokeColor();
	attrbutes['stroke-linecap'] = this.lineCap;
	attrbutes['shape-rendering'] = this.shapeRendering;
	this.element.appendChild(
			Svg.createRectElement(
						x1 * this.scale.x,
						y1 * this.scale.y,
						w * this.scale.x,
						h * this.scale.y,
						attrbutes));
};
SvgDrawing.prototype.roundRect = function(x, y, width, height, radius, fillColor, strokeWidth, strokeColor) {
	var attrbutes = {};
	attrbutes['rx'] = radius;
	attrbutes['ry'] = radius;
	attrbutes['fill'] = (fillColor != null) ? fillColor : this.getFillColor();
	attrbutes['stroke-width'] = ((strokeWidth != null) ? strokeWidth : this.getStrokeWidth()) * this.getTotalScale();
	attrbutes['stroke'] = (strokeColor != null) ? strokeColor : this.getStrokeColor();
	attrbutes['stroke-linecap'] = this.lineCap;
	attrbutes['shape-rendering'] = this.shapeRendering;
	this.element.appendChild(
			Svg.createRectElement(
						x1 * this.scale.x,
						y1 * this.scale.y,
						w * this.scale.x,
						h * this.scale.y,
						attrbutes));
};
/**
 * 矩形を描く
 */
SvgDrawing.prototype.circle = function(x,y,r, fillColor, strokeWidth, strokeColor) {
	var attrbutes = {};
	attrbutes['fill'] = (fillColor != null) ? fillColor : this.getFillColor();
	attrbutes['stroke-width'] = ((strokeWidth != null) ? strokeWidth : this.getStrokeWidth()) * this.getTotalScale();
	attrbutes['stroke'] = (strokeColor != null) ? strokeColor : this.getStrokeColor();
	attrbutes['stroke-linecap'] = this.lineCap;
	attrbutes['shape-rendering'] = this.shapeRendering;
	this.element.appendChild(
			Svg.createCircleElement(
						x * this.scale.x,
						y * this.scale.y,
						r * this.scale.x,
						attrbutes));
};

/**
 * 文字列を出力する
 */
SvgDrawing.prototype.fillText = function(s, x, y, w, h) {
	if(w != null) {
		switch(this.textAlign) {
		case 'end':
		case 'right':
			x += w;
			break;
		case 'center':
		case 'middle':
			x += w/2;
			break;
		}
	}
	var text = Svg.createElement("text", {
			'x':	x * this.scale.x,
			'y':	y * this.scale.y,
			'fill':	this.getFillColor(),
			'font-family':	this.fontFamily,
			'font-size':	this.lineHeight * this.scale.y,
			'text-anchor':	this.textAlign,
			'shape-rendering':this.shapeRendering
		});
	text.appendChild(document.createTextNode(s));
	this.element.appendChild(text);
};
/**
 * 描画面をクリアする
 */
SvgDrawing.prototype.clear = function() {
	//SVG要素の全個要素を削除する。
	var element = this.element;
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}
};


})();}

