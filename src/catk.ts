import { App } from './core';

export * from './all';

const readyFuncList: Array<() => void> = [];
let isReady = false;

export function ready(fn: () => void) {
    if (fn) {
        if (isReady) {
            window.setTimeout(fn);
        } else {
            readyFuncList.push(fn);
        }
    }
}

function documentCompleted() {
    return document.readyState === 'complete' || (document.readyState !== 'loading' && !(document.documentElement as any).doScroll);
}

function bootstrap() {
    isReady = true;
    document.removeEventListener('DOMContentLoaded', bootstrap);
    window.removeEventListener('load', bootstrap);

    App.run();
    readyFuncList.forEach(fn => {
        fn();
    });
    readyFuncList.length = 0;
}

(function() {
    if (documentCompleted()) {
        window.setTimeout(bootstrap);
    } else {
        document.addEventListener('DOMContentLoaded', bootstrap);
        window.addEventListener('load', bootstrap);
    }
})();
