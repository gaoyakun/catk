var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as point from './point';
import * as shape from './boundingshape';
var BoundingHull = /** @class */ (function (_super) {
    __extends(BoundingHull, _super);
    function BoundingHull(points) {
        var _this = _super.call(this, BoundingHull.type) || this;
        _this._points = points || [];
        _this._boundingbox = null;
        _this._dirtyFlag = _this._points.length > 0;
        return _this;
    }
    BoundingHull.prototype.addPoint = function (point) {
        this._points.push(point);
        this._dirtyFlag = true;
    };
    Object.defineProperty(BoundingHull.prototype, "length", {
        get: function () {
            return this._points.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingHull.prototype, "boundingbox", {
        get: function () {
            this._checkDirty();
            return this._boundingbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingHull.prototype, "points", {
        get: function () {
            this._checkDirty();
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    BoundingHull.prototype.getPoint = function (index) {
        this._checkDirty();
        return this._points[index];
    };
    BoundingHull.prototype.removePoint = function (index) {
        this._points.splice(index, 1);
        if (this._points.length === 0) {
            this._boundingbox = null;
            this._dirtyFlag = false;
        }
        else {
            this._dirtyFlag = true;
        }
    };
    BoundingHull.prototype.clear = function () {
        this._points.length = 0;
        this._boundingbox = null;
        this._dirtyFlag = false;
    };
    BoundingHull.prototype.getBoundingbox = function () {
        return this.boundingbox;
    };
    BoundingHull.prototype.getTransformedShape = function (transform) {
        if (!transform) {
            return new BoundingHull(this._points);
        }
        else {
            return new BoundingHull(this._points.map(function (point) {
                return transform.transformPoint(point);
            }));
        }
    };
    BoundingHull.prototype._checkDirty = function () {
        if (this._dirtyFlag) {
            this._dirtyFlag = false;
            this._adjustPoints();
            this._computeBoundingbox();
        }
    };
    BoundingHull.prototype._adjustPoints = function () {
        var num = this._points.length;
        if (num < 3) {
            return;
        }
        var adjusted = [this._points[0], this._points[1]];
        for (var i = 2; i < num; i++) {
            var last = adjusted.length - 1;
            while (last > 0) {
                var v1 = point.GetVector(adjusted[0], adjusted[last]);
                var v2 = point.GetVector(adjusted[0], this._points[i]);
                var t = point.CrossProduct(v1, v2);
                if (t < 0) {
                    adjusted.splice(last + 1, 0, this._points[i]);
                    break;
                }
                else if (t === 0 && point.VectorLengthSq(v2) > point.VectorLengthSq(v1)) {
                    adjusted.splice(last + 1, 0, this._points[i]);
                    break;
                }
                last--;
            }
            if (last === 0) {
                adjusted.splice(1, 0, this._points[i]);
            }
        }
        this._points = adjusted;
    };
    BoundingHull.prototype._computeBoundingbox = function () {
        if (this._points.length > 0) {
            var minx_1 = this._points[0].x;
            var miny_1 = this._points[0].y;
            var maxx_1 = minx_1;
            var maxy_1 = miny_1;
            this._points.forEach(function (point) {
                var x = point.x;
                var y = point.y;
                if (x < minx_1) {
                    minx_1 = x;
                }
                else if (x > maxx_1) {
                    maxx_1 = x;
                }
                if (y < miny_1) {
                    miny_1 = y;
                }
                else if (y > maxy_1) {
                    maxy_1 = y;
                }
            });
            this._boundingbox = { x: minx_1, y: miny_1, w: maxx_1 - minx_1 + 1, h: maxy_1 - miny_1 + 1 };
        }
        else {
            this._boundingbox = null;
        }
    };
    BoundingHull.type = 'Hull';
    return BoundingHull;
}(shape.BoundingShape));
export { BoundingHull };
//# sourceMappingURL=boundinghull.js.map