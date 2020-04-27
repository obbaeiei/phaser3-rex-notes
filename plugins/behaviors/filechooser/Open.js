import GetGame from '../../utils/system/GetGame.js';
import CreateHiddenFileInput from './CreateHiddenFileInput.js';
import { WaitEvent } from '../../utils/promise/WaitEvent.js'
import Delay from '../../utils/promise/Delay.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var Open = function (game, config) {
    // game: game, scene, or game object
    var delayTime = GetValue(config, 'delay', 200);
    var fileInput = CreateHiddenFileInput(config);
    fileInput.click();
    return WaitEvent(GetGame(game).events, 'focus')
        .then(function () {
            return Delay(delayTime);
        })
        .then(function () {
            var result = {
                files: fileInput.files
            }
            fileInput.remove();
            fileInput = null;
            return Promise.resolve(result);
        })
}

export default Open;