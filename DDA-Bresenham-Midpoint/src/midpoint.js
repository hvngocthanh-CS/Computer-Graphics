const MP_draw_Circle = function(p, r, rgba) {
    // draw a circle using MidPoint
    var x = 0;
    var y = r;
    var P = 1 - r;
    let x0 = p[0];
    let y0 = p[1];
    var pixels = [];

    while (x <= y) {
        pixels.push(x0 + x, y0 + y, rgba);
        pixels.push(x0 + y, y0 + x, rgba);
        pixels.push(x0 + y, y0 - x, rgba); 
        pixels.push(x0 + x, y0 - y, rgba);
        pixels.push(x0 - x, y0 - y, rgba);
        pixels.push(x0 - y, y0 - x, rgba);
        pixels.push(x0 - y, y0 + x, rgba);
        pixels.push(x0 - x, y0 + y, rgba);
        x++;

        if (P < 0) {
            P += 2*x + 3;
        }
        else {
            y--;
            P += 2*(x - y) + 5;
        }
    }
    return pixels;
}