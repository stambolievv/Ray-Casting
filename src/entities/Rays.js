import Line from './Line.js';
import { array, isArray, clampBetweenRanges } from '../utils/misc.js';

export default class Rays {
  constructor({
    position = { x: 0, y: 0 },
    amount = 360,
    length = 1000,
    angle = [0, 360],
    color = 'yellow',
    thickens = 1,
    ...params
  } = {}) {
    /**@type {Array<Line>} */
    this.lines = array(amount, i => (
      new Line({ position, length, angle: clampBetweenRanges(i, [0, amount], angle), color, thickens, ...params })
    ));
  }

  /**
   * @description For each line in the lines array, call the draw function on the line.
   * @param {CanvasRenderingContext2D} context - The context of the canvas.
   */
  draw(context) {
    this.lines.forEach(line => line.draw(context));
  }

  /**
   * @description It loops through each line in the lines array and calls the update function on it.
   * @param {object} position - The position of the mouse.
   */
  update(position) {
    this.lines.forEach(line => line.update(position));
  }

  /**
   * @description For each line in the ray, find the closest intersection point with any of the obstacles, and draw the line to that point.
   * @param {Line|Array<Line>} lines - The lines to check for intersections with.
   */
  intersection(lines) {
    /**@type {Array<Line>} */
    const obstacles = isArray(lines) ? lines : [lines];

    this.lines.forEach(line => {
      const observer = {
        closest: null,
        record: Infinity
      };

      obstacles.forEach(obstacle => {
        const intersection = line.intersection(obstacle);

        if (intersection.point) {
          const distance = line.startPoint.distance(intersection.point);

          if (distance < observer.record) {
            observer.record = distance;
            observer.closest = intersection.point;
          }
        }

        if (observer.closest) line.endPoint = observer.closest;
      });
    });
  }
}