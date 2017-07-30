// the loop that draws the based on the virtualdom type model but for canvas maybeee???
class Render {
  constructor() {
    this.context = null;
    this.size = 10;
    this.noise = 0;
    this.width = 640 / this.size;
    this.height = 480 / this.size;
    this.map = [];
    this.effects = [];
    this.generators = [];
    this.keys = [];

    this.init();
  }

  static rng(num, channel) {
    const rand = channel + Math.floor(((num * 2) * Math.random()) - num);
    return rand > 255 ? 255 : (rand < 0 ? 0 : rand);
  }

  parseColor(color) {
    return `rgb(
      ${Math.floor(color / (2 ** 16)) % 256},
      ${Math.floor(color / (2 ** 8)) % 256},
      ${color % 256}
    `;
  }

  draw(x, y, color) {
    if (this.context.fillStyle !== this.parseColor(color)) {
      this.context.fillStyle = this.parseColor(color);
    }
    this.context.fillRect(
      this.size * x,
      this.size * y,
      this.size,
      this.size);
  }

  initMap(color) {
    const map = [];
    for (let i = 0; i < this.width; i += 1) {
      map[i] = [];
      for (let j = 0; j < this.height; j += 1) {
        map[i][j] = color;
      }
    }
    return map;
  }

  initListeners() {
    document.addEventListener('keydown', e => this.onKeyDown(e));
    document.addEventListener('keyup', e => this.onKeyUp(e));
    document.addEventListener('click', e => this.onClick(e));
  }

  init() {
    this.context = document.getElementById('bottom').getContext('2d');
    this.map = this.initMap(0x010101);

    this.generators = [
      new Lightning(40),
      new Hills(10),
      new Rain(1),
      new Walls(),
      new Player(2, 20),
      new Clouds(20),
      new Thing(0, 46, 64, 2, 0x337755)
    ];

    this.initListeners();

    setInterval(() => this.loop(), 38);
  }

  applyMap(map, effect) {
    const nMap = Object.assign({}, map);
    for (let i = 0; i < effect.width; i += 1) {
      for (let j = 0; j < effect.height; j += 1) {
        if (i + effect.x < this.width && i + effect.x >= 0
          && j + effect.y < this.height && j + effect.y >= 0) {
          nMap[i + effect.x][j + effect.y] = effect.color;
        }
      }
    }
    return nMap;
  }

  checkDiff(newMap) {
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.height; j += 1) {
        if (this.map[i][j] !== newMap[i][j]) {
          this.map[i][j] = newMap[i][j];
          this.draw(i, j, newMap[i][j]);
        }
      }
    }
  }

  static doesCollide(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width
      && obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height) {
      return true;
    }
    return false;
  }

  loop() {
    this.effects = [];
    this.generators.forEach((generator) => {
      this.effects = this.effects.concat(generator.render());
    });

    let newMap = this.initMap(0);
    this.effects.forEach((effect) => {
      effect.step(this.keys);
      this.effects.forEach((check) => {
        if (effect.type !== check.type
          && Render.doesCollide(effect, check)) {
          effect.collide(check);
        }
      });
      newMap = this.applyMap(newMap, effect);
    });

    this.checkDiff(newMap);
  }

  onClick(ev) {
    const x = Math.floor(ev.clientX / this.size);
    const y = Math.floor(ev.clientY / this.size);
    this.effects.forEach((effect) => {
      if (effect.x < x && effect.x + effect.width > x
        && effect.y < y && effect.y + effect.height > y) {
        effect.onClick();
      }
    });
  }

  onKeyDown(ev) {
    if (!this.keys.includes(ev.key)) this.keys.push(ev.key);
  }

  onKeyUp(ev) {
    this.keys = this.keys.filter(key => key !== ev.key);
  }
}


// and do the running...
new Render();
