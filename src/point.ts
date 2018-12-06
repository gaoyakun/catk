export interface IPoint2d {
    x: number;
    y: number;
}

export interface IVector2d {
    x: number;
    y: number;
}

export interface IRect2d {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ISegment2d {
    start: IPoint2d;
    end: IPoint2d;
}

export interface ISphere2d {
    center: IPoint2d;
    radius: number;
}

export function GetTopLeft(rect: IRect2d): IPoint2d {
    return { x: rect.x, y: rect.y };
}

export function GetTopRight(rect: IRect2d): IPoint2d {
    return { x: rect.x + rect.w, y: rect.y };
}

export function GetBottomLeft(rect: IRect2d): IPoint2d {
    return { x: rect.x, y: rect.y + rect.h };
}

export function GetBottomRight(rect: IRect2d): IPoint2d {
    return { x: rect.x + rect.w, y: rect.y + rect.h };
}

export function Normalize(v: IVector2d) {
    const len = VectorLength(v);
    if (len > 0.0001) {
        v.x /= len;
        v.y /= len;
    }
}

export function VectorLengthSq(v: IVector2d) {
    return v.x * v.x + v.y * v.y;
}

export function VectorLength(v: IVector2d) {
    return Math.sqrt(VectorLengthSq(v));
}

export function DistanceSq(p1: IPoint2d, p2: IPoint2d) {
    return VectorLengthSq(GetVector(p1, p2));
}

export function Distance(p1: IPoint2d, p2: IPoint2d) {
    return VectorLength(GetVector(p1, p2));
}

export function DotProduct(v1: IVector2d, v2: IVector2d) {
    return v1.x * v2.x + v1.y * v2.y;
}

export function CrossProduct(v1: IVector2d, v2: IVector2d) {
    return v1.x * v2.y - v1.y * v2.x;
}

export function GetVector(start: IPoint2d, end: IPoint2d) {
    return { x: end.x - start.x, y: end.y - start.y };
}

export function ClampPoint(pt: IPoint2d, ptMin: IPoint2d, ptMax: IPoint2d): IPoint2d {
    return { x: Math.max(ptMin.x, Math.min(ptMax.x, pt.x)), y: Math.max(ptMin.y, Math.min(ptMax.y, pt.y)) };
}
