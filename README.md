svg.js
=======

WebページからSVG要素の操作を簡単にするjavascript。

## 関数

1. `Svg.createElement(nodename, attributes)`
2. `Svg.mixin(dst, src)`
3. `Svg.createLineElement(x1,y1,x2,y2, optAttrs)`
4. `Svg.createRectElement(x, y, width, height, optAttrs)`
5. `Svg.createCircleElement(cx, cy, r, optAttrs)`
6. `Svg.createEllipseElement(cx, cy, rx, ry, optAttrs)`
7. `Svg.createPathElement(d, optAttrs)`
8. `Svg.createPolygonElement(points, optAttrs)`
9. `Svg.createPolylineElement(points, optAttrs)`

## `SvgTransformObject`クラス

複数のSVGElementをまとめてアフィン変換行列により、移動、回転を行うクラス。

### フィールド

1. `cx` - 中心X座標
2. `cy` - 中心Y座標
3. `translateX` - 移動X位置
4. `translateY` - 移動Y位置
5. `rotate` - 回転角度(デグリー)

### メソッド

1. `SVGTransformObject()` - コンストラクタ
2. `append(SVGElement svgElement)` - SVG要素を追加する。
3. `appendTo(SVGSVGElement svgSvgElement)` - SVGに表示する。
4. `setCenter(cx, cy)` - 回転中心座標の指定
5. `setPos(translateX, translateY)` - 移動位置の設定
6. `setRotation(rotate)` - 回転(絶対指定)
7. `addRotation(dT)` - 回転(増分指定)
8. `movePos(dx,dy)` - 相対移動
9. `getTransformMatrix()` - アフィン変換行列を得る
10. `update()` - アフィン変換行列を適用する。
11. `getBounceRectPoints()` - 外接する矩形を得る
12. `transformPoint(m, p)` - 位置をアフィン変換行列にしたがって移動させる。

