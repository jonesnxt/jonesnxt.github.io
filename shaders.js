// creating the masking layer

const topLayer = document.getElementById('top').getContext('2d');
function setPixel(x, y, alpha) {
  topLayer.fillStyle = `rgba(0,0,0,${alpha})`;
  topLayer.fillRect(x, y, 1, 1);
}

const SIZE = 10;
for (let i = 0; i < WIDTH; i += 1) {
  for (let j = 0; j < HEIGHT+2; j += 1) {
    // draw another mask
    for (let x = 0; x < SIZE; x += 1) {
      for (let y = 0; y < SIZE; y += 1) {
        const sh = (((x / 10) ** 2) / 3) + (((y / 10) ** 2) / 3);
        setPixel((i * SIZE) + x, (j * SIZE) + y, sh);
      }
    }
  }
}
