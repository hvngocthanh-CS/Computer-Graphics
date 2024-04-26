// draw a line using Bresenham
const BSH_draw_Line = function(p0, p1) {
    var x0 = p0[0],
        y0 = p0[1];
    var x1 = p1[0],
        y1 = p1[1];
    var dx = Math.abs(x1 - x0),
        dy = Math.abs(y1 - y0);
    var p = 2 * dy - dx;
    var cX, cY;
    var pixels = [];
    
    if (x0 < x1) cX = 1;
    else cX = -1;
    
    if (y0 < y1) cY = 1;
    else cY = -1;

    var x = x0,
        y = y0;

    if (dy <= dx) {
        for (var i = 0; i <= dx; i++) {
            pixels.push([x, y]);
            if (p < 0) {
                p += 2 * dy;
            } else {
                y += cY;
                p += 2 * (dy - dx);
            }
            x += cX;
        }
    } else {
        for (var i = 0; i <= dy; i++) {
            pixels.push([x, y]);
            if (p < 0) {
                p += 2 * dx;
            } else {
                x += cX;
                p += 2 * (dx - dy);
            }
            y += cY;
        }
    }

    return pixels; 
}