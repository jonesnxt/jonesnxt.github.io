class Splash extends Thing {
  constructor(x, y, xvel, yvel, ttl) {
    super(x, y, 1, 1, 0x034aec);
    this.xvel = xvel;
    this.yvel = yvel;
    this.ttl = ttl;
    this.type = 'splash';
    this.splash = false;
  }

  step() {
    this.x += this.xvel;
    this.y += this.yvel;
    this.ttl -= 1;
    if (this.ttl === 0) this.splash = true;
  }
}


class Rain {
  constructor(speed) {
    this.drops = [];
    this.counter = 0;
    this.speed = speed;
  }

  render() {
    this.counter += 1;
    if (this.counter >= this.speed) {
      this.counter = 0;
      this.drops.push(new Drop());
    }
    this.drops.forEach((drop) => {
      if (drop.splash && drop.type === 'drop') {
        this.drops = this.drops.concat([
          new Splash(drop.x, Math.min(drop.y, HEIGHT), 1, -1, 4),
          new Splash(drop.x, Math.min(drop.y, HEIGHT), -1, -1, 4),
          new Splash(drop.x, Math.min(drop.y, HEIGHT), 0, -2, 4)
        ]);
      }
    });
    this.drops = this.drops.filter(drop => !drop.splash);
    return this.drops;
  }
}
