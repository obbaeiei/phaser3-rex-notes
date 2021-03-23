import GetCalcMatrix from '../../../utils/GetCalcMatrix.js';

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(src.pipeline);

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = camera.alpha * src.alpha;

    renderer.pipelines.preBatch(src);

    var shapes = src.geom;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shapes[i].webglRender(pipeline, calcMatrix, dx, dy, alpha);
    }

    renderer.pipelines.postBatch(src);
};

export default WebGLRenderer;