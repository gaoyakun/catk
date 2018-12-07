function setPixel(imageData, w, h, x, y, r, g, b) {
    var i = (y * w + x) * 4;
    imageData[i] = r;
    imageData[i + 1] = g;
    imageData[i + 2] = b;
    imageData[i + 3] = 255;
}
function blendPixel(imageData, w, h, x, y, r, g, b, a) {
    var i = (y * w + x) * 4;
    var ia = 1 - a;
    imageData[i] = clamp(imageData[i] * ia + r * a, 0, 255);
    imageData[i + 1] = clamp(imageData[i + 1] * ia + g * a, 0, 255);
    imageData[i + 2] = clamp(imageData[i + 2] * ia + b * a, 0, 255);
    imageData[i + 3] = Math.max(imageData[i + 3], a * 255);
    /*
    const c = a * 255;
    imageData[i] = c;
    imageData[i+1] = c;
    imageData[i+2] = c;
    imageData[i+3] = Math.max(imageData[i+3], c);
    */
}
function clamp(value, minval, maxval) {
    if (value < minval) {
        value = minval;
    }
    if (value > maxval) {
        value = maxval;
    }
    return value;
}
function blendImageData(imageData, buffer) {
    for (var i = 0; i < imageData.length / 4; i++) {
        var alpha = buffer[i * 4 + 3] / 255;
        var invalpha = 1 - alpha;
        imageData[i * 4] = imageData[i * 4] * invalpha + buffer[i * 4];
        imageData[i * 4 + 1] = imageData[i * 4 + 1] * invalpha + buffer[i * 4 + 1];
        imageData[i * 4 + 2] = imageData[i * 4 + 2] * invalpha + buffer[i * 4 + 2];
        if (imageData[i * 4 + 3] < buffer[i * 4 + 3]) {
            imageData[i * 4 + 3] = buffer[i * 4 + 3];
        }
    }
}
var buffer = null;
function fillCircle(imageData, w, h, x0, y0, radius, r, g, b) {
    if (buffer === null || buffer.length < imageData.length) {
        buffer = new Uint8ClampedArray(imageData.length);
    }
    function plot(x, y) {
        // setPixel (imageData, w, h, x, y, r, g, b);
        var dx = x - x0;
        var dy = y - y0;
        var f = 1 - Math.sqrt((dx * dx + dy * dy) / (radius * radius));
        var i = (y * w + x) * 4;
        buffer[i] = r * f;
        buffer[i + 1] = g * f;
        buffer[i + 2] = b * f;
        buffer[i + 3] = f * 255;
        // const f = 1.0 - Math.max(Math.min(1.0, (dx * dx + dy * dy) / (radius * radius)), 0.0);
        // blendPixel (imageData, w, h, x, y, r, g, b, f/255)
        // setPixel (imageData, w, h, x, y, f * 255, f * 255, f * 255);
        // const r1 = Math.floor(255 * f);
        // const g1 = Math.floor(255 * f);
        // const b1 = Math.floor(255 * f);
        // setPixel (imageData, w, h, x, y, r1, g1, b1);
    }
    var x = 0;
    var y = radius;
    var dx = 3;
    var dy = 2 - radius - radius;
    var d = 1 - radius;
    var xi;
    plot(x + x0, y + y0);
    plot(x + x0, -y + y0);
    for (xi = -radius + x0; xi <= radius + x0; xi++) {
        plot(xi, y0);
    }
    while (x < y) {
        if (d < 0) {
            d += dx;
            dx += 2;
            x++;
        }
        else {
            d += dx + dy;
            dx += 2;
            dy += 2;
            x++;
            y--;
        }
        for (xi = -x + x0; xi <= x + x0; xi++) {
            plot(xi, -y + y0);
            plot(xi, y + y0);
        }
        for (xi = -y + x0; xi <= y + x0; xi++) {
            plot(xi, -x + y0);
            plot(xi, x + y0);
        }
    }
    blendImageData(imageData, buffer);
}
function bresenhamDrawLine(imageData, w, h, x1, y1, x2, y2, r, g, b) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var yy = 0;
    var t;
    if (dx < dy) {
        yy = 1;
        t = x1;
        x1 = y1;
        y1 = t;
        t = x2;
        x2 = y2;
        y2 = t;
        t = dx;
        dx = dy;
        dy = t;
    }
    var ix = x2 > x1 ? 1 : -1;
    var iy = y2 > y1 ? 1 : -1;
    var cx = x1;
    var cy = y1;
    var n2dy = dy * 2;
    var n2dydx = (dy - dx) * 2;
    var d = dy * 2 - dx;
    if (yy === 1) {
        while (cx !== x2) {
            if (d < 0) {
                d += n2dy;
            }
            else {
                cy += iy;
                d += n2dydx;
            }
            setPixel(imageData, w, h, cy, cx, r, g, b);
            cx += ix;
        }
    }
    else {
        while (cx !== x2) {
            if (d < 0) {
                d += n2dy;
            }
            else {
                cy += iy;
                d += n2dydx;
            }
            setPixel(imageData, w, h, cx, cy, r, g, b);
            cx += ix;
        }
    }
}
function parseColorRGBA(rgba) {
    var result = {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    };
    var c = [];
    var t = 0;
    var s = rgba.toLowerCase();
    var d1 = '0'.charCodeAt(0);
    var d2 = '9'.charCodeAt(0);
    var h1 = 'a'.charCodeAt(0);
    var h2 = 'f'.charCodeAt(0);
    for (var i = 1; i < rgba.length; i++) {
        var ch = rgba.charCodeAt(i);
        var val = 0;
        if (ch >= d1 && ch <= d2) {
            val = ch - d1;
        }
        else if (ch >= h1 && ch <= h2) {
            val = 10 + ch - h1;
        }
        if (i % 2 === 1) {
            t = val;
        }
        else {
            c.push(t * 16 + val);
        }
    }
    if (c.length > 0) {
        result.r = c[0];
    }
    if (c.length > 1) {
        result.g = c[1];
    }
    if (c.length > 2) {
        result.b = c[2];
    }
    if (c.length > 3) {
        result.a = c[3];
    }
    return result;
}
export function DrawLine(context, x1, y1, x2, y2, color) {
    var rgba = parseColorRGBA(color);
    var xmin = x1 > x2 ? x2 : x1;
    var ymin = y1 > y2 ? y2 : y1;
    var xmax = x1 > x2 ? x1 : x2;
    var ymax = y1 > y2 ? y1 : y2;
    var imageData = context.getImageData(xmin, ymin, xmax - xmin + 1, ymax - ymin + 1);
    bresenhamDrawLine(imageData.data, imageData.width, imageData.height, x1 - xmin, y1 - ymin, x2 - xmin, y2 - ymin, rgba.r, rgba.g, rgba.b);
    context.putImageData(imageData, xmin, ymin);
}
export function FillCircle(context, x0, y0, radius, color) {
    var rgba = parseColorRGBA(color);
    var imageData = context.getImageData(x0 - radius, y0 - radius, 2 * radius + 1, 2 * radius + 1);
    fillCircle(imageData.data, imageData.width, imageData.height, radius, radius, radius, rgba.r, rgba.g, rgba.b);
    context.putImageData(imageData, x0 - radius, y0 - radius);
}
//# sourceMappingURL=paint.js.map