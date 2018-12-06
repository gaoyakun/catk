import { Matrix2d } from './transform';
import { BoundingShape } from './boundingshape';
export declare type CullResult = {
    [z: number]: {
        object: EventObserver;
        z: number;
        transform: Matrix2d;
    }[];
};
export declare type EventHandler<T extends BaseEvent> = (evt: T) => void;
export declare enum EventListenerOrder {
    FIRST = 1,
    LAST = 2
}
export declare class BaseEvent {
    readonly type: string;
    eaten: boolean;
    constructor(type: string);
    eat(): void;
}
export declare class EvtComponentBeforeAttach extends BaseEvent {
    static readonly type: string;
    object: BaseObject;
    allow: boolean;
    constructor(object: BaseObject);
}
export declare class EvtComponentAttached extends BaseEvent {
    static readonly type: string;
    constructor();
}
export declare class EvtComponentBeforeDetach extends BaseEvent {
    static readonly type: string;
    allow: boolean;
    constructor();
}
export declare class EvtComponentDetached extends BaseEvent {
    static readonly type: string;
    constructor();
}
export declare class EvtUpdate extends BaseEvent {
    static readonly type: string;
    readonly deltaTime: number;
    readonly elapsedTime: number;
    readonly frameStamp: number;
    constructor(deltaTime: number, elapsedTime: number, frameStamp: number);
}
export declare class EvtCull extends BaseEvent {
    static readonly type: string;
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly result: CullResult;
    constructor(w: number, h: number);
    addObject(object: EventObserver, z: number, transform: Matrix2d): void;
}
export declare class EvtDraw extends BaseEvent {
    static readonly type: string;
    readonly canvas: Canvas;
    readonly z: number;
    readonly transform: Matrix2d;
    constructor(canvas: Canvas, z: number, transform: Matrix2d);
}
export declare class EvtHitTest extends BaseEvent {
    static readonly type: string;
    x: number;
    y: number;
    result: boolean;
    constructor(x: number, y: number);
}
export declare class EvtGetBoundingShape extends BaseEvent {
    static readonly type: string;
    shape?: BoundingShape;
    constructor();
}
export declare class EvtFrame extends BaseEvent {
    static readonly type: string;
    readonly deltaTime: number;
    readonly elapsedTime: number;
    readonly frameStamp: number;
    constructor(deltaTime: number, elapsedTime: number, frameStamp: number);
}
export declare class EvtFocus extends BaseEvent {
    static readonly type: string;
    readonly focus: boolean;
    constructor(focus: boolean);
}
export declare class EvtKeyboard extends BaseEvent {
    readonly key: string;
    readonly keyCode: number;
    readonly shiftDown: boolean;
    readonly altDown: boolean;
    readonly ctrlDown: boolean;
    readonly metaDown: boolean;
    constructor(type: string, key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean);
}
export declare class EvtKeyDown extends EvtKeyboard {
    static readonly type: string;
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean);
}
export declare class EvtKeyUp extends EvtKeyboard {
    static readonly type: string;
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean);
}
export declare class EvtKeyPress extends EvtKeyboard {
    static readonly type: string;
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean);
}
export declare class EvtMouse extends BaseEvent {
    readonly x: number;
    readonly y: number;
    readonly button: number;
    readonly shiftDown: boolean;
    readonly altDown: boolean;
    readonly ctrlDown: boolean;
    readonly metaDown: boolean;
    bubble: boolean;
    constructor(type: string, x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
    cancelBubble(): void;
}
export declare class EvtMouseDown extends EvtMouse {
    static readonly type: string;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtMouseUp extends EvtMouse {
    static readonly type: string;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtMouseMove extends EvtMouse {
    static readonly type: string;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtMouseEnter extends BaseEvent {
    static readonly type: string;
    constructor();
}
export declare class EvtMouseLeave extends BaseEvent {
    static readonly type: string;
    constructor();
}
export declare class EvtClick extends EvtMouse {
    static readonly type: string;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtDblClick extends EvtMouse {
    static readonly type: string;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtDragBegin extends EvtMouse {
    static readonly type: string;
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean);
}
export declare class EvtDragEnd extends EvtMouse {
    static readonly type: string;
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, data: any);
}
export declare class EvtDragging extends EvtMouse {
    static readonly type: string;
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, data: any);
}
export declare class EvtDragOver extends EvtMouse {
    static readonly type: string;
    readonly object: SceneObject;
    readonly data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, object: SceneObject, data: any);
}
export declare class EvtDragDrop extends EvtMouse {
    static readonly type: string;
    readonly object: SceneObject;
    readonly data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, object: SceneObject, data: any);
}
export declare class EvtResize extends BaseEvent {
    static readonly type: string;
    constructor();
}
export declare class EvtCanvasResize extends BaseEvent {
    static readonly type: string;
    readonly view: SceneView;
    constructor(view: SceneView);
}
export declare class EvtGetProp extends BaseEvent {
    static readonly type: string;
    readonly propName: string;
    propValue: any;
    constructor(propName: string);
}
export declare class EvtSetProp extends BaseEvent {
    static readonly type: string;
    readonly propName: string;
    readonly propValue: any;
    constructor(propName: string, propValue: any);
}
export declare class EvtSceneViewPageWillChange extends BaseEvent {
    static readonly type: string;
    readonly view: SceneView;
    readonly oldPage: string;
    readonly newPage: string;
    constructor(view: SceneView, oldPage: string, newPage: string);
}
export declare class EvtSceneViewPageChanged extends BaseEvent {
    static readonly type: string;
    readonly view: SceneView;
    readonly oldPage: string;
    readonly newPage: string;
    constructor(view: SceneView, oldPage: string, newPage: string);
}
export declare class EvtSysInfo {
    private static _isWindows;
    private static _isMac;
    private static _isX11;
    private static _isLinux;
    private static _isAndroid;
    static isWindows(): boolean;
    static isMac(): boolean;
    static isUnix(): boolean;
    static isLinux(): boolean;
    static isAndroid(): boolean;
}
export declare class EventObserver {
    on<T extends BaseEvent>(type: string, handler: EventHandler<T>, order?: EventListenerOrder): void;
    off<T extends BaseEvent>(type: string, handler?: EventHandler<T>): void;
    trigger(evt: BaseEvent): void;
    triggerEx(evt: BaseEvent): void;
    post<T extends BaseEvent>(evt: T): void;
}
declare type HitTestResult = SceneObject[];
export declare class App {
    static elapsedTime: number;
    static deltaTime: number;
    private static eventQueue;
    private static eventListeners;
    private static running;
    private static lastFrameTime;
    private static firstFrameTime;
    private static frameStamp;
    static postEvent(target: any, evt: BaseEvent): void;
    static triggerEvent(target: any, evt: BaseEvent): void;
    static processPendingEvents(): void;
    static addEventListener(eventType: string, bindObject: any, handler: EventHandler<any>, order: EventListenerOrder): void;
    static removeEventListener(eventType: string, bindObject: any, handler?: EventHandler<any>): void;
    static run(): void;
    static stop(): void;
    private static processEvent;
}
export declare class Component extends EventObserver {
    readonly type: string;
    object: BaseObject | null;
    constructor(type: string);
    toString(): string;
}
export declare class BaseObject extends EventObserver {
    private components;
    [name: string]: any;
    constructor();
    toString(): string;
    addComponent(component: Component): BaseObject;
    removeComponent(component: Component): BaseObject;
    removeComponentByIndex(type: string, index: number): BaseObject;
    removeComponentsByType(type: string): BaseObject;
    removeAllComponents(): BaseObject;
    getComponent(type: string, index?: number): Component | null;
    getComponents(type: string): Component[];
    triggerEx(evt: BaseEvent): void;
    post(evt: BaseEvent): void;
}
export declare class SceneObject extends BaseObject {
    private _view;
    private _parent;
    private _z;
    private _visible;
    private _children;
    private _localTransform;
    private _worldTranslation;
    private _worldRotation;
    private _worldScale;
    private _anchorPoint;
    constructor(parent?: SceneObject);
    readonly boundingShape: BoundingShape;
    view: SceneView;
    readonly parent: SceneObject;
    z: number;
    setZ(value: number): void;
    visible: boolean;
    setVisible(value: boolean): void;
    localTransform: Matrix2d;
    setLocalTransform(t: Matrix2d): void;
    translation: {
        x: number;
        y: number;
    };
    setTranslation(t: {
        x: number;
        y: number;
    }): void;
    scale: {
        x: number;
        y: number;
    };
    setScale(s: {
        x: number;
        y: number;
    }): void;
    rotation: number;
    setRotation(r: number): void;
    readonly worldTransform: Matrix2d;
    worldTranslation: {
        x: number;
        y: number;
    } | null;
    setWorldTranslation(value: {
        x: number;
        y: number;
    } | null): void;
    worldRotation: number | null;
    setWorldRotation(value: number | null): void;
    worldScale: {
        x: number;
        y: number;
    } | null;
    setWorldScale(value: {
        x: number;
        y: number;
    } | null): void;
    anchorPoint: {
        x: number;
        y: number;
    };
    setAnchorPoint(pt: {
        x: number;
        y: number;
    }): void;
    readonly numChildren: number;
    collapseTransform(): void;
    getLocalPoint(x: number, y: number): {
        x: number;
        y: number;
    };
    childAt(index: number): SceneObject;
    forEachChild(callback: (child: SceneObject, index: number) => void): void;
    addChild(child: SceneObject): void;
    removeChild(child: SceneObject): void;
    removeChildAt(index: number): void;
    removeChildren(): void;
    unrefChildren(): void;
    remove(): void;
    triggerRecursive(evt: BaseEvent): void;
    triggerRecursiveEx(evt: BaseEvent): void;
    setCapture(): void;
    releaseCapture(): void;
    toString(): string;
}
export declare class Scene extends BaseObject {
    private static capturedView;
    private static hoverView;
    private static focusView;
    private static views;
    private static clickTick;
    private static dblClickTick;
    private static clickTime;
    private static dblclickTime;
    static addView(view: SceneView): boolean;
    static addCanvas(canvas: HTMLCanvasElement, doubleBuffer?: boolean): SceneView;
    static setFocusView(view: SceneView): void;
    static findView(canvas: HTMLCanvasElement): SceneView;
    static removeView(canvas: HTMLCanvasElement): void;
    static setCapture(view: SceneView): void;
    static init(): void;
    static done(): void;
    private static hitView;
    private static resizeHandler;
    private static mouseDownHandler;
    private static mouseUpHandler;
    private static mouseMoveHandler;
    private static keyDownHandler;
    private static keyUpHandler;
    private static keyPressHandler;
    private static initEventListeners;
    private static doneEventListeners;
}
export interface ISceneViewPage {
    name: string;
    rootNode: SceneObject;
    bkImageUrl: string;
    bkImageRepeat: string;
    bkImageAttachment: string;
    bkImageSize: string;
    bkColor: string;
}
export declare class SceneView extends BaseObject {
    private _canvas;
    private _pages;
    private _currentPage;
    private _captureObject;
    private _hitObjects;
    constructor(canvas: HTMLCanvasElement, doubleBuffer?: boolean);
    forEachPage(callback: (page: ISceneViewPage) => void): void;
    addPage(page?: ISceneViewPage): string;
    removePage(name: string): boolean;
    selectPage(name: string): void;
    renamePage(oldName: string, newName: string): void;
    readonly currentPage: string;
    pageImage: string;
    pageImageRepeat: string;
    pageImageAttachment: string;
    pageImageSize: string;
    pageColor: string;
    updateHitObjects(x: number, y: number): void;
    rootNode: SceneObject;
    readonly canvas: Canvas;
    readonly captureObject: SceneObject;
    readonly hitObjects: SceneObject[];
    setCaptureObject(object: SceneObject): void;
    handleMouseDown(ev: MouseEvent): void;
    handleMouseUp(ev: MouseEvent): void;
    handleMouseMove(ev: MouseEvent): void;
    handleClick(ev: MouseEvent): void;
    handleDblClick(ev: MouseEvent): void;
    setFocus(): void;
    hitTest(x: number, y: number): HitTestResult;
    private isValidObject;
    private genPageName;
    private applyPage;
}
export declare function ResizeSensor(element: HTMLElement, callback: Function): void;
export declare class Canvas extends BaseObject {
    private readonly _canvas;
    private _view;
    private _buffer;
    private _screenCtx;
    private _offscreenCtx;
    private _width;
    private _height;
    private _doubleBuffer;
    constructor(view: SceneView, canvas: HTMLCanvasElement, doubleBuffer?: boolean);
    readonly canvas: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    readonly context: CanvasRenderingContext2D;
    readonly viewport_rect: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    clear(rect?: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): void;
    applyTransform(transform: Matrix2d): void;
    flip(): void;
    private adjustCanvasSize;
}
export {};
