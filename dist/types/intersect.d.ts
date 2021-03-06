import * as point from './point';
import * as shape from './boundingshape';
export declare function IntersectionTestShapeSegment(a: shape.BoundingShape, b: point.ISegment2d): point.IPoint2d[];
export declare function IntersectionTestShapeBox(a: shape.BoundingShape, b: point.IRect2d): boolean;
export declare function IntersectionTestShapeHull(a: shape.BoundingShape, b: point.IPoint2d[]): boolean;
export declare function IntersectionTestShapePoint(a: shape.BoundingShape, b: point.IPoint2d): boolean;
export declare function IntersectionTestShapeShape(a: shape.BoundingShape, b: shape.BoundingShape): boolean;
export declare function IntersectionTestBoxBox(a: point.IRect2d, b: point.IRect2d): boolean;
export declare function IntersectionTestBoxPoint(a: point.IRect2d, b: point.IPoint2d): boolean;
export declare function IntersectionTestBoxHull(a: point.IRect2d, b: point.IPoint2d[]): boolean;
export declare function IntersectionTestBoxSegment(a: point.IRect2d, b: point.ISegment2d): point.IPoint2d[];
export declare function IntersectionTestBoxSphere(a: point.IRect2d, b: point.ISphere2d): boolean;
export declare function IntersectionTestSphereHull(a: point.ISphere2d, b: point.IPoint2d[]): boolean;
export declare function IntersectionTestHullPoint(a: point.IPoint2d[], b: point.IPoint2d): boolean;
export declare function IntersectionTestSphereSphere(a: point.ISphere2d, b: point.ISphere2d): boolean;
export declare function IntersectionTestSphereSegment(a: point.ISphere2d, b: point.ISegment2d): point.IPoint2d[];
export declare function IntersectionTestHullSegment(a: point.IPoint2d[], b: point.ISegment2d): point.IPoint2d[];
export declare function IntersectionTestHullHull(a: point.IPoint2d[], b: point.IPoint2d[]): boolean;
export declare function IntersectionTestSpherePoint(a: point.ISphere2d, b: point.IPoint2d): boolean;
export declare function IntersectionTestSegmentPoint(s: point.ISegment2d, p: point.IPoint2d): boolean;
export declare function IntersectionTestSegmentSegment(s1: point.ISegment2d, s2: point.ISegment2d): point.IPoint2d;
