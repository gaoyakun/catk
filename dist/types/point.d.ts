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
export declare function GetTopLeft(rect: IRect2d): IPoint2d;
export declare function GetTopRight(rect: IRect2d): IPoint2d;
export declare function GetBottomLeft(rect: IRect2d): IPoint2d;
export declare function GetBottomRight(rect: IRect2d): IPoint2d;
export declare function Normalize(v: IVector2d): void;
export declare function VectorLengthSq(v: IVector2d): number;
export declare function VectorLength(v: IVector2d): number;
export declare function DistanceSq(p1: IPoint2d, p2: IPoint2d): number;
export declare function Distance(p1: IPoint2d, p2: IPoint2d): number;
export declare function DotProduct(v1: IVector2d, v2: IVector2d): number;
export declare function CrossProduct(v1: IVector2d, v2: IVector2d): number;
export declare function GetVector(start: IPoint2d, end: IPoint2d): {
    x: number;
    y: number;
};
export declare function ClampPoint(pt: IPoint2d, ptMin: IPoint2d, ptMax: IPoint2d): IPoint2d;
