function Svg() {}

/**
 * SVGのXMLネームスペース
 */
Svg.NS = "http://www.w3.org/2000/svg";
/**
 * SVGの要素を生成する。
 */
Svg.createElement = function(nodename, attributes) {
	var e = document.createElementNS(Svg.NS, nodename);
	if(attributes) {
		for(var attrname in attributes) {
			var attrvalue = attributes[attrname];
			e.setAttribute(attrname, attrvalue);
		}
	}
	return e;
};
Svg.mixin = function(dst, src) {
	if(src) {
		for(var optAttrName in src) {
			dst[optAttrName] = src[optAttrName];
		}
	}
	return dst;
};
/**
 * svg:line要素を生成する。
 * @param x1 始点X座標
 * @param y1 始点Y座標
 * @param x2 終点X座標
 * @param y2 終点Y座標
 * @param optAttrs オプションの属性
 */
Svg.createLineElement = function(x1,y1,x2,y2, optAttrs) {
	return Svg.createElement( 'line', 
			Svg.mixin( { 'x1':x1, 'y1':y1, 'x2':x2, 'y2':y2, }, optAttrs));
};
/**
 * svg:rect要素を生成する。
 * @param x 左上X座標
 * @param y 左上Y座標
 * @param width 幅
 * @param height 高さ
 * @param optAttrs オプションの属性
 */
Svg.createRectElement = function(x, y, width, height, optAttrs) {
	return Svg.createElement( 'rect', 
			Svg.mixin( { 'x':x, 'y':y, 'width':width, 'height':height, }, optAttrs));
};

/**
 * svg:circle要素を生成する。
 * @param cx 中心X座標
 * @param cy 中心Y座標
 * @param r 半径
 * @param optAttrs オプションの属性
 */
Svg.createCircleElement = function(cx, cy, r, optAttrs) {
	return Svg.createElement( 'circle', 
			Svg.mixin( { 'cx':cx, 'cy':cy, 'r':r, }, optAttrs));
};

/**
 * svg:ellipse要素を生成する。
 * @param cx 中心X座標
 * @param cy 中心Y座標
 * @param rx X方向半径
 * @param ry Y方向半径
 * @param optAttrs オプションの属性
 */
Svg.createEllipseElement = function(cx, cy, rx, ry, optAttrs) {
	return Svg.createElement( 'ellipse', 
			Svg.mixin( { 'cx':cx, 'cy':cy, 'rx':rx, 'ry':ry, }, optAttrs));
};

/**
 * svg:path要素を生成する。
 * @param d 頂点 (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) 
 * @param cy 中心Y座標
 * @param rx X方向半径
 * @param ry Y方向半径
 * @param optAttrs オプションの属性
 */
Svg.createPathElement = function(d, optAttrs) {
	return Svg.createElement( 'path', 
			Svg.mixin( { 'd':d, }, optAttrs));
};

/**
 * svg:polygon要素を生成する。
 * @param points 頂点
 * @param optAttrs オプションの属性
 */
Svg.createPolygonElement = function(points, optAttrs) {
	return Svg.createElement( 'polygon', 
			Svg.mixin( { 'points': points, }, optAttrs));
};

/**
 * svg:polyline要素を生成する。
 * @param points 頂点
 * @param optAttrs オプションの属性
 */
Svg.createPolylineElement = function(points, optAttrs) {
	return Svg.createElement( 'polyline', 
			Svg.mixin( { 'points': points, }, optAttrs));
};

/**
 * Svg.Path
 * @param d
 * @param optAttrs
 */
Svg.Path = function(d, optAttrs) {
	this.element = Svg.createPathElement(d, optAttrs);
};

/**
 * Svg.Path.d
 */
Svg.Path.d = function() {
	this.commands = [];
};
Svg.Path.d.prototype.add = function(command) {
	this.commands.push(command);
};
Svg.Path.d.prototype.toString = function() {
	var d = "";
	for(var i = 0; i < this.commands.length; i++) {
		d += this.commands[i].toString();
	}
	return d;
};
Svg.Path.d.prototype.moveTo		= function(x, y)
{ this.add(new Svg.Path.d.MoveTo(x,y)); return this; };
Svg.Path.d.prototype.moveRel	= function(dx, dy)
{ this.add(new Svg.Path.d.MoveRel(dx,dy)); return this; };
Svg.Path.d.prototype.lineTo		= function(x, y)
{ this.add(new Svg.Path.d.LineTo(x,y)); return this; };
Svg.Path.d.prototype.lineRel	= function(dx, dy)
{ this.add(new Svg.Path.d.LineRel(dx,dy)); return this; };
Svg.Path.d.prototype.hlineTo	= function(y)
{ this.add(new Svg.Path.d.HLineTo(y)); return this; };
Svg.Path.d.prototype.hlineRel	= function(dy)
{ this.add(new Svg.Path.d.HLineRel(dy)); return this; };
Svg.Path.d.prototype.vlineTo	= function(x)
{ this.add(new Svg.Path.d.VLineTo(x)); return this; };
Svg.Path.d.prototype.vlineRel	= function(dx)
{ this.add(new Svg.Path.d.VLineRel(dx)); return this; };
Svg.Path.d.prototype.quadBezierTo = function(x1, y1, x, y)
{ this.add(new Svg.Path.d.QuadBezierTo(x1, y1, x, y)); return this; };
Svg.Path.d.prototype.quadBezierRel = function(dx1, dy1, dx, dy)
{ this.add(new Svg.Path.d.QuadBezierRel(dx1, dy1, dx, dy)); return this; };
Svg.Path.d.prototype.cubicBezierTo = function(x1, y1, x2, y2, x, y)
{ this.add(new Svg.Path.d.CubicBezierTo(x1, y1, x2, y2, x, y)); return this; };
Svg.Path.d.prototype.cubicBezierRel = function(dx1, dy1, dx2, dy2, dx, dy)
{ this.add(new Svg.Path.d.CubicBezierRel(dx1, dy1, dx2, dy2, dx, dy)); return this; };

/**
 * SVGPathElementの属性dの要素
 */
Svg.Path.d.Element = function() {};
Svg.Path.d.Element.prototype.create = function(commandChar, isRelative) {
	this.isRelative = isRelative;
	this.commandChar = commandChar;
};

/**
 * SVGPathElementの属性dのXとYで構成されるコマンド要素。
 */
Svg.Path.d.XYElement = function() {};
Svg.Path.d.XYElement.prototype = new Svg.Path.d.Element();
Svg.Path.d.XYElement.prototype.create = function(commandChar, isRelative, x, y) {
	Svg.Path.d.Element.prototype.create.call(this, commandChar, isRelative);
	this.x = x;
	this.y = y;
};
Svg.Path.d.XYElement.prototype.toString = function() {
	return " " + this.commandChar + this.x  + "," + this.y;
};

/**
 * SVGPathElementの属性dの位置移動コマンド要素。
 */
Svg.Path.d.Move = function() {};
Svg.Path.d.Move.prototype = new Svg.Path.d.XYElement();

/**
 * SVGPathElementの属性dの絶対位置移動コマンド要素。
 */
Svg.Path.d.MoveTo = function(x,y) { Svg.Path.d.Move.prototype.create.call(this, "M", false, x, y); };
Svg.Path.d.MoveTo.prototype = new Svg.Path.d.Move();

/**
 * SVGPathElementの属性dの相対位置移動コマンド要素。
 */
Svg.Path.d.MoveRel = function(x,y) { Svg.Path.d.Move.prototype.create.call(this, "m", true, x, y); };
Svg.Path.d.MoveRel.prototype = new Svg.Path.d.Move();


/**
 * SVGPathElementの属性dの線分描画コマンド要素。
 */
Svg.Path.d.Line = function() {};
Svg.Path.d.Line.prototype = new Svg.Path.d.XYElement();

/**
 * SVGPathElementの属性dの絶対位置指定による線分描画コマンド要素。
 */
Svg.Path.d.LineTo = function(x,y) { Svg.Path.d.Line.prototype.create.call(this, "L", false, x, y); };
Svg.Path.d.LineTo.prototype = new Svg.Path.d.Line();

/**
 * SVGPathElementの属性dの相対位置指定による線分描画コマンド要素。
 */
Svg.Path.d.LineRel = function(x,y) { Svg.Path.d.Line.prototype.create.call(this, "l", true, x, y); };
Svg.Path.d.LineRel.prototype = new Svg.Path.d.Line();

/**
 * SVGPathElementの属性dのひとつのパラメータで構成されるコマンド要素。
 */
Svg.Path.d.OneParamElement = function() {};
Svg.Path.d.OneParamElement.prototype = new Svg.Path.d.Element();
Svg.Path.d.OneParamElement.prototype.create = function(commandChar, isRelative, pos) {
	Svg.Path.d.Element.prototype.create.call(this, commandChar, isRelative);
	this.pos = pos;
};
Svg.Path.d.OneParamElement.prototype.toString = function() {
	return " " + this.commandChar + this.pos;
};


/**
 * SVGPathElementの属性dの水平線描画コマンド要素。
 */
Svg.Path.d.HLine = function(commandChar, isRelative, y)
	{ Svg.Path.d.OneParamElement.prototype.create.call(this, commandChar, isRelative, y); };
Svg.Path.d.HLine.prototype = new Svg.Path.d.OneParamElement();

/**
 * SVGPathElementの属性dの絶対位置指定による水平線描画コマンド要素。
 */
Svg.Path.d.HLineTo = function(y) { Svg.Path.d.HLine.prototype.create.call(this, "H", false, y); };
Svg.Path.d.HLineTo.prototype = new Svg.Path.d.HLine();

/**
 * SVGPathElementの属性dの相対位置指定による水平線描画コマンド要素。
 */
Svg.Path.d.HLineRel = function(y) { Svg.Path.d.HLine.prototype.create.call(this, "h", true, y); };
Svg.Path.d.HLineRel.prototype = new Svg.Path.d.HLine();


/**
 * SVGPathElementの属性dの垂直線描画コマンド要素。
 */
Svg.Path.d.VLine = function(commandChar, isRelative, x)
	{ Svg.Path.d.OneParamElement.prototype.create.call(this, commandChar, isRelative, x); };
Svg.Path.d.VLine.prototype = new Svg.Path.d.OneParamElement();

/**
 * SVGPathElementの属性dの絶対位置指定による垂直線描画コマンド要素。
 */
Svg.Path.d.VLineTo = function(x) { Svg.Path.d.VLine.prototype.create.call(this, "V", false, x); };
Svg.Path.d.VLineTo.prototype = new Svg.Path.d.VLine();

/**
 * SVGPathElementの属性dの相対位置指定による垂直線描画コマンド要素。
 */
Svg.Path.d.VLineRel = function(x) { Svg.Path.d.VLine.prototype.create.call(this, "v", true, x); };
Svg.Path.d.VLineRel.prototype = new Svg.Path.d.VLine();

/**
 * SVGPathElementの属性dのQuadベジェ曲線描画コマンド要素。
 */
Svg.Path.d.QuadBezier = function() {};
Svg.Path.d.QuadBezier.prototype = new Svg.Path.d.Element();
Svg.Path.d.QuadBezier.prototype.create = function(isRelative, x1, y1, x, y) {
	var shorthand = false;
	if(x == null && y == null) {
		shorthand = true;
		x = x1;
		y = y1;
		x1 = null;
		y1 = null;
	}
	var commandChar = "";
	if(isRelative) {
		if(shorthand) {
			commandChar = "t";
		} else {
			commandChar = "q";
		}
	} else {
		if(shorthand) {
			commandChar = "T";
		} else {
			commandChar = "Q";
		}
	}
	Svg.Path.d.Element.prototype.create.call(this, commandChar, isRelative); 
	this.shorthand = shorthand;
	this.x1 = x1;
	this.y1 = y1;
	this.x = x;
	this.y = y;
};
Svg.Path.d.QuadBezier.prototype.toString = function() {
	if(this.shorthand) {
		return " " + this.commandChar
		+ this.x + "," + this.y;
	}
	return " " + this.commandChar
	+ this.x1 + "," + this.y1 + " "
	+ this.x + "," + this.y;
};

/**
 * SVGPathElementの属性dの絶対位置指定によるQuadベジェ曲線描画コマンド要素。
 */
Svg.Path.d.QuadBezierTo = function(x1,y1,x,y) {
	Svg.Path.d.QuadBezier.prototype.create.call(this, false, x1, y1, x, y);
};
Svg.Path.d.QuadBezierTo.prototype = new Svg.Path.d.QuadBezier();

/**
 * SVGPathElementの属性dの相対位置指定によるQuadベジェ曲線描画コマンド要素。
 */
Svg.Path.d.QuadBezierRel = function(x1,y1,x,y) {
	Svg.Path.d.QuadBezier.prototype.create.call(this, true, x1, y1, x, y);
};
Svg.Path.d.QuadBezierRel.prototype = new Svg.Path.d.QuadBezier();

/**
 * SVGPathElementの属性dのCubicベジェ曲線描画コマンド要素。
 */
Svg.Path.d.CubicBezier = function() {}
Svg.Path.d.CubicBezier.prototype = new Svg.Path.d.Element();
Svg.Path.d.CubicBezier.prototype.create = function(isRelative, x1,y1,x2,y2,x,y) {
	var shorthand = false;
	if(x == null && y == null) {
		shorthand = true;
		x = x2;
		y = y2;
		x2 = x1;
		y2 = y1;
		x1 = null;
		y1 = null;
	}
	var commandChar = "";
	if(isRelative) {
		if(shorthand) {
			commandChar = "s";
		} else {
			commandChar = "c";
		}
	} else {
		if(shorthand) {
			commandChar = "S";
		} else {
			commandChar = "C";
		}
	}
	
	Svg.Path.d.Element.prototype.create.call(this, commandChar, isRelative); 
	this.shorthand = shorthand;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x = x;
	this.y = y;
};
Svg.Path.d.CubicBezier.prototype.toString = function() {
	if(this.shorthand) {
		return " " + this.commandChar
		+ this.x2 + "," + this.y2 + " "
		+ this.x + "," + this.y;
	}
	return " " + this.commandChar
	+ this.x1 + "," + this.y1 + " "
	+ this.x2 + "," + this.y2 + " "
	+ this.x + "," + this.y;
};

/**
 * SVGPathElementの属性dの絶対位置指定によるCubicベジェ曲線描画コマンド要素。
 */
Svg.Path.d.CubicBezierTo = function(x1,y1,x2,y2,x,y) {
	Svg.Path.d.CubicBezier.prototype.create(false, x1,y1,x2,y2,x,y);
};
Svg.Path.d.CubicBezierTo.prototype = new Svg.Path.d.CubicBezier();

/**
 * SVGPathElementの属性dの相対位置指定によるCubicベジェ曲線描画コマンド要素。
 */
Svg.Path.d.CubicBezierRel = function(x1,y1,x2,y2,x,y) {
	Svg.Path.d.CubicBezier.prototype.create(true, x1,y1,x2,y2,x,y);
};
Svg.Path.d.CubicBezierRel.prototype = new Svg.Path.d.CubicBezier();


/***
 * SVGTransformObject
 */
function SVGTransformObject() {
	this.cx = 0;
	this.cy = 0;
	this.translateX = 0;
	this.translateY = 0;
	this.rotate = 0;
	this.element = Svg.createElement('g', {});
	this.transformMatrix = this.element.getCTM();
}

SVGTransformObject.prototype.intersectWith = function(other) {
	var svg = this.element.ownerSVGElement;
//	var rectA = this.element.getBBox();
//	var rectB = other.element.getBBox();
	var intersection = svg.checkIntersection(this.coreRect, other.coreRect.getBBox());
	return intersection;
};
SVGTransformObject.prototype.append = function(element) {
	$(this.element).append($(element));
};
SVGTransformObject.prototype.appendTo = function(svg) {
	$(svg).append($(this.element));
};

//回転中心位置を設定
SVGTransformObject.prototype.setCenter = function(cx, cy) {
	this.cx = cx;
	this.cy = cy;
};

//位置を設定
SVGTransformObject.prototype.setPos = function(translateX, translateY) {
	this.translateX = translateX;
	this.translateY = translateY;
};

//回転角度を設定
SVGTransformObject.prototype.setRotation = function(rotate) {
	this.rotate = rotate;
};

SVGTransformObject.prototype.addRotation = function(dT) {
	this.rotate += dT;
	while(this.rotate < 0) {
		this.rotate += 360;
	}
	while(this.rotate >= 360) {
		this.rotate -= 360;
	}
};
SVGTransformObject.prototype.movePos = function(dx,dy) {
	this.translateX += dx;
	this.translateY += dy;
};

SVGTransformObject.prototype.getTransformMatrix = function() {
	var cx = this.cx;
	var cy = this.cy;
	var m = this.transformMatrix//オリジナルの変換行列
			.translate(this.translateX, this.translateY)//移動
			.translate(cx, cy)//(cx,cy)を中心に回転
			.rotate(this.rotate)
			.translate(-cx, -cy);
	return m;
};

//描画更新
SVGTransformObject.prototype.update = function() {
	var m = this.getTransformMatrix();
	$(this.element).attr("transform",
			'matrix(' + m.a + ' ' + m.b + ' ' + m.c + ' '
					  + m.d + ' ' + m.e + ' ' + m.f + ')');
};

//外接矩形の4点の座標を返す。
//戻り値は座標の配列[左上,右上,右下,左下]の順。x,yをメンバーとするオブジェクト(SVGPointではない)
SVGTransformObject.prototype.getBounceRectPoints = function() {
	var m = this.getTransformMatrix();
	var bbox = this.element.getBBox();
	return [
			this.transformPoint(m, {x:bbox.x, y:bbox.y }),
			this.transformPoint(m, {x:bbox.x + bbox.width, y:bbox.y }),
			this.transformPoint(m, {x:bbox.x + bbox.width, y:bbox.y + bbox.height }),
			this.transformPoint(m, {x:bbox.x, y:bbox.y + bbox.height }),
			];
};

/***
 * 2次元座標を2次元アフィン変換により変換する。
 *
 *             | a b 0 |
 * p|x y 1| ・ m| c d 0 | = q|x' y' 1|
 *             | e f 1 |
 *           
 * @param m 2次元アフィン変換用の行列。SVGMatrixオブジェクト。
 * @param p 変換元座標。x,yをメンバーとする 
 */
SVGTransformObject.prototype.transformPoint = function(m, p) {
	return { "x": p.x * m.a + p.y * m.c + m.e,
			 "y": p.x * m.b + p.y * m.d + m.f };
};
