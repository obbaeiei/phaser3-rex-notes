import Blitter from '../blitterbase/BlitterBase.js';
import Methods from './methods/Methods.js';
import PenManager from './penmanager/PenManager.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class BitmapText extends Blitter {
    constructor(scene, x, y, font, text, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            font = GetValue(config, 'font', '');
            text = GetValue(config, 'text', '');
        }

        super(scene, x, y);
        this.type = type;

        this.fontData = undefined;
        this.fromAtlas = undefined;
        this._fontSize = 0;
        this._text = '';
        this.penManager = new PenManager();

        this.setFont(font);

        this.setText(text);
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this.setText(text);
    }
}

Object.assign(
    BitmapText.prototype,
    Methods
);

export default BitmapText;