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
export var SplineType;
(function (SplineType) {
    SplineType[SplineType["STEP"] = 1] = "STEP";
    SplineType[SplineType["LINEAR"] = 2] = "LINEAR";
    SplineType[SplineType["POLY"] = 3] = "POLY";
})(SplineType || (SplineType = {}));
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
export { CurveEvaluter };
var StepEvaluter = /** @class */ (function (_super) {
    __extends(StepEvaluter, _super);
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
export { StepEvaluter };
var CoLinearEvaluter = /** @class */ (function (_super) {
    __extends(CoLinearEvaluter, _super);
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
export { CoLinearEvaluter };
var PolynomialsEvaluter = /** @class */ (function (_super) {
    __extends(PolynomialsEvaluter, _super);
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
export { PolynomialsEvaluter };
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
                    case SplineType.STEP:
                        this._evalutors.push(new StepEvaluter(t, clamp));
                        break;
                    case SplineType.LINEAR:
                        this._evalutors.push(new CoLinearEvaluter(t, clamp));
                        break;
                    case SplineType.POLY:
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
            case SplineType.STEP:
                this._evalutors.push(new StepEvaluter(cp, clamp));
                break;
            case SplineType.LINEAR:
                this._evalutors.push(new CoLinearEvaluter(cp, clamp));
                break;
            case SplineType.POLY:
            default:
                this._evalutors.push(new PolynomialsEvaluter(cp, clamp));
                break;
        }
        this._array = false;
    };
    return Spline;
}());
export { Spline };
//# sourceMappingURL=curve.js.map