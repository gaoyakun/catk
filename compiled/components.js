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
import { Component, App, EvtCull, EvtDragging, EvtDragEnd, EvtDraw, EvtUpdate, EvtGetProp, EvtSetProp, EvtMouseMove, EvtMouseDown, EvtMouseUp, EvtDragBegin, EvtDragDrop, EvtDragOver, EvtComponentBeforeAttach, EvtGetBoundingShape } from './core';
import { Spline, SplineType } from './curve';
import { BoundingBox } from './boundingbox';
var CoKeyframeAnimation = /** @class */ (function (_super) {
    __extends(CoKeyframeAnimation, _super);
    function CoKeyframeAnimation(options) {
        var _this = _super.call(this, CoKeyframeAnimation.type) || this;
        _this._tracks = {};
        _this._duration = 0;
        _this._startTime = 0;
        _this._round = 0;
        var opt = options || {};
        _this._delay = opt.delay === undefined ? 0 : opt.delay;
        _this._repeat = opt.repeat === undefined ? 0 : opt.repeat;
        _this._autoRemove = opt.autoRemove === undefined ? true : opt.autoRemove;
        _this._exclusive = !!opt.exclusive;
        if (opt.tracks) {
            for (var trackName in opt.tracks) {
                if (opt.tracks.hasOwnProperty(trackName)) {
                    var trackinfo = opt.tracks[trackName];
                    var type = trackinfo.type === undefined ? SplineType.POLY : trackinfo.type;
                    var clamp = trackinfo.clamp === undefined ? true : trackinfo.clamp;
                    _this.setTrack(trackName, type, clamp, trackinfo.cp);
                }
            }
        }
        _this.on(EvtComponentBeforeAttach.type, function (ev) {
            if (_this._exclusive) {
                ev.object.removeComponentsByType(_this.type);
            }
        });
        _this.on(EvtUpdate.type, function (e) {
            var timeNow = e.elapsedTime;
            if (_this._startTime === 0) {
                _this._startTime = timeNow;
            }
            if (_this._startTime + _this._delay > timeNow) {
                return;
            }
            var t = timeNow - _this._startTime - _this._delay;
            for (var track in _this._tracks) {
                if (_this._tracks.hasOwnProperty(track)) {
                    _this._tracks[track].value = _this._tracks[track].evalutor.eval(t);
                }
            }
            if (_this.object) {
                for (var prop in _this._tracks) {
                    if (_this._tracks.hasOwnProperty(prop)) {
                        _this.object.triggerEx(new EvtSetProp(prop, _this._tracks[prop].value));
                    }
                }
            }
            if (t >= _this._duration) {
                _this._round++;
                if (_this._repeat === 0 || _this._round < _this._repeat) {
                    _this._startTime = timeNow + t - _this._duration;
                }
                else if (_this._autoRemove) {
                    _this.object.removeComponent(_this);
                }
            }
        });
        return _this;
    }
    Object.defineProperty(CoKeyframeAnimation.prototype, "repeat", {
        get: function () {
            return this._repeat;
        },
        set: function (val) {
            this._repeat = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoKeyframeAnimation.prototype, "autoRemove", {
        get: function () {
            return this._autoRemove;
        },
        set: function (val) {
            this._autoRemove = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoKeyframeAnimation.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (delay) {
            this._delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    CoKeyframeAnimation.prototype.setTrack = function (name, type, clamp, keyFrames) {
        if (keyFrames.length > 0) {
            if (keyFrames[keyFrames.length - 1].x > this._duration) {
                this._duration = keyFrames[keyFrames.length - 1].x;
            }
            this._tracks[name] = { evalutor: new Spline(type, keyFrames, clamp), value: null };
        }
    };
    CoKeyframeAnimation.prototype.finish = function () {
        for (var track in this._tracks) {
            this._tracks[track].value = this._tracks[track].evalutor.evalLast();
        }
        if (this.object) {
            for (var prop in this._tracks) {
                this.object.triggerEx(new EvtSetProp(prop, this._tracks[prop].value));
            }
        }
        this._round++;
        if (this._repeat === 0 || this._round < this._repeat) {
            this._startTime = App.elapsedTime;
        }
        else if (this._autoRemove) {
            this.object.removeComponent(this);
        }
    };
    CoKeyframeAnimation.type = 'KeyframeAnimation';
    return CoKeyframeAnimation;
}(Component));
export { CoKeyframeAnimation };
var CoDraggable = /** @class */ (function (_super) {
    __extends(CoDraggable, _super);
    function CoDraggable() {
        var _this = _super.call(this, CoDraggable.type) || this;
        _this._dragging = false;
        _this._draggingData = null;
        _this.on(EvtMouseDown.type, function (e) {
            var obj = _this.object;
            obj.setCapture();
            _this._dragging = true;
            var dragBeginEvent = new EvtDragBegin(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown);
            obj.triggerEx(dragBeginEvent);
            _this._draggingData = dragBeginEvent.data;
            e.cancelBubble();
        });
        _this.on(EvtMouseUp.type, function (e) {
            var obj = _this.object;
            obj.releaseCapture();
            if (_this._dragging) {
                var dragendEvent = new EvtDragEnd(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
                obj.triggerEx(dragendEvent);
                _this._dragging = false;
                obj.view.updateHitObjects(e.x, e.y);
                var dragDropEvent = new EvtDragDrop(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
                for (var i = 0; i < obj.view.hitObjects.length; i++) {
                    var hitObj = obj.view.hitObjects[i];
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
                _this._draggingData = null;
                e.cancelBubble();
            }
        });
        _this.on(EvtMouseMove.type, function (e) {
            if (_this._dragging) {
                var draggingEvent = new EvtDragging(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, _this._draggingData);
                _this.object.triggerEx(draggingEvent);
                var obj = _this.object;
                obj.view.updateHitObjects(e.x, e.y);
                var dragOverEvent = new EvtDragOver(e.x, e.y, e.button, e.shiftDown, e.altDown, e.ctrlDown, e.metaDown, obj, _this._draggingData);
                for (var i = 0; i < obj.view.hitObjects.length; i++) {
                    var hitObj = obj.view.hitObjects[i];
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
        return _this;
    }
    CoDraggable.type = 'Draggable';
    return CoDraggable;
}(Component));
export { CoDraggable };
var CoDroppable = /** @class */ (function (_super) {
    __extends(CoDroppable, _super);
    function CoDroppable() {
        return _super.call(this, CoDroppable.type) || this;
    }
    CoDroppable.type = 'Droppable';
    return CoDroppable;
}(Component));
export { CoDroppable };
var CoImage = /** @class */ (function (_super) {
    __extends(CoImage, _super);
    function CoImage(filename, width, height) {
        if (filename === void 0) { filename = null; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this, CoImage.type) || this;
        _this._image = new Image();
        if (filename) {
            _this._image.src = filename;
        }
        if (width) {
            _this._image.width = width;
            _this._width = width;
        }
        else {
            _this._width = _this._image.complete ? _this._image.width : 0;
        }
        if (height) {
            _this._image.height = height;
            _this._height = height;
        }
        else {
            _this._height = _this._image.complete ? _this._image.height : 0;
        }
        if (!_this._image.complete) {
            _this._loaded = false;
            _this._image.onload = function () {
                if (_this._width === 0) {
                    _this._width = _this._image.width;
                }
                if (_this._height === 0) {
                    _this._height = _this._image.height;
                }
                _this._loaded = true;
            };
        }
        else {
            _this._loaded = true;
        }
        _this.on(EvtCull.type, function (evt) {
            if (_this._loaded) {
                var node = _this.object;
                evt.addObject(_this, node.z, node.worldTransform);
            }
        });
        _this.on(EvtGetBoundingShape.type, function (evt) {
            if (_this._loaded) {
                evt.shape = new BoundingBox({ x: -_this._width * _this.object.anchorPoint.x, y: -_this._height * _this.object.anchorPoint.y, w: _this._width, h: _this._height });
            }
        });
        _this.on(EvtDraw.type, function (evt) {
            if (_this._loaded) {
                evt.canvas.context.drawImage(_this._image, -Math.round(_this._width * _this.object.anchorPoint.x) - 0.5, -Math.round(_this._height * _this.object.anchorPoint.y) - 0.5, _this._width, _this._height);
            }
        });
        _this.on(EvtGetProp.type, function (ev) {
            switch (ev.propName) {
                case 'width':
                    ev.propValue = _this._width;
                    ev.eat();
                    break;
                case 'height':
                    ev.propValue = _this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        _this.on(EvtSetProp.type, function (ev) {
            switch (ev.propName) {
                case 'width':
                    _this._width = ev.propValue;
                    _this._image.width = _this._width;
                    ev.eat();
                    break;
                case 'height':
                    _this._height = ev.propValue;
                    _this._image.height = _this._height;
                    ev.eat();
                    break;
                default:
                    break;
            }
        });
        return _this;
    }
    CoImage.type = 'Image';
    return CoImage;
}(Component));
export { CoImage };
//# sourceMappingURL=components.js.map