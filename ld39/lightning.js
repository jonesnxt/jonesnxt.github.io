class Bolt extends Thing {
  constructor() {
    super(Math.floor(Math.random() * 64), -100, 1, 70, 0xEEFF22);
    this.type = 'bolt';
    this.hit = false;
    this.counter = -1;
    this.done = false;
  }

  step(keys) {
    if (this.counter === -1) this.y += 10;
    if (this.y > HEIGHT - 60 && this.counter === -1) {
      this.color = 0xFFFFEE;
      this.x = 0;
      this.y = 0;
      this.width = 640;
      this.height = 480;
      this.counter = 6;
    }

    if (this.counter !== -1) {
      this.counter -= 1;
    }
    if (this.counter === 0) this.done = true;
  }

  collide(obj) {
    
  }
}

class Lightning {
  constructor(speed) {
    this.bolts = [];
    this.counter = 0;
    this.speed = speed;
  }

  render() {
    this.counter += 1;
    if (this.counter >= this.speed) {
      this.counter = 0;
      this.bolts.push(new Bolt());
    }
    this.bolts = this.bolts.filter(bolt => !bolt.done);

    return this.bolts;
  }
}
