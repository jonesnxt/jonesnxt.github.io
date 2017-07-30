class Player extends Thing {
  constructor(x, y) {
    super(x, y, 2, 4, 0x69191C);
    this.velocity = 0;
    this.jumping = false;
    this.doubleJump = false;
    this.prevKeys = [];

    this.type = 'player';
  }

  step(keys) {
    if (this.jumping && this.velocity > 0) this.velocity -= 1;
    this.y -= this.velocity;

    if (this.height + this.y >= HEIGHT) {
      this.y = HEIGHT - this.height;
      this.stopJump();
    }


    if (this.height + this.y < HEIGHT && this.velocity === 0) {
      this.y += 1;
    }

    if (keys.includes('ArrowRight')) {
      this.x += 1;
    }

    if (keys.includes('ArrowLeft')) {
      this.x -= 2;
    }

    if (keys.includes('ArrowUp') && !this.jumping) {
      this.velocity = 6;
      this.jumping = true;
    }

    if (!this.prevKeys.includes('ArrowUp')
      && keys.includes('ArrowUp')
      && this.doubleJump) {
      this.velocity = 6;
      this.jumping = true;
    }

    this.prevKeys = keys.concat();
    this.doubleJump = false;
  }

  stopJump() {
    this.velocity = 0;
    this.jumping = false;
  }

  collide(obj) {
    if (obj.type === 'wall') {
      if (this.y + this.height <= obj.y + 2 && this.velocity <= 0) {
        this.y = obj.y - this.height;
        this.stopJump();
        this.doubleJump = false;
      } else if (this.x + this.height <= obj.x + 5) {
        this.x = obj.x - this.width;
        //if (this.y + this.height !== HEIGHT) this.y -= 1;
        this.doubleJump = true;
      } else if (this.x + 5 >= obj.x + obj.width) {
        this.x = obj.x + obj.width;
        //if (this.y + this.height !== HEIGHT) this.y -= 1;
        this.doubleJump = true;
      } else if (this.y + 5 >= obj.y + obj.height) {
        this.doubleJump = false;
        this.stopJump();
        this.y = obj.y + obj.height;
      } else {
        this.doubleJump = false;
      }
    }
  }
}
