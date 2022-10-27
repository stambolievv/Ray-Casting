import Rays from './entities/Rays';
import Line from './entities/Line';
import config from './config.js';
import { array, getRandomInt, randomHexColor } from './utils/misc';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const mouse = { x: 0, y: 0 };
const rays = new Rays({ ...config.rays, config: config.rays });
/**@type {Array<Line>} */
const lines = array(getRandomInt(10, 15), () => {
  const configuration = {
    position: {
      x: getRandomInt(0, canvas.width),
      y: getRandomInt(0, canvas.height)
    },
    length: getRandomInt(100, 500),
    angle: getRandomInt(0, 360),
    config: config.line,
    color: randomHexColor()
  };

  return new Line(configuration);
});

(function animate(timestamp) {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = config.scene.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rays.draw(ctx);
  rays.update(mouse);
  rays.intersection(lines);

  lines.forEach(line => line.draw(ctx));
})(0);

window.addEventListener('pointermove', event => {
  const screen = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - screen.left) / (screen.right - screen.left)) * canvas.width;
  mouse.y = ((event.clientY - screen.top) / (screen.bottom - screen.top)) * canvas.height;
});