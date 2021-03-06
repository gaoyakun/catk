import * as point from './point';
import * as shape from './boundingshape';
import * as transform from './transform';

export class BoundingSegment extends shape.BoundingShape {
    public static readonly type: string = 'Segment';
    private _segment: point.ISegment2d;
    private _dirty: boolean;
    private _boundingbox: point.IRect2d;
    constructor(seg: point.ISegment2d = null) {
        super(BoundingSegment.type);
        this._segment = seg;
        this._dirty = !!seg;
        this._boundingbox = null;
    }
    get start() {
        return this._segment ? this._segment.start : null;
    }
    set start(pt: point.IPoint2d) {
        if (!this._segment) {
            this._segment = { start: pt, end: pt };
        } else {
            this._segment.start = pt;
        }
        this._dirty = true;
    }
    get end() {
        return this._segment ? this._segment.end : null;
    }
    set end(pt: point.IPoint2d) {
        if (!this._segment) {
            this._segment = { start: pt, end: pt };
        } else {
            this._segment.end = pt;
        }
        this._dirty = true;
    }
    get segment(): point.ISegment2d {
        return { start: this.start, end: this.end };
    }
    get boundingbox() {
        this._checkDirty();
        return this._boundingbox;
    }
    getBoundingbox(): point.IRect2d {
        return this.boundingbox;
    }
    getTransformedShape(transform: transform.Matrix2d): shape.BoundingShape {
        if (!transform || !this._segment) {
            return new BoundingSegment(this._segment);
        } else {
            return new BoundingSegment({
                start: transform.transformPoint(this._segment.start),
                end: transform.transformPoint(this._segment.end)
            });
        }
    }
    private _checkDirty() {
        if (this._dirty) {
            this._dirty = false;
            let minx = this._segment.start.x;
            let miny = this._segment.start.y;
            let maxx = this._segment.end.x;
            let maxy = this._segment.end.y;
            if (minx > maxx) {
                const tmp = minx;
                minx = maxx;
                maxx = tmp;
            }
            if (miny > maxy) {
                const tmp = miny;
                miny = maxy;
                maxy = tmp;
            }
            this._boundingbox = { x: minx, y: miny, w: maxx - minx + 1, h: maxy - miny + 1 };
        }
    }
}
