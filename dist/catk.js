(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Catk = {})));
}(this, (function (exports) { 'use strict';

var Matrix2d = /** @class */ (function () {
    function Matrix2d() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
    }
    Matrix2d.getIdentity = function () {
        return new Matrix2d();
    };
    Matrix2d.getTranslate = function (x, y) {
        return new Matrix2d().makeTranslate(x, y);
    };
    Matrix2d.getScale = function (x, y) {
        return new Matrix2d().makeScale(x, y);
    };
    Matrix2d.getRotate = function (theta) {
        return new Matrix2d().makeRotate(theta);
    };
    Matrix2d.transform = function (t1, t2) {
        return new Matrix2d().copyFrom(t1).transform(t2);
    };
    Matrix2d.translate = function (t, x, y) {
        return new Matrix2d().copyFrom(t).translate(x, y);
    };
    Matrix2d.scale = function (t, x, y) {
        return new Matrix2d().copyFrom(t).scale(x, y);
    };
    Matrix2d.rotate = function (t, theta) {
        return new Matrix2d().copyFrom(t).rotate(theta);
    };
    Matrix2d.invert = function (t) {
        return new Matrix2d().copyFrom(t).invert();
    };
    Matrix2d.prototype.set = function (a, b, c, d, e, f) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        return this;
    };
    Matrix2d.prototype.makeIdentity = function () {
        return this.set(1, 0, 0, 1, 0, 0);
    };
    Matrix2d.prototype.makeTranslate = function (x, y) {
        return this.set(1, 0, 0, 1, x, y);
    };
    Matrix2d.prototype.makeScale = function (x, y) {
        return this.set(x, 0, 0, y, 0, 0);
    };
    Matrix2d.prototype.makeRotate = function (theta) {
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return this.set(c, s, -s, c, 0.0, 0.0);
    };
    Matrix2d.prototype.copyFrom = function (otherTransform) {
        return this.set(otherTransform.a, otherTransform.b, otherTransform.c, otherTransform.d, otherTransform.e, otherTransform.f);
    };
    Matrix2d.prototype.transform = function (right) {
        return this.set(this.a * right.a + this.c * right.b, this.b * right.a + this.d * right.b, this.a * right.c + this.c * right.d, this.b * right.c + this.d * right.d, this.a * right.e + this.c * right.f + this.e, this.b * right.e + this.d * right.f + this.f);
    };
    Matrix2d.prototype.transformPoint = function (point) {
        return {
            x: Math.round(this.a * point.x + this.c * point.y + this.e),
            y: Math.round(this.b * point.x + this.d * point.y + this.f)
        };
    };
    Matrix2d.prototype.translate = function (x, y) {
        return this.transform(Matrix2d.getTranslate(x, y));
    };
    Matrix2d.prototype.scale = function (x, y) {
        return this.transform(Matrix2d.getScale(x, y));
    };
    Matrix2d.prototype.rotate = function (theta) {
        return this.transform(Matrix2d.getRotate(theta));
    };
    Matrix2d.prototype.invert = function () {
        var a00 = this.a;
        var a01 = this.b;
        var a02 = 0;
        var a10 = this.c;
        var a11 = this.d;
        var a12 = 0;
        var a20 = this.e;
        var a21 = this.f;
        var a22 = 1;
        var b01 = a22 * a11 - a12 * a21;
        var b11 = -a22 * a10 + a12 * a20;
        var b21 = a21 * a10 - a11 * a20;
        var det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return this;
        }
        det = 1.0 / det;
        this.a = b01 * det;
        this.b = (-a22 * a01 + a02 * a21) * det;
        this.c = b11 * det;
        this.d = (a22 * a00 - a02 * a20) * det;
        this.e = b21 * det;
        this.f = (-a21 * a00 + a01 * a20) * det;
        return this;
    };
    Matrix2d.prototype.getTranslationPart = function () {
        return { x: this.e, y: this.f };
    };
    Matrix2d.prototype.setTranslationPart = function (t) {
        this.e = t.x;
        this.f = t.y;
    };
    Matrix2d.prototype.getScalePart = function () {
        return {
            x: Math.sqrt(this.a * this.a + this.b * this.b),
            y: Math.sqrt(this.c * this.c + this.d * this.d)
        };
    };
    Matrix2d.prototype.setScalePart = function (s) {
        var sc = this.getScalePart();
        var s1 = s.x / sc.x;
        this.a *= s1;
        this.b *= s1;
        var s2 = s.y / sc.y;
        this.c *= s2;
        this.d *= s2;
    };
    Matrix2d.prototype.getRotationPart = function () {
        var sc = Math.sqrt(this.a * this.a + this.b * this.b);
        if (sc === 0) {
            return 0;
        }
        var ac = Math.max(Math.min(this.a / sc, 1), -1);
        var as = Math.max(Math.min(this.b / sc, 1), -1);
        var angle = Math.acos(ac);
        return as >= 0 ? angle : 2 * Math.PI - angle;
    };
    Matrix2d.prototype.setRotationPart = function (r) {
        var sc = this.getScalePart();
        var sin = Math.sin(r);
        var cos = Math.cos(r);
        this.a = sc.x * cos;
        this.b = sc.x * sin;
        this.c = -sc.y * sin;
        this.d = sc.y * cos;
    };
    return Matrix2d;
}());

function GetTopLeft(rect) {
    return { x: rect.x, y: rect.y };
}
function GetTopRight(rect) {
    return { x: rect.x + rect.w, y: rect.y };
}
function GetBottomLeft(rect) {
    return { x: rect.x, y: rect.y + rect.h };
}
function GetBottomRight(rect) {
    return { x: rect.x + rect.w, y: rect.y + rect.h };
}
function Normalize(v) {
    var len = VectorLength(v);
    if (len > 0.0001) {
        v.x /= len;
        v.y /= len;
    }
}
function VectorLengthSq(v) {
    return v.x * v.x + v.y * v.y;
}
function VectorLength(v) {
    return Math.sqrt(VectorLengthSq(v));
}
function DistanceSq(p1, p2) {
    return VectorLengthSq(GetVector(p1, p2));
}
function Distance(p1, p2) {
    return VectorLength(GetVector(p1, p2));
}
function DotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
function CrossProduct(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}
function GetVector(start, end) {
    return { x: end.x - start.x, y: end.y - start.y };
}
function ClampPoint(pt, ptMin, ptMax) {
    return { x: Math.max(ptMin.x, Math.min(ptMax.x, pt.x)), y: Math.max(ptMin.y, Math.min(ptMax.y, pt.y)) };
}

var BoundingShape = /** @class */ (function () {
    function BoundingShape(type) {
        this.type = type;
    }
    return BoundingShape;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoundingHull = /** @class */ (function (_super) {
    __extends$1(BoundingHull, _super);
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
                var v1 = GetVector(adjusted[0], adjusted[last]);
                var v2 = GetVector(adjusted[0], this._points[i]);
                var t = CrossProduct(v1, v2);
                if (t < 0) {
                    adjusted.splice(last + 1, 0, this._points[i]);
                    break;
                }
                else if (t === 0 && VectorLengthSq(v2) > VectorLengthSq(v1)) {
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
}(BoundingShape));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoundingBox = /** @class */ (function (_super) {
    __extends$2(BoundingBox, _super);
    function BoundingBox(rect) {
        var _this = _super.call(this, BoundingBox.type) || this;
        _this.rect = rect || null;
        return _this;
    }
    BoundingBox.prototype.getBoundingbox = function () {
        return this.rect;
    };
    BoundingBox.prototype.getTransformedShape = function (transform) {
        if (this.rect === null) {
            return null;
        }
        else if (!transform) {
            return new BoundingBox(this.rect);
        }
        else {
            var pointLeftTop = { x: this.rect.x, y: this.rect.y };
            var pointLeftBottom = { x: this.rect.x, y: this.rect.y + this.rect.h - 1 };
            var pointRightBottom = { x: this.rect.x + this.rect.w - 1, y: this.rect.y + this.rect.h - 1 };
            var pointRightTop = { x: this.rect.x + this.rect.w - 1, y: this.rect.y };
            return new BoundingHull([
                transform.transformPoint(pointLeftTop),
                transform.transformPoint(pointLeftBottom),
                transform.transformPoint(pointRightBottom),
                transform.transformPoint(pointRightTop)
            ]);
        }
    };
    BoundingBox.type = 'Box';
    return BoundingBox;
}(BoundingShape));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoundingSegment = /** @class */ (function (_super) {
    __extends$3(BoundingSegment, _super);
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
}(BoundingShape));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoundingSphere = /** @class */ (function (_super) {
    __extends$4(BoundingSphere, _super);
    function BoundingSphere(sphere) {
        if (sphere === void 0) { sphere = null; }
        var _this = _super.call(this, BoundingSphere.type) || this;
        _this.sphere = sphere;
        return _this;
    }
    Object.defineProperty(BoundingSphere.prototype, "center", {
        get: function () {
            return this._sphere ? this._sphere.center : null;
        },
        set: function (pt) {
            if (!this._sphere) {
                this._sphere = { center: pt, radius: 1 };
            }
            else {
                this._sphere.center = pt;
            }
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSphere.prototype, "radius", {
        get: function () {
            return this._sphere ? this._sphere.radius : null;
        },
        set: function (radius) {
            if (!this._sphere) {
                this._sphere = { center: { x: 0, y: 0 }, radius: radius };
            }
            else {
                this._sphere.radius = radius;
            }
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSphere.prototype, "sphere", {
        get: function () {
            return this._sphere ? { center: this._sphere.center, radius: this._sphere.radius } : null;
        },
        set: function (sphere) {
            this._sphere = sphere || null;
            this._dirty = !!sphere;
            this._boundingbox = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingSphere.prototype, "boundingbox", {
        get: function () {
            this._checkDirty();
            return this._boundingbox;
        },
        enumerable: true,
        configurable: true
    });
    BoundingSphere.prototype.getBoundingbox = function () {
        return this.boundingbox;
    };
    BoundingSphere.prototype.getTransformedShape = function (transform) {
        if (!transform || !this._sphere) {
            return new BoundingSphere(this._sphere);
        }
        else {
            var A = Math.PI * 0.125;
            var D = A * 2;
            var R = this._sphere.radius / Math.cos(A);
            var shape_1 = new BoundingHull();
            for (var angle = A; angle < Math.PI * 2; angle += D) {
                var pt = transform.transformPoint({ x: R * Math.cos(angle), y: R * Math.sin(angle) });
                pt.x = Math.round(pt.x);
                pt.y = Math.round(pt.y);
                shape_1.addPoint(pt);
            }
            return shape_1;
        }
    };
    BoundingSphere.prototype._checkDirty = function () {
        if (this._dirty) {
            this._dirty = false;
            this._boundingbox = {
                x: this._sphere.center.x - this._sphere.radius + 1,
                y: this._sphere.center.y - this._sphere.radius + 1,
                w: 2 * this._sphere.radius - 1,
                h: 2 * this._sphere.radius - 1
            };
        }
    };
    BoundingSphere.type = 'sphere';
    return BoundingSphere;
}(BoundingShape));

function IntersectionTestShapeSegment(a, b) {
    var box = a.getBoundingbox();
    if (box) {
        switch (a.type) {
            case BoundingBox.type: {
                return IntersectionTestBoxSegment(a.rect, b);
            }
            case BoundingHull.type: {
                return IntersectionTestHullSegment(a.points, b);
            }
            case BoundingSegment.type: {
                var pt = IntersectionTestSegmentSegment(a.segment, b);
                return pt ? [pt] : [];
            }
            case BoundingSphere.type: {
                return IntersectionTestSphereSegment(a.sphere, b);
            }
        }
    }
    return null;
}
function IntersectionTestShapeBox(a, b) {
    var box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case BoundingBox.type: {
            return IntersectionTestBoxBox(a.rect, b);
        }
        case BoundingHull.type: {
            return IntersectionTestBoxHull(b, a.points);
        }
        case BoundingSegment.type: {
            return IntersectionTestBoxSegment(b, a.segment) != null;
        }
        case BoundingSphere.type: {
            return IntersectionTestBoxSphere(b, a.sphere);
        }
        default: {
            return false;
        }
    }
}
function IntersectionTestShapeHull(a, b) {
    var box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case BoundingBox.type: {
            return IntersectionTestBoxHull(a.rect, b);
        }
        case BoundingHull.type: {
            return IntersectionTestHullHull(a.points, b);
        }
        case BoundingSegment.type: {
            return IntersectionTestHullSegment(b, a.segment) != null;
        }
        case BoundingSphere.type: {
            return IntersectionTestSphereHull(a.sphere, b);
        }
        default: {
            return false;
        }
    }
}
function IntersectionTestShapePoint(a, b) {
    var box = a.getBoundingbox();
    if (!IntersectionTestBoxPoint(box, b)) {
        return false;
    }
    switch (a.type) {
        case BoundingBox.type: {
            return true;
        }
        case BoundingHull.type: {
            return IntersectionTestHullPoint(a.points, b);
        }
        case BoundingSegment.type: {
            return IntersectionTestSegmentPoint(a.segment, b);
        }
        case BoundingSphere.type: {
            return IntersectionTestSpherePoint(a.sphere, b);
        }
        default: {
            return false;
        }
    }
}
function IntersectionTestShapeShape(a, b) {
    var boxA = a.getBoundingbox();
    var boxB = b.getBoundingbox();
    if (!IntersectionTestBoxBox(boxA, boxB)) {
        return false;
    }
    switch (a.type) {
        case BoundingBox.type: {
            switch (b.type) {
                case BoundingBox.type: {
                    return true;
                }
                case BoundingHull.type: {
                    return IntersectionTestBoxHull(a.rect, b.points);
                }
                case BoundingSegment.type: {
                    return IntersectionTestBoxSegment(a.rect, b.segment) != null;
                }
                case BoundingSphere.type: {
                    return IntersectionTestBoxSphere(a.rect, b.sphere);
                }
                default: {
                    return false;
                }
            }
        }
        case BoundingHull.type: {
            switch (b.type) {
                case BoundingBox.type: {
                    return IntersectionTestBoxHull(b.rect, a.points);
                }
                case BoundingHull.type: {
                    return IntersectionTestHullHull(a.points, b.points);
                }
                case BoundingSegment.type: {
                    return IntersectionTestHullSegment(a.points, b.segment) != null;
                }
                case BoundingSphere.type: {
                    return IntersectionTestSphereHull(b.sphere, a.points);
                }
                default: {
                    return false;
                }
            }
        }
        case BoundingSegment.type: {
            switch (b.type) {
                case BoundingBox.type: {
                    return IntersectionTestBoxSegment(b.rect, a.segment) != null;
                }
                case BoundingHull.type: {
                    return IntersectionTestHullSegment(b.points, a.segment) != null;
                }
                case BoundingSegment.type: {
                    return IntersectionTestSegmentSegment(b.segment, a.segment) != null;
                }
                case BoundingSphere.type: {
                    return IntersectionTestSphereSegment(b.sphere, a.segment) != null;
                }
                default: {
                    return false;
                }
            }
        }
        case BoundingSphere.type: {
            switch (b.type) {
                case BoundingBox.type: {
                    return IntersectionTestBoxSphere(b.rect, a.sphere);
                }
                case BoundingHull.type: {
                    return IntersectionTestSphereHull(a.sphere, b.points);
                }
                case BoundingSegment.type: {
                    return IntersectionTestSphereSegment(a.sphere, b.segment) != null;
                }
                case BoundingSphere.type: {
                    return IntersectionTestSphereSphere(a.sphere, b.sphere);
                }
                default: {
                    return false;
                }
            }
        }
    }
}
function IntersectionTestBoxBox(a, b) {
    return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
}
function IntersectionTestBoxPoint(a, b) {
    return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h;
}
function IntersectionTestBoxHull(a, b) {
    return IntersectionTestHullHull([GetTopLeft(a), GetBottomLeft(a), GetBottomRight(a), GetTopRight(a)], b);
}
function IntersectionTestBoxSegment(a, b) {
    return IntersectionTestHullSegment([GetTopLeft(a), GetBottomLeft(a), GetBottomRight(a), GetTopRight(a)], b);
}
function IntersectionTestBoxSphere(a, b) {
    var pt = ClampPoint(b.center, { x: a.x, y: a.y }, { x: a.x + a.w - 1, y: a.y + a.h - 1 });
    var v = GetVector(pt, b.center);
    return DotProduct(v, v) < b.radius * b.radius;
}
function IntersectionTestSphereHull(a, b) {
    var r2 = a.radius * a.radius;
    for (var i = 0; i < b.length; i++) {
        var dx = a.center.x - b[i].x;
        var dy = a.center.y - b[i].y;
        if (dx * dx + dy * dy < r2) {
            return true;
        }
    }
    for (var i = 0; i < b.length; i++) {
        var t = IntersectionTestSphereSegment(a, { start: b[i], end: b[(i + 1) % b.length] });
        if (t !== null && t.length > 0) {
            return true;
        }
    }
    return IntersectionTestHullPoint(b, a.center);
}
function IntersectionTestHullPoint(a, b) {
    for (var i = 0; i < a.length; i++) {
        var v1 = GetVector(b, a[i]);
        var v2 = GetVector(b, a[(i + 1) % a.length]);
        if (CrossProduct(v1, v2) > 0) {
            return false;
        }
    }
    return true;
}
function IntersectionTestSphereSphere(a, b) {
    var dx = a.center.x - b.center.x;
    var dy = a.center.y - b.center.y;
    var r = a.radius + b.radius;
    return dx * dx + dy * dy < r * r;
}
function IntersectionTestSphereSegment(a, b) {
    var d = GetVector(b.start, b.end);
    var f = GetVector(a.center, b.start);
    var A = DotProduct(d, d);
    var B = 2 * DotProduct(f, d);
    var C = DotProduct(f, f) - a.radius * a.radius;
    var discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
        return null;
    }
    discriminant = Math.sqrt(discriminant);
    var t1 = (-B - discriminant) / (2 * A);
    var t2 = (-B + discriminant) / (2 * A);
    if (t1 > t2) {
        var tmp = t1;
        t1 = t2;
        t2 = tmp;
    }
    var intersectionPoints = [];
    if (t1 >= 0 && t1 <= 1) {
        intersectionPoints.push({ x: b.start.x + t1 * d.x, y: b.start.y + t1 * d.y });
    }
    if (t2 >= 0 && t2 <= 1) {
        intersectionPoints.push({ x: b.start.x + t2 * d.x, y: b.start.y + t2 * d.y });
    }
    return intersectionPoints;
}
function IntersectionTestHullSegment(a, b) {
    if (IntersectionTestHullPoint(a, b.start) && IntersectionTestHullPoint(a, b.end)) {
        return [];
    }
    var result = [];
    for (var i = 0; i < a.length; i++) {
        var edge = {
            start: a[i],
            end: a[(i + 1) % a.length]
        };
        var intersectedPoint = IntersectionTestSegmentSegment(edge, b);
        if (intersectedPoint) {
            result.push(intersectedPoint);
        }
    }
    if (result.length > 1) {
        result.sort(function (p, q) {
            return DistanceSq(p, b.start) - DistanceSq(q, b.start);
        });
    }
    return result.length > 0 ? result : null;
}
function IntersectionTestHullHull(a, b) {
    var polygons = [a, b];
    for (var n = 0; n < 2; n++) {
        var polygon = polygons[n];
        var _loop_1 = function (edge) {
            var edgeX = polygon[(edge + 1) % polygon.length].x - polygon[edge].x;
            var edgeY = polygon[(edge + 1) % polygon.length].y - polygon[edge].y;
            var mag = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
            if (mag < 1) {
                return "continue";
            }
            var nx = -edgeY / mag;
            var ny = edgeX / mag;
            var minmax = [{ min: 9999999, max: -9999999 }, { min: 9999999, max: -9999999 }];
            var _loop_2 = function (i) {
                polygons[i].forEach(function (point) {
                    var proj = point.x * nx + point.y * ny;
                    if (proj < minmax[i].min) {
                        minmax[i].min = proj;
                    }
                    if (proj > minmax[i].max) {
                        minmax[i].max = proj;
                    }
                });
            };
            for (var i = 0; i < 2; i++) {
                _loop_2(i);
            }
            if (minmax[0].min > minmax[1].max || minmax[0].max < minmax[1].min) {
                return { value: false };
            }
        };
        for (var edge = 0; edge < polygon.length; edge++) {
            var state_1 = _loop_1(edge);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    return true;
}
function IntersectionTestSpherePoint(a, b) {
    var dx = a.center.x - b.x;
    var dy = a.center.y - b.y;
    return dx * dx + dy * dy < a.radius * a.radius;
}
function IntersectionTestSegmentPoint(s, p) {
    var minx = s.start.x;
    var miny = s.start.y;
    var maxx = s.end.x;
    var maxy = s.end.y;
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
    if (p.x < minx || p.x > maxx || p.y < miny || p.y > maxy) {
        return false;
    }
    if (maxx !== minx) {
        var deltay = Math.round(miny + ((maxy - miny) * (p.x - minx)) / (maxx - minx)) - p.y;
        return deltay >= -1 && deltay <= 1;
    }
    else if (maxy !== miny) {
        var deltax = Math.round(minx + ((maxx - minx) * (p.y - miny)) / (maxy - miny)) - p.x;
        return deltax >= -1 && deltax <= 1;
    }
    else {
        return p.x === minx && p.y === miny;
    }
}
function IntersectionTestSegmentSegment(s1, s2) {
    function isSameSign(a, b) {
        return (a >= 0 && b >= 0) || (a <= 0 && b <= 0);
    }
    var x1 = s1.start.x;
    var y1 = s1.start.y;
    var x2 = s1.end.x;
    var y2 = s1.end.y;
    var x3 = s2.start.x;
    var y3 = s2.start.y;
    var x4 = s2.end.x;
    var y4 = s2.end.y;
    var Ax = x2 - x1;
    var Bx = x3 - x4;
    var x1lo;
    var x1hi;
    var y1lo;
    var y1hi;
    var num;
    var offset;
    if (Ax < 0) {
        x1lo = x2;
        x1hi = x1;
    }
    else {
        x1hi = x2;
        x1lo = x1;
    }
    if (Bx > 0) {
        if (x1hi < x4 || x3 < x1lo) {
            return null;
        }
    }
    else {
        if (x1hi < x3 || x4 < x1lo) {
            return null;
        }
    }
    var Ay = y2 - y1;
    var By = y3 - y4;
    if (Ay < 0) {
        y1lo = y2;
        y1hi = y1;
    }
    else {
        y1hi = y2;
        y1lo = y1;
    }
    if (By > 0) {
        if (y1hi < y4 || y3 < y1lo) {
            return null;
        }
    }
    else {
        if (y1hi < y3 || y4 < y1lo) {
            return null;
        }
    }
    var Cx = x1 - x3;
    var Cy = y1 - y3;
    var f = Ay * Bx - Ax * By;
    if (f === 0) {
        return null;
    }
    var d = By * Cx - Bx * Cy;
    if (f > 0) {
        if (d < 0 || d > f) {
            return null;
        }
    }
    else {
        if (d > 0 || d < f) {
            return null;
        }
    }
    var e = Ax * Cy - Ay * Cx;
    if (f > 0) {
        if (e < 0 || e > f) {
            return null;
        }
    }
    else {
        if (e > 0 || e < f) {
            return null;
        }
    }
    num = d * Ax;
    offset = isSameSign(num, f) ? f / 2 : -f / 2;
    var x = x1 + (((num + offset) / f) >> 0);
    num = d * Ay;
    offset = isSameSign(num, f) ? f / 2 : -f / 2;
    var y = y1 + (((num + offset) / f) >> 0);
    return { x: x, y: y };
}

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

(function (EventListenerOrder) {
    EventListenerOrder[EventListenerOrder["FIRST"] = 1] = "FIRST";
    EventListenerOrder[EventListenerOrder["LAST"] = 2] = "LAST";
})(exports.EventListenerOrder || (exports.EventListenerOrder = {}));
var BaseEvent = /** @class */ (function () {
    function BaseEvent(type) {
        this.type = type;
        this.eaten = false;
    }
    BaseEvent.prototype.eat = function () {
        this.eaten = true;
    };
    return BaseEvent;
}());
var EvtComponentBeforeAttach = /** @class */ (function (_super) {
    __extends(EvtComponentBeforeAttach, _super);
    function EvtComponentBeforeAttach(object) {
        var _this = _super.call(this, EvtComponentBeforeAttach.type) || this;
        _this.object = object;
        _this.allow = true;
        return _this;
    }
    EvtComponentBeforeAttach.type = '@componentBeforeAttach';
    return EvtComponentBeforeAttach;
}(BaseEvent));
var EvtComponentAttached = /** @class */ (function (_super) {
    __extends(EvtComponentAttached, _super);
    function EvtComponentAttached() {
        return _super.call(this, EvtComponentAttached.type) || this;
    }
    EvtComponentAttached.type = '@componentAttached';
    return EvtComponentAttached;
}(BaseEvent));
var EvtComponentBeforeDetach = /** @class */ (function (_super) {
    __extends(EvtComponentBeforeDetach, _super);
    function EvtComponentBeforeDetach() {
        var _this = _super.call(this, EvtComponentBeforeDetach.type) || this;
        _this.allow = true;
        return _this;
    }
    EvtComponentBeforeDetach.type = '@componentBeforeDetach';
    return EvtComponentBeforeDetach;
}(BaseEvent));
var EvtComponentDetached = /** @class */ (function (_super) {
    __extends(EvtComponentDetached, _super);
    function EvtComponentDetached() {
        return _super.call(this, EvtComponentDetached.type) || this;
    }
    EvtComponentDetached.type = '@componentDetached';
    return EvtComponentDetached;
}(BaseEvent));
var EvtUpdate = /** @class */ (function (_super) {
    __extends(EvtUpdate, _super);
    function EvtUpdate(deltaTime, elapsedTime, frameStamp) {
        var _this = _super.call(this, EvtUpdate.type) || this;
        _this.deltaTime = deltaTime;
        _this.elapsedTime = elapsedTime;
        _this.frameStamp = frameStamp;
        return _this;
    }
    EvtUpdate.type = '@update';
    return EvtUpdate;
}(BaseEvent));
var EvtCull = /** @class */ (function (_super) {
    __extends(EvtCull, _super);
    function EvtCull(w, h) {
        var _this = _super.call(this, EvtCull.type) || this;
        _this.canvasWidth = w;
        _this.canvasHeight = h;
        _this.result = {};
        return _this;
    }
    EvtCull.prototype.addObject = function (object, z, transform) {
        var objectList = this.result[z] || [];
        objectList.push({ object: object, z: z, transform: transform });
        this.result[z] = objectList;
    };
    EvtCull.type = '@cull';
    return EvtCull;
}(BaseEvent));
var EvtDraw = /** @class */ (function (_super) {
    __extends(EvtDraw, _super);
    function EvtDraw(canvas, z, transform) {
        var _this = _super.call(this, EvtDraw.type) || this;
        _this.canvas = canvas;
        _this.z = z;
        _this.transform = transform;
        return _this;
    }
    EvtDraw.type = '@draw';
    return EvtDraw;
}(BaseEvent));
var EvtHitTest = /** @class */ (function (_super) {
    __extends(EvtHitTest, _super);
    function EvtHitTest(x, y) {
        var _this = _super.call(this, EvtHitTest.type) || this;
        _this.x = x;
        _this.y = y;
        _this.result = false;
        return _this;
    }
    EvtHitTest.type = '@hittest';
    return EvtHitTest;
}(BaseEvent));
var EvtGetBoundingShape = /** @class */ (function (_super) {
    __extends(EvtGetBoundingShape, _super);
    function EvtGetBoundingShape() {
        return _super.call(this, EvtGetBoundingShape.type) || this;
    }
    EvtGetBoundingShape.type = '@getboundingshape';
    return EvtGetBoundingShape;
}(BaseEvent));
var EvtFrame = /** @class */ (function (_super) {
    __extends(EvtFrame, _super);
    function EvtFrame(deltaTime, elapsedTime, frameStamp) {
        var _this = _super.call(this, EvtFrame.type) || this;
        _this.deltaTime = deltaTime;
        _this.elapsedTime = elapsedTime;
        _this.frameStamp = frameStamp;
        return _this;
    }
    EvtFrame.type = '@frame';
    return EvtFrame;
}(BaseEvent));
var EvtFocus = /** @class */ (function (_super) {
    __extends(EvtFocus, _super);
    function EvtFocus(focus) {
        var _this = _super.call(this, EvtFocus.type) || this;
        _this.focus = focus;
        return _this;
    }
    EvtFocus.type = '@focus';
    return EvtFocus;
}(BaseEvent));
var EvtKeyboard = /** @class */ (function (_super) {
    __extends(EvtKeyboard, _super);
    function EvtKeyboard(type, key, code, shift, alt, ctrl, meta) {
        var _this = _super.call(this, type) || this;
        _this.key = key;
        _this.keyCode = code;
        _this.shiftDown = shift;
        _this.altDown = alt;
        _this.ctrlDown = ctrl;
        _this.metaDown = meta;
        return _this;
    }
    return EvtKeyboard;
}(BaseEvent));
var EvtKeyDown = /** @class */ (function (_super) {
    __extends(EvtKeyDown, _super);
    function EvtKeyDown(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyDown.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyDown.type = '@keydown';
    return EvtKeyDown;
}(EvtKeyboard));
var EvtKeyUp = /** @class */ (function (_super) {
    __extends(EvtKeyUp, _super);
    function EvtKeyUp(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyUp.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyUp.type = '@keyup';
    return EvtKeyUp;
}(EvtKeyboard));
var EvtKeyPress = /** @class */ (function (_super) {
    __extends(EvtKeyPress, _super);
    function EvtKeyPress(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyPress.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyPress.type = '@keypress';
    return EvtKeyPress;
}(EvtKeyboard));
var EvtMouse = /** @class */ (function (_super) {
    __extends(EvtMouse, _super);
    function EvtMouse(type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        var _this = _super.call(this, type) || this;
        _this.x = x;
        _this.y = y;
        _this.button = button;
        _this.shiftDown = shiftDown;
        _this.altDown = altDown;
        _this.ctrlDown = ctrlDown;
        _this.metaDown = metaDown;
        _this.bubble = true;
        return _this;
    }
    EvtMouse.prototype.cancelBubble = function () {
        this.bubble = false;
    };
    return EvtMouse;
}(BaseEvent));
var EvtMouseDown = /** @class */ (function (_super) {
    __extends(EvtMouseDown, _super);
    function EvtMouseDown(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseDown.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseDown.type = '@mousedown';
    return EvtMouseDown;
}(EvtMouse));
var EvtMouseUp = /** @class */ (function (_super) {
    __extends(EvtMouseUp, _super);
    function EvtMouseUp(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseUp.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseUp.type = '@mouseup';
    return EvtMouseUp;
}(EvtMouse));
var EvtMouseMove = /** @class */ (function (_super) {
    __extends(EvtMouseMove, _super);
    function EvtMouseMove(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseMove.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseMove.type = '@mousemove';
    return EvtMouseMove;
}(EvtMouse));
var EvtMouseEnter = /** @class */ (function (_super) {
    __extends(EvtMouseEnter, _super);
    function EvtMouseEnter() {
        return _super.call(this, EvtMouseEnter.type) || this;
    }
    EvtMouseEnter.type = '@mouseenter';
    return EvtMouseEnter;
}(BaseEvent));
var EvtMouseLeave = /** @class */ (function (_super) {
    __extends(EvtMouseLeave, _super);
    function EvtMouseLeave() {
        return _super.call(this, EvtMouseLeave.type) || this;
    }
    EvtMouseLeave.type = '@mouseleave';
    return EvtMouseLeave;
}(BaseEvent));
var EvtClick = /** @class */ (function (_super) {
    __extends(EvtClick, _super);
    function EvtClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtClick.type = '@click';
    return EvtClick;
}(EvtMouse));
var EvtDblClick = /** @class */ (function (_super) {
    __extends(EvtDblClick, _super);
    function EvtDblClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtDblClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtDblClick.type = '@dblclick';
    return EvtDblClick;
}(EvtMouse));
var EvtDragBegin = /** @class */ (function (_super) {
    __extends(EvtDragBegin, _super);
    function EvtDragBegin(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        var _this = _super.call(this, EvtDragBegin.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = null;
        return _this;
    }
    EvtDragBegin.type = '@dragbegin';
    return EvtDragBegin;
}(EvtMouse));
var EvtDragEnd = /** @class */ (function (_super) {
    __extends(EvtDragEnd, _super);
    function EvtDragEnd(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
        var _this = _super.call(this, EvtDragEnd.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = data;
        return _this;
    }
    EvtDragEnd.type = '@dragend';
    return EvtDragEnd;
}(EvtMouse));
var EvtDragging = /** @class */ (function (_super) {
    __extends(EvtDragging, _super);
    function EvtDragging(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
        var _this = _super.call(this, EvtDragging.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = data;
        return _this;
    }
    EvtDragging.type = '@dragging';
    return EvtDragging;
}(EvtMouse));
var EvtDragOver = /** @class */ (function (_super) {
    __extends(EvtDragOver, _super);
    function EvtDragOver(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
        var _this = _super.call(this, EvtDragOver.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.object = object;
        _this.data = data;
        return _this;
    }
    EvtDragOver.type = '@dragover';
    return EvtDragOver;
}(EvtMouse));
var EvtDragDrop = /** @class */ (function (_super) {
    __extends(EvtDragDrop, _super);
    function EvtDragDrop(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
        var _this = _super.call(this, EvtDragDrop.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.object = object;
        _this.data = data;
        return _this;
    }
    EvtDragDrop.type = '@dragdrop';
    return EvtDragDrop;
}(EvtMouse));
var EvtResize = /** @class */ (function (_super) {
    __extends(EvtResize, _super);
    function EvtResize() {
        return _super.call(this, EvtResize.type) || this;
    }
    EvtResize.type = '@resize';
    return EvtResize;
}(BaseEvent));
var EvtCanvasResize = /** @class */ (function (_super) {
    __extends(EvtCanvasResize, _super);
    function EvtCanvasResize(view) {
        var _this = _super.call(this, EvtCanvasResize.type) || this;
        _this.view = view;
        return _this;
    }
    EvtCanvasResize.type = '@canvasresize';
    return EvtCanvasResize;
}(BaseEvent));
var EvtGetProp = /** @class */ (function (_super) {
    __extends(EvtGetProp, _super);
    function EvtGetProp(propName) {
        var _this = _super.call(this, EvtGetProp.type) || this;
        _this.propName = propName;
        _this.propValue = undefined;
        return _this;
    }
    EvtGetProp.type = '@getprop';
    return EvtGetProp;
}(BaseEvent));
var EvtSetProp = /** @class */ (function (_super) {
    __extends(EvtSetProp, _super);
    function EvtSetProp(propName, propValue) {
        var _this = _super.call(this, EvtSetProp.type) || this;
        _this.propName = propName;
        _this.propValue = propValue;
        return _this;
    }
    EvtSetProp.type = '@setprop';
    return EvtSetProp;
}(BaseEvent));
var EvtSceneViewPageWillChange = /** @class */ (function (_super) {
    __extends(EvtSceneViewPageWillChange, _super);
    function EvtSceneViewPageWillChange(view, oldPage, newPage) {
        var _this = _super.call(this, EvtSceneViewPageWillChange.type) || this;
        _this.view = view;
        _this.oldPage = oldPage;
        _this.newPage = newPage;
        return _this;
    }
    EvtSceneViewPageWillChange.type = '@scenviewpagewillchange';
    return EvtSceneViewPageWillChange;
}(BaseEvent));
var EvtSceneViewPageChanged = /** @class */ (function (_super) {
    __extends(EvtSceneViewPageChanged, _super);
    function EvtSceneViewPageChanged(view, oldPage, newPage) {
        var _this = _super.call(this, EvtSceneViewPageChanged.type) || this;
        _this.view = view;
        _this.oldPage = oldPage;
        _this.newPage = newPage;
        return _this;
    }
    EvtSceneViewPageChanged.type = '@sceneviewpagechanged';
    return EvtSceneViewPageChanged;
}(BaseEvent));
var EvtSysInfo = /** @class */ (function () {
    function EvtSysInfo() {
    }
    EvtSysInfo.isWindows = function () {
        return this._isWindows;
    };
    EvtSysInfo.isMac = function () {
        return this._isMac;
    };
    EvtSysInfo.isUnix = function () {
        return this._isX11 && !this._isWindows && !this._isMac;
    };
    EvtSysInfo.isLinux = function () {
        return this._isLinux;
    };
    EvtSysInfo.isAndroid = function () {
        return this._isLinux && this._isAndroid;
    };
    EvtSysInfo._isWindows = navigator.platform === 'Win32' || navigator.platform === 'Windows';
    EvtSysInfo._isMac = navigator.platform === 'Mac68K' || navigator.platform === 'MacPPC' || navigator.platform === 'Macintosh' || navigator.platform === 'MacIntel';
    EvtSysInfo._isX11 = navigator.platform === 'X11';
    EvtSysInfo._isLinux = String(navigator.platform).indexOf('Linux') >= 0;
    EvtSysInfo._isAndroid = (navigator.userAgent.toLowerCase().match(/android/i) || []).indexOf('android') >= 0;
    return EvtSysInfo;
}());
var EventObserver = /** @class */ (function () {
    function EventObserver() {
    }
    EventObserver.prototype.on = function (type, handler, order) {
        App.addEventListener(type, this, handler, order || exports.EventListenerOrder.FIRST);
    };
    EventObserver.prototype.off = function (type, handler) {
        App.removeEventListener(type, this, handler);
    };
    EventObserver.prototype.trigger = function (evt) {
        App.triggerEvent(this, evt);
    };
    EventObserver.prototype.triggerEx = function (evt) {
        this.trigger(evt);
    };
    EventObserver.prototype.post = function (evt) {
        App.postEvent(this, evt);
    };
    return EventObserver;
}());
var App = /** @class */ (function () {
    function App() {
    }
    App.postEvent = function (target, evt) {
        this.eventQueue.push({ evt: evt, target: target });
    };
    App.triggerEvent = function (target, evt) {
        this.processEvent(evt, target);
    };
    App.processPendingEvents = function () {
        var _this = this;
        var events = this.eventQueue;
        this.eventQueue = [];
        events.forEach(function (evt) {
            _this.processEvent(evt.evt, evt.target);
        });
    };
    App.addEventListener = function (eventType, bindObject, handler, order) {
        var handlerList = this.eventListeners[eventType] || [];
        for (var i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (order === exports.EventListenerOrder.FIRST) {
                    handlerList[i].handlers = {
                        handler: handler,
                        next: handlerList[i].handlers
                    };
                }
                else {
                    var h = handlerList[i].handlers;
                    while (h.next) {
                        h = h.next;
                    }
                    h.next = { handler: handler, next: null };
                }
                return;
            }
        }
        handlerList.push({
            bindObject: bindObject,
            handlers: {
                handler: handler,
                next: null
            }
        });
        this.eventListeners[eventType] = handlerList;
    };
    App.removeEventListener = function (eventType, bindObject, handler) {
        var handlerList = this.eventListeners[eventType] || [];
        for (var i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (handler) {
                    var h = handlerList[i].handlers;
                    var ph = null;
                    while (h && h.handler !== handler) {
                        ph = h;
                        h = h.next;
                    }
                    if (h) {
                        if (ph) {
                            ph.next = h.next;
                        }
                        else {
                            handlerList[i].handlers = h.next;
                        }
                    }
                    if (!handlerList[i].handlers) {
                        handlerList.splice(i, 1);
                    }
                }
                else {
                    handlerList.splice(i, 1);
                    break;
                }
            }
        }
    };
    App.run = function () {
        function frame(ts) {
            if (App.running) {
                if (App.lastFrameTime === 0) {
                    App.lastFrameTime = ts;
                    App.firstFrameTime = ts;
                }
                App.deltaTime = ts - App.lastFrameTime;
                App.elapsedTime = ts - App.firstFrameTime;
                App.lastFrameTime = ts;
                App.frameStamp++;
                App.processPendingEvents();
                App.triggerEvent(null, new EvtFrame(App.deltaTime, App.elapsedTime, App.frameStamp));
                if (App.running) {
                    requestAnimationFrame(frame);
                }
            }
        }
        if (!this.running) {
            this.running = true;
            this.lastFrameTime = 0;
            this.firstFrameTime = 0;
            this.elapsedTime = 0;
            this.deltaTime = 0;
            this.frameStamp = 0;
            this.init();
            requestAnimationFrame(frame);
        }
    };
    App.addView = function (view) {
        if (view && view.canvas && !this.findView(view.canvas.canvas)) {
            this.views.push(view);
            if (!this.focusView) {
                this.setFocusView(view);
            }
            return true;
        }
        return false;
    };
    App.addCanvas = function (canvas, doubleBuffer) {
        if (!this.findView(canvas)) {
            var view = new SceneView(canvas, doubleBuffer === undefined ? false : doubleBuffer);
            return this.addView(view) ? view : null;
        }
        return null;
    };
    App.setFocusView = function (view) {
        if (this.focusView !== view) {
            if (this.focusView) {
                this.focusView.trigger(new EvtFocus(false));
            }
            this.focusView = view;
            if (this.focusView) {
                this.focusView.trigger(new EvtFocus(true));
            }
        }
    };
    App.findView = function (canvas) {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].canvas.canvas === canvas) {
                return this.views[i];
            }
        }
        return null;
    };
    App.removeView = function (canvas) {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].canvas.canvas === canvas) {
                this.views.splice(i, 1);
            }
        }
    };
    App.setCapture = function (view) {
        this.capturedView = view;
    };
    App.init = function () {
        this.initEventListeners();
    };
    App.processEvent = function (evt, target) {
        var handlerList = this.eventListeners[evt.type];
        if (handlerList) {
            for (var i = 0; i < handlerList.length; i++) {
                var entry = handlerList[i];
                if (!target || entry.bindObject === target) {
                    var h = entry.handlers;
                    while (h) {
                        h.handler.call(entry.bindObject, evt);
                        if (evt.eaten) {
                            break;
                        }
                        h = h.next;
                    }
                    if (target) {
                        break;
                    }
                }
            }
        }
    };
    App.hitView = function (x, y) {
        if (this.capturedView !== null) {
            return this.capturedView;
        }
        for (var i = 0; i < this.views.length; i++) {
            var view = this.views[i];
            var rc = view.canvas.viewport_rect;
            if (x >= rc.x && x < rc.x + rc.w && y >= rc.y && y < rc.y + rc.h) {
                return view;
            }
        }
        return null;
    };
    App.resizeHandler = function () {
        var e = new EvtResize();
        this.views.forEach(function (view) {
            view.triggerEx(e);
        });
    };
    App.mouseDownHandler = function (ev) {
        this.clickTick = Date.now();
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            view.handleMouseDown(ev);
        }
    };
    App.mouseUpHandler = function (ev) {
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            var tick = Date.now();
            if (tick < this.clickTick + this.clickTime) {
                if (tick < this.dblClickTick + this.dblclickTime) {
                    view.handleDblClick(ev);
                    this.dblClickTick = 0;
                }
                else {
                    view.handleClick(ev);
                    this.dblClickTick = tick;
                }
            }
            else {
                this.dblClickTick = 0;
            }
            view.handleMouseUp(ev);
            this.clickTick = 0;
        }
        else {
            this.clickTick = 0;
            this.dblClickTick = 0;
        }
    };
    App.mouseMoveHandler = function (ev) {
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== this.hoverView) {
            if (this.hoverView) {
                this.hoverView.triggerEx(new EvtMouseLeave());
                this.hoverView = null;
            }
            if (view !== null) {
                this.hoverView = view;
                view.triggerEx(new EvtMouseEnter());
            }
        }
        if (view !== null) {
            var rc = view.canvas.viewport_rect;
            view.updateHitObjects(ev.clientX - rc.x, ev.clientY - rc.y);
            view.handleMouseMove(ev);
        }
    };
    App.keyDownHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyDown(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.keyUpHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyUp(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.keyPressHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyPress(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.initEventListeners = function () {
        window.addEventListener('resize', this.resizeHandler.bind(this));
        window.addEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', this.mouseDownHandler.bind(this));
        window.addEventListener(window.onpointerup ? 'pointerup' : 'mouseup', this.mouseUpHandler.bind(this));
        window.addEventListener(window.onpointermove ? 'pointermove' : 'mousemove', this.mouseMoveHandler.bind(this));
        window.addEventListener('keydown', this.keyDownHandler.bind(this));
        window.addEventListener('keyup', this.keyUpHandler.bind(this));
        window.addEventListener('keypress', this.keyPressHandler.bind(this));
    };
    App.elapsedTime = 0;
    App.deltaTime = 0;
    App.eventQueue = [];
    App.eventListeners = {};
    App.running = false;
    App.lastFrameTime = 0;
    App.firstFrameTime = 0;
    App.frameStamp = 0;
    App.capturedView = null;
    App.hoverView = null;
    App.focusView = null;
    App.views = [];
    App.clickTick = 0;
    App.dblClickTick = 0;
    App.clickTime = 400;
    App.dblclickTime = 400;
    return App;
}());
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.object = null;
        return _this;
    }
    Component.prototype.toString = function () {
        return "<Component: " + this.type + ">";
    };
    return Component;
}(EventObserver));
var BaseObject = /** @class */ (function (_super) {
    __extends(BaseObject, _super);
    function BaseObject() {
        var _this = _super.call(this) || this;
        _this.components = {};
        return _this;
    }
    BaseObject.prototype.toString = function () {
        return '<BaseObject>';
    };
    BaseObject.prototype.addComponent = function (component) {
        if (component.object === null) {
            var componentArray = this.components[component.type] || [];
            if (componentArray.indexOf(component) < 0) {
                var ev = new EvtComponentBeforeAttach(this);
                component.trigger(ev);
                ev.object = null;
                if (ev.allow) {
                    componentArray.push(component);
                    component.object = this;
                    component.trigger(new EvtComponentAttached());
                }
            }
            this.components[component.type] = componentArray;
        }
        return this;
    };
    BaseObject.prototype.removeComponent = function (component) {
        if (component.object === this) {
            var index = this.components[component.type].indexOf(component);
            this.removeComponentByIndex(component.type, index);
        }
        return this;
    };
    BaseObject.prototype.removeComponentByIndex = function (type, index) {
        var components = this.components[type];
        if (components && index >= 0 && index < components.length) {
            var ev = new EvtComponentBeforeDetach();
            components[index].trigger(ev);
            if (ev.allow) {
                components[index].trigger(new EvtComponentDetached());
                components[index].object = null;
                components.splice(index, 1);
            }
        }
        return this;
    };
    BaseObject.prototype.removeComponentsByType = function (type) {
        var components = this.components[type];
        while (components && components.length > 0) {
            this.removeComponentByIndex(type, components.length - 1);
        }
        return this;
    };
    BaseObject.prototype.removeAllComponents = function () {
        var _this = this;
        Object.keys(this.components).forEach(function (type) {
            _this.removeComponentsByType(type);
        });
        return this;
    };
    BaseObject.prototype.getComponent = function (type, index) {
        if (index === void 0) { index = 0; }
        var componentArray = this.components[type];
        if (componentArray === undefined || index < 0 || componentArray.length <= index) {
            return null;
        }
        return componentArray[index];
    };
    BaseObject.prototype.getComponents = function (type) {
        return this.components[type];
    };
    BaseObject.prototype.triggerEx = function (evt) {
        _super.prototype.trigger.call(this, evt);
        for (var c in this.components) {
            if (this.components.hasOwnProperty(c)) {
                this.components[c].forEach(function (comp) {
                    comp.trigger(evt);
                });
            }
        }
    };
    BaseObject.prototype.post = function (evt) {
        App.postEvent(this, evt);
    };
    return BaseObject;
}(EventObserver));
var SceneObject = /** @class */ (function (_super) {
    __extends(SceneObject, _super);
    function SceneObject(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this) || this;
        _this._view = null;
        _this._parent = null;
        _this._z = 0;
        _this._visible = true;
        _this._children = [];
        _this._localTransform = new Matrix2d();
        _this._worldTranslation = null;
        _this._worldRotation = null;
        _this._worldScale = null;
        _this._anchorPoint = { x: 0, y: 0 };
        if (parent) {
            parent.addChild(_this);
        }
        _this.on(EvtCull.type, function (evt) {
            evt.addObject(_this, _this.z, _this.worldTransform);
        });
        _this.on(EvtHitTest.type, function (evt) {
            var shape = _this.boundingShape;
            evt.result = shape ? IntersectionTestShapePoint(shape, { x: evt.x, y: evt.y }) : false;
        });
        _this.on(EvtGetProp.type, function (ev) {
            switch (ev.propName) {
                case 'z':
                    ev.propValue = _this.z;
                    ev.eat();
                    break;
                case 'visible':
                    ev.propValue = _this.visible;
                    ev.eat();
                    break;
                case 'transform':
                    ev.propValue = _this.localTransform;
                    ev.eat();
                    break;
                case 'translation':
                    var t = _this.translation;
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'scale':
                    
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'rotation':
                    ev.propValue = _this.rotation;
                    ev.eat();
                    break;
                case 'anchorPoint':
                    ev.propValue = _this.anchorPoint;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        _this.on(EvtSetProp.type, function (ev) {
            switch (ev.propName) {
                case 'z':
                    _this.z = ev.propValue;
                    ev.eat();
                    break;
                case 'visible':
                    _this.visible = ev.propValue;
                    ev.eat();
                    break;
                case 'transform':
                    _this.localTransform = ev.propValue;
                    ev.eat();
                    break;
                case 'translation':
                    var t = ev.propValue;
                    _this.translation = { x: Math.round(t[0]), y: Math.round(t[1]) };
                    break;
                case 'scale':
                    var s = ev.propValue;
                    _this.scale = { x: s[0], y: s[1] };
                    break;
                case 'rotation':
                    _this.rotation = ev.propValue;
                    break;
                case 'anchorPoint':
                    _this.anchorPoint = ev.propValue;
                    break;
                default:
                    break;
            }
        });
        return _this;
    }
    Object.defineProperty(SceneObject.prototype, "boundingShape", {
        get: function () {
            var ev = new EvtGetBoundingShape();
            this.triggerEx(ev);
            return ev.shape || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (v) {
            this._view = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this.setZ(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setZ = function (value) {
        this._z = value;
    };
    Object.defineProperty(SceneObject.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this.setVisible(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setVisible = function (value) {
        this._visible = value;
    };
    Object.defineProperty(SceneObject.prototype, "localTransform", {
        get: function () {
            return this._localTransform;
        },
        set: function (t) {
            this.setLocalTransform(t);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setLocalTransform = function (t) {
        this._localTransform = t;
    };
    Object.defineProperty(SceneObject.prototype, "translation", {
        get: function () {
            return this.localTransform.getTranslationPart();
        },
        set: function (t) {
            this.setTranslation(t);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setTranslation = function (t) {
        this.localTransform.setTranslationPart(t);
    };
    Object.defineProperty(SceneObject.prototype, "scale", {
        get: function () {
            return this.localTransform.getScalePart();
        },
        set: function (s) {
            this.setScale(s);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setScale = function (s) {
        this.localTransform.setScalePart(s);
    };
    Object.defineProperty(SceneObject.prototype, "rotation", {
        get: function () {
            return this.localTransform.getRotationPart();
        },
        set: function (r) {
            this.setRotation(r);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setRotation = function (r) {
        this.localTransform.setRotationPart(r);
    };
    Object.defineProperty(SceneObject.prototype, "worldTransform", {
        get: function () {
            var t = this.parent ? Matrix2d.transform(this.parent.worldTransform, this.localTransform) : this.localTransform;
            if (this._worldTranslation !== null) {
                t.setTranslationPart(this._worldTranslation);
            }
            if (this._worldRotation !== null) {
                t.setRotationPart(this._worldRotation);
            }
            if (this._worldScale !== null) {
                t.setScalePart(this._worldScale);
            }
            return t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "worldTranslation", {
        get: function () {
            return this._worldTranslation;
        },
        set: function (value) {
            this.setWorldTranslation(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldTranslation = function (value) {
        this._worldTranslation = value === null ? null : { x: Math.round(value.x), y: Math.round(value.y) };
    };
    Object.defineProperty(SceneObject.prototype, "worldRotation", {
        get: function () {
            return this._worldRotation;
        },
        set: function (value) {
            this.setWorldRotation(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldRotation = function (value) {
        this._worldRotation = value;
    };
    Object.defineProperty(SceneObject.prototype, "worldScale", {
        get: function () {
            return this._worldScale;
        },
        set: function (value) {
            this.setWorldScale(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldScale = function (value) {
        this._worldScale = value;
    };
    Object.defineProperty(SceneObject.prototype, "anchorPoint", {
        get: function () {
            return this._anchorPoint;
        },
        set: function (pt) {
            this.setAnchorPoint(pt);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setAnchorPoint = function (pt) {
        this._anchorPoint = pt;
    };
    Object.defineProperty(SceneObject.prototype, "numChildren", {
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.collapseTransform = function () {
        var wt = this.worldTransform;
        this.worldTranslation = null;
        this.worldRotation = null;
        this.worldScale = null;
        if (this.parent) {
            this.localTransform = Matrix2d.invert(this.parent.worldTransform).transform(wt);
        }
        else {
            this.localTransform = wt;
        }
        this.localTransform.e = Math.round(this.localTransform.e);
        this.localTransform.f = Math.round(this.localTransform.f);
    };
    SceneObject.prototype.getLocalPoint = function (x, y) {
        return Matrix2d.invert(this.worldTransform).transformPoint({ x: x, y: y });
    };
    SceneObject.prototype.childAt = function (index) {
        return this._children[index];
    };
    SceneObject.prototype.forEachChild = function (callback) {
        this._children.forEach(callback);
    };
    SceneObject.prototype.addChild = function (child) {
        if (child._parent === null) {
            child._parent = this;
            child._view = this._view;
            this._children.push(child);
        }
    };
    SceneObject.prototype.removeChild = function (child) {
        if (child._parent === this) {
            var index = this._children.indexOf(child);
            this.removeChildAt(index);
        }
    };
    SceneObject.prototype.removeChildAt = function (index) {
        if (index >= 0 && index < this._children.length) {
            var child = this._children[index];
            this._children.splice(index, 1);
            child._parent = null;
            child._view = null;
        }
    };
    SceneObject.prototype.removeChildren = function () {
        while (this._children.length > 0) {
            this.removeChildAt(0);
        }
    };
    SceneObject.prototype.unrefChildren = function () {
        while (this._children.length > 0) {
            this._children[0].unrefChildren();
            this.removeChildAt(0);
        }
    };
    SceneObject.prototype.remove = function () {
        if (this._parent) {
            this._parent.removeChild(this);
        }
    };
    SceneObject.prototype.triggerRecursive = function (evt) {
        _super.prototype.trigger.call(this, evt);
        this.forEachChild(function (child, index) {
            child.triggerRecursive(evt);
        });
    };
    SceneObject.prototype.triggerRecursiveEx = function (evt) {
        _super.prototype.triggerEx.call(this, evt);
        this.forEachChild(function (child, index) {
            child.triggerRecursiveEx(evt);
        });
    };
    SceneObject.prototype.setCapture = function () {
        this._view && this._view.setCaptureObject(this);
    };
    SceneObject.prototype.releaseCapture = function () {
        this._view && this._view.captureObject === this && this._view.setCaptureObject(null);
    };
    SceneObject.prototype.toString = function () {
        return '<SceneObject>';
    };
    return SceneObject;
}(BaseObject));
var SceneView = /** @class */ (function (_super) {
    __extends(SceneView, _super);
    function SceneView(canvas, doubleBuffer) {
        if (doubleBuffer === void 0) { doubleBuffer = false; }
        var _this = _super.call(this) || this;
        _this._canvas = new Canvas(_this, canvas, doubleBuffer);
        _this._captureObject = null;
        _this._hitObjects = [];
        _this._currentPage = null;
        _this._pages = {};
        var rootNode = new SceneObject();
        rootNode.view = _this;
        _this.addPage({
            name: 'page1',
            rootNode: rootNode,
            bkImageUrl: null,
            bkImageRepeat: null,
            bkImageSize: null,
            bkImageAttachment: null,
            bkColor: '#ffffff'
        });
        _this.selectPage('page1');
        _this.on(EvtFrame.type, function (ev) {
            var updateEvent = new EvtUpdate(ev.deltaTime, ev.elapsedTime, ev.frameStamp);
            if (_this.rootNode) {
                _this.rootNode.triggerRecursiveEx(updateEvent);
            }
            _this.canvas.clear();
            _this.triggerEx(new EvtDraw(_this.canvas, 0, new Matrix2d()));
            _this.canvas.flip();
        });
        _this.on(EvtDraw.type, function (ev) {
            if (_this.rootNode) {
                var cullEvent = new EvtCull(ev.canvas.width, ev.canvas.height);
                _this.rootNode.triggerRecursiveEx(cullEvent);
                for (var i in cullEvent.result) {
                    var group = cullEvent.result[i];
                    for (var j = 0; j < group.length; j++) {
                        ev.canvas.context.save();
                        ev.canvas.applyTransform(group[j].transform);
                        ev.canvas.context.translate(0.5, 0.5);
                        group[j].object.triggerEx(new EvtDraw(ev.canvas, group[j].z, group[j].transform));
                        ev.canvas.context.restore();
                    }
                }
            }
        });
        return _this;
    }
    SceneView.prototype.forEachPage = function (callback) {
        if (callback) {
            for (var name_1 in this._pages) {
                callback({
                    name: name_1,
                    rootNode: this._pages[name_1].rootNode,
                    bkImageUrl: this._pages[name_1].bkImageUrl,
                    bkImageRepeat: this._pages[name_1].bkImageRepeat,
                    bkImageAttachment: this._pages[name_1].bkImageAttachment,
                    bkImageSize: this._pages[name_1].bkImageSize,
                    bkColor: this._pages[name_1].bkColor
                });
            }
        }
    };
    SceneView.prototype.addPage = function (page) {
        var defaultPage = {
            name: null,
            rootNode: null,
            bkImageUrl: null,
            bkImageRepeat: 'repeat',
            bkImageAttachment: 'scroll',
            bkImageSize: 'auto',
            bkColor: '#ffffff'
        };
        var p = page || defaultPage;
        var name = p.name || this.genPageName();
        if (name in this._pages) {
            return null;
        }
        this._pages[name] = {
            name: name,
            rootNode: p.rootNode,
            bkImageUrl: p.bkImageUrl,
            bkImageRepeat: p.bkImageRepeat || defaultPage.bkImageRepeat,
            bkImageAttachment: p.bkImageAttachment || defaultPage.bkImageAttachment,
            bkImageSize: p.bkImageSize || defaultPage.bkImageSize,
            bkColor: p.bkColor || defaultPage.bkColor
        };
        return name;
    };
    SceneView.prototype.removePage = function (name) {
        if (name in this._pages) {
            if (name === this._currentPage) {
                var b = false;
                for (var n in this._pages) {
                    if (n !== name) {
                        this.selectPage(n);
                        b = true;
                    }
                }
                if (!b) {
                    return false;
                }
            }
            this._pages[name].rootNode.unrefChildren();
            this._pages[name].rootNode.view = null;
            this._pages[name].rootNode = null;
            delete this._pages[name];
            return true;
        }
        return false;
    };
    SceneView.prototype.selectPage = function (name) {
        var oldName = this._currentPage;
        if (name in this._pages && name !== oldName) {
            App.triggerEvent(null, new EvtSceneViewPageWillChange(this, oldName, name));
            this._currentPage = name;
            this._captureObject = null;
            this._hitObjects.length = 0;
            this.applyPage(this._pages[this._currentPage]);
            App.triggerEvent(null, new EvtSceneViewPageChanged(this, oldName, name));
        }
    };
    SceneView.prototype.renamePage = function (oldName, newName) {
        if (oldName in this._pages && newName && newName !== oldName && !(newName in this._pages)) {
            var page = this._pages[oldName];
            delete this._pages[oldName];
            page.name = newName;
            this._pages[newName] = page;
            if (oldName === this._currentPage) {
                this._currentPage = newName;
            }
        }
    };
    Object.defineProperty(SceneView.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImage", {
        get: function () {
            return this._pages[this._currentPage].bkImageUrl;
        },
        set: function (image) {
            if (image !== this._pages[this._currentPage].bkImageUrl) {
                this._pages[this._currentPage].bkImageUrl = image;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageRepeat", {
        get: function () {
            return this._pages[this._currentPage].bkImageRepeat;
        },
        set: function (value) {
            var repeat = value || 'repeat';
            if (repeat !== this._pages[this._currentPage].bkImageRepeat) {
                this._pages[this._currentPage].bkImageRepeat = repeat;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageAttachment", {
        get: function () {
            return this._pages[this._currentPage].bkImageAttachment;
        },
        set: function (value) {
            var attach = value || 'scroll';
            if (attach !== this._pages[this._currentPage].bkImageAttachment) {
                this._pages[this._currentPage].bkImageAttachment = attach;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageSize", {
        get: function () {
            return this._pages[this._currentPage].bkImageSize;
        },
        set: function (value) {
            var size = value || 'auto';
            if (size !== this._pages[this._currentPage].bkImageSize) {
                this._pages[this._currentPage].bkImageSize = size;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageColor", {
        get: function () {
            return this._pages[this._currentPage].bkColor;
        },
        set: function (color) {
            if (color !== this._pages[this._currentPage].bkColor) {
                this._pages[this._currentPage].bkColor = color;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    SceneView.prototype.updateHitObjects = function (x, y) {
        var hitTestResult = this.hitTest(x, y);
        for (var i = 0; i < this._hitObjects.length;) {
            if (hitTestResult.indexOf(this._hitObjects[i]) < 0) {
                this._hitObjects[i].trigger(new EvtMouseLeave());
                this._hitObjects.splice(i, 1);
            }
            else {
                i++;
            }
        }
        for (var i = 0; i < hitTestResult.length; i++) {
            if (this._hitObjects.indexOf(hitTestResult[i]) < 0) {
                hitTestResult[i].trigger(new EvtMouseEnter());
            }
        }
        this._hitObjects = hitTestResult;
        this._hitObjects.push(this.rootNode);
    };
    Object.defineProperty(SceneView.prototype, "rootNode", {
        get: function () {
            return this._pages[this._currentPage].rootNode;
        },
        set: function (node) {
            if (this._pages[this._currentPage].rootNode !== node) {
                this._pages[this._currentPage].rootNode = node;
                this._hitObjects.length = 0;
                this._captureObject = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "captureObject", {
        get: function () {
            return this._captureObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "hitObjects", {
        get: function () {
            return this._hitObjects;
        },
        enumerable: true,
        configurable: true
    });
    SceneView.prototype.setCaptureObject = function (object) {
        this._captureObject = object;
    };
    SceneView.prototype.handleMouseDown = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseDown(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    };
    SceneView.prototype.handleMouseUp = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseUp(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    };
    SceneView.prototype.handleMouseMove = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseMove(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    };
    SceneView.prototype.handleClick = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (var i = 0; i < this._hitObjects.length; i++) {
            var obj = this._hitObjects[i];
            if (this.isValidObject(obj)) {
                obj.triggerEx(e);
                if (!e.bubble) {
                    break;
                }
            }
        }
        if (e.bubble) {
            this.triggerEx(e);
        }
    };
    SceneView.prototype.handleDblClick = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtDblClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (var i = 0; i < this._hitObjects.length; i++) {
            var obj = this._hitObjects[i];
            if (this.isValidObject(obj)) {
                obj.triggerEx(e);
                if (!e.bubble) {
                    break;
                }
            }
        }
        if (e.bubble) {
            this.triggerEx(e);
        }
    };
    SceneView.prototype.setFocus = function () {
        App.setFocusView(this);
    };
    SceneView.prototype.hitTest = function (x, y) {
        function hitTest_r(object, result) {
            var pos = Matrix2d.invert(object.worldTransform).transformPoint({ x: x, y: y });
            var e = new EvtHitTest(pos.x, pos.y);
            object.triggerEx(e);
            if (e.result) {
                result.push(object);
            }
            object.forEachChild(function (child, index) {
                hitTest_r(child, result);
            });
        }
        var hitTestResult = [];
        if (this.rootNode) {
            hitTest_r(this.rootNode, hitTestResult);
            hitTestResult.sort(function (a, b) {
                return b.z - a.z;
            });
        }
        return hitTestResult;
    };
    SceneView.prototype.isValidObject = function (object) {
        return object && object.view === this;
    };
    SceneView.prototype.genPageName = function () {
        var n = 1;
        while (true) {
            var name_2 = "page" + n++;
            if (!(name_2 in this._pages)) {
                return name_2;
            }
        }
    };
    SceneView.prototype.applyPage = function (page) {
        var color = page.bkColor || '';
        var url = (page.bkImageUrl && "url(" + page.bkImageUrl + ")") || '';
        var bkrepeat = page.bkImageRepeat || 'repeat';
        var bkattach = page.bkImageAttachment || 'scroll';
        var bkpos = '0% 0%';
        var bksize = page.bkImageSize || 'auto';
        this._canvas.canvas.style.background = color + " " + url + " " + bkrepeat + " " + bkattach + " " + bkpos + " / " + bksize;
    };
    return SceneView;
}(BaseObject));
function ResizeSensor(element, callback) {
    var zIndex = parseInt(window.getComputedStyle(element).zIndex, 10);
    if (isNaN(zIndex)) {
        zIndex = 0;
    }
    zIndex--;
    var expand = document.createElement('div');
    expand.style.position = 'absolute';
    expand.style.left = '0px';
    expand.style.top = '0px';
    expand.style.right = '0px';
    expand.style.bottom = '0px';
    expand.style.overflow = 'hidden';
    expand.style.zIndex = String(zIndex);
    expand.style.visibility = 'hidden';
    var expandChild = document.createElement('div');
    expandChild.style.position = 'absolute';
    expandChild.style.left = '0px';
    expandChild.style.top = '0px';
    expandChild.style.width = '10000000px';
    expandChild.style.height = '10000000px';
    expand.appendChild(expandChild);
    var shrink = document.createElement('div');
    shrink.style.position = 'absolute';
    shrink.style.left = '0px';
    shrink.style.top = '0px';
    shrink.style.right = '0px';
    shrink.style.bottom = '0px';
    shrink.style.overflow = 'hidden';
    shrink.style.zIndex = String(zIndex);
    shrink.style.visibility = 'hidden';
    var shrinkChild = document.createElement('div');
    shrinkChild.style.position = 'absolute';
    shrinkChild.style.left = '0px';
    shrinkChild.style.top = '0px';
    shrinkChild.style.width = '200%';
    shrinkChild.style.height = '200%';
    shrink.appendChild(shrinkChild);
    element.appendChild(expand);
    element.appendChild(shrink);
    function setScroll() {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;
        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    }
    setScroll();
    var size = element.getBoundingClientRect();
    var currentWidth = size.width;
    var currentHeight = size.height;
    var onScroll = function () {
        var size = element.getBoundingClientRect();
        var newWidth = size.width;
        var newHeight = size.height;
        if (newWidth !== currentWidth || newHeight !== currentHeight) {
            currentWidth = newWidth;
            currentHeight = newHeight;
            callback();
        }
        setScroll();
    };
    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
}
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(view, canvas, doubleBuffer) {
        if (doubleBuffer === void 0) { doubleBuffer = false; }
        var _this = _super.call(this) || this;
        _this._view = view;
        _this._canvas = canvas;
        if (_this._canvas) {
            _this.adjustCanvasSize(_this._canvas);
            ResizeSensor(_this._canvas.parentElement, function () {
                _this.adjustCanvasSize(_this._canvas);
            });
        }
        _this._mouseOver = false;
        _this._doubleBuffer = doubleBuffer;
        return _this;
    }
    Object.defineProperty(Canvas.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "context", {
        get: function () {
            return this._doubleBuffer ? this._offscreenCtx : this._screenCtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "viewport_rect", {
        get: function () {
            var rc = this._canvas.getBoundingClientRect();
            var x = rc.left - document.documentElement.clientLeft;
            var y = rc.top - document.documentElement.clientTop;
            var w = rc.right - rc.left;
            var h = rc.bottom - rc.top;
            return { x: x, y: y, w: w, h: h };
        },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.clear = function (rect) {
        var x = rect ? rect.x : 0;
        var y = rect ? rect.y : 0;
        var w = rect ? rect.w : this._width;
        var h = rect ? rect.h : this._height;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(x, y, w, h);
        if (this._doubleBuffer) {
            this._screenCtx.clearRect(x, y, w, h);
        }
    };
    Canvas.prototype.applyTransform = function (transform) {
        this.context.setTransform(transform.a, transform.b, transform.c, transform.d, Math.round(transform.e), Math.round(transform.f));
    };
    Canvas.prototype.flip = function () {
        if (this._doubleBuffer) {
            this._screenCtx.drawImage(this._buffer, 0, 0);
        }
    };
    Canvas.prototype.adjustCanvasSize = function (canvas) {
        var computedStyle = window.getComputedStyle(canvas.parentElement);
        this._width = canvas.parentElement.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
        this._height = canvas.parentElement.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._screenCtx = this._canvas.getContext('2d');
        this._buffer = document.createElement('canvas');
        this._buffer.width = this._width;
        this._buffer.height = this._height;
        this._offscreenCtx = this._buffer.getContext('2d');
        App.triggerEvent(null, new EvtCanvasResize(this._view));
    };
    return Canvas;
}(BaseObject));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

(function (SplineType) {
    SplineType[SplineType["STEP"] = 1] = "STEP";
    SplineType[SplineType["LINEAR"] = 2] = "LINEAR";
    SplineType[SplineType["POLY"] = 3] = "POLY";
})(exports.SplineType || (exports.SplineType = {}));
var CurveEvaluter = /** @class */ (function () {
    function CurveEvaluter(cp, clamp) {
        if (clamp === void 0) { clamp = false; }
        this.cp = cp;
        this.clamp = clamp;
    }
    CurveEvaluter.prototype.eval = function (x) {
        return 0;
    };
    CurveEvaluter.prototype.evalFirst = function () {
        return this.cp.length > 0 ? this.cp[0].y : 0;
    };
    CurveEvaluter.prototype.evalLast = function () {
        return this.cp.length > 0 ? this.cp[this.cp.length - 1].y : 0;
    };
    return CurveEvaluter;
}());
var StepEvaluter = /** @class */ (function (_super) {
    __extends$5(StepEvaluter, _super);
    function StepEvaluter(cp, clamp) {
        if (clamp === void 0) { clamp = false; }
        var _this = _super.call(this, cp, clamp) || this;
        _this.h = new Array(cp.length - 1);
        _this.compute();
        return _this;
    }
    StepEvaluter.prototype.compute = function () {
        for (var i = 0; i < this.cp.length - 1; ++i) {
            this.h[i] = this.cp[i + 1].x - this.cp[i].x;
        }
    };
    StepEvaluter.prototype.getSegment = function (x) {
        var i;
        for (i = 0; i < this.cp.length - 1; i++) {
            if (x < this.cp[i + 1].x) {
                break;
            }
        }
        return i;
    };
    StepEvaluter.prototype.eval = function (x) {
        if (this.clamp) {
            if (x < 0) {
                return this.cp[0].y;
            }
            if (x > this.cp[this.cp.length - 1].x) {
                return this.cp[this.cp.length - 1].y;
            }
        }
        var seg = this.getSegment(x);
        return this.cp[seg].y;
    };
    return StepEvaluter;
}(CurveEvaluter));
var CoLinearEvaluter = /** @class */ (function (_super) {
    __extends$5(CoLinearEvaluter, _super);
    function CoLinearEvaluter(cp, clamp) {
        if (clamp === void 0) { clamp = false; }
        var _this = _super.call(this, cp, clamp) || this;
        _this.h = new Array(cp.length - 1);
        _this.cp = cp;
        _this.compute();
        return _this;
    }
    CoLinearEvaluter.prototype.compute = function () {
        for (var i = 0; i < this.cp.length - 1; ++i) {
            this.h[i] = this.cp[i + 1].x - this.cp[i].x;
        }
    };
    CoLinearEvaluter.prototype.getSegment = function (x) {
        var i;
        for (i = 0; i < this.cp.length - 1; i++) {
            if (x < this.cp[i + 1].x) {
                break;
            }
        }
        if (i === this.cp.length - 1) {
            i--;
        }
        return i;
    };
    CoLinearEvaluter.prototype.eval = function (x) {
        if (this.clamp) {
            if (x < 0) {
                return this.cp[0].y;
            }
            if (x > this.cp[this.cp.length - 1].x) {
                return this.cp[this.cp.length - 1].y;
            }
        }
        var seg = this.getSegment(x);
        var t = x - this.cp[seg].x;
        return this.cp[seg].y + ((this.cp[seg + 1].y - this.cp[seg].y) * t) / this.h[seg];
    };
    return CoLinearEvaluter;
}(CurveEvaluter));
var PolynomialsEvaluter = /** @class */ (function (_super) {
    __extends$5(PolynomialsEvaluter, _super);
    function PolynomialsEvaluter(cp, clamp) {
        if (clamp === void 0) { clamp = false; }
        var _this = _super.call(this, cp, clamp) || this;
        _this.a = new Array(cp.length);
        _this.h = new Array(cp.length);
        _this.cp = cp;
        _this.compute();
        return _this;
    }
    PolynomialsEvaluter.prototype.solveTridiag = function (sub, diag, sup) {
        var n = this.cp.length - 2;
        for (var i = 2; i <= n; i++) {
            sub[i] /= diag[i - 1];
            diag[i] -= sub[i] * sup[i - 1];
            this.a[i] -= this.a[i - 1] * sub[i];
        }
        this.a[n] /= diag[n];
        for (var i = n - 1; i >= 1; --i) {
            this.a[i] = (this.a[i] - this.a[i + 1] * sup[i]) / diag[i];
        }
    };
    PolynomialsEvaluter.prototype.compute = function () {
        var nk = this.cp.length;
        var sub = new Array(nk - 1);
        var diag = new Array(nk - 1);
        var sup = new Array(nk - 1);
        this.a[0] = 0;
        this.a[nk - 1] = 0;
        for (var i = 1; i < nk; ++i) {
            this.h[i] = this.cp[i].x - this.cp[i - 1].x;
        }
        for (var i = 1; i < nk - 1; ++i) {
            diag[i] = (this.h[i] + this.h[i + 1]) / 3;
            sup[i] = this.h[i + 1] / 6;
            sub[i] = this.h[i] / 6;
            this.a[i] = (this.cp[i + 1].y - this.cp[i].y) / this.h[i + 1] - (this.cp[i].y - this.cp[i - 1].y) / this.h[i];
        }
        this.solveTridiag(sub, diag, sup);
    };
    PolynomialsEvaluter.prototype.getSegment = function (x) {
        var i;
        for (i = 0; i < this.cp.length - 1; i++) {
            if (x < this.cp[i + 1].x) {
                break;
            }
        }
        if (i === this.cp.length - 1) {
            i--;
        }
        return i;
    };
    PolynomialsEvaluter.prototype.eval = function (x) {
        if (this.clamp) {
            if (x < 0) {
                return this.cp[0].y;
            }
            if (x > this.cp[this.cp.length - 1].x) {
                return this.cp[this.cp.length - 1].y;
            }
        }
        var seg = this.getSegment(x) + 1;
        var t1 = x - this.cp[seg - 1].x;
        var t2 = this.h[seg] - t1;
        return ((((-this.a[seg - 1] / 6.0) * (t2 + this.h[seg]) * t1 + this.cp[seg - 1].y) * t2 + ((-this.a[seg] / 6.0) * (t1 + this.h[seg]) * t2 + this.cp[seg].y) * t1) / this.h[seg]);
    };
    return PolynomialsEvaluter;
}(CurveEvaluter));
var Spline = /** @class */ (function () {
    function Spline(type, cp, clamp) {
        if (clamp === void 0) { clamp = false; }
        this._evalutors = [];
        this._array = false;
        if (cp.length > 0) {
            if (typeof cp[0].y === 'number') {
                this.initNonArray(type, cp, clamp);
            }
            else {
                this.initArray(type, cp, clamp);
            }
        }
    }
    Spline.prototype.eval = function (x) {
        if (this._evalutors.length > 0) {
            if (this._array) {
                var result_1 = [];
                this._evalutors.forEach(function (evalutor) {
                    result_1.push(evalutor.eval(x));
                });
                return result_1;
            }
            else {
                return this._evalutors[0].eval(x);
            }
        }
        else {
            return 0;
        }
    };
    Spline.prototype.evalFirst = function () {
        if (this._evalutors.length > 0) {
            if (this._array) {
                var result_2 = [];
                this._evalutors.forEach(function (evalutor) {
                    result_2.push(evalutor.evalFirst());
                });
                return result_2;
            }
            else {
                return this._evalutors[0].evalFirst();
            }
        }
        else {
            return 0;
        }
    };
    Spline.prototype.evalLast = function () {
        if (this._evalutors.length > 0) {
            if (this._array) {
                var result_3 = [];
                this._evalutors.forEach(function (evalutor) {
                    result_3.push(evalutor.evalLast());
                });
                return result_3;
            }
            else {
                return this._evalutors[0].evalLast();
            }
        }
        else {
            return 0;
        }
    };
    Spline.prototype.initArray = function (type, cp, clamp) {
        var numElements = cp[0].y.length;
        if (numElements > 0) {
            for (var i = 0; i < numElements; i++) {
                var t = [];
                for (var j = 0; j < cp.length; j++) {
                    var val = cp[j].y.length > i ? cp[j].y[i] : 0;
                    t.push({ x: cp[j].x, y: val });
                }
                switch (type) {
                    case exports.SplineType.STEP:
                        this._evalutors.push(new StepEvaluter(t, clamp));
                        break;
                    case exports.SplineType.LINEAR:
                        this._evalutors.push(new CoLinearEvaluter(t, clamp));
                        break;
                    case exports.SplineType.POLY:
                    default:
                        this._evalutors.push(new PolynomialsEvaluter(t, clamp));
                        break;
                }
            }
            this._array = true;
        }
    };
    Spline.prototype.initNonArray = function (type, cp, clamp) {
        switch (type) {
            case exports.SplineType.STEP:
                this._evalutors.push(new StepEvaluter(cp, clamp));
                break;
            case exports.SplineType.LINEAR:
                this._evalutors.push(new CoLinearEvaluter(cp, clamp));
                break;
            case exports.SplineType.POLY:
            default:
                this._evalutors.push(new PolynomialsEvaluter(cp, clamp));
                break;
        }
        this._array = false;
    };
    return Spline;
}());

(function (KeyCode) {
    KeyCode[KeyCode["kBackspace"] = 8] = "kBackspace";
    KeyCode[KeyCode["kTab"] = 9] = "kTab";
    KeyCode[KeyCode["kClear"] = 12] = "kClear";
    KeyCode[KeyCode["kEnter"] = 13] = "kEnter";
    KeyCode[KeyCode["kShift"] = 16] = "kShift";
    KeyCode[KeyCode["kControl"] = 17] = "kControl";
    KeyCode[KeyCode["kAlt"] = 18] = "kAlt";
    KeyCode[KeyCode["kPause"] = 19] = "kPause";
    KeyCode[KeyCode["kCapsLock"] = 20] = "kCapsLock";
    KeyCode[KeyCode["kEscape"] = 27] = "kEscape";
    KeyCode[KeyCode["kSpace"] = 32] = "kSpace";
    KeyCode[KeyCode["kPageUp"] = 33] = "kPageUp";
    KeyCode[KeyCode["kPageDown"] = 34] = "kPageDown";
    KeyCode[KeyCode["kEnd"] = 35] = "kEnd";
    KeyCode[KeyCode["kHome"] = 36] = "kHome";
    KeyCode[KeyCode["kLeft"] = 37] = "kLeft";
    KeyCode[KeyCode["kUp"] = 38] = "kUp";
    KeyCode[KeyCode["kRight"] = 39] = "kRight";
    KeyCode[KeyCode["kDown"] = 40] = "kDown";
    KeyCode[KeyCode["kSelect"] = 41] = "kSelect";
    KeyCode[KeyCode["kPrint"] = 42] = "kPrint";
    KeyCode[KeyCode["kExecute"] = 43] = "kExecute";
    KeyCode[KeyCode["kInsert"] = 45] = "kInsert";
    KeyCode[KeyCode["kDelete"] = 46] = "kDelete";
    KeyCode[KeyCode["kHelp"] = 47] = "kHelp";
    KeyCode[KeyCode["k0"] = 48] = "k0";
    KeyCode[KeyCode["k1"] = 49] = "k1";
    KeyCode[KeyCode["k2"] = 50] = "k2";
    KeyCode[KeyCode["k3"] = 51] = "k3";
    KeyCode[KeyCode["k4"] = 52] = "k4";
    KeyCode[KeyCode["k5"] = 53] = "k5";
    KeyCode[KeyCode["k6"] = 54] = "k6";
    KeyCode[KeyCode["k7"] = 55] = "k7";
    KeyCode[KeyCode["k8"] = 56] = "k8";
    KeyCode[KeyCode["k9"] = 57] = "k9";
    KeyCode[KeyCode["kA"] = 65] = "kA";
    KeyCode[KeyCode["kB"] = 66] = "kB";
    KeyCode[KeyCode["kC"] = 67] = "kC";
    KeyCode[KeyCode["kD"] = 68] = "kD";
    KeyCode[KeyCode["kE"] = 69] = "kE";
    KeyCode[KeyCode["kF"] = 70] = "kF";
    KeyCode[KeyCode["kG"] = 71] = "kG";
    KeyCode[KeyCode["kH"] = 72] = "kH";
    KeyCode[KeyCode["kI"] = 73] = "kI";
    KeyCode[KeyCode["kJ"] = 74] = "kJ";
    KeyCode[KeyCode["kK"] = 75] = "kK";
    KeyCode[KeyCode["kL"] = 76] = "kL";
    KeyCode[KeyCode["kM"] = 77] = "kM";
    KeyCode[KeyCode["kN"] = 78] = "kN";
    KeyCode[KeyCode["kO"] = 79] = "kO";
    KeyCode[KeyCode["kP"] = 80] = "kP";
    KeyCode[KeyCode["kQ"] = 81] = "kQ";
    KeyCode[KeyCode["kR"] = 82] = "kR";
    KeyCode[KeyCode["kS"] = 83] = "kS";
    KeyCode[KeyCode["kT"] = 84] = "kT";
    KeyCode[KeyCode["kU"] = 85] = "kU";
    KeyCode[KeyCode["kV"] = 86] = "kV";
    KeyCode[KeyCode["kW"] = 87] = "kW";
    KeyCode[KeyCode["kX"] = 88] = "kX";
    KeyCode[KeyCode["kY"] = 89] = "kY";
    KeyCode[KeyCode["kZ"] = 90] = "kZ";
    KeyCode[KeyCode["kLeftMeta"] = 91] = "kLeftMeta";
    KeyCode[KeyCode["kRightMeta"] = 92] = "kRightMeta";
    KeyCode[KeyCode["kMenu"] = 93] = "kMenu";
    KeyCode[KeyCode["kKP0"] = 96] = "kKP0";
    KeyCode[KeyCode["kKP1"] = 97] = "kKP1";
    KeyCode[KeyCode["kKP2"] = 98] = "kKP2";
    KeyCode[KeyCode["kKP3"] = 99] = "kKP3";
    KeyCode[KeyCode["kKP4"] = 100] = "kKP4";
    KeyCode[KeyCode["kKP5"] = 101] = "kKP5";
    KeyCode[KeyCode["kKP6"] = 102] = "kKP6";
    KeyCode[KeyCode["kKP7"] = 103] = "kKP7";
    KeyCode[KeyCode["kKP8"] = 104] = "kKP8";
    KeyCode[KeyCode["kKP9"] = 105] = "kKP9";
    KeyCode[KeyCode["kKPMul"] = 106] = "kKPMul";
    KeyCode[KeyCode["kKPAdd"] = 107] = "kKPAdd";
    KeyCode[KeyCode["kKPSep"] = 108] = "kKPSep";
    KeyCode[KeyCode["kKPSub"] = 109] = "kKPSub";
    KeyCode[KeyCode["kKPDec"] = 110] = "kKPDec";
    KeyCode[KeyCode["kKPDiv"] = 111] = "kKPDiv";
    KeyCode[KeyCode["kF1"] = 112] = "kF1";
    KeyCode[KeyCode["kF2"] = 113] = "kF2";
    KeyCode[KeyCode["kF3"] = 114] = "kF3";
    KeyCode[KeyCode["kF4"] = 115] = "kF4";
    KeyCode[KeyCode["kF5"] = 116] = "kF5";
    KeyCode[KeyCode["kF6"] = 117] = "kF6";
    KeyCode[KeyCode["kF7"] = 118] = "kF7";
    KeyCode[KeyCode["kF8"] = 119] = "kF8";
    KeyCode[KeyCode["kF9"] = 120] = "kF9";
    KeyCode[KeyCode["kF10"] = 121] = "kF10";
    KeyCode[KeyCode["kF11"] = 122] = "kF11";
    KeyCode[KeyCode["kF12"] = 123] = "kF12";
    KeyCode[KeyCode["kNumLock"] = 144] = "kNumLock";
    KeyCode[KeyCode["kScrollLock"] = 145] = "kScrollLock";
    KeyCode[KeyCode["kAdd"] = 187] = "kAdd";
    KeyCode[KeyCode["kComma"] = 188] = "kComma";
    KeyCode[KeyCode["kMinus"] = 189] = "kMinus";
    KeyCode[KeyCode["kPeriod"] = 190] = "kPeriod";
    KeyCode[KeyCode["kApostrophe"] = 192] = "kApostrophe";
    KeyCode[KeyCode["kLeftBrace"] = 219] = "kLeftBrace";
    KeyCode[KeyCode["kRightBrace"] = 221] = "kRightBrace";
    KeyCode[KeyCode["kBackSlash"] = 220] = "kBackSlash";
    KeyCode[KeyCode["kQuot"] = 222] = "kQuot";
    KeyCode[KeyCode["kSemicolon"] = 186] = "kSemicolon";
    KeyCode[KeyCode["kSlash"] = 191] = "kSlash";
})(exports.KeyCode || (exports.KeyCode = {}));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CoKeyframeAnimation = /** @class */ (function (_super) {
    __extends$6(CoKeyframeAnimation, _super);
    function CoKeyframeAnimation(options) {
        var _this = _super.call(this, CoKeyframeAnimation.type) || this;
        _this._tracks = {};
        _this._duration = 0;
        _this._startTime = 0;
        _this._round = 0;
        var opt = options || {};
        _this._delay = opt.delay === undefined ? 0 : opt.delay;
        _this._repeat = opt.repeat === undefined ? 0 : opt.repeat;
        _this._autoRemove = opt.autoRemove === undefined ? true : opt.autoRemove;
        _this._exclusive = !!opt.exclusive;
        if (opt.tracks) {
            for (var trackName in opt.tracks) {
                if (opt.tracks.hasOwnProperty(trackName)) {
                    var trackinfo = opt.tracks[trackName];
                    var type = trackinfo.type === undefined ? exports.SplineType.POLY : trackinfo.type;
                    var clamp = trackinfo.clamp === undefined ? true : trackinfo.clamp;
                    _this.setTrack(trackName, type, clamp, trackinfo.cp);
                }
            }
        }
        _this.on(EvtComponentBeforeAttach.type, function (ev) {
            if (_this._exclusive) {
                ev.object.removeComponentsByType(_this.type);
            }
        });
        _this.on(EvtUpdate.type, function (e) {
            var timeNow = e.elapsedTime;
            if (_this._startTime === 0) {
                _this._startTime = timeNow;
            }
            if (_this._startTime + _this._delay > timeNow) {
                return;
            }
            var t = timeNow - _this._startTime - _this._delay;
            for (var track in _this._tracks) {
                if (_this._tracks.hasOwnProperty(track)) {
                    _this._tracks[track].value = _this._tracks[track].evalutor.eval(t);
                }
            }
            if (_this.object) {
                for (var prop in _this._tracks) {
                    if (_this._tracks.hasOwnProperty(prop)) {
                        _this.object.triggerEx(new EvtSetProp(prop, _this._tracks[prop].value));
                    }
                }
            }
            if (t >= _this._duration) {
                _this._round++;
                if (_this._repeat === 0 || _this._round < _this._repeat) {
                    _this._startTime = timeNow + t - _this._duration;
                }
                else if (_this._autoRemove) {
                    _this.object.removeComponent(_this);
                }
            }
        });
        return _this;
    }
    Object.defineProperty(CoKeyframeAnimation.prototype, "repeat", {
        get: function () {
            return this._repeat;
        },
        set: function (val) {
            this._repeat = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoKeyframeAnimation.prototype, "autoRemove", {
        get: function () {
            return this._autoRemove;
        },
        set: function (val) {
            this._autoRemove = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoKeyframeAnimation.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (delay) {
            this._delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    CoKeyframeAnimation.prototype.setTrack = function (name, type, clamp, keyFrames) {
        if (keyFrames.length > 0) {
            if (keyFrames[keyFrames.length - 1].x > this._duration) {
                this._duration = keyFrames[keyFrames.length - 1].x;
            }
            this._tracks[name] = { evalutor: new Spline(type, keyFrames, clamp), value: null };
        }
    };
    CoKeyframeAnimation.prototype.finish = function () {
        for (var track in this._tracks) {
            this._tracks[track].value = this._tracks[track].evalutor.evalLast();
        }
        if (this.object) {
            for (var prop in this._tracks) {
                this.object.triggerEx(new EvtSetProp(prop, this._tracks[prop].value));
            }
        }
        this._round++;
        if (this._repeat === 0 || this._round < this._repeat) {
            this._startTime = App.elapsedTime;
        }
        else if (this._autoRemove) {
            this.object.removeComponent(this);
        }
    };
    CoKeyframeAnimation.type = 'KeyframeAnimation';
    return CoKeyframeAnimation;
}(Component));
var CoDraggable = /** @class */ (function (_super) {
    __extends$6(CoDraggable, _super);
    function CoDraggable() {
        var _this = _super.call(this, CoDraggable.type) || this;
        _this._dragging = false;
        _this._draggingData = null;
        _this.on(EvtMouseDown.type, function (e) {
            var obj = _this.object;
            obj.setCapture();
            _this._dragging = true;
            var dragBeginEvent = new EvtDragBegin(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown);
            obj.triggerEx(dragBeginEvent);
            _this._draggingData = dragBeginEvent.data;
            e.cancelBubble();
        });
        _this.on(EvtMouseUp.type, function (e) {
            var obj = _this.object;
            obj.releaseCapture();
            if (_this._dragging) {
                var dragendEvent = new EvtDragEnd(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
                obj.triggerEx(dragendEvent);
                _this._dragging = false;
                obj.view.updateHitObjects(e.x, e.y);
                var dragDropEvent = new EvtDragDrop(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
                for (var i = 0; i < obj.view.hitObjects.length; i++) {
                    var hitObj = obj.view.hitObjects[i];
                    if (hitObj !== obj && hitObj.z <= obj.z) {
                        hitObj.triggerEx(dragDropEvent);
                        if (!dragDropEvent.bubble) {
                            break;
                        }
                    }
                }
                if (dragDropEvent.bubble) {
                    obj.view.triggerEx(dragDropEvent);
                }
                _this._draggingData = null;
                e.cancelBubble();
            }
        });
        _this.on(EvtMouseMove.type, function (e) {
            if (_this._dragging) {
                var draggingEvent = new EvtDragging(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
                _this.object.triggerEx(draggingEvent);
                var obj = _this.object;
                obj.view.updateHitObjects(e.x, e.y);
                var dragOverEvent = new EvtDragOver(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
                for (var i = 0; i < obj.view.hitObjects.length; i++) {
                    var hitObj = obj.view.hitObjects[i];
                    if (hitObj !== obj && hitObj.z <= obj.z) {
                        hitObj.triggerEx(dragOverEvent);
                        if (!dragOverEvent.bubble) {
                            break;
                        }
                    }
                }
                if (dragOverEvent.bubble) {
                    obj.view.triggerEx(dragOverEvent);
                }
                e.cancelBubble();
            }
        });
        return _this;
    }
    CoDraggable.type = 'Draggable';
    return CoDraggable;
}(Component));
var CoDroppable = /** @class */ (function (_super) {
    __extends$6(CoDroppable, _super);
    function CoDroppable() {
        return _super.call(this, CoDroppable.type) || this;
    }
    CoDroppable.type = 'Droppable';
    return CoDroppable;
}(Component));
var CoImage = /** @class */ (function (_super) {
    __extends$6(CoImage, _super);
    function CoImage(filename, width, height) {
        if (filename === void 0) { filename = null; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this, CoImage.type) || this;
        _this._image = new Image();
        if (filename) {
            _this._image.src = filename;
        }
        if (width) {
            _this._image.width = width;
            _this._width = width;
        }
        else {
            _this._width = _this._image.complete ? _this._image.width : 0;
        }
        if (height) {
            _this._image.height = height;
            _this._height = height;
        }
        else {
            _this._height = _this._image.complete ? _this._image.height : 0;
        }
        if (!_this._image.complete) {
            _this._loaded = false;
            _this._image.onload = function () {
                if (_this._width === 0) {
                    _this._width = _this._image.width;
                }
                if (_this._height === 0) {
                    _this._height = _this._image.height;
                }
                _this._loaded = true;
            };
        }
        else {
            _this._loaded = true;
        }
        _this.on(EvtCull.type, function (evt) {
            if (_this._loaded) {
                var node = _this.object;
                evt.addObject(_this, node.z, node.worldTransform);
            }
        });
        _this.on(EvtGetBoundingShape.type, function (evt) {
            if (_this._loaded) {
                evt.shape = new BoundingBox({ x: -_this._width * _this.object.anchorPoint.x, y: -_this._height * _this.object.anchorPoint.y, w: _this._width, h: _this._height });
            }
        });
        _this.on(EvtDraw.type, function (evt) {
            if (_this._loaded) {
                evt.canvas.context.drawImage(_this._image, -Math.round(_this._width * _this.object.anchorPoint.x) - 0.5, -Math.round(_this._height * _this.object.anchorPoint.y) - 0.5, _this._width, _this._height);
            }
        });
        _this.on(EvtGetProp.type, function (ev) {
            switch (ev.propName) {
                case 'width':
                    ev.propValue = _this._width;
                    ev.eat();
                    break;
                case 'height':
                    ev.propValue = _this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        _this.on(EvtSetProp.type, function (ev) {
            switch (ev.propName) {
                case 'width':
                    _this._width = ev.propValue;
                    _this._image.width = _this._width;
                    ev.eat();
                    break;
                case 'height':
                    _this._height = ev.propValue;
                    _this._image.height = _this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        return _this;
    }
    CoImage.type = 'Image';
    return CoImage;
}(Component));

function setPixel(imageData, w, h, x, y, r, g, b) {
    var i = (y * w + x) * 4;
    imageData[i] = r;
    imageData[i + 1] = g;
    imageData[i + 2] = b;
    imageData[i + 3] = 255;
}
function blendImageData(imageData, buffer) {
    for (var i = 0; i < imageData.length / 4; i++) {
        var alpha = buffer[i * 4 + 3] / 255;
        var invalpha = 1 - alpha;
        imageData[i * 4] = imageData[i * 4] * invalpha + buffer[i * 4];
        imageData[i * 4 + 1] = imageData[i * 4 + 1] * invalpha + buffer[i * 4 + 1];
        imageData[i * 4 + 2] = imageData[i * 4 + 2] * invalpha + buffer[i * 4 + 2];
        if (imageData[i * 4 + 3] < buffer[i * 4 + 3]) {
            imageData[i * 4 + 3] = buffer[i * 4 + 3];
        }
    }
}
var buffer = null;
function fillCircle(imageData, w, h, x0, y0, radius, r, g, b) {
    if (buffer === null || buffer.length < imageData.length) {
        buffer = new Uint8ClampedArray(imageData.length);
    }
    function plot(x, y) {
        // setPixel (imageData, w, h, x, y, r, g, b);
        var dx = x - x0;
        var dy = y - y0;
        var f = 1 - Math.sqrt((dx * dx + dy * dy) / (radius * radius));
        var i = (y * w + x) * 4;
        buffer[i] = r * f;
        buffer[i + 1] = g * f;
        buffer[i + 2] = b * f;
        buffer[i + 3] = f * 255;
        // const f = 1.0 - Math.max(Math.min(1.0, (dx * dx + dy * dy) / (radius * radius)), 0.0);
        // blendPixel (imageData, w, h, x, y, r, g, b, f/255)
        // setPixel (imageData, w, h, x, y, f * 255, f * 255, f * 255);
        // const r1 = Math.floor(255 * f);
        // const g1 = Math.floor(255 * f);
        // const b1 = Math.floor(255 * f);
        // setPixel (imageData, w, h, x, y, r1, g1, b1);
    }
    var x = 0;
    var y = radius;
    var dx = 3;
    var dy = 2 - radius - radius;
    var d = 1 - radius;
    var xi;
    plot(x + x0, y + y0);
    plot(x + x0, -y + y0);
    for (xi = -radius + x0; xi <= radius + x0; xi++) {
        plot(xi, y0);
    }
    while (x < y) {
        if (d < 0) {
            d += dx;
            dx += 2;
            x++;
        }
        else {
            d += dx + dy;
            dx += 2;
            dy += 2;
            x++;
            y--;
        }
        for (xi = -x + x0; xi <= x + x0; xi++) {
            plot(xi, -y + y0);
            plot(xi, y + y0);
        }
        for (xi = -y + x0; xi <= y + x0; xi++) {
            plot(xi, -x + y0);
            plot(xi, x + y0);
        }
    }
    blendImageData(imageData, buffer);
}
function bresenhamDrawLine(imageData, w, h, x1, y1, x2, y2, r, g, b) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var yy = 0;
    var t;
    if (dx < dy) {
        yy = 1;
        t = x1;
        x1 = y1;
        y1 = t;
        t = x2;
        x2 = y2;
        y2 = t;
        t = dx;
        dx = dy;
        dy = t;
    }
    var ix = x2 > x1 ? 1 : -1;
    var iy = y2 > y1 ? 1 : -1;
    var cx = x1;
    var cy = y1;
    var n2dy = dy * 2;
    var n2dydx = (dy - dx) * 2;
    var d = dy * 2 - dx;
    if (yy === 1) {
        while (cx !== x2) {
            if (d < 0) {
                d += n2dy;
            }
            else {
                cy += iy;
                d += n2dydx;
            }
            setPixel(imageData, w, h, cy, cx, r, g, b);
            cx += ix;
        }
    }
    else {
        while (cx !== x2) {
            if (d < 0) {
                d += n2dy;
            }
            else {
                cy += iy;
                d += n2dydx;
            }
            setPixel(imageData, w, h, cx, cy, r, g, b);
            cx += ix;
        }
    }
}
function parseColorRGBA(rgba) {
    var result = {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };
    var c = [];
    var t = 0;
    var s = rgba.toLowerCase();
    var d1 = '0'.charCodeAt(0);
    var d2 = '9'.charCodeAt(0);
    var h1 = 'a'.charCodeAt(0);
    var h2 = 'f'.charCodeAt(0);
    for (var i = 1; i < rgba.length; i++) {
        var ch = rgba.charCodeAt(i);
        var val = 0;
        if (ch >= d1 && ch <= d2) {
            val = ch - d1;
        }
        else if (ch >= h1 && ch <= h2) {
            val = 10 + ch - h1;
        }
        if (i % 2 === 1) {
            t = val;
        }
        else {
            c.push(t * 16 + val);
        }
    }
    if (c.length > 0) {
        result.r = c[0];
    }
    if (c.length > 1) {
        result.g = c[1];
    }
    if (c.length > 2) {
        result.b = c[2];
    }
    if (c.length > 3) {
        result.a = c[3];
    }
    return result;
}
function DrawLine(context, x1, y1, x2, y2, color) {
    var rgba = parseColorRGBA(color);
    var xmin = x1 > x2 ? x2 : x1;
    var ymin = y1 > y2 ? y2 : y1;
    var xmax = x1 > x2 ? x1 : x2;
    var ymax = y1 > y2 ? y1 : y2;
    var imageData = context.getImageData(xmin, ymin, xmax - xmin + 1, ymax - ymin + 1);
    bresenhamDrawLine(imageData.data, imageData.width, imageData.height, x1 - xmin, y1 - ymin, x2 - xmin, y2 - ymin, rgba.r, rgba.g, rgba.b);
    context.putImageData(imageData, xmin, ymin);
}
function FillCircle(context, x0, y0, radius, color) {
    var rgba = parseColorRGBA(color);
    var imageData = context.getImageData(x0 - radius, y0 - radius, 2 * radius + 1, 2 * radius + 1);
    fillCircle(imageData.data, imageData.width, imageData.height, radius, radius, radius, rgba.r, rgba.g, rgba.b);
    context.putImageData(imageData, x0 - radius, y0 - radius);
}

var readyFuncList = [];
var isReady = false;
function ready(fn) {
    if (fn) {
        if (isReady) {
            window.setTimeout(fn);
        }
        else {
            readyFuncList.push(fn);
        }
    }
}
function documentCompleted() {
    return document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll);
}
function bootstrap() {
    isReady = true;
    document.removeEventListener('DOMContentLoaded', bootstrap);
    window.removeEventListener('load', bootstrap);
    App.run();
    readyFuncList.forEach(function (fn) {
        fn();
    });
    readyFuncList.length = 0;
}
(function () {
    if (documentCompleted()) {
        window.setTimeout(bootstrap);
    }
    else {
        document.addEventListener('DOMContentLoaded', bootstrap);
        window.addEventListener('load', bootstrap);
    }
})();

exports.ready = ready;
exports.GetTopLeft = GetTopLeft;
exports.GetTopRight = GetTopRight;
exports.GetBottomLeft = GetBottomLeft;
exports.GetBottomRight = GetBottomRight;
exports.Normalize = Normalize;
exports.VectorLengthSq = VectorLengthSq;
exports.VectorLength = VectorLength;
exports.DistanceSq = DistanceSq;
exports.Distance = Distance;
exports.DotProduct = DotProduct;
exports.CrossProduct = CrossProduct;
exports.GetVector = GetVector;
exports.ClampPoint = ClampPoint;
exports.BoundingShape = BoundingShape;
exports.BoundingBox = BoundingBox;
exports.BoundingHull = BoundingHull;
exports.BoundingSegment = BoundingSegment;
exports.BoundingSphere = BoundingSphere;
exports.IntersectionTestShapeSegment = IntersectionTestShapeSegment;
exports.IntersectionTestShapeBox = IntersectionTestShapeBox;
exports.IntersectionTestShapeHull = IntersectionTestShapeHull;
exports.IntersectionTestShapePoint = IntersectionTestShapePoint;
exports.IntersectionTestShapeShape = IntersectionTestShapeShape;
exports.IntersectionTestBoxBox = IntersectionTestBoxBox;
exports.IntersectionTestBoxPoint = IntersectionTestBoxPoint;
exports.IntersectionTestBoxHull = IntersectionTestBoxHull;
exports.IntersectionTestBoxSegment = IntersectionTestBoxSegment;
exports.IntersectionTestBoxSphere = IntersectionTestBoxSphere;
exports.IntersectionTestSphereHull = IntersectionTestSphereHull;
exports.IntersectionTestHullPoint = IntersectionTestHullPoint;
exports.IntersectionTestSphereSphere = IntersectionTestSphereSphere;
exports.IntersectionTestSphereSegment = IntersectionTestSphereSegment;
exports.IntersectionTestHullSegment = IntersectionTestHullSegment;
exports.IntersectionTestHullHull = IntersectionTestHullHull;
exports.IntersectionTestSpherePoint = IntersectionTestSpherePoint;
exports.IntersectionTestSegmentPoint = IntersectionTestSegmentPoint;
exports.IntersectionTestSegmentSegment = IntersectionTestSegmentSegment;
exports.CurveEvaluter = CurveEvaluter;
exports.StepEvaluter = StepEvaluter;
exports.CoLinearEvaluter = CoLinearEvaluter;
exports.PolynomialsEvaluter = PolynomialsEvaluter;
exports.Spline = Spline;
exports.Matrix2d = Matrix2d;
exports.BaseEvent = BaseEvent;
exports.EvtComponentBeforeAttach = EvtComponentBeforeAttach;
exports.EvtComponentAttached = EvtComponentAttached;
exports.EvtComponentBeforeDetach = EvtComponentBeforeDetach;
exports.EvtComponentDetached = EvtComponentDetached;
exports.EvtUpdate = EvtUpdate;
exports.EvtCull = EvtCull;
exports.EvtDraw = EvtDraw;
exports.EvtHitTest = EvtHitTest;
exports.EvtGetBoundingShape = EvtGetBoundingShape;
exports.EvtFrame = EvtFrame;
exports.EvtFocus = EvtFocus;
exports.EvtKeyboard = EvtKeyboard;
exports.EvtKeyDown = EvtKeyDown;
exports.EvtKeyUp = EvtKeyUp;
exports.EvtKeyPress = EvtKeyPress;
exports.EvtMouse = EvtMouse;
exports.EvtMouseDown = EvtMouseDown;
exports.EvtMouseUp = EvtMouseUp;
exports.EvtMouseMove = EvtMouseMove;
exports.EvtMouseEnter = EvtMouseEnter;
exports.EvtMouseLeave = EvtMouseLeave;
exports.EvtClick = EvtClick;
exports.EvtDblClick = EvtDblClick;
exports.EvtDragBegin = EvtDragBegin;
exports.EvtDragEnd = EvtDragEnd;
exports.EvtDragging = EvtDragging;
exports.EvtDragOver = EvtDragOver;
exports.EvtDragDrop = EvtDragDrop;
exports.EvtResize = EvtResize;
exports.EvtCanvasResize = EvtCanvasResize;
exports.EvtGetProp = EvtGetProp;
exports.EvtSetProp = EvtSetProp;
exports.EvtSceneViewPageWillChange = EvtSceneViewPageWillChange;
exports.EvtSceneViewPageChanged = EvtSceneViewPageChanged;
exports.EvtSysInfo = EvtSysInfo;
exports.EventObserver = EventObserver;
exports.App = App;
exports.Component = Component;
exports.BaseObject = BaseObject;
exports.SceneObject = SceneObject;
exports.SceneView = SceneView;
exports.ResizeSensor = ResizeSensor;
exports.Canvas = Canvas;
exports.CoKeyframeAnimation = CoKeyframeAnimation;
exports.CoDraggable = CoDraggable;
exports.CoDroppable = CoDroppable;
exports.CoImage = CoImage;
exports.DrawLine = DrawLine;
exports.FillCircle = FillCircle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=catk.js.map
