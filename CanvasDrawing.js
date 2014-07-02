

/**
 * class CanvasDrawing
 */
function CanvasDrawing() {}
CanvasDrawing.createElement = function(width, height) {
	var el = document.createElement('canvas');
	if(width != null) {
		el.setAttribute('width', width);
	}
	if(height != null) {
		el.setAttribute('height', height);
	}
//	var userAgent = window.navigator.userAgent.toLowerCase();
//	var appVersion = window.navigator.appVersion.toLowerCase();
	if (Drawing.NO_NATIVE_CANVAS) {
		G_vmlCanvasManager.initElement(el);
	}
	return el;
};
CanvasDrawing.prototype = new Drawing();
CanvasDrawing.prototype.create = function(element, pxWidth, pxHeight) {
	if ( ! element || ! element.getContext ) {
	    alert("ユーザーエージェントが Canvas に対応していません。");
	}
	Drawing.prototype.create.call(this, element, pxWidth, pxHeight);
	this.textContainer = element.parentNode;
	this.ctx = element.getContext('2d');
	
	//excanvas ie 8 スクロール対策。
	if(this.ctx.element_) {
		this.ctx.element_.style.position = 'relative';
	}
	
	this.ctx.strokeStyle = this.strokeColor;
	this.ctx.fillStyle = this.fillColor;
	this.ctx.lineCap = this.lineCap;
	this.ctx.lineWidth = this.strokeWidth * this.getTotalScale();
	this.ctx.lineHeight = this.lineHeight * this.scale.y;
	this.ctx.font = (this.lineHeight * this.scale.y) + "px " + this.fontWeight + " '" + this.fontFaceName + "'";
	this.ctx.imageSmoothingEnabled = false;
	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.msImageSmoothingEnabled = false;
	this.ctx.textBaseline = 'top';
	
	this.textItems = [];
	return this;
};
CanvasDrawing.prototype.saveContext = function() {
	Drawing.prototype.saveContext.call(this);
	this.ctx.save();
};
CanvasDrawing.prototype.restoreContext = function() {
	Drawing.prototype.restoreContext.call(this);
	this.ctx.restore();
};
CanvasDrawing.prototype.setScale = function(x,y) {
	Drawing.prototype.setScale.call(this, x,y);
	this.ctx.scale(1 / x, 1 / y);
	this.ctx.lineWidth = this.strokeWidth * this.getTotalScale();
	this.ctx.font = (this.lineHeight * this.scale.y) + "px " + this.fontWeight + " '" + this.fontFaceName + "'";
};
CanvasDrawing.prototype.setClipRect = function(x,y,width,height) {
	Drawing.prototype.setClipRect.call(this, x, y, width, height);
	x *= this.scale.x;
	y *= this.scale.y;
	width *= this.scale.x;
	height *= this.scale.y;
	this.ctx.beginPath();
	this.ctx.moveTo(x,y);
	this.ctx.lineTo(x+width,y);
	this.ctx.lineTo(x+width,y+height);
	this.ctx.lineTo(x,y+height);
	this.ctx.closePath();
	this.ctx.clip();
};
CanvasDrawing.prototype.setStrokeColor = function(strokeColor) {
	Drawing.prototype.setStrokeColor.call(this, strokeColor);
	this.ctx.strokeStyle = strokeColor;
};
CanvasDrawing.prototype.setStrokeWidth = function(strokeWidth) {
	Drawing.prototype.setStrokeWidth.call(this, strokeWidth);
	this.ctx.lineWidth = strokeWidth * this.getTotalScale();
};
CanvasDrawing.prototype.setFillColor = function(fillColor) {
	Drawing.prototype.setFillColor.call(this, fillColor);
	this.ctx.fillStyle = fillColor;
};
CanvasDrawing.prototype.setFont = function (lineHeight, fontWeight, fontFaceName) {
	Drawing.prototype.setFont.call(this, lineHeight, fontWeight, fontFaceName);
	this.ctx.font = (lineHeight * this.scale.y) + "px " + fontWeight + " '" + fontFaceName + "'";
};
CanvasDrawing.prototype.setTextAlign = function (textAlign) {
	if(textAlign == 'middle') {
		textAlign = 'center';
	}
	Drawing.prototype.setTextAlign.call(this, textAlign);
	this.ctx.textAlign = textAlign;
};
CanvasDrawing.prototype.setLineCap = function (lineCap) {
	Drawing.prototype.setLineCap.call(this, lineCap);
	this.ctx.lineCap = lineCap;
};
CanvasDrawing.prototype.applyStrokeProperty = function(strokeWidth, strokeColor) {
	if(strokeWidth != null) { this.ctx.lineWidth = strokeWidth * this.getTotalScale(); } 
	if(strokeColor != null) { this.ctx.strokeStyle = strokeColor; }
};
CanvasDrawing.prototype.applyFillProperty = function(fillColor) {
	if(fillColor != null) { this.ctx.fillStyle = fillColor; }
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
CanvasDrawing.prototype.line = function(x1,y1,x2,y2,strokeColor,strokeWidth) {
	this.applyStrokeProperty(strokeWidth, strokeColor);
	var ctx = this.ctx;
	ctx.beginPath();
	ctx.moveTo(x1 * this.scale.x, y1 * this.scale.y);
	ctx.lineTo(x2 * this.scale.x, y2 * this.scale.y);
	ctx.closePath();
	ctx.stroke();
};

/**
 * 矩形を描く
 */
CanvasDrawing.prototype.rect = function(x1,y1,w,h, fillColor, strokeWidth, strokeColor) {
	this.applyFillProperty(fillColor);
	this.applyStrokeProperty(strokeWidth, strokeColor);
	
	var ctx = this.ctx;
	if(ctx.fillStyle != 'transparent') {
		ctx.fillRect(
				x1 * this.scale.x,
				y1 * this.scale.y,
				w * this.scale.x,
				h * this.scale.y);
	}
	if(ctx.lineWidth > 0) {
		ctx.beginPath();
		//ctx.strokeStyle = strokeColor;
		ctx.rect(
				x1 * this.scale.x,
				y1 * this.scale.y,
				w * this.scale.x,
				h * this.scale.x);
		ctx.stroke();
	}
};
CanvasDrawing.prototype.roundRect = function(x, y, width, height, radius, fillColor, strokeWidth, strokeColor) {
	this.applyFillProperty(fillColor);
	this.applyStrokeProperty(strokeWidth, strokeColor);
	var ctx = this.ctx;
	if (typeof stroke == "undefined" ) {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	
	if(ctx.lineWidth > 0) {
		ctx.stroke();
	}
	if (ctx.fillStyle != 'transparent') {
		ctx.fill();
	}        
};

/**
 * 矩形を描く
 */
CanvasDrawing.prototype.circle = function(x,y,r, fillColor, strokeWidth, strokeColor) {
	var ctx = this.ctx;
	ctx.beginPath();
	ctx.arc(x * this.scale.x, y * this.scale.y,
			r * this.scale.x, 0, 2 * Math.PI, false);
	this.applyFillProperty(fillColor);
	this.applyStrokeProperty(strokeWidth, strokeColor);
	ctx.fill();
	if(strokeWidth > 0) {
		ctx.stroke();
	}
};

/**
 * 文字列を出力する
 */
if (Drawing.NO_NATIVE_CANVAS) {
	/**
	 * 文字列を出力する。
	 * IE8はCANVAS非対応のため、excanvas.jsを使用している前提だが、
	 * excanvasにはfillTextが実装されていないため、divで代用する。
	 * ただし、document.createElement/appendChildでは処理が遅いため、
	 * 文字列配列にHTMLを保持させ、最後に、
	 * 
	 */
	CanvasDrawing.prototype.fillText = function(s, x, y, w, h) {
		this.textItems.push('<div style="position:absolute;');
		var textRotation = this.getTextRotation();
		if(w && h) {
			if(textRotation == 1) {
				x -= h/4;
			} else if(textRotation == 3) {
			} else {
				//y -= h/2;
				this.textItems.push('width:',w,'px;');
			}
			this.textItems.push('left:',x,'px;top:',y,'px; height',h,'px; overflow:hidden;');
		}
		if(textRotation != 0) {
			this.textItems.push(
					'filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=',
					textRotation,');');
		}
		this.textItems.push(
				'font-family:',this.fontName,';',
				'font-size:',(this.lineHeight - 1),'px;',
				'font-weight:',this.fontWeight,';',
				'color:',this.fillColor,';'
				);
		if(this.textAlign == 'end') {
			this.textItems.push( 'text-align:right;' );
		} else if(this.textAlign == 'center') {
			this.textItems.push( 'text-align:center;' );
        } else {
            this.textItems.push( 'text-align:left;' );
		}
		this.textItems.push('">',s,'</div>');
	};
	CanvasDrawing.prototype.flushHtmlElements = function() {
		if(this.textItems && this.textItems.length > 0) {
			this.textContainer.insertAdjacentHTML(
					'BeforeEnd',
					this.textItems.join(''));
		}
	};
} else {
	CanvasDrawing.prototype.fillText = function(s, x, y, w, h) {
		var textRotation = this.getTextRotation();
		var rotate = 90 * textRotation * Math.PI / 180;
		//幅と高さが指定されている時、出力位置を補正する。
		if(w && h) {
			switch(this.textAlign) {
				case 'end':
					x += w;
					break;
				case 'center':
					x += w / 2;
					break;
			}
			if(textRotation == 1) {
				x += w/2-h;
			} else if(textRotation == 3) {
			} else {
			}
			//y += h/2;
		}
		
		var tx = x * this.scale.x;
		var ty = y * this.scale.y;
		
		this.ctx.translate(tx, ty);
		this.ctx.rotate(rotate);
		this.ctx.translate(-tx, -ty);
		
//		var metrics = this.ctx.measureText(s);
		this.ctx.fillText(s, tx, ty);
		
		this.ctx.translate(tx, ty);
		this.ctx.rotate(-rotate);
		this.ctx.translate(-tx, -ty);
	};
}
/**
 * 描画面をクリアする
 */
CanvasDrawing.prototype.clear = function() {
	this.ctx.clearRect(
			-this.pxWidth,
			-this.pxHeight,
			this.pxWidth * 3,
			this.pxHeight * 3);
};
