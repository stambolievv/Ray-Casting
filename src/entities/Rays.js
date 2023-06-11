import Line from './Line';
import { Vector2D, createArray, isArray, clampBetweenRanges } from '../utilities';

/**
 * @classdesc Represents a collection of rays used for raycasting.
 * @class
 */
export default class Rays {
  /**
   * @description The name of the class.
   * @type {string}
   */
  name;
  /**
   * @description The custom configuration options related to the class.
   * @type {object}
   */
  #config;
  /**
   * @description An array of lines objects representing the rays.
   * @type {Array<Line>}
   */
  #lines;

  /**
   * @description Represents a collection of rays used for raycasting.
   * @param {object} [options] - The options for configuring the Rays object.
   * @param {string} [options.name] - The name of the Rays object.
   * @param {object} [options.config] - The custom configuration options for the Rays object.
   */
  constructor({ name = 'Rays', config = {} } = {}) {
    this.name = name;
    this.#config = config;
    this.#lines = this.#init();
  }

  /**
   * @description Draws all the rays on a canvas context.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context on which to draw the rays.
   */
  draw(context) {
    for (const line of this.#lines) line.draw(context);
  }

  /**
   * @description Updates the position of all the rays.
   * @param {Vector2D} position - The new position for the rays.
   */
  update(position) {
    for (const line of this.#lines) line.update(position);
  }

  /**
   * @description Finds the closest intersection point between the rays and the given line(s).
   * @param {Line|Array<Line>} lines - The lines to check for intersections with.
   */
  intersect(lines) {
    const obstacles = isArray(lines) ? lines : [lines];

    for (const line of this.#lines) {
      let closest = null;
      let record = Infinity;

      for (const obstacle of obstacles) {
        const intersection = line.intersection(obstacle);

        if (intersection.point) {
          const distance = line.start.distance(intersection.point);

          if (distance < record) {
            record = distance;
            closest = intersection.point;
          }
        }

        line.intersectionPoint = closest ? closest : line.end.clone();
      }
    }
  }

  /**
   * @description Initializes the rays based on the configuration options.
   * @returns {Array<Line>} An array of Line objects representing the rays.
   */
  #init() {
    const { amount = 0, angle, singleLine } = this.#config;

    return createArray(amount, i => (
      new Line({ name: `Ray${i}`, angle: clampBetweenRanges(i, [0, amount], angle), config: singleLine })
    ));
  }
}