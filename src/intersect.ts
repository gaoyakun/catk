import * as point from './point';
import * as shape from './boundingshape';
import * as boundinghull from './boundinghull';
import * as boundingbox from './boundingbox';
import * as boundingsegment from './boundingsegment';
import * as boundingsphere from './boundingsphere';

export function IntersectionTestShapeSegment(a: shape.BoundingShape, b: point.ISegment2d): point.IPoint2d[] {
    const box = a.getBoundingbox();
    if (box) {
        switch (a.type) {
            case boundingbox.BoundingBox.type: {
                return IntersectionTestBoxSegment((a as boundingbox.BoundingBox).rect, b);
            }
            case boundinghull.BoundingHull.type: {
                return IntersectionTestHullSegment((a as boundinghull.BoundingHull).points, b);
            }
            case boundingsegment.BoundingSegment.type: {
                const pt = IntersectionTestSegmentSegment((a as boundingsegment.BoundingSegment).segment, b);
                return pt ? [pt] : [];
            }
            case boundingsphere.BoundingSphere.type: {
                return IntersectionTestSphereSegment((a as boundingsphere.BoundingSphere).sphere, b);
            }
        }
    }
    return null;
}

export function IntersectionTestShapeBox(a: shape.BoundingShape, b: point.IRect2d): boolean {
    const box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return IntersectionTestBoxBox((a as boundingbox.BoundingBox).rect, b);
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestBoxHull(b, (a as boundinghull.BoundingHull).points);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestBoxSegment(b, (a as boundingsegment.BoundingSegment).segment) != null;
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestBoxSphere(b, (a as boundingsphere.BoundingSphere).sphere);
        }
        default: {
            return false;
        }
    }
}

export function IntersectionTestShapeHull(a: shape.BoundingShape, b: point.IPoint2d[]): boolean {
    const box = a.getBoundingbox();
    if (!box) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return IntersectionTestBoxHull((a as boundingbox.BoundingBox).rect, b);
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestHullHull((a as boundinghull.BoundingHull).points, b);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestHullSegment(b, (a as boundingsegment.BoundingSegment).segment) != null;
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestSphereHull((a as boundingsphere.BoundingSphere).sphere, b);
        }
        default: {
            return false;
        }
    }
}

export function IntersectionTestShapePoint(a: shape.BoundingShape, b: point.IPoint2d): boolean {
    const box = a.getBoundingbox();
    if (!IntersectionTestBoxPoint(box, b)) {
        return false;
    }
    switch (a.type) {
        case boundingbox.BoundingBox.type: {
            return true;
        }
        case boundinghull.BoundingHull.type: {
            return IntersectionTestHullPoint((a as boundinghull.BoundingHull).points, b);
        }
        case boundingsegment.BoundingSegment.type: {
            return IntersectionTestSegmentPoint((a as boundingsegment.BoundingSegment).segment, b);
        }
        case boundingsphere.BoundingSphere.type: {
            return IntersectionTestSpherePoint((a as boundingsphere.BoundingSphere).sphere, b);
        }
        default: {
            return false;
        }
    }
}

export function IntersectionTestShapeShape(a: shape.BoundingShape, b: shape.BoundingShape): boolean {
    const boxA = a.getBoundingbox();
    const boxB = b.getBoundingbox();
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
                    return IntersectionTestBoxHull((a as boundingbox.BoundingBox).rect, (b as boundinghull.BoundingHull).points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestBoxSegment((a as boundingbox.BoundingBox).rect, (b as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestBoxSphere((a as boundingbox.BoundingBox).rect, (b as boundingsphere.BoundingSphere).sphere);
                }
                default: {
                    return false;
                }
            }
        }
        case boundinghull.BoundingHull.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxHull((b as boundingbox.BoundingBox).rect, (a as boundinghull.BoundingHull).points);
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestHullHull((a as boundinghull.BoundingHull).points, (b as boundinghull.BoundingHull).points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestHullSegment((a as boundinghull.BoundingHull).points, (b as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereHull((b as boundingsphere.BoundingSphere).sphere, (a as boundinghull.BoundingHull).points);
                }
                default: {
                    return false;
                }
            }
        }
        case boundingsegment.BoundingSegment.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxSegment((b as boundingbox.BoundingBox).rect, (a as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestHullSegment((b as boundinghull.BoundingHull).points, (a as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestSegmentSegment((b as boundingsegment.BoundingSegment).segment, (a as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereSegment((b as boundingsphere.BoundingSphere).sphere, (a as boundingsegment.BoundingSegment).segment) != null;
                }
                default: {
                    return false;
                }
            }
        }
        case boundingsphere.BoundingSphere.type: {
            switch (b.type) {
                case boundingbox.BoundingBox.type: {
                    return IntersectionTestBoxSphere((b as boundingbox.BoundingBox).rect, (a as boundingsphere.BoundingSphere).sphere);
                }
                case boundinghull.BoundingHull.type: {
                    return IntersectionTestSphereHull((a as boundingsphere.BoundingSphere).sphere, (b as boundinghull.BoundingHull).points);
                }
                case boundingsegment.BoundingSegment.type: {
                    return IntersectionTestSphereSegment((a as boundingsphere.BoundingSphere).sphere, (b as boundingsegment.BoundingSegment).segment) != null;
                }
                case boundingsphere.BoundingSphere.type: {
                    return IntersectionTestSphereSphere((a as boundingsphere.BoundingSphere).sphere, (b as boundingsphere.BoundingSphere).sphere);
                }
                default: {
                    return false;
                }
            }
        }
    }
}

export function IntersectionTestBoxBox(a: point.IRect2d, b: point.IRect2d): boolean {
    return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
}

export function IntersectionTestBoxPoint(a: point.IRect2d, b: point.IPoint2d): boolean {
    return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h;
}

export function IntersectionTestBoxHull(a: point.IRect2d, b: point.IPoint2d[]): boolean {
    return IntersectionTestHullHull([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b);
}

export function IntersectionTestBoxSegment(a: point.IRect2d, b: point.ISegment2d): point.IPoint2d[] {
    return IntersectionTestHullSegment([point.GetTopLeft(a), point.GetBottomLeft(a), point.GetBottomRight(a), point.GetTopRight(a)], b);
}

export function IntersectionTestBoxSphere(a: point.IRect2d, b: point.ISphere2d): boolean {
    const pt = point.ClampPoint(b.center, { x: a.x, y: a.y }, { x: a.x + a.w - 1, y: a.y + a.h - 1 });
    const v = point.GetVector(pt, b.center);
    return point.DotProduct(v, v) < b.radius * b.radius;
}

export function IntersectionTestSphereHull(a: point.ISphere2d, b: point.IPoint2d[]): boolean {
    const r2 = a.radius * a.radius;
    for (let i = 0; i < b.length; i++) {
        const dx = a.center.x - b[i].x;
        const dy = a.center.y - b[i].y;
        if (dx * dx + dy * dy < r2) {
            return true;
        }
    }
    for (let i = 0; i < b.length; i++) {
        const t = IntersectionTestSphereSegment(a, { start: b[i], end: b[(i + 1) % b.length] });
        if (t !== null && t.length > 0) {
            return true;
        }
    }
    return IntersectionTestHullPoint(b, a.center);
}

export function IntersectionTestHullPoint(a: point.IPoint2d[], b: point.IPoint2d): boolean {
    for (let i = 0; i < a.length; i++) {
        const v1 = point.GetVector(b, a[i]);
        const v2 = point.GetVector(b, a[(i + 1) % a.length]);
        if (point.CrossProduct(v1, v2) > 0) {
            return false;
        }
    }
    return true;
}

export function IntersectionTestSphereSphere(a: point.ISphere2d, b: point.ISphere2d): boolean {
    const dx = a.center.x - b.center.x;
    const dy = a.center.y - b.center.y;
    const r = a.radius + b.radius;
    return dx * dx + dy * dy < r * r;
}

export function IntersectionTestSphereSegment(a: point.ISphere2d, b: point.ISegment2d): point.IPoint2d[] {
    const d = point.GetVector(b.start, b.end);
    const f = point.GetVector(a.center, b.start);
    const A = point.DotProduct(d, d);
    const B = 2 * point.DotProduct(f, d);
    const C = point.DotProduct(f, f) - a.radius * a.radius;
    let discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
        return null;
    }
    discriminant = Math.sqrt(discriminant);
    let t1 = (-B - discriminant) / (2 * A);
    let t2 = (-B + discriminant) / (2 * A);
    if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
    }
    const intersectionPoints: point.IPoint2d[] = [];
    if (t1 >= 0 && t1 <= 1) {
        intersectionPoints.push({ x: b.start.x + t1 * d.x, y: b.start.y + t1 * d.y });
    }
    if (t2 >= 0 && t2 <= 1) {
        intersectionPoints.push({ x: b.start.x + t2 * d.x, y: b.start.y + t2 * d.y });
    }
    return intersectionPoints;
}

export function IntersectionTestHullSegment(a: point.IPoint2d[], b: point.ISegment2d): point.IPoint2d[] {
    if (IntersectionTestHullPoint(a, b.start) && IntersectionTestHullPoint(a, b.end)) {
        return [];
    }
    const result = [];
    for (let i = 0; i < a.length; i++) {
        const edge = {
            start: a[i],
            end: a[(i + 1) % a.length]
        };
        const intersectedPoint = IntersectionTestSegmentSegment(edge, b);
        if (intersectedPoint) {
            result.push(intersectedPoint);
        }
    }
    if (result.length > 1) {
        result.sort((p, q) => {
            return point.DistanceSq(p, b.start) - point.DistanceSq(q, b.start);
        });
    }
    return result.length > 0 ? result : null;
}

export function IntersectionTestHullHull(a: point.IPoint2d[], b: point.IPoint2d[]): boolean {
    const polygons = [a, b];
    for (let n = 0; n < 2; n++) {
        const polygon = polygons[n];
        for (let edge = 0; edge < polygon.length; edge++) {
            const edgeX = polygon[(edge + 1) % polygon.length].x - polygon[edge].x;
            const edgeY = polygon[(edge + 1) % polygon.length].y - polygon[edge].y;
            const mag = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
            if (mag < 1) {
                continue;
            }
            const nx = -edgeY / mag;
            const ny = edgeX / mag;
            const minmax = [{ min: 9999999, max: -9999999 }, { min: 9999999, max: -9999999 }];
            for (let i = 0; i < 2; i++) {
                polygons[i].forEach(point => {
                    const proj = point.x * nx + point.y * ny;
                    if (proj < minmax[i].min) {
                        minmax[i].min = proj;
                    }
                    if (proj > minmax[i].max) {
                        minmax[i].max = proj;
                    }
                });
            }
            if (minmax[0].min > minmax[1].max || minmax[0].max < minmax[1].min) {
                return false;
            }
        }
    }
    return true;
}

export function IntersectionTestSpherePoint(a: point.ISphere2d, b: point.IPoint2d): boolean {
    const dx = a.center.x - b.x;
    const dy = a.center.y - b.y;
    return dx * dx + dy * dy < a.radius * a.radius;
}

export function IntersectionTestSegmentPoint(s: point.ISegment2d, p: point.IPoint2d): boolean {
    let minx = s.start.x;
    let miny = s.start.y;
    let maxx = s.end.x;
    let maxy = s.end.y;
    if (minx > maxx) {
        const tmp = minx;
        minx = maxx;
        maxx = tmp;
    }
    if (miny > maxy) {
        const tmp = miny;
        miny = maxy;
        maxy = tmp;
    }
    if (p.x < minx || p.x > maxx || p.y < miny || p.y > maxy) {
        return false;
    }
    if (maxx !== minx) {
        const deltay = Math.round(miny + ((maxy - miny) * (p.x - minx)) / (maxx - minx)) - p.y;
        return deltay >= -1 && deltay <= 1;
    } else if (maxy !== miny) {
        const deltax = Math.round(minx + ((maxx - minx) * (p.y - miny)) / (maxy - miny)) - p.x;
        return deltax >= -1 && deltax <= 1;
    } else {
        return p.x === minx && p.y === miny;
    }
}

export function IntersectionTestSegmentSegment(s1: point.ISegment2d, s2: point.ISegment2d): point.IPoint2d {
    function isSameSign(a: number, b: number) {
        return (a >= 0 && b >= 0) || (a <= 0 && b <= 0);
    }
    const x1 = s1.start.x;
    const y1 = s1.start.y;
    const x2 = s1.end.x;
    const y2 = s1.end.y;
    const x3 = s2.start.x;
    const y3 = s2.start.y;
    const x4 = s2.end.x;
    const y4 = s2.end.y;
    const Ax = x2 - x1;
    const Bx = x3 - x4;
    let x1lo;
    let x1hi;
    let y1lo;
    let y1hi;
    let num;
    let offset;

    if (Ax < 0) {
        x1lo = x2;
        x1hi = x1;
    } else {
        x1hi = x2;
        x1lo = x1;
    }

    if (Bx > 0) {
        if (x1hi < x4 || x3 < x1lo) {
            return null;
        }
    } else {
        if (x1hi < x3 || x4 < x1lo) {
            return null;
        }
    }

    const Ay = y2 - y1;
    const By = y3 - y4;

    if (Ay < 0) {
        y1lo = y2;
        y1hi = y1;
    } else {
        y1hi = y2;
        y1lo = y1;
    }

    if (By > 0) {
        if (y1hi < y4 || y3 < y1lo) {
            return null;
        }
    } else {
        if (y1hi < y3 || y4 < y1lo) {
            return null;
        }
    }

    const Cx = x1 - x3;
    const Cy = y1 - y3;
    const f = Ay * Bx - Ax * By;
    if (f === 0) {
        return null;
    }

    const d = By * Cx - Bx * Cy;
    if (f > 0) {
        if (d < 0 || d > f) {
            return null;
        }
    } else {
        if (d > 0 || d < f) {
            return null;
        }
    }

    const e = Ax * Cy - Ay * Cx;
    if (f > 0) {
        if (e < 0 || e > f) {
            return null;
        }
    } else {
        if (e > 0 || e < f) {
            return null;
        }
    }

    num = d * Ax;
    offset = isSameSign(num, f) ? f / 2 : -f / 2;
    let x = x1 + (((num + offset) / f) >> 0);
    num = d * Ay;
    offset = isSameSign(num, f) ? f / 2 : -f / 2;
    let y = y1 + (((num + offset) / f) >> 0);

    return { x: x, y: y };
}
