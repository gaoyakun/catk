import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';
export declare class BoundingSphere extends shape.BoundingShape {
    static readonly type: string;
    private _sphere;
    private _dirty;
    private _boundingbox;
    constructor(sphere?: point.ISphere2d);
    center: point.IPoint2d;
    radius: number;
    sphere: point.ISphere2d;
    readonly boundingbox: point.IRect2d;
    getBoundingbox(): point.IRect2d;
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape;
    private _checkDirty;
}
