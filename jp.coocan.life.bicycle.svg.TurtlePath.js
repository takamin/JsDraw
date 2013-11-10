/**
 * class TurtlePath
 * 
 * タートルグラフィックの結果をSVGPathElementのd属性で得るためのクラス。
 * 
 */

Svg.TurtlePath = function(x, y, dirDegree, pen) {
	this.pos = new Svg.TurtlePath.Vector(x || 0, y || 0);
	this.pen = pen || false;
	this.dirDegree = dirDegree || 90;
	this.path = new Svg.Path.d().moveTo(this.pos.x, this.pos.y);
};
Svg.TurtlePath.prototype.getPath = function(m) {
	return this.path;
};
Svg.TurtlePath.prototype.getForwardVector = function(m) {
	var t = this.dirDegree * Math.PI / 180;
	return new Svg.TurtlePath.Vector(m * Math.sin(t), m * Math.cos(t));
};
Svg.TurtlePath.prototype.penDown = function() {
	this.pen = true;
	return this;
};
Svg.TurtlePath.prototype.penUp = function() {
	this.pen = false;
	return this;
};
Svg.TurtlePath.prototype.go = function(distance) {
	var m = this.getForwardVector(distance);
	posNext = this.pos.add(m);
	if(this.pen) {
		this.path.lineRel(m.x, m.y);
	} else {
		this.path.moveRel(m.x, m.y);
	}
	this.pos = posNext;
	return this;
};
Svg.TurtlePath.prototype.turn = function(degree) {
	this.dirDegree += degree;
	while(this.dirDegree < 0) {
		this.dirDegree += 360;
	}
	while(this.dirDegree >= 360) {
		this.dirDegree -= 360;
	}
	return this;
};
Svg.TurtlePath.prototype.right = function(degree) {
	this.turn(-degree);
	return this;
};
Svg.TurtlePath.prototype.left = function(degree) {
	this.turn(degree);
	return this;
};
Svg.TurtlePath.Vector = function(x,y) {
	this.x = x;
	this.y = y;
};
Svg.TurtlePath.Vector.prototype.add = function(v) {
	return new Svg.TurtlePath.Vector(this.x + v.x, this.y + v.y);
};
