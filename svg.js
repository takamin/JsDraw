Svg = function() {};
Svg.SUPPORTED = !!document.createElement('canvas').getContext;
if(Svg.SUPPORTED) { (function(){
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
			//e.setAttributeNS(Svg.NS, attrname, attrvalue);
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
			Svg.mixin( { 'x1':x1, 'y1':y1, 'x2':x2, 'y2':y2 }, optAttrs));
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
			Svg.mixin( { 'x':x, 'y':y, 'width':width, 'height':height }, optAttrs));
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
			Svg.mixin( { 'cx':cx, 'cy':cy, 'r':r }, optAttrs));
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
			Svg.mixin( { 'cx':cx, 'cy':cy, 'rx':rx, 'ry':ry }, optAttrs));
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
			Svg.mixin( { 'd':d }, optAttrs));
};

/**
 * svg:polygon要素を生成する。
 * @param points 頂点
 * @param optAttrs オプションの属性
 */
Svg.createPolygonElement = function(points, optAttrs) {
	return Svg.createElement( 'polygon', 
			Svg.mixin( { 'points': points }, optAttrs));
};

/**
 * svg:polyline要素を生成する。
 * @param points 頂点
 * @param optAttrs オプションの属性
 */
Svg.createPolylineElement = function(points, optAttrs) {
	return Svg.createElement( 'polyline', 
			Svg.mixin( { 'points': points }, optAttrs));
};

})();}