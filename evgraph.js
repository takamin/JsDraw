/**
 * 積み上げグラフグラフコンポーネント
 * CANVASまたはSVG要素を出力する。
 */
function Evgraph() {
	//グラフのウェブページ上でのピクセルサイズ
	this.size = {width: 0, height: 0};
	
	//グラフ描画領域
	this.titleArea = {x:0, y:0, width: 0, height: 0};
	this.title = null;
	
	//グラフ描画領域
	this.graphArea = {x:0, y:0, width: 0, height: 0};
	this.graphAreaRect = {x:0, y:0, width: 0, height: 0, strokeWidth:0, strokeColor: 'silver', cornerRadius:5};
	
	//表示スケール
	this.scale = {x:1, y:1};
	
	//データの系列
	this.dataSeriesList = [];
	//各系列のデータ数（横軸）
	this.dataCount = 0;
	this.itemLabels = [];
	//各系列のグラフに描画される値の範囲
	this.verticalRange = {min:0, max:0};
	
	//縦横の軸線（X=0,Y=0）のプロパティ
	this.mainAxisStrokeColor = "black";
	this.mainAxisStrokeWidth = 1;
	
	//グリッドのプロパティ interval=0で表示しない。
	this.gridInterval = {x:0, y:0};
	this.gridColor = "gray";
	this.gridWidth = 1;
	
	//補助目盛りのプロパティ。グリッドの分割数を指定する。
	this.subGridDiv = {x:0, y:0};
	this.subGridColor = "silver";
	this.subGridWidth = 1;
	
	//系列のトータルカウント
	this.totalSeriesCount = 0;
	
	this.titleFont = {height:18, weight:'bold', faceName:'メイリオ', color:"#444444"};
	this.xlabelFont = {height:10, weight:'normal', faceName:'メイリオ'};
	this.ylabelFont = {height:10, weight:'normal', faceName:'メイリオ'};
	
	this.xLabelRotation = 0;
	
	//Y軸のデータ名
	this.yAxisName = null;
	this.yAxisNameFont = {height:10, weight:'normal', faceName:'メイリオ'};
	this.yAxisNameArea = {x:0, y:0, width: 0, height: 0};;
	
	//凡例
	this.legend = null;
	
	//X軸の両端に置くマージン量。X方向1項目の幅に対する比率で指定。
	this.graphAreaPaddingRatio = 0.5;
	//棒グラフの棒の幅。1項目の領域幅に対する比率で指定する。1.0で隣の棒と接する。
	this.barWidthRatio = 1.0;

}
Evgraph.prototype.recalcGraphArea = function() {
	this.titleArea = {x:0,y:20,width:this.size.width,height:32};
};
/**
 * 系列の色設定
 */
Evgraph.colors = [
                  "#008","#080","#088","#800","#808","#880",
                  "#00F","#0F0","#0FF","#F00","#F0F","#FF0",
                  "#88F","#8F8","#8FF","#F88","#F8F","#FF8",
                  "#448","#484","#488","#844","#848","#884",
                  ];

Evgraph.prototype.setTitle = function(titleOrNull) {
	this.title = titleOrNull;
	this.recalcGraphArea();
};
Evgraph.prototype.getTitle = function() {
	return this.title;
};
/**
 * 描画される要素のピクセルサイズを設定する。
 */
Evgraph.prototype.setSize = function(width, height) {
	this.size = {width: width, height: height};
};

/**
 * スケールを設定する。
 */
Evgraph.prototype.setScale = function(x, y) {
	this.scale.x = x;
	this.scale.y = y || x;
};

/**
 * グラフの描画領域を設定する。
 */
Evgraph.prototype.setGraphArea = function(x, y, width, height) {
	this.graphArea = { x: x, y: y, width: width, height: height };
};
Evgraph.prototype.setGraphAreaRect = function(x, y, width, height, strokeWidth, strokeColor, cornerRadius) {
	this.graphAreaRect = {
			x: x, y: y, width: width, height: height,
			strokeWidth:strokeWidth, strokeColor:strokeColor,
			cornerRadius:cornerRadius
	};
};
/**
 * グラフの縦方向の値の範囲を定める。
 */
Evgraph.prototype.setGraphValueRange = function(min,max) {
	this.verticalRange = {min:min, max:max};
};
/**
 * 項目（X方向）の名前
 */
Evgraph.prototype.setItemLabels = function(itemLabels) {
	this.itemLabels = itemLabels;
};
/**
 * データ系列を追加する。
 */
Evgraph.prototype.addDataSeries = function(dataSeries) {
	if(this.dataCount < dataSeries.getDataCount()) {
		this.dataCount = dataSeries.getDataCount();
	}
	this.totalSeriesCount = dataSeries.setSeriesIndex(this.totalSeriesCount);
	this.dataSeriesList.push(dataSeries);
};

Evgraph.prototype.setLegend = function(legendText, legendSeries, titleArea, titleFont, seriesFont, dotSize) {
	this.legend	= {
			Text: legendText, 
			series: legendSeries,
			titleArea: titleArea,
			titleFont: titleFont,
			seriesFont: seriesFont,
			dotSize: dotSize
			};
};
/**
 * グラフが描かれたCANVAS要素を返します。
 */
Evgraph.prototype.drawCanvasTo = function(container, element) {
	return this.getDrawnElement(CanvasDrawing, container, element);
};
/**
 * グラフが描かれたSVG要素を返します。
 */
if(Drawing.NO_SVG) {
		Evgraph.prototype.drawSvgTo = function() {};
} else {
	Evgraph.prototype.drawSvgTo = function(container, element) {
		return this.getDrawnElement(SvgDrawing, container, element);
	};
}

/**
 * グラフを描画します。
 * @param drawingClass Drawingクラスのサブクラス（のコンストラクタ）。
 */
Evgraph.prototype.getDrawnElement = function(drawingClass, container, element) {
	//グラフが描かれる要素を生成します。
	if(element == null) {
		element = drawingClass.createElement(this.size.width, this.size.height);
		if(container != null) {
			container.appendChild(element);
		}
	} else {
		element.setAttribute('width', this.size.width);
		element.setAttribute('height', this.size.height);
	}
	if(container != null) {
		container.style.position = 'relative';
	}
	element.setAttribute('style', 'overflow:hidden;');
	element.setAttribute('width', this.size.width);
	element.setAttribute('height', this.size.height);
	
	//描画用のクラスをインスタンス化します。
	var g = new drawingClass().create(element, this.size.width, this.size.height);
	g.setScale(this.scale.x, this.scale.y);
	g.setLineCap('round');//lineCapを丸に設定する。
	
	//グラフを描きます。
	this.draw(g);
	
	//描かれた要素を返します。
	return element;
};

/**
 * グラフを描く
 */
Evgraph.prototype.draw = function(g) {
	if(this.dataSeriesList.length > 0) {
		
		//グラフエリアの枠線を描く
		if(this.graphAreaRect.strokeWidth > 0) {
			g.saveContext();
			g.roundRect(
					this.graphAreaRect.x,
					this.graphAreaRect.y,
					this.graphAreaRect.width,
					this.graphAreaRect.height,
					this.graphAreaRect.cornerRadius,
					'transparent',
					this.graphAreaRect.strokeWidth,
					this.graphAreaRect.strokeColor);
			g.restoreContext();
		}
		
		//凡例を描く
		if(this.legend != null && this.legend.series.length > 0) {
			var y = this.legend.titleArea.y;
			g.saveContext();
			g.setFont(
					this.legend.titleFont.height, 
					this.legend.titleFont.weight, 
					this.legend.titleFont.faceName);
			g.setTextAlign('start');
			g.setFillColor('black');
			g.fillText(this.legend.Text, this.legend.titleArea.x, y,
					this.legend.titleArea.width, this.legend.titleArea.height);
			y += this.legend.titleArea.height;
			var dotMargin = 5;
			g.setFont(
					this.legend.seriesFont.height, 
					this.legend.seriesFont.weight, 
					this.legend.seriesFont.faceName);
			for(var indexLegend = 0; indexLegend < this.legend.series.length; indexLegend++) {
				g.setFillColor(this.legend.series[indexLegend].fillColor);
				g.setStrokeColor(this.legend.series[indexLegend].strokeColor);
				g.setStrokeWidth(this.legend.series[indexLegend].strokeWidth);
				g.rect(this.legend.titleArea.x, y,
						this.legend.dotSize.width,
						this.legend.dotSize.height );
//				g.setFont(
//						this.legend.seriesFont.height, 
//						this.legend.seriesFont.weight, 
//						this.legend.seriesFont.faceName);
				g.setFillColor('black');
				var textX = this.legend.titleArea.x + this.legend.dotSize.width + dotMargin;
				g.fillText(this.legend.series[indexLegend].Label,
						textX,
						y - (this.legend.seriesFont.height - this.legend.dotSize.height),
						this.legend.titleArea.x + this.legend.titleArea.width - textX,
						this.legend.dotSize.height + dotMargin);
				y += this.legend.dotSize.height + dotMargin;
			}
			g.restoreContext();
		}
		
		//Y軸の主・副目盛り、グリッド、ラベルを描く
		g.saveContext();
		g.setTextAlign("end");
		var textLineHeight = this.ylabelFont.height;
		g.setFont(this.ylabelFont.height, this.ylabelFont.weight,this.ylabelFont.faceName);
		var yLabelMarginRight = 8;
		var throughOutX = 4;
		var throughOutX2 = 2;
		var yLabelWidth = 80;
		if(this.gridInterval.y > 0) {
			var i = 0;
			var x0 = this.graphArea.x;
			var x1 = this.graphArea.x + this.graphArea.width;
			var y = 0;
			while((y = i * this.gridInterval.y) < this.verticalRange.max) {
				//ｙ軸に主目盛りを描く
				var vy = this.gy2px(y);
				g.line(x0 - throughOutX, vy, x0, vy, this.mainAxisStrokeColor, 1);
				//ｙ軸に副目盛りを描く
				var vy2 = (vy + this.gy2px((i+1) * this.gridInterval.y)) / 2;
				if(vy2 >= this.graphArea.y) {
					g.line(x0 - throughOutX2, vy2, x0, vy2, this.mainAxisStrokeColor, 1);
				}
				//グラフエリアにグリッド線を描く
				g.line(x0, vy, x1, vy, this.gridColor, 1);
				g.setFillColor(this.ylabelFont.color || 'black');
				var label = y;
				if(label < 1) {
					label = Math.round(10 * label) / 10;
				} else {
					label = Math.round(label);
				}
				g.fillText(label,
						x0 - yLabelMarginRight - yLabelWidth,
						vy - textLineHeight / 2,
						yLabelWidth, textLineHeight);
				i++;
			}
			i = 0;
			while((y = i * this.gridInterval.y) > this.verticalRange.min) {
				//ｙ軸に主目盛りを描く
				var vy = this.gy2px(y);
				g.line(x0 - throughOutX, vy, x0, vy, this.mainAxisStrokeColor, 1);
				//ｙ軸に副目盛りを描く
				var vy2 = (vy + this.gy2px((i-1) * this.gridInterval.y)) / 2;
				if(vy2 <= this.graphArea.y + this.graphArea.height) {
					g.line(x0 - throughOutX2, vy2, x0, vy2, this.mainAxisStrokeColor, 1);
				}
				//グラフエリアにグリッド線を描く
				g.line(x0, vy, x1, vy, this.gridColor, 1);
				g.setFillColor(this.ylabelFont.color || 'black');
				var label = y;
				if(label < 1) {
					label = Math.round(10 * label) / 10;
				} else {
					label = Math.round(label);
				}
				g.fillText(label,
						x0 - yLabelMarginRight - yLabelWidth, 
						vy - textLineHeight / 2,
						yLabelWidth, textLineHeight);
				i--;
			}
		}
		g.restoreContext();
		
		//グラフ領域の枠線を描く（左端と下端）
		g.saveContext();
		var x0 = this.graphArea.x;
		var y0 = this.graphArea.y + this.graphArea.height;
		var xs = this.graphArea.x;
		var xe = this.graphArea.x + this.graphArea.width;
		var ys = this.graphArea.y;
		var ye = this.graphArea.y + this.graphArea.height;
		g.setStrokeColor(this.mainAxisStrokeColor);
		g.setStrokeWidth(this.mainAxisStrokeWidth);
		g.line(xs, y0, xe, y0);
		g.line(x0, ys, x0, ye);
		g.restoreContext();
		
		//データの描画
		if(this.dataCount > 0) {
			g.saveContext();
			var clipLeft = this.gx2px(0);
			var clipTop = this.gy2px(this.verticalRange.max);
			var clipWidth = this.gx2px(this.dataCount) - clipLeft;
			var clipHeight = this.gy2px(this.verticalRange.min) - clipTop;
			g.setClipRect(clipLeft, clipTop, clipWidth, clipHeight);
			for(var i = 0; i < this.dataSeriesList.length; i++) {
				this.dataSeriesList[i].draw(g, this, i);
			}
			g.restoreContext();
		}
		
		//X軸の目盛り、項目ラベルを描く
		var throughOutY = 4;
		g.saveContext();
		g.setFillColor("#444444");
		g.setFont(this.xlabelFont.height, this.xlabelFont.weight,this.xlabelFont.faceName);
		g.setTextAlign('center');
		g.setTextRotation(this.xLabelRotation);
		for(var gx = 0; gx <= this.dataCount; gx++) {
			if(this.itemLabels[gx] != null) {
				var px2 = this.gx2px(gx);
				g.line(px2, ye, px2, ye + throughOutY, "black", 1);
				if(gx < this.dataCount) {
					var px = this.gx2px(gx + 1);
					g.setFillColor(this.xlabelFont.color || 'black');
					var xbarWidth = px - px2;
					g.fillText(this.itemLabels[gx],
							px2,// + (xbarWidth - this.xlabelFont.height) / 2,
							this.graphArea.y + this.graphArea.height + throughOutY,// + this.xlabelFont.height,
							xbarWidth, this.xlabelFont.height);
				}
			}
		}
		if(this.dataCount > 0) {
//			var px2 = this.gx2px(gx);
			g.line(x0, ye, x0, ye + throughOutY, "black", 1);
			g.line(xe, ye, xe, ye + throughOutY, "black", 1);
		}
		g.restoreContext();
	}
	
	//タイトルを描く
	if(this.title != null) {
		g.saveContext();
		g.setFillColor(this.titleFont.color);
		g.setFont(this.titleFont.height, this.titleFont.weight,this.titleFont.faceName);
		g.setTextAlign('center');
		g.fillText(this.title,
				this.titleArea.x, this.titleArea.y,
				this.titleArea.width, this.titleFont.height);
		g.restoreContext();
	}
	
	//Y軸のデータ名
	if(this.yAxisName != null) {
		g.saveContext();
		g.setFillColor(this.yAxisNameFont.color);
		g.setFont(this.yAxisNameFont.height, this.yAxisNameFont.weight,this.yAxisNameFont.faceName);
		g.setTextAlign('center');
		var yAxisNameChars = this.yAxisName.split('');
		var yAxisNameAreaY = this.yAxisNameArea.y;
		for(var i = 0; i < yAxisNameChars.length; i++) {
			g.fillText(yAxisNameChars[i],
					this.yAxisNameArea.x, yAxisNameAreaY,
					this.yAxisNameArea.width, this.yAxisNameFont.height);
			yAxisNameAreaY += this.yAxisNameFont.height;
		}
		g.restoreContext();
	}
	
	//HTMLでの代替要素を出力する（ie8,excanvasでの文字列出力）
	g.flushHtmlElements();
};

/**
 * データ位置と値から描画域の座標を取得する。
 */
Evgraph.prototype.gp2pp = function(x,y) {
	return { x: this.gx2px(x), y: this.gy2px(y) };
};
Evgraph.prototype.gx2px = function(x) {
	var w1 = this.graphArea.width / (this.dataCount + this.graphAreaPaddingRatio * 2);
	var xs = this.graphArea.x + w1 * this.graphAreaPaddingRatio;
	return xs + x * w1;
};
Evgraph.prototype.gy2px = function(y) {
	return this.graphArea.y + (this.verticalRange.max - y) * this.graphArea.height
			/ (this.verticalRange.max - this.verticalRange.min);
};

/**
 * データ系列
 */
function EvgraphDataSeries(name, data) {
	this.name = name;
	this.data = data;
	this.dataCount = data ? data.length : 0;
	this.drawFunction = DrawSeriesLine;
	this.seriesIndex = null;
}
EvgraphDataSeries.prototype.getDataCount = function() {
	return this.dataCount;
};
EvgraphDataSeries.prototype.draw = function(g, evgraph, index) {
	this.drawFunction.call(this, g, evgraph, index);
};
EvgraphDataSeries.prototype.setSeriesIndex = function(seriesIndex) {
	this.seriesIndex = seriesIndex;
	return seriesIndex + 1;
};
/**
 * 複数のデータ系列をまとめたもの
 */
function EvgraphDataSeriesSet() {
	this.dataCount = 0;
	this.dataSeries = [];
	this.drawFunction = DrawSubSeries;
	this.strokeColor = null;
	this.fillColor = null;
	this.strokeWidth = null;
}
EvgraphDataSeriesSet.prototype = new EvgraphDataSeries();
EvgraphDataSeriesSet.prototype.addSeries = function(dataSeries) {
	if(this.dataCount < dataSeries.getDataCount()) {
		this.dataCount = dataSeries.getDataCount();
	}
	this.dataSeries.push(dataSeries);
};
EvgraphDataSeriesSet.prototype.setSeriesIndex = function(seriesIndex) {
	for(var i = 0; i < this.dataSeries.length; i++) {
		seriesIndex = this.dataSeries[i].setSeriesIndex(seriesIndex);
	}
	return seriesIndex;
};

/**
 * 系列を折れ線で描画する
 */
function DrawSeriesLine(g, evgraph, index) {
	if(this.data.length >= evgraph.dataCount) {
		g.saveContext();
		var seriesIndex = (this.seriesIndex != null) ? this.seriesIndex : index;
		var strokeColor = this.strokeColor || Evgraph.colors[seriesIndex];
		var strokeWidth = this.strokeWidth || 3;
		g.setStrokeColor(strokeColor);
		g.setStrokeWidth(strokeWidth);
		var p = [];
		for(var x = 0; x < evgraph.dataCount; x++) {
			p.push(evgraph.gp2pp(x + 0.5, this.data[x]));
		}
		//線を描く
		for(var x = 0; x < evgraph.dataCount - 1; x++) {
			g.line(p[x].x, p[x].y, p[x+1].x, p[x+1].y);
		}
		g.restoreContext();
	}
}
/**
 * 系列を折れ線で描画する
 */
function DrawSeriesLineAndRoundMarker(g, evgraph, index) {
	if(this.data.length >= evgraph.dataCount) {
		g.saveContext();
		var seriesIndex = (this.seriesIndex != null) ? this.seriesIndex : index;
		var fillColor = this.fillColor || Evgraph.colors[seriesIndex];
		var strokeColor = this.strokeColor || Evgraph.colors[seriesIndex];
		var strokeWidth = this.strokeWidth || 3;
		g.setStrokeColor(strokeColor);
		g.setStrokeWidth(strokeWidth);
		//ピクセル座標を生成
		var p = [];
		for(var x = 0; x < evgraph.dataCount; x++) {
			p.push(evgraph.gp2pp(x + 0.5, this.data[x]));
		}
		//線を描く
		for(var x = 0; x < evgraph.dataCount - 1; x++) {
			g.line(p[x].x, p[x].y, p[x+1].x, p[x+1].y);
		}
		//マーカーを描く
		for(var x = 0; x < evgraph.dataCount; x++) {
			g.circle(p[x].x, p[x].y, 3, fillColor, 0);
		}
		g.restoreContext();
	}
}

/**
 * まとめた系列全てを描画する
 */
function DrawSubSeries(g, evgraph, index) {
	for(var i = 0; i < this.dataSeries.length; i++) {
		this.dataSeries[i].draw(g, evgraph, index + i);
	}
}
/**
 * まとめた系列全てを積み上げ棒グラフで描画する
 */
function DrawSeriesSumup(g, evgraph, index) {
	g.saveContext();
	for(var x = 0; x < this.dataCount; x++) {
		var totalPlus = 0;	//プラス側のバーの上端
		var totalMinus = 0;	//マイナス側のバーの下端
		for(var i = 0; i < this.dataSeries.length; i++) {
			if(this.dataSeries[i].data.length >= this.dataCount) {
				var value = this.dataSeries[i].data[x];
				if(value != 0) {
					var p0 = null, p1 = null;
					//正の値は上へ積み上げ。負の値は下へ積み上げる。
					if(value > 0) {
						p0 = evgraph.gp2pp(x, totalPlus + value);
						p1 = evgraph.gp2pp(x + 1, totalPlus);
						totalPlus += value;
					} else {
						p0 = evgraph.gp2pp(x, totalMinus);
						p1 = evgraph.gp2pp(x + 1, totalMinus + value);
						totalMinus += value;
					}
					var series = this.dataSeries[i];
					var seriesIndex = (series.seriesIndex != null) ? series.seriesIndex : index + i;
					var strokeColor = series.strokeColor || Evgraph.colors[seriesIndex];
					var strokeWidth = series.strokeWidth || 1;
					var fillColor	= series.fillColor	 || Evgraph.colors[seriesIndex];
					g.setFillColor(fillColor);
					g.setStrokeColor(strokeColor);
					g.setStrokeWidth(strokeWidth);
					var barRawW = p1.x - p0.x;
					var barW = barRawW * evgraph.barWidthRatio;
					var barX = p0.x + barRawW * (1.0 - evgraph.barWidthRatio) / 2;
					g.rect(barX, p0.y, barW, p1.y - p0.y);
				}
			}
		}
	}
	g.restoreContext();
}

