class Wall extends Thing {
  constructor(y, w, h, level) {
    super(65, HEIGHT - y - h, w, h, 0x943E0F);
    this.type = 'wall';
    this.level = level;
  }

  step(keys) {
    this.x -= this.level;
  }
}
