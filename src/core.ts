import { Matrix2d } from './transform';
import { BoundingShape } from './boundingshape';
import { IntersectionTestShapePoint } from './intersect';

export type CullResult = { [z: number]: { object: EventObserver; z: number; transform: Matrix2d }[] };
export type EventHandler<T extends BaseEvent> = (evt: T) => void;
export interface IRect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export enum EventListenerOrder {
    FIRST = 1,
    LAST = 2
}

export class BaseEvent {
    readonly type: string;
    eaten: boolean;
    constructor(type: string) {
        this.type = type;
        this.eaten = false;
    }
    eat(): void {
        this.eaten = true;
    }
}

export class EvtComponentBeforeAttach extends BaseEvent {
    static readonly type: string = '@componentBeforeAttach';
    object: BaseObject;
    allow: boolean;
    constructor(object: BaseObject) {
        super(EvtComponentBeforeAttach.type);
        this.object = object;
        this.allow = true;
    }
}

export class EvtComponentAttached extends BaseEvent {
    static readonly type: string = '@componentAttached';
    constructor() {
        super(EvtComponentAttached.type);
    }
}

export class EvtComponentBeforeDetach extends BaseEvent {
    static readonly type: string = '@componentBeforeDetach';
    allow: boolean;
    constructor() {
        super(EvtComponentBeforeDetach.type);
        this.allow = true;
    }
}

export class EvtComponentDetached extends BaseEvent {
    static readonly type: string = '@componentDetached';
    constructor() {
        super(EvtComponentDetached.type);
    }
}

export class EvtUpdate extends BaseEvent {
    static readonly type: string = '@update';
    public readonly deltaTime: number;
    public readonly elapsedTime: number;
    public readonly frameStamp: number;
    constructor(deltaTime: number, elapsedTime: number, frameStamp: number) {
        super(EvtUpdate.type);
        this.deltaTime = deltaTime;
        this.elapsedTime = elapsedTime;
        this.frameStamp = frameStamp;
    }
}

export class EvtCull extends BaseEvent {
    static readonly type: string = '@cull';
    readonly canvasWidth: number;
    readonly canvasHeight: number;
    readonly result: CullResult;
    constructor(w: number, h: number) {
        super(EvtCull.type);
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.result = {};
    }
    addObject(object: EventObserver, z: number, transform: Matrix2d): void {
        let objectList = this.result[z] || [];
        objectList.push({ object: object, z: z, transform: transform });
        this.result[z] = objectList;
    }
}

export class EvtDraw extends BaseEvent {
    static readonly type: string = '@draw';
    readonly canvas: Canvas;
    readonly z: number;
    readonly transform: Matrix2d;
    constructor(canvas: Canvas, z: number, transform: Matrix2d) {
        super(EvtDraw.type);
        this.canvas = canvas;
        this.z = z;
        this.transform = transform;
    }
}

export class EvtHitTest extends BaseEvent {
    static readonly type: string = '@hittest';
    x: number;
    y: number;
    result: boolean;
    constructor(x: number, y: number) {
        super(EvtHitTest.type);
        this.x = x;
        this.y = y;
        this.result = false;
    }
}

export class EvtGetBoundingShape extends BaseEvent {
    static readonly type: string = '@getboundingshape';
    shape?: BoundingShape;
    constructor() {
        super(EvtGetBoundingShape.type);
    }
}

export class EvtFrame extends BaseEvent {
    static readonly type: string = '@frame';
    readonly deltaTime: number;
    readonly elapsedTime: number;
    readonly frameStamp: number;
    constructor(deltaTime: number, elapsedTime: number, frameStamp: number) {
        super(EvtFrame.type);
        this.deltaTime = deltaTime;
        this.elapsedTime = elapsedTime;
        this.frameStamp = frameStamp;
    }
}

export class EvtFocus extends BaseEvent {
    static readonly type: string = '@focus';
    readonly focus: boolean;
    constructor(focus: boolean) {
        super(EvtFocus.type);
        this.focus = focus;
    }
}

export class EvtKeyboard extends BaseEvent {
    readonly key: string;
    readonly keyCode: number;
    readonly shiftDown: boolean;
    readonly altDown: boolean;
    readonly ctrlDown: boolean;
    readonly metaDown: boolean;
    constructor(type: string, key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean) {
        super(type);
        this.key = key;
        this.keyCode = code;
        this.shiftDown = shift;
        this.altDown = alt;
        this.ctrlDown = ctrl;
        this.metaDown = meta;
    }
}

export class EvtKeyDown extends EvtKeyboard {
    static readonly type: string = '@keydown';
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean) {
        super(EvtKeyDown.type, key, code, shift, alt, ctrl, meta);
    }
}

export class EvtKeyUp extends EvtKeyboard {
    static readonly type: string = '@keyup';
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean) {
        super(EvtKeyUp.type, key, code, shift, alt, ctrl, meta);
    }
}

export class EvtKeyPress extends EvtKeyboard {
    static readonly type: string = '@keypress';
    constructor(key: string, code: number, shift: boolean, alt: boolean, ctrl: boolean, meta: boolean) {
        super(EvtKeyPress.type, key, code, shift, alt, ctrl, meta);
    }
}

export class EvtMouse extends BaseEvent {
    readonly x: number;
    readonly y: number;
    readonly button: number;
    readonly shiftDown: boolean;
    readonly altDown: boolean;
    readonly ctrlDown: boolean;
    readonly metaDown: boolean;
    bubble: boolean;
    constructor(type: string, x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(type);
        this.x = x;
        this.y = y;
        this.button = button;
        this.shiftDown = shiftDown;
        this.altDown = altDown;
        this.ctrlDown = ctrlDown;
        this.metaDown = metaDown;
        this.bubble = true;
    }
    cancelBubble() {
        this.bubble = false;
    }
}

export class EvtMouseDown extends EvtMouse {
    static readonly type: string = '@mousedown';
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtMouseDown.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
    }
}

export class EvtMouseUp extends EvtMouse {
    static readonly type: string = '@mouseup';
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtMouseUp.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
    }
}

export class EvtMouseMove extends EvtMouse {
    static readonly type: string = '@mousemove';
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtMouseMove.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
    }
}

export class EvtMouseEnter extends BaseEvent {
    static readonly type: string = '@mouseenter';
    constructor() {
        super(EvtMouseEnter.type);
    }
}

export class EvtMouseLeave extends BaseEvent {
    static readonly type: string = '@mouseleave';
    constructor() {
        super(EvtMouseLeave.type);
    }
}

export class EvtClick extends EvtMouse {
    static readonly type: string = '@click';
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
    }
}

export class EvtDblClick extends EvtMouse {
    static readonly type: string = '@dblclick';
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtDblClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
    }
}

export class EvtDragBegin extends EvtMouse {
    static readonly type: string = '@dragbegin';
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean) {
        super(EvtDragBegin.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
        this.data = null;
    }
}

export class EvtDragEnd extends EvtMouse {
    static readonly type: string = '@dragend';
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, data: any) {
        super(EvtDragEnd.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
        this.data = data;
    }
}

export class EvtDragging extends EvtMouse {
    static readonly type: string = '@dragging';
    data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, data: any) {
        super(EvtDragging.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
        this.data = data;
    }
}

export class EvtDragOver extends EvtMouse {
    static readonly type: string = '@dragover';
    readonly object: SceneObject;
    readonly data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, object: SceneObject, data: any) {
        super(EvtDragOver.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
        this.object = object;
        this.data = data;
    }
}

export class EvtDragDrop extends EvtMouse {
    static readonly type: string = '@dragdrop';
    readonly object: SceneObject;
    readonly data: any;
    constructor(x: number, y: number, button: number, shiftDown: boolean, altDown: boolean, ctrlDown: boolean, metaDown: boolean, object: SceneObject, data: any) {
        super(EvtDragDrop.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown);
        this.object = object;
        this.data = data;
    }
}

export class EvtResize extends BaseEvent {
    static readonly type: string = '@resize';
    constructor() {
        super(EvtResize.type);
    }
}

export class EvtCanvasResize extends BaseEvent {
    static readonly type: string = '@canvasresize';
    readonly view: SceneView;
    constructor(view: SceneView) {
        super(EvtCanvasResize.type);
        this.view = view;
    }
}

export class EvtGetProp extends BaseEvent {
    static readonly type: string = '@getprop';
    readonly propName: string;
    propValue: any;
    constructor(propName: string) {
        super(EvtGetProp.type);
        this.propName = propName;
        this.propValue = undefined;
    }
}

export class EvtSetProp extends BaseEvent {
    static readonly type: string = '@setprop';
    readonly propName: string;
    readonly propValue: any;
    constructor(propName: string, propValue: any) {
        super(EvtSetProp.type);
        this.propName = propName;
        this.propValue = propValue;
    }
}

export class EvtSceneViewPageWillChange extends BaseEvent {
    static readonly type: string = '@scenviewpagewillchange';
    readonly view: SceneView;
    readonly oldPage: string;
    readonly newPage: string;
    constructor(view: SceneView, oldPage: string, newPage: string) {
        super(EvtSceneViewPageWillChange.type);
        this.view = view;
        this.oldPage = oldPage;
        this.newPage = newPage;
    }
}

export class EvtSceneViewPageChanged extends BaseEvent {
    static readonly type: string = '@sceneviewpagechanged';
    readonly view: SceneView;
    readonly oldPage: string;
    readonly newPage: string;
    constructor(view: SceneView, oldPage: string, newPage: string) {
        super(EvtSceneViewPageChanged.type);
        this.view = view;
        this.oldPage = oldPage;
        this.newPage = newPage;
    }
}

export class EvtSysInfo {
    private static _isWindows = navigator.platform === 'Win32' || navigator.platform === 'Windows';
    private static _isMac = navigator.platform === 'Mac68K' || navigator.platform === 'MacPPC' || navigator.platform === 'Macintosh' || navigator.platform === 'MacIntel';
    private static _isX11 = navigator.platform === 'X11';
    private static _isLinux = String(navigator.platform).indexOf('Linux') >= 0;
    private static _isAndroid = (navigator.userAgent.toLowerCase().match(/android/i) || []).indexOf('android') >= 0;
    static isWindows() {
        return this._isWindows;
    }
    static isMac() {
        return this._isMac;
    }
    static isUnix() {
        return this._isX11 && !this._isWindows && !this._isMac;
    }
    static isLinux() {
        return this._isLinux;
    }
    static isAndroid() {
        return this._isLinux && this._isAndroid;
    }
}

export class EventObserver {
    on<T extends BaseEvent>(type: string, handler: EventHandler<T>, order?: EventListenerOrder): void {
        App.addEventListener(type, this, handler, order || EventListenerOrder.FIRST);
    }
    off<T extends BaseEvent>(type: string, handler?: EventHandler<T>): void {
        App.removeEventListener(type, this, handler);
    }
    trigger(evt: BaseEvent): void {
        App.triggerEvent(this, evt);
    }
    triggerEx(evt: BaseEvent): void {
        this.trigger(evt);
    }
    post<T extends BaseEvent>(evt: T): void {
        App.postEvent(this, evt);
    }
}

type HitTestResult = SceneObject[];
type EventHandlerList = { handler: EventHandler<any>; next: EventHandlerList };
type EventHandlerEntry = { handlers: EventHandlerList; bindObject: any };

export class App {
    static elapsedTime = 0;
    static deltaTime = 0;
    private static eventQueue: { evt: BaseEvent; target: any }[] = [];
    private static eventListeners: { [eventType: string]: EventHandlerEntry[] } = {};
    private static running = false;
    private static lastFrameTime = 0;
    private static firstFrameTime = 0;
    private static frameStamp = 0;
    static postEvent(target: any, evt: BaseEvent): void {
        App.eventQueue.push({ evt: evt, target: target });
    }
    static triggerEvent(target: any, evt: BaseEvent): void {
        App.processEvent(evt, target);
    }
    static processPendingEvents(): void {
        const events = App.eventQueue;
        App.eventQueue = [];
        events.forEach((evt: { evt: BaseEvent; target: any }) => {
            App.processEvent(evt.evt, evt.target);
        });
    }
    static addEventListener(eventType: string, bindObject: any, handler: EventHandler<any>, order: EventListenerOrder) {
        let handlerList = App.eventListeners[eventType] || [];
        for (let i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (order === EventListenerOrder.FIRST) {
                    handlerList[i].handlers = {
                        handler: handler,
                        next: handlerList[i].handlers
                    };
                } else {
                    let h = handlerList[i].handlers;
                    while (h.next) {
                        h = h.next;
                    }
                    h.next = { handler: handler, next: null };
                }
                return;
            }
        }
        handlerList.push({
            bindObject: bindObject,
            handlers: {
                handler: handler,
                next: null
            }
        });
        this.eventListeners[eventType] = handlerList;
    }
    static removeEventListener(eventType: string, bindObject: any, handler?: EventHandler<any>) {
        let handlerList = App.eventListeners[eventType] || [];
        for (let i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (handler) {
                    let h = handlerList[i].handlers;
                    let ph = null;
                    while (h && h.handler !== handler) {
                        ph = h;
                        h = h.next;
                    }
                    if (h) {
                        if (ph) {
                            ph.next = h.next;
                        } else {
                            handlerList[i].handlers = h.next;
                        }
                    }
                    if (!handlerList[i].handlers) {
                        handlerList.splice(i, 1);
                    }
                } else {
                    handlerList.splice(i, 1);
                    break;
                }
            }
        }
    }
    static run() {
        function frame(ts: number) {
            if (App.running) {
                if (App.lastFrameTime === 0) {
                    App.lastFrameTime = ts;
                    App.firstFrameTime = ts;
                }
                App.deltaTime = ts - App.lastFrameTime;
                App.elapsedTime = ts - App.firstFrameTime;
                App.lastFrameTime = ts;
                App.frameStamp++;
                App.processPendingEvents();
                App.triggerEvent(null, new EvtFrame(App.deltaTime, App.elapsedTime, App.frameStamp));
                if (App.running) {
                    requestAnimationFrame(frame);
                }
            }
        }
        if (!App.running) {
            App.running = true;
            App.lastFrameTime = 0;
            App.firstFrameTime = 0;
            App.elapsedTime = 0;
            App.deltaTime = 0;
            App.frameStamp = 0;
            requestAnimationFrame(frame);
        }
    }
    static stop() {
        this.running = false;
    }
    private static processEvent(evt: BaseEvent, target: any): void {
        let handlerList = App.eventListeners[evt.type];
        if (handlerList) {
            for (let i = 0; i < handlerList.length; i++) {
                const entry = handlerList[i];
                if (!target || entry.bindObject === target) {
                    let h = entry.handlers;
                    while (h) {
                        h.handler.call(entry.bindObject, evt);
                        if (evt.eaten) {
                            break;
                        }
                        h = h.next;
                    }
                    if (target) {
                        break;
                    }
                }
            }
        }
    }
}

export class Component extends EventObserver {
    readonly type: string;
    object: BaseObject | null;
    constructor(type: string) {
        super();
        this.type = type;
        this.object = null;
    }
    toString(): string {
        return `<Component: ${this.type}>`;
    }
}

export class BaseObject extends EventObserver {
    private components: { [type: string]: Component[] };
    [name: string]: any;
    constructor() {
        super();
        this.components = {};
    }
    toString(): string {
        return '<BaseObject>';
    }
    addComponent(component: Component): BaseObject {
        if (component.object === null) {
            let componentArray = this.components[component.type] || [];
            if (componentArray.indexOf(component) < 0) {
                const ev = new EvtComponentBeforeAttach(this);
                component.trigger(ev);
                ev.object = null;
                if (ev.allow) {
                    componentArray.push(component);
                    component.object = this;
                    component.trigger(new EvtComponentAttached());
                }
            }
            this.components[component.type] = componentArray;
        }
        return this;
    }
    removeComponent(component: Component): BaseObject {
        if (component.object === this) {
            let index = this.components[component.type].indexOf(component);
            this.removeComponentByIndex(component.type, index);
        }
        return this;
    }
    removeComponentByIndex(type: string, index: number): BaseObject {
        const components = this.components[type];
        if (components && index >= 0 && index < components.length) {
            const ev = new EvtComponentBeforeDetach();
            components[index].trigger(ev);
            if (ev.allow) {
                components[index].trigger(new EvtComponentDetached());
                components[index].object = null;
                components.splice(index, 1);
            }
        }
        return this;
    }
    removeComponentsByType(type: string): BaseObject {
        const components = this.components[type];
        while (components && components.length > 0) {
            this.removeComponentByIndex(type, components.length - 1);
        }
        return this;
    }
    removeAllComponents(): BaseObject {
        Object.keys(this.components).forEach(type => {
            this.removeComponentsByType(type);
        });
        return this;
    }
    getComponent(type: string, index: number = 0): Component | null {
        let componentArray = this.components[type];
        if (componentArray === undefined || index < 0 || componentArray.length <= index) {
            return null;
        }
        return componentArray[index];
    }
    getComponents(type: string): Component[] {
        return this.components[type];
    }
    triggerEx(evt: BaseEvent): void {
        super.trigger(evt);
        for (const c in this.components) {
            if (this.components.hasOwnProperty(c)) {
                this.components[c].forEach((comp: Component) => {
                    comp.trigger(evt);
                });
            }
        }
    }
    post(evt: BaseEvent): void {
        App.postEvent(this, evt);
    }
}

export class SceneObject extends BaseObject {
    private _view: SceneView;
    private _parent: SceneObject | null;
    private _z: number;
    private _visible: boolean;
    private _children: SceneObject[];
    private _localTransform: Matrix2d;
    private _worldTranslation: { x: number; y: number } | null;
    private _worldRotation: number | null;
    private _worldScale: { x: number; y: number } | null;
    private _anchorPoint: { x: number; y: number };
    constructor(parent: SceneObject = null) {
        super();
        this._view = null;
        this._parent = null;
        this._z = 0;
        this._visible = true;
        this._children = [];
        this._localTransform = new Matrix2d();
        this._worldTranslation = null;
        this._worldRotation = null;
        this._worldScale = null;
        this._anchorPoint = { x: 0, y: 0 };
        if (parent) {
            parent.addChild(this);
        }
        this.on(EvtCull.type, (evt: EvtCull) => {
            evt.addObject(this, this.z, this.worldTransform);
        });
        this.on(EvtHitTest.type, (evt: EvtHitTest) => {
            const shape = this.boundingShape;
            evt.result = shape ? IntersectionTestShapePoint(shape, { x: evt.x, y: evt.y }) : false;
        });
        this.on(EvtGetProp.type, (ev: EvtGetProp) => {
            switch (ev.propName) {
                case 'z':
                    ev.propValue = this.z;
                    ev.eat();
                    break;
                case 'visible':
                    ev.propValue = this.visible;
                    ev.eat();
                    break;
                case 'transform':
                    ev.propValue = this.localTransform;
                    ev.eat();
                    break;
                case 'translation':
                    let t = this.translation;
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'scale':
                    let s = this.scale;
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'rotation':
                    ev.propValue = this.rotation;
                    ev.eat();
                    break;
                case 'anchorPoint':
                    ev.propValue = this.anchorPoint;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        this.on(EvtSetProp.type, (ev: EvtSetProp) => {
            switch (ev.propName) {
                case 'z':
                    this.z = ev.propValue as number;
                    ev.eat();
                    break;
                case 'visible':
                    this.visible = ev.propValue as boolean;
                    ev.eat();
                    break;
                case 'transform':
                    this.localTransform = ev.propValue as Matrix2d;
                    ev.eat();
                    break;
                case 'translation':
                    let t = ev.propValue as number[];
                    this.translation = { x: Math.round(t[0]), y: Math.round(t[1]) };
                    break;
                case 'scale':
                    let s = ev.propValue as number[];
                    this.scale = { x: s[0], y: s[1] };
                    break;
                case 'rotation':
                    this.rotation = ev.propValue as number;
                    break;
                case 'anchorPoint':
                    this.anchorPoint = ev.propValue;
                    break;
                default:
                    break;
            }
        });
    }
    get boundingShape() {
        const ev = new EvtGetBoundingShape();
        this.triggerEx(ev);
        return ev.shape || null;
    }
    get view() {
        return this._view;
    }
    set view(v: SceneView) {
        this._view = v;
    }
    get parent() {
        return this._parent;
    }
    get z() {
        return this._z;
    }
    setZ(value: number) {
        this._z = value;
    }
    set z(value: number) {
        this.setZ(value);
    }
    get visible() {
        return this._visible;
    }
    setVisible(value: boolean) {
        this._visible = value;
    }
    set visible(value: boolean) {
        this.setVisible(value);
    }
    get localTransform() {
        return this._localTransform;
    }
    setLocalTransform(t: Matrix2d) {
        this._localTransform = t;
    }
    set localTransform(t: Matrix2d) {
        this.setLocalTransform(t);
    }
    get translation(): { x: number; y: number } {
        return this.localTransform.getTranslationPart();
    }
    setTranslation(t: { x: number; y: number }) {
        this.localTransform.setTranslationPart(t);
    }
    set translation(t: { x: number; y: number }) {
        this.setTranslation(t);
    }
    get scale(): { x: number; y: number } {
        return this.localTransform.getScalePart();
    }
    setScale(s: { x: number; y: number }) {
        this.localTransform.setScalePart(s);
    }
    set scale(s: { x: number; y: number }) {
        this.setScale(s);
    }
    get rotation(): number {
        return this.localTransform.getRotationPart();
    }
    setRotation(r: number) {
        this.localTransform.setRotationPart(r);
    }
    set rotation(r: number) {
        this.setRotation(r);
    }
    get worldTransform(): Matrix2d {
        let t = this.parent ? Matrix2d.transform(this.parent.worldTransform, this.localTransform) : this.localTransform;
        if (this._worldTranslation !== null) {
            t.setTranslationPart(this._worldTranslation);
        }
        if (this._worldRotation !== null) {
            t.setRotationPart(this._worldRotation);
        }
        if (this._worldScale !== null) {
            t.setScalePart(this._worldScale);
        }
        return t;
    }
    get worldTranslation(): { x: number; y: number } | null {
        return this._worldTranslation;
    }
    setWorldTranslation(value: { x: number; y: number } | null) {
        this._worldTranslation = value === null ? null : { x: Math.round(value.x), y: Math.round(value.y) };
    }
    set worldTranslation(value: { x: number; y: number } | null) {
        this.setWorldTranslation(value);
    }
    get worldRotation(): number | null {
        return this._worldRotation;
    }
    setWorldRotation(value: number | null) {
        this._worldRotation = value;
    }
    set worldRotation(value: number | null) {
        this.setWorldRotation(value);
    }
    get worldScale(): { x: number; y: number } | null {
        return this._worldScale;
    }
    setWorldScale(value: { x: number; y: number } | null) {
        this._worldScale = value;
    }
    set worldScale(value: { x: number; y: number } | null) {
        this.setWorldScale(value);
    }
    get anchorPoint() {
        return this._anchorPoint;
    }
    setAnchorPoint(pt: { x: number; y: number }) {
        this._anchorPoint = pt;
    }
    set anchorPoint(pt) {
        this.setAnchorPoint(pt);
    }
    get numChildren(): number {
        return this._children.length;
    }
    collapseTransform(): void {
        const wt = this.worldTransform;
        this.worldTranslation = null;
        this.worldRotation = null;
        this.worldScale = null;
        if (this.parent) {
            this.localTransform = Matrix2d.invert(this.parent.worldTransform).transform(wt);
        } else {
            this.localTransform = wt;
        }
        this.localTransform.e = Math.round(this.localTransform.e);
        this.localTransform.f = Math.round(this.localTransform.f);
    }
    getLocalPoint(x: number, y: number): { x: number; y: number } {
        return Matrix2d.invert(this.worldTransform).transformPoint({ x: x, y: y });
    }
    childAt(index: number): SceneObject {
        return this._children[index];
    }
    forEachChild(callback: (child: SceneObject, index: number) => void) {
        this._children.forEach(callback);
    }
    addChild(child: SceneObject): void {
        if (child._parent === null) {
            child._parent = this;
            child._view = this._view;
            this._children.push(child);
        }
    }
    removeChild(child: SceneObject): void {
        if (child._parent === this) {
            let index = this._children.indexOf(child);
            this.removeChildAt(index);
        }
    }
    removeChildAt(index: number): void {
        if (index >= 0 && index < this._children.length) {
            let child = this._children[index];
            this._children.splice(index, 1);
            child._parent = null;
            child._view = null;
        }
    }
    removeChildren(): void {
        while (this._children.length > 0) {
            this.removeChildAt(0);
        }
    }
    unrefChildren(): void {
        while (this._children.length > 0) {
            this._children[0].unrefChildren();
            this.removeChildAt(0);
        }
    }
    remove(): void {
        if (this._parent) {
            this._parent.removeChild(this);
        }
    }
    triggerRecursive(evt: BaseEvent): void {
        super.trigger(evt);
        this.forEachChild((child: SceneObject, index: number) => {
            child.triggerRecursive(evt);
        });
    }
    triggerRecursiveEx(evt: BaseEvent): void {
        super.triggerEx(evt);
        this.forEachChild((child: SceneObject, index: number) => {
            child.triggerRecursiveEx(evt);
        });
    }
    setCapture(): void {
        this._view && this._view.setCaptureObject(this);
    }
    releaseCapture(): void {
        this._view && this._view.captureObject === this && this._view.setCaptureObject(null);
    }
    toString(): string {
        return '<SceneObject>';
    }
}

export class Scene extends BaseObject {
    private static capturedView: SceneView = null;
    private static hoverView: SceneView = null;
    private static focusView: SceneView = null;
    private static views: SceneView[] = [];
    private static clickTick: number = 0;
    private static dblClickTick: number = 0;
    private static clickTime: number = 400;
    private static dblclickTime: number = 400;
    public static addView(view: SceneView): boolean {
        if (view && view.canvas && !Scene.findView(view.canvas.canvas)) {
            Scene.views.push(view);
            if (!Scene.focusView) {
                Scene.setFocusView(view);
            }
            return true;
        }
        return false;
    }
    public static addCanvas(canvas: HTMLCanvasElement, doubleBuffer?: boolean): SceneView {
        if (!Scene.findView(canvas)) {
            const view = new SceneView(canvas, doubleBuffer === undefined ? false : doubleBuffer);
            return Scene.addView(view) ? view : null;
        }
        return null;
    }
    public static setFocusView(view: SceneView) {
        if (Scene.focusView !== view) {
            if (Scene.focusView) {
                Scene.focusView.trigger(new EvtFocus(false));
            }
            Scene.focusView = view;
            if (Scene.focusView) {
                Scene.focusView.trigger(new EvtFocus(true));
            }
        }
    }
    public static findView(canvas: HTMLCanvasElement): SceneView {
        for (let i = 0; i < Scene.views.length; i++) {
            if (Scene.views[i].canvas.canvas === canvas) {
                return Scene.views[i];
            }
        }
        return null;
    }
    public static removeView(canvas: HTMLCanvasElement): void {
        for (let i = 0; i < Scene.views.length; i++) {
            if (Scene.views[i].canvas.canvas === canvas) {
                Scene.views.splice(i, 1);
            }
        }
    }
    public static setCapture(view: SceneView) {
        Scene.capturedView = view;
    }
    public static init() {
        Scene.initEventListeners();
    }
    public static done() {
        Scene.doneEventListeners();
    }
    private static hitView(x: number, y: number): SceneView {
        if (Scene.capturedView !== null) {
            return Scene.capturedView;
        }
        for (let i = 0; i < Scene.views.length; i++) {
            const view = Scene.views[i];
            const rc = view.canvas.viewport_rect;
            if (x >= rc.x && x < rc.x + rc.w && y >= rc.y && y < rc.y + rc.h) {
                return view;
            }
        }
        return null;
    }
    private static resizeHandler() {
        let e = new EvtResize();
        Scene.views.forEach((view: SceneView) => {
            view.triggerEx(e);
        });
    }
    private static mouseDownHandler(ev: MouseEvent) {
        Scene.clickTick = Date.now();
        let view = Scene.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            view.handleMouseDown(ev);
        }
    }
    private static mouseUpHandler(ev: MouseEvent) {
        let view = Scene.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            let tick = Date.now();
            if (tick < Scene.clickTick + Scene.clickTime) {
                if (tick < Scene.dblClickTick + Scene.dblclickTime) {
                    view.handleDblClick(ev);
                    Scene.dblClickTick = 0;
                } else {
                    view.handleClick(ev);
                    Scene.dblClickTick = tick;
                }
            } else {
                Scene.dblClickTick = 0;
            }
            view.handleMouseUp(ev);
            Scene.clickTick = 0;
        } else {
            Scene.clickTick = 0;
            Scene.dblClickTick = 0;
        }
    }
    private static mouseMoveHandler(ev: MouseEvent) {
        let view = Scene.hitView(ev.clientX, ev.clientY);
        if (view !== Scene.hoverView) {
            if (Scene.hoverView) {
                Scene.hoverView.triggerEx(new EvtMouseLeave());
                Scene.hoverView = null;
            }
            if (view !== null) {
                Scene.hoverView = view;
                view.triggerEx(new EvtMouseEnter());
            }
        }
        if (view !== null) {
            const rc = view.canvas.viewport_rect;
            view.updateHitObjects(ev.clientX - rc.x, ev.clientY - rc.y);
            view.handleMouseMove(ev);
        }
    }
    private static keyDownHandler(ev: KeyboardEvent) {
        if (Scene.focusView) {
            Scene.focusView.trigger(new EvtKeyDown(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    }
    private static keyUpHandler(ev: KeyboardEvent) {
        if (Scene.focusView) {
            Scene.focusView.trigger(new EvtKeyUp(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    }
    private static keyPressHandler(ev: KeyboardEvent) {
        if (Scene.focusView) {
            Scene.focusView.trigger(new EvtKeyPress(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    }
    private static initEventListeners(): void {
        window.addEventListener('resize', Scene.resizeHandler);
        window.addEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', Scene.mouseDownHandler);
        window.addEventListener(window.onpointerup ? 'pointerup' : 'mouseup', Scene.mouseUpHandler);
        window.addEventListener(window.onpointermove ? 'pointermove' : 'mousemove', Scene.mouseMoveHandler);
        window.addEventListener('keydown', Scene.keyDownHandler);
        window.addEventListener('keyup', Scene.keyUpHandler);
        window.addEventListener('keypress', Scene.keyPressHandler);
    }
    private static doneEventListeners(): void {
        window.removeEventListener('resize', Scene.resizeHandler);
        window.removeEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', Scene.mouseDownHandler);
        window.removeEventListener(window.onpointerup ? 'pointerup' : 'mouseup', Scene.mouseUpHandler);
        window.removeEventListener(window.onpointermove ? 'pointermove' : 'mousemove', Scene.mouseMoveHandler);
        window.removeEventListener('keydown', Scene.keyDownHandler);
        window.removeEventListener('keyup', Scene.keyUpHandler);
        window.removeEventListener('keypress', Scene.keyPressHandler);
    }
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

export class SceneView extends BaseObject {
    private _canvas: Canvas;
    private _pages: { [name: string]: ISceneViewPage };
    private _currentPage: string;
    private _captureObject: SceneObject;
    private _hitObjects: SceneObject[];
    constructor(canvas: HTMLCanvasElement, doubleBuffer: boolean = false) {
        super();
        this._canvas = new Canvas(this, canvas, doubleBuffer);
        this._captureObject = null;
        this._hitObjects = [];
        this._currentPage = null;
        this._pages = {};
        const rootNode = new SceneObject();
        rootNode.view = this;
        this.addPage({
            name: 'page1',
            rootNode: rootNode,
            bkImageUrl: null,
            bkImageRepeat: null,
            bkImageSize: null,
            bkImageAttachment: null,
            bkColor: '#ffffff'
        });
        this.selectPage('page1');

        this.on(EvtFrame.type, (ev: EvtFrame) => {
            let updateEvent = new EvtUpdate(ev.deltaTime, ev.elapsedTime, ev.frameStamp);
            if (this.rootNode) {
                this.rootNode.triggerRecursiveEx(updateEvent);
            }
            this.canvas.clear();
            this.triggerEx(new EvtDraw(this.canvas, 0, new Matrix2d()));
            this.canvas.flip();
        });
        this.on(EvtDraw.type, (ev: EvtDraw) => {
            if (this.rootNode) {
                let cullEvent = new EvtCull(ev.canvas.width, ev.canvas.height);
                this.rootNode.triggerRecursiveEx(cullEvent);
                for (let i in cullEvent.result) {
                    let group = cullEvent.result[i];
                    for (let j = 0; j < group.length; j++) {
                        ev.canvas.context.save();
                        ev.canvas.applyTransform(group[j].transform);
                        ev.canvas.context.translate(0.5, 0.5);
                        group[j].object.triggerEx(new EvtDraw(ev.canvas, group[j].z, group[j].transform));
                        ev.canvas.context.restore();
                    }
                }
            }
        });
    }
    forEachPage(callback: (page: ISceneViewPage) => void) {
        if (callback) {
            for (const name in this._pages) {
                callback({
                    name: name,
                    rootNode: this._pages[name].rootNode,
                    bkImageUrl: this._pages[name].bkImageUrl,
                    bkImageRepeat: this._pages[name].bkImageRepeat,
                    bkImageAttachment: this._pages[name].bkImageAttachment,
                    bkImageSize: this._pages[name].bkImageSize,
                    bkColor: this._pages[name].bkColor
                });
            }
        }
    }
    addPage(page?: ISceneViewPage): string {
        const defaultPage: ISceneViewPage = {
            name: null,
            rootNode: null,
            bkImageUrl: null,
            bkImageRepeat: 'repeat',
            bkImageAttachment: 'scroll',
            bkImageSize: 'auto',
            bkColor: '#ffffff'
        };
        const p: ISceneViewPage = page || defaultPage;
        const name = p.name || this.genPageName();
        if (name in this._pages) {
            return null;
        }
        this._pages[name] = {
            name: name,
            rootNode: p.rootNode,
            bkImageUrl: p.bkImageUrl,
            bkImageRepeat: p.bkImageRepeat || defaultPage.bkImageRepeat,
            bkImageAttachment: p.bkImageAttachment || defaultPage.bkImageAttachment,
            bkImageSize: p.bkImageSize || defaultPage.bkImageSize,
            bkColor: p.bkColor || defaultPage.bkColor
        };
        return name;
    }
    removePage(name: string): boolean {
        if (name in this._pages) {
            if (name === this._currentPage) {
                let b = false;
                for (const n in this._pages) {
                    if (n !== name) {
                        this.selectPage(n);
                        b = true;
                    }
                }
                if (!b) {
                    return false;
                }
            }
            this._pages[name].rootNode.unrefChildren();
            this._pages[name].rootNode.view = null;
            this._pages[name].rootNode = null;
            delete this._pages[name];
            return true;
        }
        return false;
    }
    selectPage(name: string) {
        const oldName = this._currentPage;
        if (name in this._pages && name !== oldName) {
            App.triggerEvent(null, new EvtSceneViewPageWillChange(this, oldName, name));
            this._currentPage = name;
            this._captureObject = null;
            this._hitObjects.length = 0;
            this.applyPage(this._pages[this._currentPage]);
            App.triggerEvent(null, new EvtSceneViewPageChanged(this, oldName, name));
        }
    }
    renamePage(oldName: string, newName: string) {
        if (oldName in this._pages && newName && newName !== oldName && !(newName in this._pages)) {
            const page = this._pages[oldName];
            delete this._pages[oldName];
            page.name = newName;
            this._pages[newName] = page;
        }
    }
    get currentPage() {
        return this._currentPage;
    }
    get pageImage() {
        return this._pages[this._currentPage].bkImageUrl;
    }
    set pageImage(image: string) {
        if (image !== this._pages[this._currentPage].bkImageUrl) {
            this._pages[this._currentPage].bkImageUrl = image;
            this.applyPage(this._pages[this._currentPage]);
        }
    }
    get pageImageRepeat() {
        return this._pages[this._currentPage].bkImageRepeat;
    }
    set pageImageRepeat(value: string) {
        const repeat = value || 'repeat';
        if (repeat !== this._pages[this._currentPage].bkImageRepeat) {
            this._pages[this._currentPage].bkImageRepeat = repeat;
            this.applyPage(this._pages[this._currentPage]);
        }
    }
    get pageImageAttachment() {
        return this._pages[this._currentPage].bkImageAttachment;
    }
    set pageImageAttachment(value: string) {
        const attach = value || 'scroll';
        if (attach !== this._pages[this._currentPage].bkImageAttachment) {
            this._pages[this._currentPage].bkImageAttachment = attach;
            this.applyPage(this._pages[this._currentPage]);
        }
    }
    get pageImageSize() {
        return this._pages[this._currentPage].bkImageSize;
    }
    set pageImageSize(value: string) {
        const size = value || 'auto';
        if (size !== this._pages[this._currentPage].bkImageSize) {
            this._pages[this._currentPage].bkImageSize = size;
            this.applyPage(this._pages[this._currentPage]);
        }
    }
    get pageColor() {
        return this._pages[this._currentPage].bkColor;
    }
    set pageColor(color: string) {
        if (color !== this._pages[this._currentPage].bkColor) {
            this._pages[this._currentPage].bkColor = color;
            this.applyPage(this._pages[this._currentPage]);
        }
    }
    public updateHitObjects(x: number, y: number) {
        const hitTestResult = this.hitTest(x, y);
        for (let i = 0; i < this._hitObjects.length; ) {
            if (hitTestResult.indexOf(this._hitObjects[i]) < 0) {
                this._hitObjects[i].trigger(new EvtMouseLeave());
                this._hitObjects.splice(i, 1);
            } else {
                i++;
            }
        }
        for (let i = 0; i < hitTestResult.length; i++) {
            if (this._hitObjects.indexOf(hitTestResult[i]) < 0) {
                hitTestResult[i].trigger(new EvtMouseEnter());
            }
        }
        this._hitObjects = hitTestResult;
        this._hitObjects.push(this.rootNode);
    }
    get rootNode(): SceneObject {
        return this._pages[this._currentPage].rootNode;
    }
    set rootNode(node: SceneObject) {
        if (this._pages[this._currentPage].rootNode !== node) {
            this._pages[this._currentPage].rootNode = node;
            this._hitObjects.length = 0;
            this._captureObject = null;
        }
    }
    get canvas(): Canvas {
        return this._canvas;
    }
    get captureObject(): SceneObject {
        return this._captureObject;
    }
    get hitObjects(): SceneObject[] {
        return this._hitObjects;
    }
    setCaptureObject(object: SceneObject): void {
        this._captureObject = object;
    }
    handleMouseDown(ev: MouseEvent): void {
        const rc = this.canvas.viewport_rect;
        const e = new EvtMouseDown(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        } else {
            for (let i = 0; i < this._hitObjects.length; i++) {
                const obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    }
    handleMouseUp(ev: MouseEvent): void {
        const rc = this.canvas.viewport_rect;
        const e = new EvtMouseUp(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        } else {
            for (let i = 0; i < this._hitObjects.length; i++) {
                const obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    }
    handleMouseMove(ev: MouseEvent): void {
        const rc = this.canvas.viewport_rect;
        const e = new EvtMouseMove(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        } else {
            for (let i = 0; i < this._hitObjects.length; i++) {
                const obj = this._hitObjects[i];
                if (this.isValidObject(obj)) {
                    obj.triggerEx(e);
                    if (!e.bubble) {
                        break;
                    }
                }
            }
            if (e.bubble) {
                this.triggerEx(e);
            }
        }
    }
    handleClick(ev: MouseEvent): void {
        const rc = this.canvas.viewport_rect;
        const e = new EvtClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (let i = 0; i < this._hitObjects.length; i++) {
            const obj = this._hitObjects[i];
            if (this.isValidObject(obj)) {
                obj.triggerEx(e);
                if (!e.bubble) {
                    break;
                }
            }
        }
        if (e.bubble) {
            this.triggerEx(e);
        }
    }
    handleDblClick(ev: MouseEvent): void {
        const rc = this.canvas.viewport_rect;
        const e = new EvtDblClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (let i = 0; i < this._hitObjects.length; i++) {
            const obj = this._hitObjects[i];
            if (this.isValidObject(obj)) {
                obj.triggerEx(e);
                if (!e.bubble) {
                    break;
                }
            }
        }
        if (e.bubble) {
            this.triggerEx(e);
        }
    }
    setFocus(): void {
        Scene.setFocusView(this);
    }
    hitTest(x: number, y: number): HitTestResult {
        function hitTest_r(object: SceneObject, result: HitTestResult) {
            const pos = Matrix2d.invert(object.worldTransform).transformPoint({ x: x, y: y });
            const e = new EvtHitTest(pos.x, pos.y);
            object.triggerEx(e);
            if (e.result) {
                result.push(object);
            }
            object.forEachChild((child: SceneObject, index: number) => {
                hitTest_r(child, result);
            });
        }
        const hitTestResult: HitTestResult = [];
        if (this.rootNode) {
            hitTest_r(this.rootNode, hitTestResult);
            hitTestResult.sort(
                (a: SceneObject, b: SceneObject): number => {
                    return b.z - a.z;
                }
            );
        }
        return hitTestResult;
    }
    private isValidObject(object: SceneObject) {
        return object && object.view === this;
    }
    private genPageName(): string {
        let n = 1;
        while (true) {
            const name = `page${n++}`;
            if (!(name in this._pages)) {
                return name;
            }
        }
    }
    private applyPage(page: ISceneViewPage) {
        const color = page.bkColor || '';
        const url = (page.bkImageUrl && `url(${page.bkImageUrl})`) || '';
        const bkrepeat = page.bkImageRepeat || 'repeat';
        const bkattach = page.bkImageAttachment || 'scroll';
        const bkpos = '0% 0%';
        const bksize = page.bkImageSize || 'auto';
        this._canvas.canvas.style.background = `${color} ${url} ${bkrepeat} ${bkattach} ${bkpos} / ${bksize}`;
    }
}

export function ResizeSensor(element: HTMLElement, callback: Function) {
    let zIndex = parseInt(window.getComputedStyle(element).zIndex, 10);
    if (isNaN(zIndex)) {
        zIndex = 0;
    }
    zIndex--;

    let expand = document.createElement('div');
    expand.style.position = 'absolute';
    expand.style.left = '0px';
    expand.style.top = '0px';
    expand.style.right = '0px';
    expand.style.bottom = '0px';
    expand.style.overflow = 'hidden';
    expand.style.zIndex = String(zIndex);
    expand.style.visibility = 'hidden';

    let expandChild = document.createElement('div');
    expandChild.style.position = 'absolute';
    expandChild.style.left = '0px';
    expandChild.style.top = '0px';
    expandChild.style.width = '10000000px';
    expandChild.style.height = '10000000px';
    expand.appendChild(expandChild);

    let shrink = document.createElement('div');
    shrink.style.position = 'absolute';
    shrink.style.left = '0px';
    shrink.style.top = '0px';
    shrink.style.right = '0px';
    shrink.style.bottom = '0px';
    shrink.style.overflow = 'hidden';
    shrink.style.zIndex = String(zIndex);
    shrink.style.visibility = 'hidden';

    let shrinkChild = document.createElement('div');
    shrinkChild.style.position = 'absolute';
    shrinkChild.style.left = '0px';
    shrinkChild.style.top = '0px';
    shrinkChild.style.width = '200%';
    shrinkChild.style.height = '200%';
    shrink.appendChild(shrinkChild);

    element.appendChild(expand);
    element.appendChild(shrink);

    function setScroll() {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;

        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    }
    setScroll();

    let size = element.getBoundingClientRect();

    let currentWidth = size.width;
    let currentHeight = size.height;

    let onScroll = function() {
        let size = element.getBoundingClientRect();

        let newWidth = size.width;
        let newHeight = size.height;

        if (newWidth !== currentWidth || newHeight !== currentHeight) {
            currentWidth = newWidth;
            currentHeight = newHeight;

            callback();
        }

        setScroll();
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
}

export class Canvas extends BaseObject {
    private readonly _canvas: HTMLCanvasElement;
    private _view: SceneView;
    private _buffer: HTMLCanvasElement;
    private _screenCtx: CanvasRenderingContext2D;
    private _offscreenCtx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _doubleBuffer: boolean;
    constructor(view: SceneView, canvas: HTMLCanvasElement, doubleBuffer: boolean = false) {
        super();
        this._view = view;
        this._canvas = canvas;
        if (this._canvas) {
            this.adjustCanvasSize(this._canvas);
            ResizeSensor(this._canvas.parentElement, () => {
                this.adjustCanvasSize(this._canvas);
            });
        }
        this._mouseOver = false;
        this._doubleBuffer = doubleBuffer;
    }
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
    get context(): CanvasRenderingContext2D {
        return this._doubleBuffer ? this._offscreenCtx : this._screenCtx;
    }
    get viewport_rect(): { x: number; y: number; w: number; h: number } {
        const rc = this._canvas.getBoundingClientRect();
        const x = rc.left - document.documentElement.clientLeft;
        const y = rc.top - document.documentElement.clientTop;
        const w = rc.right - rc.left;
        const h = rc.bottom - rc.top;
        return { x: x, y: y, w: w, h: h };
    }
    clear(rect?: { x: number; y: number; w: number; h: number }): void {
        const x = rect ? rect.x : 0;
        const y = rect ? rect.y : 0;
        const w = rect ? rect.w : this._width;
        const h = rect ? rect.h : this._height;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(x, y, w, h);
        if (this._doubleBuffer) {
            this._screenCtx.clearRect(x, y, w, h);
        }
    }
    applyTransform(transform: Matrix2d): void {
        this.context.setTransform(transform.a, transform.b, transform.c, transform.d, Math.round(transform.e), Math.round(transform.f));
    }
    flip(): void {
        if (this._doubleBuffer) {
            this._screenCtx.drawImage(this._buffer, 0, 0);
        }
    }
    private adjustCanvasSize(canvas: HTMLCanvasElement) {
        const computedStyle = window.getComputedStyle(canvas.parentElement);
        this._width = canvas.parentElement.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
        this._height = canvas.parentElement.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._screenCtx = this._canvas.getContext('2d');
        this._buffer = document.createElement('canvas');
        this._buffer.width = this._width;
        this._buffer.height = this._height;
        this._offscreenCtx = this._buffer.getContext('2d');
        App.triggerEvent(null, new EvtCanvasResize(this._view));
    }
}
