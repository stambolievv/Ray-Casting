import { Vector2D } from '../utilities';

/**
 * @classdesc Represents a line in a two-dimensional space.
 * @class
 */
export default class Line {
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
   * @description The start point of the line segment.
   * @type {Vector2D}
   */
  #startPoint;
  /**
   * @description The end point of the line segment.
   * @type {Vector2D}
   */
  #endPoint;
  /**
   * @description The angle of the line.
   * @type {number}
   */
  #angle;
  /**
   * @description The point where two lines meet each other.
   * @type {Vector2D|undefined}
   */
  #intersectionPoint;

  /**
   * @description Represents a line in a two-dimensional space.
   * @param {object} [options] - The options for configuring the line.
   * @param {string} [options.name] - The name of the line.
   * @param {object} [options.position] - The position of the line.
   * @param {number} [options.angle] - The angle of the line.
   * @param {object} [options.config] - The configuration options for the line.
   */
  constructor({ name = 'Line', position = { x: 0, y: 0 }, angle = 0, config = {} } = {}) {
    this.name = name;
    this.#config = config;

    this.#startPoint = new Vector2D();
    this.#endPoint = new Vector2D();
    this.#angle = angle;

    this.update(new Vector2D(position.x, position.y));
  }

  /**
   * @description Get the start point of the line.
   * @returns {Vector2D} The start point of the line.
   * @readonly
   */
  get start() {
    return this.#startPoint;
  }

  /**
   * @description Get the end point of the line.
   * @returns {Vector2D} The end point of the line.
   * @readonly
   */
  get end() {
    return this.#endPoint;
  }

  /**
   * @description Sets or Gets the intersection point where two lines meet each other.
   */
  set intersectionPoint(point) {
    this.#intersectionPoint = point;
  }
  get intersectionPoint() {
    return this.#intersectionPoint;
  }

  /**
   * @description Draws the line segment on a canvas context. The line is drawn from the start point to the end point, using the specified color and line width. If a gradient is provided in the configuration, it is used to create a linear gradient for the line.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context on which to draw the line.
   */
  draw(context) {
    const { gradient, color, lineWidth } = this.#config;

    const linearGradient = context.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);
    gradient && Object.entries(gradient).forEach(([stop, color]) => linearGradient.addColorStop(Number(stop), color));

    const end = this.intersectionPoint ?? this.end;

    context.beginPath();
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(end.x, end.y);
    context.closePath();

    context.lineWidth = lineWidth;
    context.strokeStyle = gradient ? linearGradient : color;
    context.stroke();
  }

  /**
   * @description Update the line segment with a new position. The function takes a `position` parameter representing the new start position of the line segment. The start point of the line segment is updated to the provided position, effectively changing the position of the line segment. The end point of the line segment is then recalculated based on the new start position, the length, and the angle of the line segment.
   * @param {Vector2D} position - The position of the mouse.
   */
  update(position) {
    const { length } = this.#config;

    this.#startPoint.copy(position);
    this.#endPoint = this.#startPoint.addScalar(0, length).rotateSelf(this.#startPoint, this.#angle);
  }

  /**
   * @description Finds the intersection between two line segments. This uses the vector cross-product approach.
   * @param {Line} line - The line segment to intersect with.
   * @returns {Intersection} An object representing the intersection result.
   * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection Line-line intersection} for further information.
   */
  intersection(line) {
    const startDiff = line.start.subtract(this.start);
    const endDiff = this.end.subtract(this.start);
    const lineDiff = line.end.subtract(line.start);

    const numerator = startDiff.crossProduct(endDiff);
    const denominator = endDiff.crossProduct(lineDiff);

    /* Checking if the lines are co-linear. */
    if (numerator === 0 && denominator === 0) {
      /* They are co-linear, and so intersect if they have any overlap. */

      /* Do they touch? (Are any of the points equal?) */
      if (this.start.equals(line.start) || this.end.equals(line.start) || this.start.equals(line.end) || this.end.equals(line.end)) return { type: 'colinear-overlapping' };

      /*Are all the point differences in either direction the same sign? */
      const differences = [
        startDiff.toArray(),
        line.start.subtract(this.end).toArray(),
        line.end.subtract(this.start).toArray(),
        line.end.subtract(this.end).toArray()
      ];

      if (differences.flat().every(point => point < 0)) return { type: 'colinear-joint' };
      return { type: 'colinear-disjoint' };
    }

    /* Checking if the lines are parallel. If they are, then they will never intersect. */
    if (denominator === 0) return { type: 'parallel-non-intersecting' };

    /* The intersection point of the lines is found with one of the following values of `t` or `u`, where: */
    const u = numerator / denominator;
    const t = startDiff.crossProduct(lineDiff) / denominator;

    /* Checking if the intersection point is within the bounds of the line segments. */
    const fallsWithinLineSegment = t >= 0 && t <= 1 && u >= 0 && u <= 1;

    if (fallsWithinLineSegment) {
      const intersectionPoint = this.start.add(endDiff.multiplyScalar(t));
      return { type: 'intersection', point: intersectionPoint };
    }

    return { type: 'no-intersection' };
  }
}

/**
 * @typedef {object} Intersection - Represents the intersection between two line segments.
 * @property {string} type The type of intersection result. Possible values are:
 * - `colinear-overlapping`: The line segments are colinear and overlapping.
 * - `colinear-disjoint`: The line segments are colinear but disjoint.
 * - `colinear-joint`: The line segments are colinear and have a joint endpoint.
 * - `parallel-non-intersecting`: The line segments are parallel and non-intersecting.
 * - `intersection`: The line segments intersect.
 * - `no-intersection`: The line segments do not intersect.
 * @property {Vector2D} [point] The intersection point.
 */