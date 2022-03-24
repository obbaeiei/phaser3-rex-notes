import DataMethods from '../../../utils/data/DataMethods.js'

const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const GetValue = Phaser.Utils.Objects.GetValue;

class Base {
    constructor(parent, type) {
        this.setParent(parent);
        this.type = type;

        this
            .setActive()
            .setVisible()
            .setAlpha(1)
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setLeftSpace(0).setRightSpace(0).setTopSpace(0).setBottomSpace(0)
            .setOrigin(0)

        this.originX = 0;
        this.originY = 0;
        this.offsetX = 0;  // Override
        this.offsetY = 0;  // Override
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get scene() {
        return this.parent.scene;
    }

    setDirty(dirty) {
        if (dirty && this.parent) {
            this.parent.dirty = true;
        }
        return this;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this.setDirty(this._active != value);
        this._active = value;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this.setDirty(this._alpha != value);
        this._alpha = value;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.setDirty(this._x != value);
        this._x = value;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.setDirty(this._y != value);
        this._y = value;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
    }

    setRotation(rotation) {
        this.rotation = rotation;
        return this;
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleX(value) {
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
    }

    setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
    }

    // Override
    get width() {
        return 0;
    }

    // Override
    set width(value) { }

    setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.width = width;

        if (keepAspectRatio) {
            this.scaleY = this.scaleX;
        }
        return this;
    }

    get leftSpace() {
        return this._leftSpace;
    }

    set leftSpace(value) {
        this.setDirty(this._leftSpace !== value);
        this._leftSpace = value;
    }

    setLeftSpace(value) {
        this.leftSpace = value;
        return this;
    }

    get rightSpace() {
        return this._rightSpace;
    }

    set rightSpace(value) {
        this.setDirty(this._rightSpace !== value);
        this._rightSpace = value;
    }

    setRightSpace(value) {
        this.rightSpace = value;
        return this;
    }

    get topSpace() {
        return this._topSpace;
    }

    set topSpace(value) {
        this.setDirty(this._topSpace !== value);
        this._topSpace = value;
    }

    setTopSpace(value) {
        this.topSpace = value;
        return this;
    }

    get bottomSpace() {
        return this._bottomSpace;
    }

    set bottomSpace(value) {
        this.setDirty(this._bottomSpace !== value);
        this._bottomSpace = value;
    }

    setBottomSpace(value) {
        this.bottomSpace = value;
        return this;
    }

    get outerWidth() {
        return this.width + this.leftSpace + this.rightSpace;
    }

    get outerHeight() {
        return this.height + this.topSpace + this.bottomSpace;
    }

    get scaleY() {
        return this._scaleY;
    }

    set scaleY(value) {
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
    }

    setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
    }

    // Override
    get height() {
        return 0;
    }

    // Override
    set height(value) { }

    setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.height = height;

        if (keepAspectRatio) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        if (o.hasOwnProperty('x')) {
            this.setX(o.x);
        }
        if (o.hasOwnProperty('y')) {
            this.setY(o.y);
        }

        if (o.hasOwnProperty('rotation')) {
            this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
            this.setAngle(o.angle);
        }

        if (o.hasOwnProperty('alpha')) {
            this.setAlpha(o.alpha);
        }

        // ScaleX, ScaleY
        var width = GetValue(o, 'width', undefined);
        var height = GetValue(o, 'height', undefined);
        var scaleX = GetValue(o, 'scaleX', undefined);
        var scaleY = GetValue(o, 'scaleY', undefined);

        if (width !== undefined) {
            if ((height === undefined) && (scaleY === undefined)) {
                this.setWidth(width, true);
            } else {
                this.setWidth(width);
            }
        }
        if (height !== undefined) {
            if ((width === undefined) && (scaleX === undefined)) {
                this.setHeight(height, true);
            } else {
                this.setHeight(height);
            }
        }
        if ((scaleX !== undefined) && (width === undefined)) {
            this.setScaleX(scaleX);
        }
        if ((scaleY !== undefined) && (height === undefined)) {
            this.setScaleY(scaleY);
        }

        if (o.hasOwnProperty('leftSpace')) {
            this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
            this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('toptSpace')) {
            this.setTopSpace(o.topSpace);
        }
        if (o.hasOwnProperty('bottomSpace')) {
            this.setBottomSpace(o.bottomSpace);
        }
        return this;
    }

    setOrigin(x, y) {
        if (y !== undefined) {
            y = x;
        }
        this.originX = x;
        this.originY = y;
        return this;
    }

    // Override
    onFree() {
        this
            .setParent()
            .setVisible()
            .setAlpha(1)
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setLeftSpace(0).setRightSpace(0).setTopSpace(0).setBottomSpace(0)
            .setOrigin(0)
    }

    // Override
    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
    }
    // Override
    canvasRender(ctx, dx, dy) {
    }
}

Object.assign(
    Base.prototype,
    DataMethods
);

export default Base;