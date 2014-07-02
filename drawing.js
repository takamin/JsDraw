(function(){
// require ex_element.js
Drawing = function() {};
Drawing.NO_NATIVE_CANVAS = !document.createElement('canvas').getContext;
Drawing.NO_SVG = !document.createElement('canvas').getContext;
Drawing.prototype.create = function(element, pxWidth, pxHeight) {
	this.element = element;
	if(pxWidth == null || pxHeight == null) {
		var style = null;
		var ie8 = false;
		$(function() {
			var userAgent = window.navigator.userAgent.toLowerCase();
			var appVersion = window.navigator.appVersion.toLowerCase();
			if (userAgent.indexOf("msie") != -1) {
				if (appVersion.indexOf("msie 8.") != -1 || appVersion.indexOf("msie 7.") != -1) {
					ie8 = true;
				}
			}
		});
		if(ie8) {
			style = element.currentStyle;
		} else {
			style = element.getComputedStyle();
		}
		if(pxWidth == null) {
			pxWidth = parseInt(style.width);
		}
		if(pxHeight == null) {
			pxHeight = parseInt(style.height);
		}
	}
	this.pxWidth = pxWidth;
	this.pxHeight = pxHeight;
	this.scale = {x:1.0, y:1.0};
	this.clip = null;
	this.strokeColor = "#000000";
	this.strokeWidth = 1;
	this.fillColor = "#000000";
	this.fontFamily = "Meiryo";
	this.fontWeight = "normal";
	this.lineHeight = 20;
	this.textAlign = "start";
	this.lineCap = "butt";
	
	/**
	 * textRotation
	 * 
	 * text rotation number for fillText method
	 * Text rotates text (90 * textRotaion) degree clockwize
	 * 
	 * 0: no rotation
	 * 1: 90 degree clockwize
	 * 2: 180[deg]
	 * 3: 270[deg] clockwize / 90 degree counter clockwize
	 */
	this.textRotation = 0;
	this.savedContext = [];
	return this;
};

Drawing.prototype.saveContext = function() {
	var context = {
			strokeColor: this.strokeColor,
			fillColor: this.fillColor,
			strokeWidth: this.strokeWidth,
			lineCap: this.lineCap,
			fontFamily: this.fontFamily,
			fontWeight: this.fontWeight,
			lineHeight: this.lineHeight,
			textAlign: this.textAlign,
			textRotation: this.textRotation
		};
	this.savedContext.push(context);
};
Drawing.prototype.restoreContext = function() {
	if(this.savedContext.length <= 0) {
		console.error("Drawing.restoreContext : cannot restore context");
		return;
	}
	var context = this.savedContext.pop();
	this.strokeColor = context.strokeColor;
	this.fillColor = context.fillColor;
	this.strokeWidth = context.strokeWidth;
	this.lineCap = context.lineCap;
	this.fontFamily = context.fontFamily;
	this.fontWeight = context.fontWeight;
	this.lineHeight = context.lineHeight;
	this.textAlign = context.textAlign;
	this.textRotation = context.textRotation;
};
Drawing.prototype.setClipRect = function(x,y,width,height) {
	this.clip = {x:x,y:y,width:width,height:height};
};
Drawing.prototype.setScale = function(x,y) {
	this.scale.x = x;
	this.scale.y = y;
};
Drawing.prototype.getTotalScale = function() {
	return (this.scale.x + this.scale.y) / 2;
};
Drawing.prototype.setStrokeColor = function(strokeColor) {
	this.strokeColor = strokeColor;
};
Drawing.prototype.getStrokeColor = function() {
	return this.strokeColor;
};
Drawing.prototype.setStrokeWidth = function(strokeWidth) {
	this.strokeWidth = strokeWidth;
};
Drawing.prototype.getStrokeWidth = function() {
	return this.strokeWidth;
};
Drawing.prototype.setLineCap = function (lineCap) {
	this.lineCap = lineCap;
};
Drawing.prototype.getLineCap = function () {
	return this.lineCap;
};
Drawing.prototype.setFillColor = function(fillColor) {
	this.fillColor = fillColor;
};
Drawing.prototype.getFillColor = function() {
	return this.fillColor;
};
Drawing.prototype.setFont = function (lineHeight, fontWeight, fontFamily) {
	this.fontFamily = fontFamily;
	this.fontWeight = fontWeight;
	this.lineHeight = lineHeight;
};
Drawing.prototype.getFont = function () {
	return this.lineHeight + "px " + this.fontWeight + ", " + this.fontFamily;
};
Drawing.prototype.setTextAlign = function (textAlign) {
	this.textAlign = textAlign;
};
Drawing.prototype.getTextAlign = function () {
	return this.textAlign;
};
/**
 * set text rotation number for fillText method
 */
Drawing.prototype.setTextRotation = function(textRotation) {
	this.textRotation = textRotation;
};
/**
 * get text rotation number for fillText method
 */
Drawing.prototype.getTextRotation = function() {
	return this.textRotation;
};
/**
 * 線分を描く
 * @param x1 始点X座標
 * @param y1 始点Y座標
 * @param x2 終点X座標
 * @param y2 終点Y座標
 * @param color 色。CSSの色指定 #ffeedd
 * @param strokeWidth ストローク幅
 */
Drawing.prototype.line = function(x1,y1,x2,y2,color,strokeWidth) {};
Drawing.prototype.rect = function(x1, y1, w, h, fillColor, strokeWidth, strokeColor) {};
Drawing.prototype.clear = function() {};
/**
 * 文字列を出力する。
 */
Drawing.prototype.fillText = function(s, x, y, w, h) {};
/**
 * HTMLで描画を補完する場合、描画終了時にHTML要素を出力する。
 * オーバーライドして処理を記述する。
 */
Drawing.prototype.flushHtmlElements = function() {/*このクラスでは何も行わない*/};
})();

