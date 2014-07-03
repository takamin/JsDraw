/***
 * SVGTransformObject
 */
SVGTransformObject = function() {
	this.cx = 0;
	this.cy = 0;
	this.translateX = 0;
	this.translateY = 0;
	this.rotate = 0;
	this.element = Svg.createElement('g', {});
	this.transformMatrix = this.element.getCTM();
};


SVGTransformObject.prototype.intersectWith = function(other) {
	var svg = this.element.ownerSVGElement;
	var rectA = this.element.getBBox();
	var rectB = other.element.getBBox();
//	console.info("rectA = {"
//			+ "x:" + rectA.x + ","
//			+ "y:" + rectA.y + ","
//			+ "width:" + rectA.width + ","
//			+ "height:" + rectA.height + ","
//			+ "}");
//	console.info("rectB = {"
//			+ "x:" + rectB.x + ","
//			+ "y:" + rectB.y + ","
//			+ "width:" + rectB.width + ","
//			+ "height:" + rectB.height + ","
//			+ "}");
	var intersection = svg.checkIntersection(this.coreRect, other.coreRect.getBBox());
//	if(intersection) {
//		console.info("I N T E R S E C T I O N ! ! !");
//	}
	return intersection;
}
SVGTransformObject.prototype.append = function(element) {
	$(this.element).append($(element));
}
SVGTransformObject.prototype.appendTo = function(svg) {
	$(svg).append($(this.element));
}

//回転中心位置を設定
SVGTransformObject.prototype.setCenter = function(cx, cy) {
	this.cx = cx;
	this.cy = cy;
}

//位置を設定
SVGTransformObject.prototype.setPos = function(translateX, translateY) {
	this.translateX = translateX;
	this.translateY = translateY;
}

//回転角度を設定
SVGTransformObject.prototype.setRotation = function(rotate) {
	this.rotate = rotate;
}

SVGTransformObject.prototype.addRotation = function(dT) {
	this.rotate += dT;
	while(this.rotate < 0) {
		this.rotate += 360;
	}
	while(this.rotate >= 360) {
		this.rotate -= 360;
	}
}
SVGTransformObject.prototype.movePos = function(dx,dy) {
	this.translateX += dx;
	this.translateY += dy;
}

SVGTransformObject.prototype.getTransformMatrix = function() {
	var cx = this.cx;
	var cy = this.cy;
	var m = this.transformMatrix//オリジナルの変換行列
			.translate(this.translateX, this.translateY)//移動
			.translate(cx, cy)//(cx,cy)を中心に回転
			.rotate(this.rotate)
			.translate(-cx, -cy);
	return m;
}

//描画更新
SVGTransformObject.prototype.update = function() {
	var m = this.getTransformMatrix();
	$(this.element).attr("transform",
			'matrix(' + m.a + ' ' + m.b + ' ' + m.c + ' '
					  + m.d + ' ' + m.e + ' ' + m.f + ')');
}

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
}

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
}
