import { Line, Rays } from './entities';
import { Vector2D, createArray, getRandomInt } from './utilities/index.js';
import config from './config.js';

const canvas = /** @type {HTMLCanvasElement} */(document.getElementById('canvas'));
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
if (!context) throw new Error('Failed to get 2D context');

const mouse = new Vector2D();
const rays = new Rays({ config: config.rays });
const lines = createLines(config.lines);

(function animate() {
  context.fillStyle = config.scene.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  rays.draw(context);
  rays.update(mouse);

  for (const line of lines) line.draw(context);
  rays.intersect(lines);

  requestAnimationFrame(animate);
})();

function createLines(config) {
  const { amount, angle, length, singleLine } = config;

  return createArray(getRandomInt(amount.min, amount.max), () => {
    const configuration = {
      position: { x: getRandomInt(0, canvas.width), y: getRandomInt(0, canvas.height) },
      angle: getRandomInt(angle.min, angle.max),
      config: {
        length: getRandomInt(length.min, length.max),
        ...singleLine,
      },
    };

    return new Line(configuration);
  });
}

window.addEventListener('pointermove', ({ clientX, clientY }) => {
  const { top, right, bottom, left } = canvas.getBoundingClientRect();
  mouse.set(
    (clientX - left) / Math.max(right - left, 1) * canvas.width,
    (clientY - top) / Math.max(bottom - top, 2) * canvas.height
  );
});