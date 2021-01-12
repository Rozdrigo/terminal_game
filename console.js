var five = require("johnny-five");
var board = new five.Board();
var positiony = 6, positionx = 2
const nave = `⨝⫸`;
board.on("ready", function() {
  var joystick = new five.Joystick({
    pins: ["A0", "A1"]
  });
  joystick.on("change", function () {
      setTimeout(() => {
        if(this.y < -0.9 && positiony > 1){
            action = "↑ TOP"
            positiony--
            renderize(positiony, positionx)
        }else if(this.y > 0.9 && positiony < 11){
            action = "↓ BOTTOM"
            positiony++
            renderize(positiony, positionx)
        }else if(this.x < -0.9 && positionx > 1){
            action = "← LEFT"
           positionx--
            renderize(positiony, positionx)
        }else if(this.x > 0.9 && positionx < 74){
            action = "→ RIGTH"
           positionx++
            renderize( positiony, positionx)
        }
    })})
});

function renderize(p, z) {
    var screen = [
    ' ---------------------------------------------------------------------------- ',
    '|                             .                           .                  |',
    '|                  .                         .                               |',
    '|               .      .                                          .          |',
    '|                   .                       .                                |',
    '|                                                                  .         |',
    `|            .                                   .                           | X:${positionx} Y:${positiony}`,
    '|                                .                                           |',
    `|               .                               .                            | [${action}]`,
    '|                                        .                                   |',
    '|                             .                             .                |',
    '|                                                                       .    |',
    ' ---------------------------------------------------------------------------- '
    ]
    var n;
    console.clear()
    screen.forEach((a, b, c) => {
    n = a
    if(b === p){
        var c = a.split('')
        c.splice(z, 1)
        c[z] = nave
        n = c.toString().replace(/,/g, '')
    }
    console.log('\033[0;35m', n)
    })
}