export declare class Matrix2d {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    constructor();
    static getIdentity(): Matrix2d;
    static getTranslate(x: number, y: number): Matrix2d;
    static getScale(x: number, y: number): Matrix2d;
    static getRotate(theta: number): Matrix2d;
    static transform(t1: Matrix2d, t2: Matrix2d): Matrix2d;
    static translate(t: Matrix2d, x: number, y: number): Matrix2d;
    static scale(t: Matrix2d, x: number, y: number): Matrix2d;
    static rotate(t: Matrix2d, theta: number): Matrix2d;
    static invert(t: Matrix2d): Matrix2d;
    set(a: number, b: number, c: number, d: number, e: number, f: number): this;
    makeIdentity(): this;
    makeTranslate(x: number, y: number): this;
    makeScale(x: number, y: number): this;
    makeRotate(theta: number): this;
    copyFrom(otherTransform: Matrix2d): this;
    transform(right: Matrix2d): this;
    transformPoint(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    translate(x: number, y: number): this;
    scale(x: number, y: number): this;
    rotate(theta: number): this;
    invert(): this;
    getTranslationPart(): {
        x: number;
        y: number;
    };
    setTranslationPart(t: {
        x: number;
        y: number;
    }): void;
    getScalePart(): {
        x: number;
        y: number;
    };
    setScalePart(s: {
        x: number;
        y: number;
    }): void;
    getRotationPart(): number;
    setRotationPart(r: number): void;
}
