var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Matrix2d } from './transform';
import { IntersectionTestShapePoint } from './intersect';
export var EventListenerOrder;
(function (EventListenerOrder) {
    EventListenerOrder[EventListenerOrder["FIRST"] = 1] = "FIRST";
    EventListenerOrder[EventListenerOrder["LAST"] = 2] = "LAST";
})(EventListenerOrder || (EventListenerOrder = {}));
var BaseEvent = /** @class */ (function () {
    function BaseEvent(type) {
        this.type = type;
        this.eaten = false;
    }
    BaseEvent.prototype.eat = function () {
        this.eaten = true;
    };
    return BaseEvent;
}());
export { BaseEvent };
var EvtComponentBeforeAttach = /** @class */ (function (_super) {
    __extends(EvtComponentBeforeAttach, _super);
    function EvtComponentBeforeAttach(object) {
        var _this = _super.call(this, EvtComponentBeforeAttach.type) || this;
        _this.object = object;
        _this.allow = true;
        return _this;
    }
    EvtComponentBeforeAttach.type = '@componentBeforeAttach';
    return EvtComponentBeforeAttach;
}(BaseEvent));
export { EvtComponentBeforeAttach };
var EvtComponentAttached = /** @class */ (function (_super) {
    __extends(EvtComponentAttached, _super);
    function EvtComponentAttached() {
        return _super.call(this, EvtComponentAttached.type) || this;
    }
    EvtComponentAttached.type = '@componentAttached';
    return EvtComponentAttached;
}(BaseEvent));
export { EvtComponentAttached };
var EvtComponentBeforeDetach = /** @class */ (function (_super) {
    __extends(EvtComponentBeforeDetach, _super);
    function EvtComponentBeforeDetach() {
        var _this = _super.call(this, EvtComponentBeforeDetach.type) || this;
        _this.allow = true;
        return _this;
    }
    EvtComponentBeforeDetach.type = '@componentBeforeDetach';
    return EvtComponentBeforeDetach;
}(BaseEvent));
export { EvtComponentBeforeDetach };
var EvtComponentDetached = /** @class */ (function (_super) {
    __extends(EvtComponentDetached, _super);
    function EvtComponentDetached() {
        return _super.call(this, EvtComponentDetached.type) || this;
    }
    EvtComponentDetached.type = '@componentDetached';
    return EvtComponentDetached;
}(BaseEvent));
export { EvtComponentDetached };
var EvtUpdate = /** @class */ (function (_super) {
    __extends(EvtUpdate, _super);
    function EvtUpdate(deltaTime, elapsedTime, frameStamp) {
        var _this = _super.call(this, EvtUpdate.type) || this;
        _this.deltaTime = deltaTime;
        _this.elapsedTime = elapsedTime;
        _this.frameStamp = frameStamp;
        return _this;
    }
    EvtUpdate.type = '@update';
    return EvtUpdate;
}(BaseEvent));
export { EvtUpdate };
var EvtCull = /** @class */ (function (_super) {
    __extends(EvtCull, _super);
    function EvtCull(w, h) {
        var _this = _super.call(this, EvtCull.type) || this;
        _this.canvasWidth = w;
        _this.canvasHeight = h;
        _this.result = {};
        return _this;
    }
    EvtCull.prototype.addObject = function (object, z, transform) {
        var objectList = this.result[z] || [];
        objectList.push({ object: object, z: z, transform: transform });
        this.result[z] = objectList;
    };
    EvtCull.type = '@cull';
    return EvtCull;
}(BaseEvent));
export { EvtCull };
var EvtDraw = /** @class */ (function (_super) {
    __extends(EvtDraw, _super);
    function EvtDraw(canvas, z, transform) {
        var _this = _super.call(this, EvtDraw.type) || this;
        _this.canvas = canvas;
        _this.z = z;
        _this.transform = transform;
        return _this;
    }
    EvtDraw.type = '@draw';
    return EvtDraw;
}(BaseEvent));
export { EvtDraw };
var EvtHitTest = /** @class */ (function (_super) {
    __extends(EvtHitTest, _super);
    function EvtHitTest(x, y) {
        var _this = _super.call(this, EvtHitTest.type) || this;
        _this.x = x;
        _this.y = y;
        _this.result = false;
        return _this;
    }
    EvtHitTest.type = '@hittest';
    return EvtHitTest;
}(BaseEvent));
export { EvtHitTest };
var EvtGetBoundingShape = /** @class */ (function (_super) {
    __extends(EvtGetBoundingShape, _super);
    function EvtGetBoundingShape() {
        return _super.call(this, EvtGetBoundingShape.type) || this;
    }
    EvtGetBoundingShape.type = '@getboundingshape';
    return EvtGetBoundingShape;
}(BaseEvent));
export { EvtGetBoundingShape };
var EvtFrame = /** @class */ (function (_super) {
    __extends(EvtFrame, _super);
    function EvtFrame(deltaTime, elapsedTime, frameStamp) {
        var _this = _super.call(this, EvtFrame.type) || this;
        _this.deltaTime = deltaTime;
        _this.elapsedTime = elapsedTime;
        _this.frameStamp = frameStamp;
        return _this;
    }
    EvtFrame.type = '@frame';
    return EvtFrame;
}(BaseEvent));
export { EvtFrame };
var EvtFocus = /** @class */ (function (_super) {
    __extends(EvtFocus, _super);
    function EvtFocus(focus) {
        var _this = _super.call(this, EvtFocus.type) || this;
        _this.focus = focus;
        return _this;
    }
    EvtFocus.type = '@focus';
    return EvtFocus;
}(BaseEvent));
export { EvtFocus };
var EvtKeyboard = /** @class */ (function (_super) {
    __extends(EvtKeyboard, _super);
    function EvtKeyboard(type, key, code, shift, alt, ctrl, meta) {
        var _this = _super.call(this, type) || this;
        _this.key = key;
        _this.keyCode = code;
        _this.shiftDown = shift;
        _this.altDown = alt;
        _this.ctrlDown = ctrl;
        _this.metaDown = meta;
        return _this;
    }
    return EvtKeyboard;
}(BaseEvent));
export { EvtKeyboard };
var EvtKeyDown = /** @class */ (function (_super) {
    __extends(EvtKeyDown, _super);
    function EvtKeyDown(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyDown.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyDown.type = '@keydown';
    return EvtKeyDown;
}(EvtKeyboard));
export { EvtKeyDown };
var EvtKeyUp = /** @class */ (function (_super) {
    __extends(EvtKeyUp, _super);
    function EvtKeyUp(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyUp.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyUp.type = '@keyup';
    return EvtKeyUp;
}(EvtKeyboard));
export { EvtKeyUp };
var EvtKeyPress = /** @class */ (function (_super) {
    __extends(EvtKeyPress, _super);
    function EvtKeyPress(key, code, shift, alt, ctrl, meta) {
        return _super.call(this, EvtKeyPress.type, key, code, shift, alt, ctrl, meta) || this;
    }
    EvtKeyPress.type = '@keypress';
    return EvtKeyPress;
}(EvtKeyboard));
export { EvtKeyPress };
var EvtMouse = /** @class */ (function (_super) {
    __extends(EvtMouse, _super);
    function EvtMouse(type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        var _this = _super.call(this, type) || this;
        _this.x = x;
        _this.y = y;
        _this.button = button;
        _this.shiftDown = shiftDown;
        _this.altDown = altDown;
        _this.ctrlDown = ctrlDown;
        _this.metaDown = metaDown;
        _this.bubble = true;
        return _this;
    }
    EvtMouse.prototype.cancelBubble = function () {
        this.bubble = false;
    };
    return EvtMouse;
}(BaseEvent));
export { EvtMouse };
var EvtMouseDown = /** @class */ (function (_super) {
    __extends(EvtMouseDown, _super);
    function EvtMouseDown(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseDown.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseDown.type = '@mousedown';
    return EvtMouseDown;
}(EvtMouse));
export { EvtMouseDown };
var EvtMouseUp = /** @class */ (function (_super) {
    __extends(EvtMouseUp, _super);
    function EvtMouseUp(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseUp.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseUp.type = '@mouseup';
    return EvtMouseUp;
}(EvtMouse));
export { EvtMouseUp };
var EvtMouseMove = /** @class */ (function (_super) {
    __extends(EvtMouseMove, _super);
    function EvtMouseMove(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtMouseMove.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtMouseMove.type = '@mousemove';
    return EvtMouseMove;
}(EvtMouse));
export { EvtMouseMove };
var EvtMouseEnter = /** @class */ (function (_super) {
    __extends(EvtMouseEnter, _super);
    function EvtMouseEnter() {
        return _super.call(this, EvtMouseEnter.type) || this;
    }
    EvtMouseEnter.type = '@mouseenter';
    return EvtMouseEnter;
}(BaseEvent));
export { EvtMouseEnter };
var EvtMouseLeave = /** @class */ (function (_super) {
    __extends(EvtMouseLeave, _super);
    function EvtMouseLeave() {
        return _super.call(this, EvtMouseLeave.type) || this;
    }
    EvtMouseLeave.type = '@mouseleave';
    return EvtMouseLeave;
}(BaseEvent));
export { EvtMouseLeave };
var EvtClick = /** @class */ (function (_super) {
    __extends(EvtClick, _super);
    function EvtClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtClick.type = '@click';
    return EvtClick;
}(EvtMouse));
export { EvtClick };
var EvtDblClick = /** @class */ (function (_super) {
    __extends(EvtDblClick, _super);
    function EvtDblClick(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        return _super.call(this, EvtDblClick.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
    }
    EvtDblClick.type = '@dblclick';
    return EvtDblClick;
}(EvtMouse));
export { EvtDblClick };
var EvtDragBegin = /** @class */ (function (_super) {
    __extends(EvtDragBegin, _super);
    function EvtDragBegin(x, y, button, shiftDown, altDown, ctrlDown, metaDown) {
        var _this = _super.call(this, EvtDragBegin.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = null;
        return _this;
    }
    EvtDragBegin.type = '@dragbegin';
    return EvtDragBegin;
}(EvtMouse));
export { EvtDragBegin };
var EvtDragEnd = /** @class */ (function (_super) {
    __extends(EvtDragEnd, _super);
    function EvtDragEnd(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
        var _this = _super.call(this, EvtDragEnd.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = data;
        return _this;
    }
    EvtDragEnd.type = '@dragend';
    return EvtDragEnd;
}(EvtMouse));
export { EvtDragEnd };
var EvtDragging = /** @class */ (function (_super) {
    __extends(EvtDragging, _super);
    function EvtDragging(x, y, button, shiftDown, altDown, ctrlDown, metaDown, data) {
        var _this = _super.call(this, EvtDragging.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.data = data;
        return _this;
    }
    EvtDragging.type = '@dragging';
    return EvtDragging;
}(EvtMouse));
export { EvtDragging };
var EvtDragOver = /** @class */ (function (_super) {
    __extends(EvtDragOver, _super);
    function EvtDragOver(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
        var _this = _super.call(this, EvtDragOver.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.object = object;
        _this.data = data;
        return _this;
    }
    EvtDragOver.type = '@dragover';
    return EvtDragOver;
}(EvtMouse));
export { EvtDragOver };
var EvtDragDrop = /** @class */ (function (_super) {
    __extends(EvtDragDrop, _super);
    function EvtDragDrop(x, y, button, shiftDown, altDown, ctrlDown, metaDown, object, data) {
        var _this = _super.call(this, EvtDragDrop.type, x, y, button, shiftDown, altDown, ctrlDown, metaDown) || this;
        _this.object = object;
        _this.data = data;
        return _this;
    }
    EvtDragDrop.type = '@dragdrop';
    return EvtDragDrop;
}(EvtMouse));
export { EvtDragDrop };
var EvtResize = /** @class */ (function (_super) {
    __extends(EvtResize, _super);
    function EvtResize() {
        return _super.call(this, EvtResize.type) || this;
    }
    EvtResize.type = '@resize';
    return EvtResize;
}(BaseEvent));
export { EvtResize };
var EvtCanvasResize = /** @class */ (function (_super) {
    __extends(EvtCanvasResize, _super);
    function EvtCanvasResize(view) {
        var _this = _super.call(this, EvtCanvasResize.type) || this;
        _this.view = view;
        return _this;
    }
    EvtCanvasResize.type = '@canvasresize';
    return EvtCanvasResize;
}(BaseEvent));
export { EvtCanvasResize };
var EvtGetProp = /** @class */ (function (_super) {
    __extends(EvtGetProp, _super);
    function EvtGetProp(propName) {
        var _this = _super.call(this, EvtGetProp.type) || this;
        _this.propName = propName;
        _this.propValue = undefined;
        return _this;
    }
    EvtGetProp.type = '@getprop';
    return EvtGetProp;
}(BaseEvent));
export { EvtGetProp };
var EvtSetProp = /** @class */ (function (_super) {
    __extends(EvtSetProp, _super);
    function EvtSetProp(propName, propValue) {
        var _this = _super.call(this, EvtSetProp.type) || this;
        _this.propName = propName;
        _this.propValue = propValue;
        return _this;
    }
    EvtSetProp.type = '@setprop';
    return EvtSetProp;
}(BaseEvent));
export { EvtSetProp };
var EvtSceneViewPageWillChange = /** @class */ (function (_super) {
    __extends(EvtSceneViewPageWillChange, _super);
    function EvtSceneViewPageWillChange(view, oldPage, newPage) {
        var _this = _super.call(this, EvtSceneViewPageWillChange.type) || this;
        _this.view = view;
        _this.oldPage = oldPage;
        _this.newPage = newPage;
        return _this;
    }
    EvtSceneViewPageWillChange.type = '@scenviewpagewillchange';
    return EvtSceneViewPageWillChange;
}(BaseEvent));
export { EvtSceneViewPageWillChange };
var EvtSceneViewPageChanged = /** @class */ (function (_super) {
    __extends(EvtSceneViewPageChanged, _super);
    function EvtSceneViewPageChanged(view, oldPage, newPage) {
        var _this = _super.call(this, EvtSceneViewPageChanged.type) || this;
        _this.view = view;
        _this.oldPage = oldPage;
        _this.newPage = newPage;
        return _this;
    }
    EvtSceneViewPageChanged.type = '@sceneviewpagechanged';
    return EvtSceneViewPageChanged;
}(BaseEvent));
export { EvtSceneViewPageChanged };
var EvtSysInfo = /** @class */ (function () {
    function EvtSysInfo() {
    }
    EvtSysInfo.isWindows = function () {
        return this._isWindows;
    };
    EvtSysInfo.isMac = function () {
        return this._isMac;
    };
    EvtSysInfo.isUnix = function () {
        return this._isX11 && !this._isWindows && !this._isMac;
    };
    EvtSysInfo.isLinux = function () {
        return this._isLinux;
    };
    EvtSysInfo.isAndroid = function () {
        return this._isLinux && this._isAndroid;
    };
    EvtSysInfo._isWindows = navigator.platform === 'Win32' || navigator.platform === 'Windows';
    EvtSysInfo._isMac = navigator.platform === 'Mac68K' || navigator.platform === 'MacPPC' || navigator.platform === 'Macintosh' || navigator.platform === 'MacIntel';
    EvtSysInfo._isX11 = navigator.platform === 'X11';
    EvtSysInfo._isLinux = String(navigator.platform).indexOf('Linux') >= 0;
    EvtSysInfo._isAndroid = (navigator.userAgent.toLowerCase().match(/android/i) || []).indexOf('android') >= 0;
    return EvtSysInfo;
}());
export { EvtSysInfo };
var EventObserver = /** @class */ (function () {
    function EventObserver() {
    }
    EventObserver.prototype.on = function (type, handler, order) {
        App.addEventListener(type, this, handler, order || EventListenerOrder.FIRST);
    };
    EventObserver.prototype.off = function (type, handler) {
        App.removeEventListener(type, this, handler);
    };
    EventObserver.prototype.trigger = function (evt) {
        App.triggerEvent(this, evt);
    };
    EventObserver.prototype.triggerEx = function (evt) {
        this.trigger(evt);
    };
    EventObserver.prototype.post = function (evt) {
        App.postEvent(this, evt);
    };
    return EventObserver;
}());
export { EventObserver };
var App = /** @class */ (function () {
    function App() {
    }
    App.postEvent = function (target, evt) {
        this.eventQueue.push({ evt: evt, target: target });
    };
    App.triggerEvent = function (target, evt) {
        this.processEvent(evt, target);
    };
    App.processPendingEvents = function () {
        var _this = this;
        var events = this.eventQueue;
        this.eventQueue = [];
        events.forEach(function (evt) {
            _this.processEvent(evt.evt, evt.target);
        });
    };
    App.addEventListener = function (eventType, bindObject, handler, order) {
        var handlerList = this.eventListeners[eventType] || [];
        for (var i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (order === EventListenerOrder.FIRST) {
                    handlerList[i].handlers = {
                        handler: handler,
                        next: handlerList[i].handlers
                    };
                }
                else {
                    var h = handlerList[i].handlers;
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
    };
    App.removeEventListener = function (eventType, bindObject, handler) {
        var handlerList = this.eventListeners[eventType] || [];
        for (var i = 0; i < handlerList.length; i++) {
            if (handlerList[i].bindObject === bindObject) {
                if (handler) {
                    var h = handlerList[i].handlers;
                    var ph = null;
                    while (h && h.handler !== handler) {
                        ph = h;
                        h = h.next;
                    }
                    if (h) {
                        if (ph) {
                            ph.next = h.next;
                        }
                        else {
                            handlerList[i].handlers = h.next;
                        }
                    }
                    if (!handlerList[i].handlers) {
                        handlerList.splice(i, 1);
                    }
                }
                else {
                    handlerList.splice(i, 1);
                    break;
                }
            }
        }
    };
    App.run = function () {
        function frame(ts) {
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
        if (!this.running) {
            this.running = true;
            this.lastFrameTime = 0;
            this.firstFrameTime = 0;
            this.elapsedTime = 0;
            this.deltaTime = 0;
            this.frameStamp = 0;
            this.init();
            requestAnimationFrame(frame);
        }
    };
    App.stop = function () {
        if (this.running) {
            this.running = false;
            this.done();
        }
    };
    App.addView = function (view) {
        if (view && view.canvas && !this.findView(view.canvas.canvas)) {
            this.views.push(view);
            if (!this.focusView) {
                this.setFocusView(view);
            }
            return true;
        }
        return false;
    };
    App.addCanvas = function (canvas, doubleBuffer) {
        if (!this.findView(canvas)) {
            var view = new SceneView(canvas, doubleBuffer === undefined ? false : doubleBuffer);
            return this.addView(view) ? view : null;
        }
        return null;
    };
    App.setFocusView = function (view) {
        if (this.focusView !== view) {
            if (this.focusView) {
                this.focusView.trigger(new EvtFocus(false));
            }
            this.focusView = view;
            if (this.focusView) {
                this.focusView.trigger(new EvtFocus(true));
            }
        }
    };
    App.findView = function (canvas) {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].canvas.canvas === canvas) {
                return this.views[i];
            }
        }
        return null;
    };
    App.removeView = function (canvas) {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].canvas.canvas === canvas) {
                this.views.splice(i, 1);
            }
        }
    };
    App.setCapture = function (view) {
        this.capturedView = view;
    };
    App.init = function () {
        this.initEventListeners();
    };
    App.done = function () {
        this.doneEventListeners();
    };
    App.processEvent = function (evt, target) {
        var handlerList = this.eventListeners[evt.type];
        if (handlerList) {
            for (var i = 0; i < handlerList.length; i++) {
                var entry = handlerList[i];
                if (!target || entry.bindObject === target) {
                    var h = entry.handlers;
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
    };
    App.hitView = function (x, y) {
        if (this.capturedView !== null) {
            return this.capturedView;
        }
        for (var i = 0; i < this.views.length; i++) {
            var view = this.views[i];
            var rc = view.canvas.viewport_rect;
            if (x >= rc.x && x < rc.x + rc.w && y >= rc.y && y < rc.y + rc.h) {
                return view;
            }
        }
        return null;
    };
    App.resizeHandler = function () {
        var e = new EvtResize();
        this.views.forEach(function (view) {
            view.triggerEx(e);
        });
    };
    App.mouseDownHandler = function (ev) {
        this.clickTick = Date.now();
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            view.handleMouseDown(ev);
        }
    };
    App.mouseUpHandler = function (ev) {
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== null) {
            var tick = Date.now();
            if (tick < this.clickTick + this.clickTime) {
                if (tick < this.dblClickTick + this.dblclickTime) {
                    view.handleDblClick(ev);
                    this.dblClickTick = 0;
                }
                else {
                    view.handleClick(ev);
                    this.dblClickTick = tick;
                }
            }
            else {
                this.dblClickTick = 0;
            }
            view.handleMouseUp(ev);
            this.clickTick = 0;
        }
        else {
            this.clickTick = 0;
            this.dblClickTick = 0;
        }
    };
    App.mouseMoveHandler = function (ev) {
        var view = this.hitView(ev.clientX, ev.clientY);
        if (view !== this.hoverView) {
            if (this.hoverView) {
                this.hoverView.triggerEx(new EvtMouseLeave());
                this.hoverView = null;
            }
            if (view !== null) {
                this.hoverView = view;
                view.triggerEx(new EvtMouseEnter());
            }
        }
        if (view !== null) {
            var rc = view.canvas.viewport_rect;
            view.updateHitObjects(ev.clientX - rc.x, ev.clientY - rc.y);
            view.handleMouseMove(ev);
        }
    };
    App.keyDownHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyDown(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.keyUpHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyUp(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.keyPressHandler = function (ev) {
        if (this.focusView) {
            this.focusView.trigger(new EvtKeyPress(ev.key, ev.keyCode, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey));
        }
    };
    App.initEventListeners = function () {
        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', this.mouseDownHandler);
        window.addEventListener(window.onpointerup ? 'pointerup' : 'mouseup', this.mouseUpHandler);
        window.addEventListener(window.onpointermove ? 'pointermove' : 'mousemove', this.mouseMoveHandler);
        window.addEventListener('keydown', this.keyDownHandler);
        window.addEventListener('keyup', this.keyUpHandler);
        window.addEventListener('keypress', this.keyPressHandler);
    };
    App.doneEventListeners = function () {
        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener(window.onpointerdown ? 'pointerdown' : 'mousedown', this.mouseDownHandler);
        window.removeEventListener(window.onpointerup ? 'pointerup' : 'mouseup', this.mouseUpHandler);
        window.removeEventListener(window.onpointermove ? 'pointermove' : 'mousemove', this.mouseMoveHandler);
        window.removeEventListener('keydown', this.keyDownHandler);
        window.removeEventListener('keyup', this.keyUpHandler);
        window.removeEventListener('keypress', this.keyPressHandler);
    };
    App.elapsedTime = 0;
    App.deltaTime = 0;
    App.eventQueue = [];
    App.eventListeners = {};
    App.running = false;
    App.lastFrameTime = 0;
    App.firstFrameTime = 0;
    App.frameStamp = 0;
    App.capturedView = null;
    App.hoverView = null;
    App.focusView = null;
    App.views = [];
    App.clickTick = 0;
    App.dblClickTick = 0;
    App.clickTime = 400;
    App.dblclickTime = 400;
    return App;
}());
export { App };
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.object = null;
        return _this;
    }
    Component.prototype.toString = function () {
        return "<Component: " + this.type + ">";
    };
    return Component;
}(EventObserver));
export { Component };
var BaseObject = /** @class */ (function (_super) {
    __extends(BaseObject, _super);
    function BaseObject() {
        var _this = _super.call(this) || this;
        _this.components = {};
        return _this;
    }
    BaseObject.prototype.toString = function () {
        return '<BaseObject>';
    };
    BaseObject.prototype.addComponent = function (component) {
        if (component.object === null) {
            var componentArray = this.components[component.type] || [];
            if (componentArray.indexOf(component) < 0) {
                var ev = new EvtComponentBeforeAttach(this);
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
    };
    BaseObject.prototype.removeComponent = function (component) {
        if (component.object === this) {
            var index = this.components[component.type].indexOf(component);
            this.removeComponentByIndex(component.type, index);
        }
        return this;
    };
    BaseObject.prototype.removeComponentByIndex = function (type, index) {
        var components = this.components[type];
        if (components && index >= 0 && index < components.length) {
            var ev = new EvtComponentBeforeDetach();
            components[index].trigger(ev);
            if (ev.allow) {
                components[index].trigger(new EvtComponentDetached());
                components[index].object = null;
                components.splice(index, 1);
            }
        }
        return this;
    };
    BaseObject.prototype.removeComponentsByType = function (type) {
        var components = this.components[type];
        while (components && components.length > 0) {
            this.removeComponentByIndex(type, components.length - 1);
        }
        return this;
    };
    BaseObject.prototype.removeAllComponents = function () {
        var _this = this;
        Object.keys(this.components).forEach(function (type) {
            _this.removeComponentsByType(type);
        });
        return this;
    };
    BaseObject.prototype.getComponent = function (type, index) {
        if (index === void 0) { index = 0; }
        var componentArray = this.components[type];
        if (componentArray === undefined || index < 0 || componentArray.length <= index) {
            return null;
        }
        return componentArray[index];
    };
    BaseObject.prototype.getComponents = function (type) {
        return this.components[type];
    };
    BaseObject.prototype.triggerEx = function (evt) {
        _super.prototype.trigger.call(this, evt);
        for (var c in this.components) {
            if (this.components.hasOwnProperty(c)) {
                this.components[c].forEach(function (comp) {
                    comp.trigger(evt);
                });
            }
        }
    };
    BaseObject.prototype.post = function (evt) {
        App.postEvent(this, evt);
    };
    return BaseObject;
}(EventObserver));
export { BaseObject };
var SceneObject = /** @class */ (function (_super) {
    __extends(SceneObject, _super);
    function SceneObject(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this) || this;
        _this._view = null;
        _this._parent = null;
        _this._z = 0;
        _this._visible = true;
        _this._children = [];
        _this._localTransform = new Matrix2d();
        _this._worldTranslation = null;
        _this._worldRotation = null;
        _this._worldScale = null;
        _this._anchorPoint = { x: 0, y: 0 };
        if (parent) {
            parent.addChild(_this);
        }
        _this.on(EvtCull.type, function (evt) {
            evt.addObject(_this, _this.z, _this.worldTransform);
        });
        _this.on(EvtHitTest.type, function (evt) {
            var shape = _this.boundingShape;
            evt.result = shape ? IntersectionTestShapePoint(shape, { x: evt.x, y: evt.y }) : false;
        });
        _this.on(EvtGetProp.type, function (ev) {
            switch (ev.propName) {
                case 'z':
                    ev.propValue = _this.z;
                    ev.eat();
                    break;
                case 'visible':
                    ev.propValue = _this.visible;
                    ev.eat();
                    break;
                case 'transform':
                    ev.propValue = _this.localTransform;
                    ev.eat();
                    break;
                case 'translation':
                    var t = _this.translation;
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'scale':
                    var s = _this.scale;
                    ev.propValue = [t.x, t.y];
                    ev.eat();
                    break;
                case 'rotation':
                    ev.propValue = _this.rotation;
                    ev.eat();
                    break;
                case 'anchorPoint':
                    ev.propValue = _this.anchorPoint;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        _this.on(EvtSetProp.type, function (ev) {
            switch (ev.propName) {
                case 'z':
                    _this.z = ev.propValue;
                    ev.eat();
                    break;
                case 'visible':
                    _this.visible = ev.propValue;
                    ev.eat();
                    break;
                case 'transform':
                    _this.localTransform = ev.propValue;
                    ev.eat();
                    break;
                case 'translation':
                    var t = ev.propValue;
                    _this.translation = { x: Math.round(t[0]), y: Math.round(t[1]) };
                    break;
                case 'scale':
                    var s = ev.propValue;
                    _this.scale = { x: s[0], y: s[1] };
                    break;
                case 'rotation':
                    _this.rotation = ev.propValue;
                    break;
                case 'anchorPoint':
                    _this.anchorPoint = ev.propValue;
                    break;
                default:
                    break;
            }
        });
        return _this;
    }
    Object.defineProperty(SceneObject.prototype, "boundingShape", {
        get: function () {
            var ev = new EvtGetBoundingShape();
            this.triggerEx(ev);
            return ev.shape || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (v) {
            this._view = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this.setZ(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setZ = function (value) {
        this._z = value;
    };
    Object.defineProperty(SceneObject.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this.setVisible(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setVisible = function (value) {
        this._visible = value;
    };
    Object.defineProperty(SceneObject.prototype, "localTransform", {
        get: function () {
            return this._localTransform;
        },
        set: function (t) {
            this.setLocalTransform(t);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setLocalTransform = function (t) {
        this._localTransform = t;
    };
    Object.defineProperty(SceneObject.prototype, "translation", {
        get: function () {
            return this.localTransform.getTranslationPart();
        },
        set: function (t) {
            this.setTranslation(t);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setTranslation = function (t) {
        this.localTransform.setTranslationPart(t);
    };
    Object.defineProperty(SceneObject.prototype, "scale", {
        get: function () {
            return this.localTransform.getScalePart();
        },
        set: function (s) {
            this.setScale(s);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setScale = function (s) {
        this.localTransform.setScalePart(s);
    };
    Object.defineProperty(SceneObject.prototype, "rotation", {
        get: function () {
            return this.localTransform.getRotationPart();
        },
        set: function (r) {
            this.setRotation(r);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setRotation = function (r) {
        this.localTransform.setRotationPart(r);
    };
    Object.defineProperty(SceneObject.prototype, "worldTransform", {
        get: function () {
            var t = this.parent ? Matrix2d.transform(this.parent.worldTransform, this.localTransform) : this.localTransform;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneObject.prototype, "worldTranslation", {
        get: function () {
            return this._worldTranslation;
        },
        set: function (value) {
            this.setWorldTranslation(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldTranslation = function (value) {
        this._worldTranslation = value === null ? null : { x: Math.round(value.x), y: Math.round(value.y) };
    };
    Object.defineProperty(SceneObject.prototype, "worldRotation", {
        get: function () {
            return this._worldRotation;
        },
        set: function (value) {
            this.setWorldRotation(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldRotation = function (value) {
        this._worldRotation = value;
    };
    Object.defineProperty(SceneObject.prototype, "worldScale", {
        get: function () {
            return this._worldScale;
        },
        set: function (value) {
            this.setWorldScale(value);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setWorldScale = function (value) {
        this._worldScale = value;
    };
    Object.defineProperty(SceneObject.prototype, "anchorPoint", {
        get: function () {
            return this._anchorPoint;
        },
        set: function (pt) {
            this.setAnchorPoint(pt);
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.setAnchorPoint = function (pt) {
        this._anchorPoint = pt;
    };
    Object.defineProperty(SceneObject.prototype, "numChildren", {
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    SceneObject.prototype.collapseTransform = function () {
        var wt = this.worldTransform;
        this.worldTranslation = null;
        this.worldRotation = null;
        this.worldScale = null;
        if (this.parent) {
            this.localTransform = Matrix2d.invert(this.parent.worldTransform).transform(wt);
        }
        else {
            this.localTransform = wt;
        }
        this.localTransform.e = Math.round(this.localTransform.e);
        this.localTransform.f = Math.round(this.localTransform.f);
    };
    SceneObject.prototype.getLocalPoint = function (x, y) {
        return Matrix2d.invert(this.worldTransform).transformPoint({ x: x, y: y });
    };
    SceneObject.prototype.childAt = function (index) {
        return this._children[index];
    };
    SceneObject.prototype.forEachChild = function (callback) {
        this._children.forEach(callback);
    };
    SceneObject.prototype.addChild = function (child) {
        if (child._parent === null) {
            child._parent = this;
            child._view = this._view;
            this._children.push(child);
        }
    };
    SceneObject.prototype.removeChild = function (child) {
        if (child._parent === this) {
            var index = this._children.indexOf(child);
            this.removeChildAt(index);
        }
    };
    SceneObject.prototype.removeChildAt = function (index) {
        if (index >= 0 && index < this._children.length) {
            var child = this._children[index];
            this._children.splice(index, 1);
            child._parent = null;
            child._view = null;
        }
    };
    SceneObject.prototype.removeChildren = function () {
        while (this._children.length > 0) {
            this.removeChildAt(0);
        }
    };
    SceneObject.prototype.unrefChildren = function () {
        while (this._children.length > 0) {
            this._children[0].unrefChildren();
            this.removeChildAt(0);
        }
    };
    SceneObject.prototype.remove = function () {
        if (this._parent) {
            this._parent.removeChild(this);
        }
    };
    SceneObject.prototype.triggerRecursive = function (evt) {
        _super.prototype.trigger.call(this, evt);
        this.forEachChild(function (child, index) {
            child.triggerRecursive(evt);
        });
    };
    SceneObject.prototype.triggerRecursiveEx = function (evt) {
        _super.prototype.triggerEx.call(this, evt);
        this.forEachChild(function (child, index) {
            child.triggerRecursiveEx(evt);
        });
    };
    SceneObject.prototype.setCapture = function () {
        this._view && this._view.setCaptureObject(this);
    };
    SceneObject.prototype.releaseCapture = function () {
        this._view && this._view.captureObject === this && this._view.setCaptureObject(null);
    };
    SceneObject.prototype.toString = function () {
        return '<SceneObject>';
    };
    return SceneObject;
}(BaseObject));
export { SceneObject };
var SceneView = /** @class */ (function (_super) {
    __extends(SceneView, _super);
    function SceneView(canvas, doubleBuffer) {
        if (doubleBuffer === void 0) { doubleBuffer = false; }
        var _this = _super.call(this) || this;
        _this._canvas = new Canvas(_this, canvas, doubleBuffer);
        _this._captureObject = null;
        _this._hitObjects = [];
        _this._currentPage = null;
        _this._pages = {};
        var rootNode = new SceneObject();
        rootNode.view = _this;
        _this.addPage({
            name: 'page1',
            rootNode: rootNode,
            bkImageUrl: null,
            bkImageRepeat: null,
            bkImageSize: null,
            bkImageAttachment: null,
            bkColor: '#ffffff'
        });
        _this.selectPage('page1');
        _this.on(EvtFrame.type, function (ev) {
            var updateEvent = new EvtUpdate(ev.deltaTime, ev.elapsedTime, ev.frameStamp);
            if (_this.rootNode) {
                _this.rootNode.triggerRecursiveEx(updateEvent);
            }
            _this.canvas.clear();
            _this.triggerEx(new EvtDraw(_this.canvas, 0, new Matrix2d()));
            _this.canvas.flip();
        });
        _this.on(EvtDraw.type, function (ev) {
            if (_this.rootNode) {
                var cullEvent = new EvtCull(ev.canvas.width, ev.canvas.height);
                _this.rootNode.triggerRecursiveEx(cullEvent);
                for (var i in cullEvent.result) {
                    var group = cullEvent.result[i];
                    for (var j = 0; j < group.length; j++) {
                        ev.canvas.context.save();
                        ev.canvas.applyTransform(group[j].transform);
                        ev.canvas.context.translate(0.5, 0.5);
                        group[j].object.triggerEx(new EvtDraw(ev.canvas, group[j].z, group[j].transform));
                        ev.canvas.context.restore();
                    }
                }
            }
        });
        return _this;
    }
    SceneView.prototype.forEachPage = function (callback) {
        if (callback) {
            for (var name_1 in this._pages) {
                callback({
                    name: name_1,
                    rootNode: this._pages[name_1].rootNode,
                    bkImageUrl: this._pages[name_1].bkImageUrl,
                    bkImageRepeat: this._pages[name_1].bkImageRepeat,
                    bkImageAttachment: this._pages[name_1].bkImageAttachment,
                    bkImageSize: this._pages[name_1].bkImageSize,
                    bkColor: this._pages[name_1].bkColor
                });
            }
        }
    };
    SceneView.prototype.addPage = function (page) {
        var defaultPage = {
            name: null,
            rootNode: null,
            bkImageUrl: null,
            bkImageRepeat: 'repeat',
            bkImageAttachment: 'scroll',
            bkImageSize: 'auto',
            bkColor: '#ffffff'
        };
        var p = page || defaultPage;
        var name = p.name || this.genPageName();
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
    };
    SceneView.prototype.removePage = function (name) {
        if (name in this._pages) {
            if (name === this._currentPage) {
                var b = false;
                for (var n in this._pages) {
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
    };
    SceneView.prototype.selectPage = function (name) {
        var oldName = this._currentPage;
        if (name in this._pages && name !== oldName) {
            App.triggerEvent(null, new EvtSceneViewPageWillChange(this, oldName, name));
            this._currentPage = name;
            this._captureObject = null;
            this._hitObjects.length = 0;
            this.applyPage(this._pages[this._currentPage]);
            App.triggerEvent(null, new EvtSceneViewPageChanged(this, oldName, name));
        }
    };
    SceneView.prototype.renamePage = function (oldName, newName) {
        if (oldName in this._pages && newName && newName !== oldName && !(newName in this._pages)) {
            var page = this._pages[oldName];
            delete this._pages[oldName];
            page.name = newName;
            this._pages[newName] = page;
        }
    };
    Object.defineProperty(SceneView.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImage", {
        get: function () {
            return this._pages[this._currentPage].bkImageUrl;
        },
        set: function (image) {
            if (image !== this._pages[this._currentPage].bkImageUrl) {
                this._pages[this._currentPage].bkImageUrl = image;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageRepeat", {
        get: function () {
            return this._pages[this._currentPage].bkImageRepeat;
        },
        set: function (value) {
            var repeat = value || 'repeat';
            if (repeat !== this._pages[this._currentPage].bkImageRepeat) {
                this._pages[this._currentPage].bkImageRepeat = repeat;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageAttachment", {
        get: function () {
            return this._pages[this._currentPage].bkImageAttachment;
        },
        set: function (value) {
            var attach = value || 'scroll';
            if (attach !== this._pages[this._currentPage].bkImageAttachment) {
                this._pages[this._currentPage].bkImageAttachment = attach;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageImageSize", {
        get: function () {
            return this._pages[this._currentPage].bkImageSize;
        },
        set: function (value) {
            var size = value || 'auto';
            if (size !== this._pages[this._currentPage].bkImageSize) {
                this._pages[this._currentPage].bkImageSize = size;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "pageColor", {
        get: function () {
            return this._pages[this._currentPage].bkColor;
        },
        set: function (color) {
            if (color !== this._pages[this._currentPage].bkColor) {
                this._pages[this._currentPage].bkColor = color;
                this.applyPage(this._pages[this._currentPage]);
            }
        },
        enumerable: true,
        configurable: true
    });
    SceneView.prototype.updateHitObjects = function (x, y) {
        var hitTestResult = this.hitTest(x, y);
        for (var i = 0; i < this._hitObjects.length;) {
            if (hitTestResult.indexOf(this._hitObjects[i]) < 0) {
                this._hitObjects[i].trigger(new EvtMouseLeave());
                this._hitObjects.splice(i, 1);
            }
            else {
                i++;
            }
        }
        for (var i = 0; i < hitTestResult.length; i++) {
            if (this._hitObjects.indexOf(hitTestResult[i]) < 0) {
                hitTestResult[i].trigger(new EvtMouseEnter());
            }
        }
        this._hitObjects = hitTestResult;
        this._hitObjects.push(this.rootNode);
    };
    Object.defineProperty(SceneView.prototype, "rootNode", {
        get: function () {
            return this._pages[this._currentPage].rootNode;
        },
        set: function (node) {
            if (this._pages[this._currentPage].rootNode !== node) {
                this._pages[this._currentPage].rootNode = node;
                this._hitObjects.length = 0;
                this._captureObject = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "captureObject", {
        get: function () {
            return this._captureObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneView.prototype, "hitObjects", {
        get: function () {
            return this._hitObjects;
        },
        enumerable: true,
        configurable: true
    });
    SceneView.prototype.setCaptureObject = function (object) {
        this._captureObject = object;
    };
    SceneView.prototype.handleMouseDown = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseDown(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
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
    };
    SceneView.prototype.handleMouseUp = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseUp(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
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
    };
    SceneView.prototype.handleMouseMove = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtMouseMove(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        if (this.isValidObject(this._captureObject)) {
            this._captureObject.triggerEx(e);
        }
        else {
            for (var i = 0; i < this._hitObjects.length; i++) {
                var obj = this._hitObjects[i];
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
    };
    SceneView.prototype.handleClick = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (var i = 0; i < this._hitObjects.length; i++) {
            var obj = this._hitObjects[i];
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
    };
    SceneView.prototype.handleDblClick = function (ev) {
        var rc = this.canvas.viewport_rect;
        var e = new EvtDblClick(ev.clientX - rc.x, ev.clientY - rc.y, ev.button, ev.shiftKey, ev.altKey, ev.ctrlKey, ev.metaKey);
        for (var i = 0; i < this._hitObjects.length; i++) {
            var obj = this._hitObjects[i];
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
    };
    SceneView.prototype.setFocus = function () {
        App.setFocusView(this);
    };
    SceneView.prototype.hitTest = function (x, y) {
        function hitTest_r(object, result) {
            var pos = Matrix2d.invert(object.worldTransform).transformPoint({ x: x, y: y });
            var e = new EvtHitTest(pos.x, pos.y);
            object.triggerEx(e);
            if (e.result) {
                result.push(object);
            }
            object.forEachChild(function (child, index) {
                hitTest_r(child, result);
            });
        }
        var hitTestResult = [];
        if (this.rootNode) {
            hitTest_r(this.rootNode, hitTestResult);
            hitTestResult.sort(function (a, b) {
                return b.z - a.z;
            });
        }
        return hitTestResult;
    };
    SceneView.prototype.isValidObject = function (object) {
        return object && object.view === this;
    };
    SceneView.prototype.genPageName = function () {
        var n = 1;
        while (true) {
            var name_2 = "page" + n++;
            if (!(name_2 in this._pages)) {
                return name_2;
            }
        }
    };
    SceneView.prototype.applyPage = function (page) {
        var color = page.bkColor || '';
        var url = (page.bkImageUrl && "url(" + page.bkImageUrl + ")") || '';
        var bkrepeat = page.bkImageRepeat || 'repeat';
        var bkattach = page.bkImageAttachment || 'scroll';
        var bkpos = '0% 0%';
        var bksize = page.bkImageSize || 'auto';
        this._canvas.canvas.style.background = color + " " + url + " " + bkrepeat + " " + bkattach + " " + bkpos + " / " + bksize;
    };
    return SceneView;
}(BaseObject));
export { SceneView };
export function ResizeSensor(element, callback) {
    var zIndex = parseInt(window.getComputedStyle(element).zIndex, 10);
    if (isNaN(zIndex)) {
        zIndex = 0;
    }
    zIndex--;
    var expand = document.createElement('div');
    expand.style.position = 'absolute';
    expand.style.left = '0px';
    expand.style.top = '0px';
    expand.style.right = '0px';
    expand.style.bottom = '0px';
    expand.style.overflow = 'hidden';
    expand.style.zIndex = String(zIndex);
    expand.style.visibility = 'hidden';
    var expandChild = document.createElement('div');
    expandChild.style.position = 'absolute';
    expandChild.style.left = '0px';
    expandChild.style.top = '0px';
    expandChild.style.width = '10000000px';
    expandChild.style.height = '10000000px';
    expand.appendChild(expandChild);
    var shrink = document.createElement('div');
    shrink.style.position = 'absolute';
    shrink.style.left = '0px';
    shrink.style.top = '0px';
    shrink.style.right = '0px';
    shrink.style.bottom = '0px';
    shrink.style.overflow = 'hidden';
    shrink.style.zIndex = String(zIndex);
    shrink.style.visibility = 'hidden';
    var shrinkChild = document.createElement('div');
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
    var size = element.getBoundingClientRect();
    var currentWidth = size.width;
    var currentHeight = size.height;
    var onScroll = function () {
        var size = element.getBoundingClientRect();
        var newWidth = size.width;
        var newHeight = size.height;
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
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(view, canvas, doubleBuffer) {
        if (doubleBuffer === void 0) { doubleBuffer = false; }
        var _this = _super.call(this) || this;
        _this._view = view;
        _this._canvas = canvas;
        if (_this._canvas) {
            _this.adjustCanvasSize(_this._canvas);
            ResizeSensor(_this._canvas.parentElement, function () {
                _this.adjustCanvasSize(_this._canvas);
            });
        }
        _this._mouseOver = false;
        _this._doubleBuffer = doubleBuffer;
        return _this;
    }
    Object.defineProperty(Canvas.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "context", {
        get: function () {
            return this._doubleBuffer ? this._offscreenCtx : this._screenCtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "viewport_rect", {
        get: function () {
            var rc = this._canvas.getBoundingClientRect();
            var x = rc.left - document.documentElement.clientLeft;
            var y = rc.top - document.documentElement.clientTop;
            var w = rc.right - rc.left;
            var h = rc.bottom - rc.top;
            return { x: x, y: y, w: w, h: h };
        },
        enumerable: true,
        configurable: true
    });
    Canvas.prototype.clear = function (rect) {
        var x = rect ? rect.x : 0;
        var y = rect ? rect.y : 0;
        var w = rect ? rect.w : this._width;
        var h = rect ? rect.h : this._height;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(x, y, w, h);
        if (this._doubleBuffer) {
            this._screenCtx.clearRect(x, y, w, h);
        }
    };
    Canvas.prototype.applyTransform = function (transform) {
        this.context.setTransform(transform.a, transform.b, transform.c, transform.d, Math.round(transform.e), Math.round(transform.f));
    };
    Canvas.prototype.flip = function () {
        if (this._doubleBuffer) {
            this._screenCtx.drawImage(this._buffer, 0, 0);
        }
    };
    Canvas.prototype.adjustCanvasSize = function (canvas) {
        var computedStyle = window.getComputedStyle(canvas.parentElement);
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
    };
    return Canvas;
}(BaseObject));
export { Canvas };
//# sourceMappingURL=core.js.map