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
	var rectA = this.element.getBBox();
	var rectB = other.element.getBBox();
	console.info("rectA = {"
			+ "x:" + rectA.x + ","
			+ "y:" + rectA.y + ","
			+ "width:" + rectA.width + ","
			+ "height:" + rectA.height + ","
			+ "}");
	console.info("rectB = {"
			+ "x:" + rectB.x + ","
			+ "y:" + rectB.y + ","
			+ "width:" + rectB.width + ","
			+ "height:" + rectB.height + ","
			+ "}");
	var intersection = svg.checkIntersection(this.coreRect, other.coreRect.getBBox());
	if(intersection) {
		console.info("I N T E R S E C T I O N ! ! !");
	}
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
