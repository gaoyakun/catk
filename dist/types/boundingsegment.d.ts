import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';
export declare class BoundingSegment extends shape.BoundingShape {
    static readonly type: string;
    private _segment;
    private _dirty;
    private _boundingbox;
    constructor(seg?: point.ISegment2d);
    start: point.IPoint2d;
    end: point.IPoint2d;
    readonly segment: point.ISegment2d;
    readonly boundingbox: point.IRect2d;
    getBoundingbox(): point.IRect2d;
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape;
    private _checkDirty;
}
