export function GetTopLeft(rect) {
    return { x: rect.x, y: rect.y };
}
export function GetTopRight(rect) {
    return { x: rect.x + rect.w, y: rect.y };
}
export function GetBottomLeft(rect) {
    return { x: rect.x, y: rect.y + rect.h };
}
export function GetBottomRight(rect) {
    return { x: rect.x + rect.w, y: rect.y + rect.h };
}
export function Normalize(v) {
    var len = VectorLength(v);
    if (len > 0.0001) {
        v.x /= len;
        v.y /= len;
    }
}
export function VectorLengthSq(v) {
    return v.x * v.x + v.y * v.y;
}
export function VectorLength(v) {
    return Math.sqrt(VectorLengthSq(v));
}
export function DistanceSq(p1, p2) {
    return VectorLengthSq(GetVector(p1, p2));
}
export function Distance(p1, p2) {
    return VectorLength(GetVector(p1, p2));
}
export function DotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
export function CrossProduct(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}
export function GetVector(start, end) {
    return { x: end.x - start.x, y: end.y - start.y };
}
export function ClampPoint(pt, ptMin, ptMax) {
    return { x: Math.max(ptMin.x, Math.min(ptMax.x, pt.x)), y: Math.max(ptMin.y, Math.min(ptMax.y, pt.y)) };
}
//# sourceMappingURL=point.js.map