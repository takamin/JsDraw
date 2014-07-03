/**
 * class TurtlePath
 * 
 * タートルグラフィックの結果をSVGPathElementのd属性で得るためのクラス。
 * 
 */

Svg.TurtlePath = function(x, y) {
	this.pos = new Svg.TurtlePath.Vector(x,y);
	this.pen = false;
	this.dirDegree = 90;
	this.path = new Svg.Path.d().moveTo(this.pos.x, this.pos.y);
};
Svg.TurtlePath.prototype.getPath = function(m) {
	return this.path;
};
Svg.TurtlePath.prototype.getForwardVector = function(m) {
	var t = this.dirDegree * Math.PI / 180;
	return new Svg.TurtlePath.Vector(m * Math.cos(t), -m * Math.sin(t));
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


Svg.Turtle = function() {
	this.pos = new Svg.Turtle.Vector(0,0);
	this.dirDegree = 90;
	this.penState = false;
	this.penColor = "black";
	this.penWidth = 1;
}

Svg.Turtle.prototype.set = function(svg) {
	this.svg = svg;
};

Svg.Turtle.prototype.run = function(commands, intervalMillisec) {
	var THIS = this;
	var i = 0;
	this.tid = window.setInterval(
			function() {
				if(i < commands.length) {
					THIS.doCommand(commands[i]);
					i++;
				}
				if(i >= commands.length) {
					window.clearInterval(THIS.tid);
				}
			}, intervalMillisec );
}

function getFunctionName(f){
    return 'name' in f
        ? f.name
        : (''+f).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
};
function typeOf(that){
    if (that === null)      return 'Null';
    if (that === undefined) return 'Undefined';
    var tc = that.constructor;
    return typeof(tc) === 'function'
        ? getFunctionName(tc) 
        : tc;
};
Svg.Turtle.prototype.doCommand = function(command) {
	switch(typeOf(command)) {
	case "Svg_Turtle_Command_GoForward":
		this.go(command.distance);
		break;
	case "Svg_Turtle_Command_Turn":
		this.turn(command.degree);
		break;
	case "Svg_Turtle_Command_PenState":
		this.setPenState(command.penState);
		break;
	case "Svg_Turtle_Command_PenColor":
		this.changePenColor(command.penColor);
		break;
	case "Svg_Turtle_Command_PenWidth":
		this.changePenWidth(command.penWidth);
		break;
	}
}
Svg.Turtle.prototype.go = function(distance) {
	var m = this.getForwardVector(distance);
	posNext = this.pos.add(m);
	if(this.penState) {
		var penColor = this.penColor;
		var penWidth = this.penWidth;
		var line = Svg.createLineElement(
				this.pos.x, this.pos.y,
				posNext.x, posNext.y, {
					'stroke': penColor,
					'stroke-width': penWidth,
					'stroke-linecap':'round'
				});
		$(this.svg).append($(line));
	} else {
		this.pos = posNext;
	}
	this.pos = posNext;
	return this;
};
Svg.Turtle.prototype.turn = function(degree) {
	this.dirDegree += degree;
	while(this.dirDegree < 0) {
		this.dirDegree += 360;
	}
	while(this.dirDegree >= 360) {
		this.dirDegree -= 360;
	}
	return this;
};
Svg.Turtle.prototype.setPenState = function(penState) { this.penState = penState; }
Svg.Turtle.prototype.changePenColor = function(penColor) { this.penColor = penColor; }
Svg.Turtle.prototype.changePenWidth = function(penWidth) { this.penWidth = penWidth; }
Svg.Turtle.prototype.getForwardVector = function(m) {
	var t = this.dirDegree * Math.PI / 180;
	return new Svg.Turtle.Vector(m * Math.cos(t), -m * Math.sin(t));
};




Svg.Turtle.Vector = function(x,y) {
	this.x = x;
	this.y = y;
};
Svg.Turtle.Vector.prototype.add = function(v) {
	return new Svg.Turtle.Vector(this.x + v.x, this.y + v.y);
};



Svg.Turtle.CommandBuffer = function(x, y) {
	this.commands = [];
	this.turn(-90).go(x).turn(-90).go(y).turn(180);
};
Svg.Turtle.CommandBuffer.prototype.go = function(distance) {
	this.commands.push(new Svg.Turtle.Command.GoForward(distance));
	return this;
}
Svg.Turtle.CommandBuffer.prototype.turn = function(degree) {
	this.commands.push(new Svg.Turtle.Command.Turn(degree));
	return this;
}
Svg.Turtle.CommandBuffer.prototype.right = function(degree) {
	this.commands.push(new Svg.Turtle.Command.Turn(-degree));
	return this;
}
Svg.Turtle.CommandBuffer.prototype.left = function(degree) {
	this.commands.push(new Svg.Turtle.Command.Turn(degree));
	return this;
}
Svg.Turtle.CommandBuffer.prototype.penDown = function() {
	this.commands.push(new Svg.Turtle.Command.PenState(true));
	return this;
};
Svg.Turtle.CommandBuffer.prototype.penUp = function() {
	this.commands.push(new Svg.Turtle.Command.PenState(false));
	return this;
};
Svg.Turtle.CommandBuffer.prototype.changePenColor = function(penColor) {
	this.commands.push(new Svg.Turtle.Command.PenColor(penColor));
	return this;
};
Svg.Turtle.CommandBuffer.prototype.changePenWidth = function(penWidth) {
	this.commands.push(new Svg.Turtle.Command.PenWidth(penWidth));
	return this;
};

/**
 * class Command
 */
Svg.Turtle.Command = function() {
//	this.distance = null;
//	this.degree = null;
//	this.penState = null;
//	this.penColor = null;
//	this.penWidth = null;
}
Svg.Turtle.Command.GoForward = function Svg_Turtle_Command_GoForward(distance) {
	this.distance = distance;
}
Svg.Turtle.Command.GoForward.prototype = new Svg.Turtle.Command();
Svg.Turtle.Command.GoForward.prototype.constructor = Svg.Turtle.Command.GoForward;

Svg.Turtle.Command.Turn = function Svg_Turtle_Command_Turn(degree) {
	this.degree = degree;
}
Svg.Turtle.Command.Turn.prototype = new Svg.Turtle.Command();
Svg.Turtle.Command.Turn.prototype.constructor = Svg.Turtle.Command.Turn;

Svg.Turtle.Command.PenState = function Svg_Turtle_Command_PenState(penState) {
	this.penState = penState;
}
Svg.Turtle.Command.PenState.prototype = new Svg.Turtle.Command();
Svg.Turtle.Command.PenState.prototype.constructor = Svg.Turtle.Command.PenState;

Svg.Turtle.Command.PenColor = function Svg_Turtle_Command_PenColor(penColor) {
	this.penColor = penColor;
}
Svg.Turtle.Command.PenColor.prototype = new Svg.Turtle.Command();
Svg.Turtle.Command.PenColor.prototype.constructor = Svg.Turtle.Command.PenColor;

Svg.Turtle.Command.PenWidth = function Svg_Turtle_Command_PenWidth(penWidth) {
	this.penWidth = penWidth;
}
Svg.Turtle.Command.PenWidth.prototype = new Svg.Turtle.Command();
Svg.Turtle.Command.PenWidth.prototype.constructor = Svg.Turtle.Command.PenWidth;
