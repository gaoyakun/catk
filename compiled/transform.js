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
export { Matrix2d };
//# sourceMappingURL=transform.js.map