class Hill extends Thing {
  constructor() {
    const rng = Math.floor(Math.random()*6);
    super(
      65,
      32 + rng,
      10 * LEVEL,
      16 - rng,
      0x113322
    );
    this.type = null;
    this.hit = false;
    this.counter = false;
  }

  step(keys) {
    this.x -= LEVEL;
  }

  collide(obj) {
    
  }
}

class Hills {
  constructor(speed) {
    this.hills = [];
    this.counter = 0;
    this.speed = speed;
  }

  render() {
    this.counter += 1;
    if (this.counter >= this.speed) {
      this.counter = 0;
      this.hills.push(new Hill());
    }
    this.hills = this.hills.filter(hill => hill.x > -hill.width);

    return this.hills;
  }
}
