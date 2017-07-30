class Walls {
  constructor() {
    this.walls = [];
    this.time = 0;
    this.speed = 60;
    this.waiter = 0;
  }

  render() {
    this.time += 1;
    if (this.speed === this.time) {
      if (this.speed > 4) this.speed -= 1;
      else if (this.waiter === 0) this.waiter = 70;
      this.time = 0;
      const nWall = [
        0,
        Math.floor(Math.random() * 5) * 2,
        (Math.floor(Math.random() * 4) * 4) + 4,
        (Math.floor(Math.random() * 4) * 4) + 4
      ];
      if (this.waiter !== 0) this.waiter -= 1;
      if (this.waiter === 1) {
        this.waiter = 0;
        LEVEL += 1;
        this.speed = 60;
      }

      this.walls.push(new Wall(nWall[1], nWall[2], nWall[3], LEVEL));
    }


    if (this.walls.length && this.walls[0].x < -this.walls[0].width) this.walls.shift();
    return this.walls;
  }
}
