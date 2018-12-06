import * as point from './point';
import * as transform from './transform';

export abstract class BoundingShape {
    readonly type: string;
    constructor(type: string) {
        this.type = type;
    }
    abstract getBoundingbox(): point.IRect2d;
    abstract getTransformedShape(transform: transform.Matrix2d): BoundingShape;
}
