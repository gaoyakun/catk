import { IPoint2d } from './point';
export declare enum SplineType {
    STEP = 1,
    LINEAR = 2,
    POLY = 3
}
export declare class CurveEvaluter {
    cp: IPoint2d[];
    clamp: boolean;
    constructor(cp: IPoint2d[], clamp?: boolean);
    eval(x: number): number;
    evalFirst(): number;
    evalLast(): number;
}
export declare class StepEvaluter extends CurveEvaluter {
    h: number[];
    constructor(cp: IPoint2d[], clamp?: boolean);
    compute(): void;
    getSegment(x: number): number;
    eval(x: number): number;
}
export declare class CoLinearEvaluter extends CurveEvaluter {
    h: number[];
    constructor(cp: IPoint2d[], clamp?: boolean);
    compute(): void;
    getSegment(x: number): number;
    eval(x: number): number;
}
export declare class PolynomialsEvaluter extends CurveEvaluter {
    a: number[];
    h: number[];
    constructor(cp: IPoint2d[], clamp?: boolean);
    solveTridiag(sub: number[], diag: number[], sup: number[]): void;
    compute(): void;
    getSegment(x: number): number;
    eval(x: number): number;
}
export declare class Spline {
    private _evalutors;
    private _array;
    constructor(type: SplineType, cp: IPoint2d[] | {
        x: number;
        y: number[];
    }[], clamp?: boolean);
    eval(x: number): number | number[];
    evalFirst(): number | number[];
    evalLast(): number | number[];
    private initArray;
    private initNonArray;
}
