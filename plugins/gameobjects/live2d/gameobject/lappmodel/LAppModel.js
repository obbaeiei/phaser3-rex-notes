import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';

import Setup from './Setup.js';
import Update from './Update.js';
import Draw from './Draw.js';

class LAppModel extends CubismUserModel {
    constructor(globalData) {
        super();

        this._eyeBlinkIds = new csmVector();
        this._lipSyncIds = new csmVector();

        this._motions = new csmMap();
        this._expressions = new csmMap();

        // this._wavFileHandler = new LAppWavFileHandler();

        // Get shared resources
        this._frameBuffer = globalData.frameBuffer;
        this._viewport = globalData.viewport;
    }
}

var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,
}

Object.assign(
    LAppModel.prototype,
    Methods
)

export default LAppModel;