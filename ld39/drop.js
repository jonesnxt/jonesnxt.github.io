class Drop extends Thing {
  constructor() {
    super(Math.floor(Math.random() * WIDTH * 2), 0, 1, 1, 0x034aec);
    this.type = 'drop';
    this.splash = false;
  }

  step(keys) {
    this.y += 1 + LEVEL;
    this.x -= 1 + LEVEL;

    if (keys.includes('ArrowLeft')) {
      this.x += 1;
    }

    if (keys.includes('ArrowRight')) {
      this.x -= 1;
    }
    if (this.y > 48) {
      this.splash = true;
    }
  }

  collide(obj) {
    if (obj.type === 'wall' || obj.type === 'player' || obj.type === 'thing' || obj.y > 48) {
      this.splash = true;
    }
  }
}
