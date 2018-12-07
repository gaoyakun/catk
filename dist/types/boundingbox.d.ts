import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';
export declare class BoundingBox extends shape.BoundingShape {
    static readonly type: string;
    rect: point.IRect2d;
    constructor(rect?: point.IRect2d);
    getBoundingbox(): point.IRect2d;
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape;
}
