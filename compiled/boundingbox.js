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
var BoundingBox = /** @class */ (function (_super) {
    __extends(BoundingBox, _super);
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
            return new boundinghull.BoundingHull([
                transform.transformPoint(pointLeftTop),
                transform.transformPoint(pointLeftBottom),
                transform.transformPoint(pointRightBottom),
                transform.transformPoint(pointRightTop)
            ]);
        }
    };
    BoundingBox.type = 'Box';
    return BoundingBox;
}(shape.BoundingShape));
export { BoundingBox };
//# sourceMappingURL=boundingbox.js.map