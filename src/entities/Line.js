import Vector2D from '../utils/Vector2D.js';
import { randomHexColor } from '../utils/misc.js';

export default class Line {
  constructor({
    position = { x: 0, y: 0 },
    length = 300,
    angle = 0,
    config = {},
  } = {}) {
    this.startPoint = new Vector2D({ x: position.x, y: position.y });
    this.endPoint = new Vector2D({ x: position.x, y: position.y + length }).rotate(this.startPoint, angle);
    this.intersectionPoint = this.endPoint.clone();
    this.length = this.startPoint.distance(this.endPoint);
    this.angle = angle;
    this.config = config;
    this.color = this.config.color || randomHexColor();
  }

  /**
   * @description Draw a line from the start point to the end point, using the color property.
   * @param {CanvasRenderingContext2D} context - The context of the canvas.
   */
  draw(context) {
    context.beginPath();
    context.moveTo(...this.startPoint.toArray());
    context.lineTo(...this.intersectionPoint.toArray());
    context.closePath();
    context.lineWidth = this.config.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();
  }

  /**
   * @description The update function takes a `position` object and sets the startPoint and endPoint properties of the line to the x and y values of the `position` object. In addition, the length of the line is added to the x coordinate of the endPoint, then rotates the endPoint property around the startPoint property by the angle of the object.
   * @param {object} position - The position of the mouse.
   */
  update(position) {
    const { x, y } = position;

    this.startPoint.set(x, y);
    this.endPoint.set(x, y + this.length).rotate(this.startPoint, this.angle);
  }

  /**
   * @description See if two line segments intersect. This uses the vector cross-product approach.
   * @param {Line} line - The line to check for intersection with.
   * @returns {{type: string, point: Vector2D}} The intersection of two lines.
   * @see {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection Line-line intersection} for further information.
   */
  intersection(line) {
    /* Just a way to make the code more readable. */
    const x1 = this.startPoint;
    const y1 = this.endPoint;
    const x2 = line.startPoint;
    const y2 = line.endPoint;

    const numerator = x2.subtract(x1).crossProduct(y1.subtract(x1));
    const denominator = y1.subtract(x1).crossProduct(y2.subtract(x2));

    /* Checking if the lines are co-linear. */
    if (numerator === 0 && denominator === 0) {
      /* They are co-linear, and so intersect if they have any overlap. */

      /* Do they touch? (Are any of the points equal?) */
      if (x1.equals(x2) || y1.equals(x2) || x1.equals(y2) || y1.equals(y2)) return { type: 'colinear-overlapping' };

      /*Are all the point differences in either direction the same sign? */
      const differences = [
        ...x2.subtract(x1).toArray(),
        ...x2.subtract(y1).toArray(),
        ...y2.subtract(x1).toArray(),
        ...y2.subtract(y1).toArray(),
      ];

      if (!differences.every(point => point < 0)) return { type: 'colinear-disjoint' };
      else return { type: 'colinear-joint' };
    }

    /* Checking if the lines are parallel. If they are, then they will never intersect. */
    if (denominator === 0) return { type: 'parallel-non-intersecting' };

    /* The intersection point of the lines is found with one of the following values of `t` or `u`, where: */
    const u = numerator / denominator;
    const t = x2.subtract(x1).crossProduct(y2.subtract(x2)) / denominator;

    /* Checking if the intersection point is within the bounds of the line segments. */
    const fallsWithinLineSegment = (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);

    if (fallsWithinLineSegment) return { type: 'intersection', point: new Vector2D(x1.add(y1.subtract(x1).multiplyScalar(t)).toObject()) };
    else return { type: 'no-intersection' };
  }
}