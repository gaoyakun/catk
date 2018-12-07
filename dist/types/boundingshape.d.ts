import * as point from './point';
import * as transform from './transform';
export declare abstract class BoundingShape {
    readonly type: string;
    constructor(type: string);
    abstract getBoundingbox(): point.IRect2d;
    abstract getTransformedShape(transform: transform.Matrix2d): BoundingShape;
}
