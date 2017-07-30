const topperLayer = document.getElementById('topper').getContext('2d');
function setPixel(x, y, alpha) {
  topperLayer.fillStyle = `rgba(0,0,0,${alpha})`;
  topperLayer.fillRect(x, y, 1, 1);
}

function setLight(alpha) {
  topperLayer.clearRect(0, 0, 640, 480);
  const gradient = topperLayer.createLinearGradient(0, 0, 0, 480);
  gradient.addColorStop(0, 'rgba(0,0,0,0.8');
  gradient.addColorStop(1, `rgba(0,0,0,${alpha}`);

  topperLayer.fillStyle = gradient;
  topperLayer.fillRect(0, 0, 640, 480);
}

let alpha = 0.4;
setLight(alpha);
setInterval(() => {
  alpha += Math.random() > 0.5 ? 0.025 : -0.025;
  alpha = Math.max(alpha, 0.3);
  alpha = Math.min(alpha, 0.5);
  setLight(alpha);
}, 120);

