const DDA_draw_Line = function(p0, p1) {
    var x0 = p0[0], y0 = p0[1];
    var x1 = p1[0], y1 = p1[1];
    var dx = x1 - x0, dy = y1 - y0;
    var pixels = [];
    if (dx == 0 && dy == 0) return;
    if (Math.abs(dy) <= Math.abs(dx)) {
        if (x1 < x0) {
            var tx = x0; x0 = x1; x1 = tx;
            var ty = y0; y0 = y1; y1 = ty;
        }
        var k = dy / dx;
        var y = y0;
        for(var x = x0; x <= x1; x++){
            pixels.push([x, Math.floor(y + 0.5)]);
            y = y + k;
        }
    }
    else {
        if (y1 < y0) {
            var tx = x0; x0 = x1; x1 = tx;
            var ty = y0; y0 = y1; y1 = ty;
        }
        var k = dx / dy;
        var x = x0;
        for(var y = y0; y <= y1; y++){
            pixels.push([Math.floor(x + 0.5), y]);
            x = x + k;
        }
    }

    return pixels;
}