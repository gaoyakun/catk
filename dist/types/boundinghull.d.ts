import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';
export declare class BoundingHull extends shape.BoundingShape {
    static readonly type: string;
    private _points;
    private _boundingbox;
    private _dirtyFlag;
    constructor(points?: point.IPoint2d[]);
    addPoint(point: {
        x: number;
        y: number;
    }): void;
    readonly length: number;
    readonly boundingbox: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    readonly points: {
        x: number;
        y: number;
    }[];
    getPoint(index: number): {
        x: number;
        y: number;
    };
    removePoint(index: number): void;
    clear(): void;
    getBoundingbox(): point.IRect2d;
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape;
    private _checkDirty;
    private _adjustPoints;
    private _computeBoundingbox;
}
