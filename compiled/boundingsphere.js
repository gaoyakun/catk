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
import * as boundinghull from './boundinghull';
var BoundingSphere = /** @class */ (function (_super) {
    __extends(BoundingSphere, _super);
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
            var transformedPoints = [];
            var A = Math.PI * 0.125;
            var D = A * 2;
            var R = this._sphere.radius / Math.cos(A);
            var shape_1 = new boundinghull.BoundingHull();
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
}(shape.BoundingShape));
export { BoundingSphere };
//# sourceMappingURL=boundingsphere.js.map