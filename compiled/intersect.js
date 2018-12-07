import * as point from './point';
import * as boundinghull from './boundinghull';
import * as boundingbox from './boundingbox';
import * as boundingsegment from './boundingsegment';
import * as boundingsphere from './boundingsphere';
export function IntersectionTestShapeSegment(a, b) {
    var box = a.getBoundingbox();
    if (box) {
        switch (a.type) {
            case boundingbox.BoundingBox.type: {
                return IntersectionTestBoxSegment(a.rect, b);
            }
            case boundinghull.BoundingHull.type: {
                return IntersectionTestHullSegment(a.points, b);
            }
            case boundingsegment.BoundingSegment.type: {
                var pt = IntersectionTestSegmentSegment(a.segment, b);
                return pt ? [pt] : [];
            }
            case boundingsphere.BoundingSphere.type: {
                return IntersectionTestSphereSegment(a.sphere, b);
            }
        }
    }
    return null;
}
export function IntersectionTestShapeBox(a, b) {
    var box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return IntersectionTestBoxBox(a.rect, b);
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestBoxHull(b, a.points);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestBoxSegment(b, a.segment) != null;
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestBoxSphere(b, a.sphere);
        }
        default: {
            return false;
        }
    }
}
export function IntersectionTestShapeHull(a, b) {
    var box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return IntersectionTestBoxHull(a.rect, b);
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestHullHull(a.points, b);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestHullSegment(b, a.segment) != null;
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestSphereHull(a.sphere, b);
        }
        default: {
            return false;
        }
    }
}
export function IntersectionTestShapePoint(a, b) {
    var box = a.getBoundingbox();
    if (!IntersectionTestBoxPoint(box, b)) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return true;
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestHullPoint(a.points, b);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestSegmentPoint(a.segment, b);
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestSpherePoint(a.sphere, b);
        }
        default: {
            return false;
        }
    }
}
export function IntersectionTestShapeShape(a, b) {
    var boxA = a.getBoundingbox();
    var boxB = b.getBoundingbox();
    if (!IntersectionTestBoxBox(boxA, boxB)) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return true;
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestBoxHull(a.rect, b.points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestBoxSegment(a.rect, b.segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestBoxSphere(a.rect, b.sphere);
                }
                default: {
                    return false;
                }
            }
        }
        case boundinghull.BoundingHull.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxHull(b.rect, a.points);
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestHullHull(a.points, b.points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestHullSegment(a.points, b.segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereHull(b.sphere, a.points);
                }
                default: {
                    return false;
                }
            }
        }
        case boundingsegment.BoundingSegment.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxSegment(b.rect, a.segment) != null;
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestHullSegment(b.points, a.segment) != null;
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestSegmentSegment(b.segment, a.segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereSegment(b.sphere, a.segment) != null;
                }
                default: {
                    return false;
                }
            }
        }
        case boundingsphere.BoundingSphere.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxSphere(b.rect, a.sphere);
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestSphereHull(a.sphere, b.points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestSphereSegment(a.sphere, b.segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereSphere(a.sphere, b.sphere);
                }
                default: {
                    return false;
                }
            }
        }
    }
}
export function IntersectionTestBoxBox(a, b) {
    return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
}
export function IntersectionTestBoxPoint(a, b) {
    return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h;
}
export function IntersectionTestBoxHull(a, b) {
    return IntersectionTestHullHull([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b);
}
export function IntersectionTestBoxSegment(a, b) {
    return IntersectionTestHullSegment([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b);
}
export function IntersectionTestBoxSphere(a, b) {
    var pt = point.ClampPoint(b.center, { x: a.x, y: a.y }, { x: a.x + a.w - 1, y: a.y + a.h - 1 });
    var v = point.GetVector(pt, b.center);
    return point.DotProduct(v, v) < b.radius * b.radius;
}
export function IntersectionTestSphereHull(a, b) {
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
export function IntersectionTestHullPoint(a, b) {
    for (var i = 0; i < a.length; i++) {
        var v1 = point.GetVector(b, a[i]);
        var v2 = point.GetVector(b, a[(i + 1) % a.length]);
        if (point.CrossProduct(v1, v2) > 0) {
            return false;
        }
    }
    return true;
}
export function IntersectionTestSphereSphere(a, b) {
    var dx = a.center.x - b.center.x;
    var dy = a.center.y - b.center.y;
    var r = a.radius + b.radius;
    return dx * dx + dy * dy < r * r;
}
export function IntersectionTestSphereSegment(a, b) {
    var d = point.GetVector(b.start, b.end);
    var f = point.GetVector(a.center, b.start);
    var A = point.DotProduct(d, d);
    var B = 2 * point.DotProduct(f, d);
    var C = point.DotProduct(f, f) - a.radius * a.radius;
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
export function IntersectionTestHullSegment(a, b) {
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
            return point.DistanceSq(p, b.start) - point.DistanceSq(q, b.start);
        });
    }
    return result.length > 0 ? result : null;
}
export function IntersectionTestHullHull(a, b) {
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
export function IntersectionTestSpherePoint(a, b) {
    var dx = a.center.x - b.x;
    var dy = a.center.y - b.y;
    return dx * dx + dy * dy < a.radius * a.radius;
}
export function IntersectionTestSegmentPoint(s, p) {
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
export function IntersectionTestSegmentSegment(s1, s2) {
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
//# sourceMappingURL=intersect.js.map