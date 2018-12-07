import { Matrix2d } from '../src/transform';

const epsl: number = 0.0001;

function almostEqual(a: number, b: number) {
    if (!(Math.abs(a - b) < epsl)) {
        console.log(`${a},${b}`);
        return false;
    } else {
        return true;
    }
}

function compareMatrix(m1: Matrix2d, m2: Matrix2d) {
    return almostEqual(m1.a, m2.a) && almostEqual(m1.b, m2.b) && almostEqual(m1.c, m2.c) && almostEqual(m1.d, m2.d) && almostEqual(m1.e, m2.e) && almostEqual(m1.f, m2.f);
}

test('test new matrix object', () => {
    const matrix = new Matrix2d();
    expect(matrix.a).toBe(1);
    expect(matrix.b).toBe(0);
    expect(matrix.c).toBe(0);
    expect(matrix.d).toBe(1);
    expect(matrix.e).toBe(0);
    expect(matrix.f).toBe(0);
});

test('test identity matrix', () => {
    const matrix = Matrix2d.getIdentity();
    expect(compareMatrix(matrix, new Matrix2d())).toBeTruthy();
    matrix.makeIdentity();
    expect(compareMatrix(matrix, new Matrix2d())).toBeTruthy();
});

test('test translation', () => {
    const tx = Math.round(Math.random() * 200 - 100);
    const ty = Math.round(Math.random() * 200 - 100);
    const tx2 = Math.round(Math.random() * 200 - 100);
    const ty2 = Math.round(Math.random() * 200 - 100);
    const px = Math.round(Math.random() * 200 - 100);
    const py = Math.round(Math.random() * 200 - 100);
    const matrix = Matrix2d.translate(Matrix2d.getTranslate(tx, ty), tx2, ty2);
    const pt = matrix.transformPoint({ x: px, y: py });
    expect(pt.x).toBe(tx + tx2 + px);
    expect(pt.y).toBe(ty + ty2 + py);
});

test('test scaling', () => {
    const sx = Math.random() * 200 - 100;
    const sy = Math.random() * 200 - 100;
    const sx2 = Math.random() * 200 + 0.1;
    const sy2 = Math.random() * 200 + 0.1;
    const px = Math.round(Math.random() * 200 - 100);
    const py = Math.round(Math.random() * 200 - 100);
    const matrix = Matrix2d.scale(Matrix2d.getScale(sx, sy), sx2, sy2);
    const pt = matrix.transformPoint({ x: px, y: py });
    expect(pt.x).toBe(Math.round(sx * sx2 * px));
    expect(pt.y).toBe(Math.round(sy * sy2 * py));
});

test('test rotation', () => {
    const v1 = { x: 1, y: 0 };
    const v2 = { x: 2, y: 2 };
    const angles = [-2 * Math.PI, -1.5 * Math.PI, -Math.PI, -Math.PI * 0.5, 0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2];
    const r1 = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }];
    const r2 = [{ x: 2, y: 2 }, { x: -2, y: 2 }, { x: -2, y: -2 }, { x: 2, y: -2 }, { x: 2, y: 2 }, { x: -2, y: 2 }, { x: -2, y: -2 }, { x: 2, y: -2 }, { x: 2, y: 2 }];
    for (let i = 0; i < angles.length; i++) {
        const m = Matrix2d.rotate(Matrix2d.getIdentity(), angles[i]);
        const p1 = m.transformPoint(v1);
        expect(p1.x).toBe(r1[i].x);
        expect(p1.y).toBe(r1[i].y);
        const p2 = m.transformPoint(v2);
        expect(p2.x).toBe(r2[i].x);
        expect(p2.y).toBe(r2[i].y);
    }
});

test('test transform', () => {
    const m1 = Matrix2d.getRotate(Math.random() * Math.PI * 2);
    const m2 = Matrix2d.getScale(Math.random() * 10, Math.random() * 10);
    const m3 = Matrix2d.getTranslate(Math.random() * 100 - 50, Math.random() * 100 - 50);
    const pt = { x: Math.round(Math.random() * 200 - 100), y: Math.round(Math.random() * 200 - 100) };
    const r1 = Matrix2d.transform(Matrix2d.transform(m1, m2), m3).transformPoint(pt);
    const r2 = Matrix2d.transform(m1, Matrix2d.transform(m2, m3)).transformPoint(pt);
    expect(r1.x).toBe(r2.x);
    expect(r1.y).toBe(r2.y);
});

test('test invert', () => {
    const m1 = Matrix2d.getRotate(Math.random() * Math.PI * 2);
    const m2 = Matrix2d.getScale(Math.random() * 10, Math.random() * 10);
    const m = m1.transform(m2);
    const inv = Matrix2d.invert(m);
    const result = m.transform(inv);
    expect(compareMatrix(result, Matrix2d.getIdentity())).toBeTruthy();
    const mz = new Matrix2d();
    mz.set(0, 0, 0, 0, 0, 0);
    const invz = Matrix2d.invert(mz);
    expect(mz.a).toBe(invz.a);
    expect(mz.b).toBe(invz.b);
    expect(mz.c).toBe(invz.c);
    expect(mz.d).toBe(invz.d);
    expect(mz.e).toBe(invz.e);
    expect(mz.f).toBe(invz.f);
});

test('test transform part', () => {
    for (let i = 0; i < 500; i++) {
        const t = { x: Math.round(Math.random() * 200 - 100), y: Math.round(Math.random() * 200 - 100) };
        const tr = Matrix2d.getTranslate(t.x, t.y).getTranslationPart();
        expect(t.x).toBe(tr.x);
        expect(t.y).toBe(tr.y);
        const a = Math.random() * Math.PI * 2;
        const ar = Matrix2d.getRotate(a).getRotationPart();
        expect(almostEqual(a, ar)).toBeTruthy();
        const s = { x: Math.random() * 100 + 0.1, y: Math.random() * 100 + 0.1 };
        const sr = Matrix2d.getScale(s.x, s.y).getScalePart();
        expect(almostEqual(s.x, sr.x) && almostEqual(s.y, sr.y)).toBeTruthy();
        const m = Matrix2d.getTranslate(t.x, t.y)
            .transform(Matrix2d.getRotate(a))
            .transform(Matrix2d.getScale(s.x, s.y));
        const mt = m.getTranslationPart();
        const mr = m.getRotationPart();
        const ms = m.getScalePart();
        expect(almostEqual(mt.x, t.x) && almostEqual(mt.y, t.y)).toBeTruthy();
        expect(almostEqual(mr, a)).toBeTruthy();
        expect(almostEqual(ms.x, s.x) && almostEqual(ms.y, s.y)).toBeTruthy();
        const m2 = new Matrix2d();
        m2.setTranslationPart(t);
        m2.setRotationPart(a);
        m2.setScalePart(s);
        const mt2 = m2.getTranslationPart();
        const mr2 = m2.getRotationPart();
        const ms2 = m2.getScalePart();
        expect(almostEqual(mt2.x, t.x) && almostEqual(mt2.y, t.y)).toBeTruthy();
        expect(almostEqual(mr2, a)).toBeTruthy();
        expect(almostEqual(ms2.x, s.x) && almostEqual(ms2.y, s.y)).toBeTruthy();
    }
});
