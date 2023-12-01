class Cloud extends Thing {
  constructor() {
    super(
      65,
      0,
      Math.floor(Math.random() * 5) + 12,
      Math.floor(Math.random() * 5) + 3,
      0x7c8680 + (Math.random() > 0.5 ? 0 : 0x101010));
    this.type = 'cloud';
    this.hit = false;
    this.counter = false;
  }

  step(keys) {
    this.counter = !this.counter;
    if (this.counter) this.x -= 1;
  }

  collide(obj) {
    
  }
}

class Clouds {
  constructor(speed) {
    this.clouds = [];
    this.counter = 0;
    this.speed = speed;
  }

  render() {
    this.counter += 1;
    if (this.counter >= this.speed) {
      this.counter = 0;
      this.clouds.push(new Cloud());
    }
    this.clouds = this.clouds.filter(cloud => cloud.x > -cloud.width);

    return this.clouds;
  }
}
