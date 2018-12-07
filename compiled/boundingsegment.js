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
import * as shape from './boundingshape';
var BoundingSegment = /** @class */ (function (_super) {
    __extends(BoundingSegment, _super);
    function BoundingSegment(seg) {
        if (seg === void 0) { seg = null; }
        var _this = _super.call(this, BoundingSegment.type) || this;
        _this._segment = seg;
        _this._dirty = !!seg;
        _this._boundingbox = null;
        return _this;
    }
    Object.defineProperty(BoundingSegment.prototype, "start", {
        get: function () {
            return this._segment ? this._segment.start : null;
        },
        set: function (pt) {
            if (!this._segment) {
                this._segment = { start: pt, end: pt };
            }
            else {
                this._segment.start = pt;
            }
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSegment.prototype, "end", {
        get: function () {
            return this._segment ? this._segment.end : null;
        },
        set: function (pt) {
            if (!this._segment) {
                this._segment = { start: pt, end: pt };
            }
            else {
                this._segment.end = pt;
            }
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSegment.prototype, "segment", {
        get: function () {
            return { start: this.start, end: this.end };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSegment.prototype, "boundingbox", {
        get: function () {
            this._checkDirty();
            return this._boundingbox;
        },
        enumerable: true,
        configurable: true
    });
    BoundingSegment.prototype.getBoundingbox = function () {
        return this.boundingbox;
    };
    BoundingSegment.prototype.getTransformedShape = function (transform) {
        if (!transform || !this._segment) {
            return new BoundingSegment(this._segment);
        }
        else {
            return new BoundingSegment({
                start: transform.transformPoint(this._segment.start),
                end: transform.transformPoint(this._segment.end)
            });
        }
    };
    BoundingSegment.prototype._checkDirty = function () {
        if (this._dirty) {
            this._dirty = false;
            var minx = this._segment.start.x;
            var miny = this._segment.start.y;
            var maxx = this._segment.end.x;
            var maxy = this._segment.end.y;
            if (minx > maxx) {
                var tmp = minx;
                minx = maxx;
                maxx = tmp;
            }
            if (miny > maxy) {
                var tmp = miny;
                miny = maxy;
                maxy = tmp;
            }
            this._boundingbox = { x: minx, y: miny, w: maxx - minx + 1, h: maxy - miny + 1 };
        }
    };
    BoundingSegment.type = 'Segment';
    return BoundingSegment;
}(shape.BoundingShape));
export { BoundingSegment };
//# sourceMappingURL=boundingsegment.js.map