import { Component } from './core';
import { SplineType } from './curve';
import { IPoint2d } from './point';
export declare class CoKeyframeAnimation extends Component {
    static readonly type: string;
    private _tracks;
    private _exclusive;
    private _repeat;
    private _duration;
    private _startTime;
    private _delay;
    private _round;
    private _autoRemove;
    constructor(options?: {
        delay?: number;
        repeat?: number;
        exclusive?: boolean;
        autoRemove?: boolean;
        tracks?: {
            [name: string]: {
                cp: IPoint2d[] | {
                    x: number;
                    y: number[];
                }[];
                type?: SplineType;
                clamp?: boolean;
            };
        };
    });
    repeat: number;
    autoRemove: boolean;
    delay: number;
    setTrack(name: string, type: SplineType, clamp: boolean, keyFrames: IPoint2d[] | {
        x: number;
        y: number[];
    }[]): void;
    finish(): void;
}
export declare class CoDraggable extends Component {
    static readonly type: string;
    private _dragging;
    private _draggingData;
    constructor();
}
export declare class CoDroppable extends Component {
    static readonly type: string;
    constructor();
}
export declare class CoImage extends Component {
    static readonly type: string;
    private _image;
    private _width;
    private _height;
    private _loaded;
    constructor(filename?: string, width?: number, height?: number);
}
