
class Thing {
  constructor(x, y, w, h, c) {
    this.x = x || 0;
    this.y = y || 0;

    this.width = w || 0;
    this.height = h || 0;
    this.color = c || 0;
    this.type = 'thing';
  }

  render() {
    return [this];
  }

  onClick() {
    //
  }

  collide(obj) {
    //
  }

  step(keys) {
    //
  }


}
