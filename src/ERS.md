External Reference Specification
================================

# classes

1. Svg
1. Svg.Path
1. Svg.Path.d

# class Svg

## static methods

1. Svg.createElement(nodename, attributes)
2. Svg.mixin(dst, src)
3. Svg.createLineElement(x1,y1,x2,y2, optAttrs)
4. Svg.createRectElement(x, y, width, height, optAttrs)
5. Svg.createCircleElement(cx, cy, r, optAttrs)
6. Svg.createEllipseElement(cx, cy, rx, ry, optAttrs)
7. Svg.createPathElement(d, optAttrs)
8. Svg.createPolygonElement(points, optAttrs)
9. Svg.createPolylineElement(points, optAttrs)

# class Svg.Path

SVGPathElement�𐶐�����B

# class Svg.Path.d

SVGPathElement��d�������R�}���h�`�F�C���I�ɐ������邽�߂̃N���X�B

## methods

1. toString()
1. moveTo(x, y)
1. moveRel(dx, dy)
1. lineTo(x, y)
1. lineRel(dx, dy)
1. hlineTo(y)
1. hlineRel(dy)
1. vlineTo(x)
1. vlineRel(dx)
1. quadBezierTo(x1, y1, x, y)
1. quadBezierRel(dx1, dy1, dx, dy)
1. cubicBezierTo(x1, y1, x2, y2, x, y)
1. cubicBezierRel(dx1, dy1, dx2, dy2, dx, dy)

## �֘A�N���X
 
1. Svg.Path.d.Element
1. Svg.Path.d.XYElement
1. Svg.Path.d.Move
1. Svg.Path.d.MoveTo
1. Svg.Path.d.MoveRel
1. Svg.Path.d.Line
1. Svg.Path.d.LineTo
1. Svg.Path.d.LineRel
1. Svg.Path.d.OneParamElement
1. Svg.Path.d.HLine
1. Svg.Path.d.HLineTo
1. Svg.Path.d.HLineRel
1. Svg.Path.d.VLine
1. Svg.Path.d.VLineTo
1. Svg.Path.d.VLineRel
1. Svg.Path.d.QuadBezier
1. Svg.Path.d.QuadBezierTo
1. Svg.Path.d.QuadBezierRel
1. Svg.Path.d.CubicBezier
1. Svg.Path.d.CubicBezierTo
1. Svg.Path.d.CubicBezierRel


## `SvgTransformObject`�N���X

������SVGElement���܂Ƃ߂ăA�t�B���ϊ��s��ɂ��A�ړ��A��]���s���N���X�B

### �t�B�[���h

1. `cx` - ���SX���W
2. `cy` - ���SY���W
3. `translateX` - �ړ�X�ʒu
4. `translateY` - �ړ�Y�ʒu
5. `rotate` - ��]�p�x(�f�O���[)

### ���\�b�h

1. `SVGTransformObject()` - �R���X�g���N�^
2. `append(SVGElement svgElement)` - SVG�v�f��ǉ�����B
3. `appendTo(SVGSVGElement svgSvgElement)` - SVG�ɕ\������B
4. `setCenter(cx, cy)` - ��]���S���W�̎w��
5. `setPos(translateX, translateY)` - �ړ��ʒu�̐ݒ�
6. `setRotation(rotate)` - ��](��Ύw��)
7. `addRotation(dT)` - ��](�����w��)
8. `movePos(dx,dy)` - ���Έړ�
9. `getTransformMatrix()` - �A�t�B���ϊ��s��𓾂�
10. `update()` - �A�t�B���ϊ��s���K�p����B
11. `getBounceRectPoints()` - �O�ڂ����`�𓾂�
12. `transformPoint(m, p)` - �ʒu���A�t�B���ϊ��s��ɂ��������Ĉړ�������B
