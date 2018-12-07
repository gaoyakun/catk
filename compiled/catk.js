import { App } from './core';
export * from './all';
var readyFuncList = [];
var isReady = false;
export function ready(fn) {
    if (fn) {
        if (isReady) {
            window.setTimeout(fn);
        }
        else {
            readyFuncList.push(fn);
        }
    }
}
function documentCompleted() {
    return document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll);
}
function bootstrap() {
    isReady = true;
    document.removeEventListener('DOMContentLoaded', bootstrap);
    window.removeEventListener('load', bootstrap);
    App.run();
    readyFuncList.forEach(function (fn) {
        fn();
    });
    readyFuncList.length = 0;
}
(function () {
    if (documentCompleted()) {
        window.setTimeout(bootstrap);
    }
    else {
        document.addEventListener('DOMContentLoaded', bootstrap);
        window.addEventListener('load', bootstrap);
    }
})();
//# sourceMappingURL=catk.js.map