import {
    Component,
    SceneObject,
    App,
    EvtCull,
    EvtDragging,
    EvtDragEnd,
    EvtDraw,
    EvtUpdate,
    EvtGetProp,
    EvtSetProp,
    EvtMouseMove,
    EvtMouseDown,
    EvtMouseUp,
    EvtDragBegin,
    EvtDragDrop,
    EvtDragOver,
    EvtComponentBeforeAttach,
    EvtGetBoundingShape
} from './core';
import { Spline, SplineType } from './curve';
import { BoundingBox } from './boundingbox';
import { IPoint2d } from './point';

export class CoKeyframeAnimation extends Component {
    static readonly type = 'KeyframeAnimation';
    private _tracks: { [name: string]: { evalutor: Spline; value: any } };
    private _exclusive: boolean;
    private _repeat: number;
    private _duration: number;
    private _startTime: number;
    private _delay: number;
    private _round: number;
    private _autoRemove: boolean;
    constructor(options?: {
        delay?: number;
        repeat?: number;
        exclusive?: boolean;
        autoRemove?: boolean;
        tracks?: {
            [name: string]: {
                cp: IPoint2d[] | { x: number; y: number[] }[];
                type?: SplineType;
                clamp?: boolean;
            };
        };
    }) {
        super(CoKeyframeAnimation.type);
        this._tracks = {};
        this._duration = 0;
        this._startTime = 0;
        this._round = 0;

        const opt = options || {};
        this._delay = opt.delay === undefined ? 0 : opt.delay;
        this._repeat = opt.repeat === undefined ? 0 : opt.repeat;
        this._autoRemove = opt.autoRemove === undefined ? true : opt.autoRemove;
        this._exclusive = !!opt.exclusive;
        if (opt.tracks) {
            for (const trackName in opt.tracks) {
                if (opt.tracks.hasOwnProperty(trackName)) {
                    const trackinfo = opt.tracks[trackName];
                    const type = trackinfo.type === undefined ? SplineType.POLY : trackinfo.type;
                    const clamp = trackinfo.clamp === undefined ? true : trackinfo.clamp;
                    this.setTrack(trackName, type, clamp, trackinfo.cp);
                }
            }
        }
        this.on(EvtComponentBeforeAttach.type, (ev: EvtComponentBeforeAttach) => {
            if (this._exclusive) {
                ev.object.removeComponentsByType(this.type);
            }
        });
        this.on(EvtUpdate.type, (e: EvtUpdate) => {
            const timeNow = e.elapsedTime;
            if (this._startTime === 0) {
                this._startTime = timeNow;
            }
            if (this._startTime + this._delay > timeNow) {
                return;
            }
            let t = timeNow - this._startTime - this._delay;
            for (const track in this._tracks) {
                if (this._tracks.hasOwnProperty(track)) {
                    this._tracks[track].value = this._tracks[track].evalutor.eval(t);
                }
            }
            if (this.object) {
                for (const prop in this._tracks) {
                    if (this._tracks.hasOwnProperty(prop)) {
                        this.object.triggerEx(new EvtSetProp(prop, this._tracks[prop].value));
                    }
                }
            }
            if (t >= this._duration) {
                this._round++;
                if (this._repeat === 0 || this._round < this._repeat) {
                    this._startTime = timeNow + t - this._duration;
                } else if (this._autoRemove) {
                    this.object.removeComponent(this);
                }
            }
        });
    }
    get repeat(): number {
        return this._repeat;
    }
    set repeat(val: number) {
        this._repeat = val;
    }
    get autoRemove(): boolean {
        return this._autoRemove;
    }
    set autoRemove(val: boolean) {
        this._autoRemove = val;
    }
    get delay(): number {
        return this._delay;
    }
    set delay(delay: number) {
        this._delay = delay;
    }
    setTrack(name: string, type: SplineType, clamp: boolean, keyFrames: IPoint2d[] | { x: number; y: number[] }[]) {
        if (keyFrames.length > 0) {
            if (keyFrames[keyFrames.length - 1].x > this._duration) {
                this._duration = keyFrames[keyFrames.length - 1].x;
            }
            this._tracks[name] = { evalutor: new Spline(type, keyFrames, clamp), value: null };
        }
    }
    finish(): void {
        for (let track in this._tracks) {
            this._tracks[track].value = this._tracks[track].evalutor.evalLast();
        }
        if (this.object) {
            for (let prop in this._tracks) {
                this.object.triggerEx(new EvtSetProp(prop, this._tracks[prop].value));
            }
        }
        this._round++;
        if (this._repeat === 0 || this._round < this._repeat) {
            this._startTime = App.elapsedTime;
        } else if (this._autoRemove) {
            this.object.removeComponent(this);
        }
    }
}

export class CoDraggable extends Component {
    static readonly type = 'Draggable';
    private _dragging: boolean;
    private _draggingData: any;
    constructor() {
        super(CoDraggable.type);
        this._dragging = false;
        this._draggingData = null;
        this.on(EvtMouseDown.type, (e: EvtMouseDown) => {
            const obj = this.object as SceneObject;
            obj.setCapture();
            this._dragging = true;
            const dragBeginEvent = new EvtDragBegin(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown);
            obj.triggerEx(dragBeginEvent);
            this._draggingData = dragBeginEvent.data;
            e.cancelBubble();
        });
        this.on(EvtMouseUp.type, (e: EvtMouseUp) => {
            const obj = this.object as SceneObject;
            obj.releaseCapture();

            if (this._dragging) {
                const dragendEvent = new EvtDragEnd(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, this._draggingData);
                obj.triggerEx(dragendEvent);

                this._dragging = false;
                obj.view.updateHitObjects(e.x, e.y);
                let dragDropEvent = new EvtDragDrop(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, this._draggingData);
                for (let i = 0; i < obj.view.hitObjects.length; i++) {
                    const hitObj = obj.view.hitObjects[i];
                    if (hitObj !== obj && hitObj.z <= obj.z) {
                        hitObj.triggerEx(dragDropEvent);
                        if (!dragDropEvent.bubble) {
                            break;
                        }
                    }
                }
                if (dragDropEvent.bubble) {
                    obj.view.triggerEx(dragDropEvent);
                }
                this._draggingData = null;
                e.cancelBubble();
            }
        });
        this.on(EvtMouseMove.type, (e: EvtMouseMove) => {
            if (this._dragging) {
                const draggingEvent = new EvtDragging(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, this._draggingData);
                this.object.triggerEx(draggingEvent);

                const obj = this.object as SceneObject;
                obj.view.updateHitObjects(e.x, e.y);
                const dragOverEvent = new EvtDragOver(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, this._draggingData);
                for (let i = 0; i < obj.view.hitObjects.length; i++) {
                    const hitObj = obj.view.hitObjects[i];
                    if (hitObj !== obj && hitObj.z <= obj.z) {
                        hitObj.triggerEx(dragOverEvent);
                        if (!dragOverEvent.bubble) {
                            break;
                        }
                    }
                }
                if (dragOverEvent.bubble) {
                    obj.view.triggerEx(dragOverEvent);
                }
                e.cancelBubble();
            }
        });
    }
}

export class CoDroppable extends Component {
    static readonly type = 'Droppable';
    constructor() {
        super(CoDroppable.type);
    }
}

export class CoImage extends Component {
    static readonly type = 'Image';
    private _image: HTMLImageElement;
    private _width: number;
    private _height: number;
    private _loaded: boolean;
    constructor(filename: string = null, width: number = 0, height: number = 0) {
        super(CoImage.type);
        this._image = new Image();
        if (filename) {
            this._image.src = filename;
        }
        if (width) {
            this._image.width = width;
            this._width = width;
        } else {
            this._width = this._image.complete ? this._image.width : 0;
        }
        if (height) {
            this._image.height = height;
            this._height = height;
        } else {
            this._height = this._image.complete ? this._image.height : 0;
        }
        if (!this._image.complete) {
            this._loaded = false;
            this._image.onload = () => {
                if (this._width === 0) {
                    this._width = this._image.width;
                }
                if (this._height === 0) {
                    this._height = this._image.height;
                }
                this._loaded = true;
            };
        } else {
            this._loaded = true;
        }
        this.on(EvtCull.type, (evt: EvtCull) => {
            if (this._loaded) {
                const node = this.object as SceneObject;
                evt.addObject(this, node.z, node.worldTransform);
            }
        });
        this.on(EvtGetBoundingShape.type, (evt: EvtGetBoundingShape) => {
            if (this._loaded) {
                evt.shape = new BoundingBox({ x: -this._width * this.object.anchorPoint.x, y: -this._height * this.object.anchorPoint.y, w: this._width, h: this._height });
            }
        });
        this.on(EvtDraw.type, (evt: EvtDraw) => {
            if (this._loaded) {
                evt.canvas.context.drawImage(
                    this._image,
                    -Math.round(this._width * this.object.anchorPoint.x) - 0.5,
                    -Math.round(this._height * this.object.anchorPoint.y) - 0.5,
                    this._width,
                    this._height
                );
            }
        });
        this.on(EvtGetProp.type, (ev: EvtGetProp) => {
            switch (ev.propName) {
                case 'width':
                    ev.propValue = this._width;
                    ev.eat();
                    break;
                case 'height':
                    ev.propValue = this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        this.on(EvtSetProp.type, (ev: EvtSetProp) => {
            switch (ev.propName) {
                case 'width':
                    this._width = ev.propValue as number;
                    this._image.width = this._width;
                    ev.eat();
                    break;
                case 'height':
                    this._height = ev.propValue as number;
                    this._image.height = this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
    }
}
