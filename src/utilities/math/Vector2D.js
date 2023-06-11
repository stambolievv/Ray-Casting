import { isNumber, isNil, degreesToRadians } from '../misc';

/**
 * @classdesc It's a class that represents a vector in `2D` space. A 2D vector is an ordered pair of numbers (labeled `x` and `y`), which can be used to represent a number of things, such as a `point` in 2D space (i.e. a position on a plane) or `any` arbitrary ordered pair of numbers. Vector2D instance components (x, y) are in the corresponding order.
 * @class
 */
export default class Vector2D {
  #x;
  #y;

  /**
   * @description It's a class that represents a vector in `2D` space. A 2D vector is an ordered pair of numbers (labeled `x` and `y`), which can be used to represent a number of things, such as a `point` in 2D space (i.e. a position on a plane) or `any` arbitrary ordered pair of numbers. Vector2D instance components (x, y) are in the corresponding order.
   * @param {number} [x=0] - The X-coordinate of the vector. The default is 0.
   * @param {number} [y=0] - The Y-coordinate of the vector. The default is 0.
   * @constructor
   */
  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;

    Object.freeze(this);
  }

  /**
   * @description A new Vector2D object representing an `upward` vector.
   * @type {Vector2D} A new Vector2D object with x = 0 and y = 1.
   * @static
   * @readonly
   */
  static get UP() {
    return new Vector2D(0, 1);
  }

  /**
   * @description A new Vector2D object representing a `leftward` vector.
   * @type {Vector2D} A new Vector2D object with x = -1 and y = 0.
   * @static
   * @readonly
   */
  static get LEFT() {
    return new Vector2D(-1, 0);
  }

  /**
   * @description A new Vector2D object representing a `downward` vector.
   * @type {Vector2D} A new Vector2D object with x = 0 and y = -1.
   * @static
   * @readonly
   */
  static get DOWN() {
    return new Vector2D(0, -1);
  }

  /**
   * @description A new Vector2D object representing a `rightward` vector.
   * @type {Vector2D} A new Vector2D object with x = 1 and y = 0.
   * @static
   * @readonly
   */
  static get RIGHT() {
    return new Vector2D(1, 0);
  }

  /**
   * @description Sets or Gets the `x` coordinate of the vector.
   */
  set x(value) {
    this.#typeCheck('number', value);
    this.#x = value;
  }
  get x() {
    return this.#x;
  }

  /**
   * @description Sets or Gets the `y` coordinate of the vector.
   */
  set y(value) {
    this.#typeCheck('number', value);
    this.#y = value;
  }
  get y() {
    return this.#y;
  }

  /**
   * @description Gets the `width` of the vector.
   * @returns {number} The width of the vector.
   * @alias x
   * @readonly
   */
  get width() {
    return this.#x;
  }

  /**
   * @description Gets the `height` of the vector.
   * @returns {number} The height of the vector.
   * @alias y
   * @readonly
   */
  get height() {
    return this.#y;
  }

  /**
   * @description The `magnitude` of a vector is the square root of the sum of the squares of its components.
   * @returns {number} The magnitude of the vector.
   * @alias length
   * @readonly
   */
  get magnitude() {
    return Math.hypot(this.#x, this.#y);
  }

  /**
   * @description The `length` of a vector is the square root of the sum of the squares of its components.
   * @returns {number} The length of the vector.
   * @alias magnitude
   * @readonly
   */
  get length() {
    return Math.hypot(this.#x, this.#y);
  }

  /**
   * @description The `direction` property returns the direction of the Vector2D object in radians.
   * @returns {number} The direction of the vector.
   * @alias angle
   * @readonly
   */
  get direction() {
    return Math.atan2(this.#y, this.#x);
  }

  /**
   * @description The `angle` property returns the angle of the Vector2D object in radians.
   * @returns {number} The angle of the vector.
   * @alias direction
   * @readonly
   */
  get angle() {
    return Math.atan2(this.#y, this.#x);
  }

  /**
   * @description The `absoluteX` property returns the absolute value of the `x` property.
   * @returns {number} The absolute value of the x property.
   * @readonly
   */
  get absoluteX() {
    return Math.abs(this.#x);
  }

  /**
   * @description The `absoluteY` property returns the absolute value of the `y` property.
   * @returns {number} The absolute value of the y property.
   * @readonly
   */
  get absoluteY() {
    return Math.abs(this.#y);
  }

  /**
   * @description The `set` method takes two arguments, `x` and `y`, and sets the `x` and `y` values of the vector that the function is called on to those values. If you pass only a `SINGLE` parameter, it will set both `x` and `y` to the same first argument value.
   * @param {number} x - The x value to add to this vector.
   * @param {number} [y=x] - The y value to add to this vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  set(x, y = x) {
    this.#typeCheck('number', x);
    this.#typeCheck('number?', y);

    this.#x = x;
    this.#y = y;

    return this;
  }

  /**
   * @description The `add` method takes a vector as an argument and adds the `x` and `y` values of that vector and the `x` and `y` values of the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to add to this vector.
   * @returns {Vector2D} A new Vector2D object with the sum of the x and y values of the two vectors.
   */
  add(vector) {
    this.#typeCheck('Vector', vector);

    return new Vector2D(this.#x + vector.x, this.#y + vector.y);
  }

  /**
   * @description The `addSelf` method takes a vector as an argument and adds the `x` and `y` values of that vector to the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to add to this vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  addSelf(vector) {
    this.#typeCheck('Vector', vector);

    this.#x += vector.x;
    this.#y += vector.y;

    return this;
  }

  /**
   * @description The `subtract` method takes a vector as an argument and subtracts the `x` and `y` values of that vector and the `x` and `y` values of the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to subtract from this vector.
   * @returns {Vector2D} A new Vector2D object with the difference between the two Vector2D objects.
   */
  subtract(vector) {
    this.#typeCheck('Vector', vector);

    return new Vector2D(this.#x - vector.x, this.#y - vector.y);
  }

  /**
   * @description The `subtractSelf` method takes a vector as an argument and subtracts the `x` and `y` values of that vector from the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to subtract from this vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  subtractSelf(vector) {
    this.#typeCheck('Vector', vector);

    this.#x -= vector.x;
    this.#y -= vector.y;

    return this;
  }

  /**
   * @description The `multiply` method takes a vector as an argument and multiplies the `x` and `y` values of that vector with the `x` and `y` values of the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to multiply with this vector.
   * @returns {Vector2D} A new Vector2D object with the product between the two Vector2D objects.
   */
  multiply(vector) {
    this.#typeCheck('Vector', vector);

    return new Vector2D(this.#x * vector.x, this.#y * vector.y);
  }

  /**
   * @description The `multiplySelf` method takes a vector as an argument and multiplies the `x` and `y` values of that vector with the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to multiply with this vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  multiplySelf(vector) {
    this.#typeCheck('Vector', vector);

    this.#x *= vector.x;
    this.#y *= vector.y;

    return this;
  }

  /**
   * @description The `divide` method takes a vector as an argument and divides the `x` and `y` values of that vector with the `x` and `y` values of the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to divide by this vector.
   * @returns {Vector2D} A new Vector2D object with the quotient between the two Vector2D objects.
   */
  divide(vector) {
    this.#typeCheck('Vector', vector);

    return new Vector2D(this.#x / vector.x, this.#y / vector.y);
  }

  /**
   * @description The `divideSelf` method takes a vector as an argument and divides the `x` and `y` values of that vector with the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to divide by this vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  divideSelf(vector) {
    this.#typeCheck('Vector', vector);

    this.#x /= vector.x;
    this.#y /= vector.y;

    return this;
  }

  /**
   * @description The `clamp` method takes two vectors as arguments and clamps the `x` and `y` values of the vector that the function is called on between the `x` and `y` values of the passed vectors and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} minimum - The minimum vector to clamp to.
   * @param {Vector2D} maximum - The maximum vector to clamp to.
   * @returns {Vector2D} A new Vector2D object with the clamped x and y values.
   */
  clamp(minimum, maximum) {
    this.#typeCheck('Vector', minimum);
    this.#typeCheck('Vector', maximum);

    const newX = Math.max(Math.min(this.#x, maximum.x), minimum.x);
    const newY = Math.max(Math.min(this.#y, maximum.y), minimum.y);

    return new Vector2D(newX, newY);
  }

  /**
   * @description The `clampSelf` method takes two vectors as arguments and clamps the `x` and `y` values of the vector that the function is called on between the `x` and `y` values of the passed vectors.
   * @summary Does `modify` the vector.
   * @param {Vector2D} minimum - The minimum vector to clamp to.
   * @param {Vector2D} maximum - The maximum vector to clamp to.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  clampSelf(minimum, maximum) {
    this.#typeCheck('Vector', minimum);
    this.#typeCheck('Vector', maximum);

    const newX = Math.max(Math.min(this.#x, maximum.x), minimum.x);
    const newY = Math.max(Math.min(this.#y, maximum.y), minimum.y);

    this.#x = newX;
    this.#y = newY;

    return this;
  }

  /**
   * @description The `addScalar` method takes two scalar numbers as arguments and adds to the `x` and `y` values of the vector that the function is called on and returns a new vector as the result. If you pass only a `SINGLE` parameter, it will add to both `x` and `y` to the same first argument value.
   * @summary Does `NOT` modify the vector.
   * @param {number} scalar - The number to add the vector by.
   * @param {number} [scalar2=scalar] - The second number to add the y value only.
   * @returns {Vector2D} A new Vector2D object with the sum of the x and y values of the two vectors.
   */
  addScalar(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    return new Vector2D(this.#x + scalar, this.#y + scalar2);
  }

  /**
   * @description The `addScalarSelf` method takes two scalar numbers as arguments and adds to the `x` and `y` values of the vector that the function is called on. If you pass only a `SINGLE` parameter, it will add to both `x` and `y` the same first argument value.
   * @summary Does `modify` the vector.
   * @param {number} scalar - The number to add the vector by.
   * @param {number} [scalar2=scalar] - The second number to add the y value only.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  addScalarSelf(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    this.#x += scalar;
    this.#y += scalar2;

    return this;
  }

  /**
   * @description The `subtractScalar` method takes two scalar numbers as arguments and subtracts from the `x` and `y` values of the vector that the function is called on and returns a new vector as the result. If you pass only a `SINGLE` parameter, it will subtract from both `x` and `y` with the same first argument value.
   * @summary Does `NOT` modify the vector.
   * @param {number} scalar - The number to subtract the vector by.
   * @param {number} [scalar2=scalar] - The second number to subtract the y value only.
   * @returns {Vector2D} A new Vector2D object with the difference between the two Vector2D objects.
   */
  subtractScalar(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    return new Vector2D(this.#x - scalar, this.#y - scalar2);
  }

  /**
   * @description The `subtractScalarSelf` method takes two scalar numbers as arguments and subtracts from the `x` and `y` values of the vector that the function is called on. If you pass only a `SINGLE` parameter, it will subtract from both `x` and `y` with the same first argument value.
   * @summary Does `modify` the vector.
   * @param {number} scalar - The number to subtract the vector by.
   * @param {number} [scalar2=scalar] - The second number to subtract the y value only.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  subtractScalarSelf(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    this.#x -= scalar;
    this.#y -= scalar2;

    return this;
  }

  /**
   * @description The `multiplyScalar` method takes two scalar numbers as arguments and multiplies the `x` and `y` values of the vector that the function is called on and returns a new vector as the result. If you pass only a `SINGLE` parameter, it will multiply both `x` and `y` with the same first argument value.
   * @summary Does `NOT` modify the vector.
   * @param {number} scalar - The number to multiply the vector by.
   * @param {number} [scalar2=scalar] - The second number to multiply the y value only.
   * @returns {Vector2D} A new Vector2D object with the x and y values multiplied by the scalar.
   */
  multiplyScalar(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    return new Vector2D(this.#x * scalar, this.#y * scalar2);
  }

  /**
   * @description The `multiplyScalarSelf` method takes two scalar numbers as arguments and multiplies the `x` and `y` values of the vector that the function is called on. If you pass only a `SINGLE` parameter, it will multiply both `x` and `y` with the same first argument value.
   * @summary Does `modify` the vector.
   * @param {number} scalar - The number to multiply the vector by.
   * @param {number} [scalar2=scalar] - The second number to multiply the y value only.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  multiplyScalarSelf(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    this.#x *= scalar;
    this.#y *= scalar2;

    return this;
  }

  /**
   * @description The `divideScalar` method takes two scalar numbers as arguments and divides the `x` and `y` values of the vector that the function is called on and returns a new vector as the result. If you pass only a `SINGLE` parameter, it will divide both `x` and `y` with the same first argument value.
   * @summary Does `NOT` modify the vector.
   * @param {number} scalar - The number to divide the vector by.
   * @param {number} [scalar2=scalar] - The second number to divide the y value only.
   * @returns {Vector2D} A new Vector2D object with the x and y values divided by the scalar.
   */
  divideScalar(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    return new Vector2D(this.#x / scalar, this.#y / scalar2);
  }

  /**
   * @description The `divideScalarSelf` method takes two scalar numbers as arguments and divides the `x` and `y` values of the vector that the function is called on. If you pass only a `SINGLE` parameter, it will divide both `x` and `y` with the same first argument value.
   * @summary Does `modify` the vector.
   * @param {number} scalar - The number to divide the vector by.
   * @param {number} [scalar2=scalar] - The second number to divides the y value only.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  divideScalarSelf(scalar, scalar2 = scalar) {
    this.#typeCheck('number', scalar);
    this.#typeCheck('number?', scalar2);

    this.#x /= scalar;
    this.#y /= scalar2;

    return this;
  }

  /**
   * @description The `clampScalar` method takes two numbers as arguments and clamps the `x` and `y` values of the vector that the function is called on between the `minimum` and `maximum` scalar values and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @param {number} minimum - The minimum scalar value to clamp to.
   * @param {number} maximum - The maximum scalar value to clamp to.
   * @returns {Vector2D} A new Vector2D object with the clamped x and y values.
   */
  clampScalar(minimum, maximum) {
    this.#typeCheck('number', minimum);
    this.#typeCheck('number', maximum);

    const newX = Math.max(Math.min(this.#x, maximum), minimum);
    const newY = Math.max(Math.min(this.#y, maximum), minimum);

    return new Vector2D(newX, newY);
  }

  /**
   * @description The `clampScalarSelf` method takes two numbers as arguments and clamps the `x` and `y` values of the vector that the function is called on between the `minimum` and `maximum` scalar values.
   * @summary Does `modify` the vector.
   * @param {number} minimum - The minimum scalar value to clamp to.
   * @param {number} maximum - The maximum scalar value to clamp to.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  clampScalarSelf(minimum, maximum) {
    this.#typeCheck('number', minimum);
    this.#typeCheck('number', maximum);

    const newX = Math.max(Math.min(this.#x, maximum), minimum);
    const newY = Math.max(Math.min(this.#y, maximum), minimum);

    this.#x = newX;
    this.#y = newY;

    return this;
  }

  /**
   * @description The `dotProduct` method takes a vector as an argument and returns the dot product of that vector and the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to dot with this vector.
   * @returns {number} The dot product of the two Vector2Ds.
   */
  dotProduct(vector) {
    this.#typeCheck('Vector', vector);

    return this.#x * vector.x + this.#y * vector.y;
  }

  /**
   * @description The `crossProduct` method takes a vector as an argument and returns the cross product of that vector and the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to dot with this vector.
   * @returns {number} The dot product of the two Vector2Ds.
   */
  crossProduct(vector) {
    this.#typeCheck('Vector', vector);

    return this.#x * vector.y - this.#y * vector.x;
  }

  /**
   * @description The `distance` method takes a vector as an argument and returns the distance between that vector and the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to calculate the distance to.
   * @returns {number} The distance between the two Vector2Ds.
   */
  distance(vector) {
    this.#typeCheck('Vector', vector);

    return Math.hypot(this.#x - vector.x, this.#y - vector.y);
  }

  /**
   * @description The `lerp` method takes a vector and alpha as arguments and returns the linear interpolation between that vector and the vector that the function is called on, where alpha is the percent distance along the line. (alpha = 0 will be this vector, and alpha = 1 will be the vector passed in).
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to interpolate towards.
   * @param {number} alpha - Interpolation factor, typically in the closed interval [0, 1].
   * @returns {Vector2D} The linearly interpolates between the two Vector2Ds.
   */
  lerp(vector, alpha) {
    this.#typeCheck('Vector', vector);
    this.#typeCheck('number', alpha);

    this.#x += (vector.x - this.#x) * alpha;
    this.#y += (vector.y - this.#y) * alpha;

    return this;
  }

  /**
   * @description The `rotate` method takes a pivot point (Vector2D) and an angle value (in degrees) as arguments and rotates (counterclockwise) the vector that the function is called on around that pivot point by the given angle value.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} point - The pivot point (Vector2D) to rotate around.
   * @param {number} angle - The angle /in degrees/ to rotate the vector by.
   * @returns {Vector2D}  A new Vector2D with the rotated x and y values.
   */
  rotate(point, angle) {
    this.#typeCheck('Vector', point);
    this.#typeCheck('number', angle);

    const radians = degreesToRadians(angle);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const x = this.#x - point.x;
    const y = this.#y - point.y;

    const newX = ((x * cos) - (y * sin)) + point.x;
    const newY = ((x * sin) + (y * cos)) + point.y;

    return new Vector2D(
      newX.toString().includes('e-') ? 0 : newX,
      newY.toString().includes('e-') ? 0 : newY,
    );
  }

  /**
   * @description The `rotateSelf` method takes a pivot point (Vector2D) and an angle value (in degrees) as arguments and rotates (counterclockwise) the vector that the function is called on around that pivot point by the given angle value.
   * @summary Does `modify` the vector.
   * @param {Vector2D} point - The pivot point (Vector2D) to rotate around.
   * @param {number} angle - The angle /in degrees/ to rotate the vector by.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  rotateSelf(point, angle) {
    this.#typeCheck('Vector', point);
    this.#typeCheck('number', angle);

    const radians = degreesToRadians(angle);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const x = this.#x - point.x;
    const y = this.#y - point.y;

    const newX = ((x * cos) - (y * sin)) + point.x;
    const newY = ((x * sin) + (y * cos)) + point.y;

    this.#x = newX.toString().includes('e-') ? 0 : newX;
    this.#y = newY.toString().includes('e-') ? 0 : newY;

    return this;
  }

  /**
   * @description The `invert` method inverts the `x` and `y` values of the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @returns {Vector2D} A new Vector2D with the inverted x and y values.
   */
  invert() {
    return new Vector2D(this.#x * -1, this.#y * -1);
  }

  /**
   * @description The `invertSelf` method inverts the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  invertSelf() {
    this.#x *= -1;
    this.#y *= -1;

    return this;
  }

  /**
   * @description The `normalize` method normalized the vector that the function is called on and returns a new vector as the result.
   * @summary Does `NOT` modify the vector.
   * @returns {Vector2D} A new Vector2D with the normalized x and y values.
   */
  normalize() {
    const magnitude = Math.hypot(this.#x, this.#y);
    if (magnitude === 0) return new Vector2D();

    return new Vector2D(this.#x / magnitude, this.#y / magnitude);
  }

  /**
   * @description The `normalizeSelf` method normalized the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on with the normalized x and y values.
   */
  normalizeSelf() {
    const magnitude = Math.hypot(this.#x, this.#y);
    if (magnitude === 0) return this;

    this.#x /= magnitude;
    this.#y /= magnitude;

    return this;
  }

  /**
   * @description Rounds a number to a specified number of decimal places.
   * @param {number} decimalPlaces - Number of digits after the decimal point.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  toFixed(decimalPlaces) {
    this.#typeCheck('number', decimalPlaces);

    const factor = 10 ** decimalPlaces;

    this.#x = Math.trunc(this.#x * factor) / factor;
    this.#y = Math.trunc(this.#y * factor) / factor;

    return this;
  }

  /**
   * @description The `ceil` method rounds UP the `x` and `y` values of the vector that the function is called on to the nearest integer value.
   * @param {number} [decimalPlaces=0] - Number of digits after the decimal point.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  ceil(decimalPlaces = 0) {
    this.#typeCheck('number?', decimalPlaces);

    const factor = 10 ** decimalPlaces;

    this.#x = Math.ceil(this.#x * factor) / factor;
    this.#y = Math.ceil(this.#y * factor) / factor;

    return this;
  }

  /**
   * @description The `floor` method rounds DOWN the `x` and `y` values of the vector that the function is called on to the nearest integer value.
   * @param {number} [decimalPlaces=0] - Number of digits after the decimal point.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  floor(decimalPlaces = 0) {
    this.#typeCheck('number?', decimalPlaces);

    const factor = 10 ** decimalPlaces;

    this.#x = Math.floor(this.#x * factor) / factor;
    this.#y = Math.floor(this.#y * factor) / factor;

    return this;
  }

  /**
   * @description The `round` method rounds the `x` and `y` values of the vector that the function is called on to the nearest integer value.
   * @param {number} [decimalPlaces=0] - Number of digits after the decimal point.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  round(decimalPlaces = 0) {
    this.#typeCheck('number?', decimalPlaces);

    const factor = 10 ** decimalPlaces;

    this.#x = Math.round(this.#x * factor) / factor;
    this.#y = Math.round(this.#y * factor) / factor;

    return this;
  }

  /**
   * @description The `min` method takes a vector as an argument and if the `x` and `y` values of that vector are lesser than the `x` and `y` values of the vector that the function is called on, set the `x` and `y` value of the vector that the function is called on to the `x` and `y` value of the vector passed in.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to compare with.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  min(vector) {
    this.#typeCheck('Vector', vector);

    if (this.#x > vector.x) this.#x = vector.x;
    if (this.#y > vector.y) this.#y = vector.y;

    return this;
  }

  /**
   * @description The `max` method takes a vector as an argument and if the `x` and `y` values of that vector are greater than the `x` and `y` values of the vector that the function is called on, set the `x` and `y` value of the vector that the function is called on to the `x` and `y` value of the vector passed in.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to compare with.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  max(vector) {
    this.#typeCheck('Vector', vector);

    if (this.#x < vector.x) this.#x = vector.x;
    if (this.#y < vector.y) this.#y = vector.y;

    return this;
  }

  /**
   * @description The `equals` method takes a vector as an argument and returns true if the `x` and `y` values of that vector are strictly equal to the `x` and `y` values of the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @param {Vector2D} vector - The vector to compare to.
   * @returns {boolean} The comparison boolean value between the two Vector2Ds.
   */
  equals(vector) {
    this.#typeCheck('Vector', vector);

    return this.#x === vector.x && this.#y === vector.y;
  }

  /**
   * @description The `clear` method sets the `x` and `y` values of the vector that the function is called on to 0.
   * @summary Does `modify` the vector.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  clear() {
    this.#x = 0;
    this.#y = 0;

    return this;
  }

  /**
   * @description The `copy` method takes a vector as an argument and copies the `x` and `y` values of that vector into the `x` and `y` values of the vector that the function is called on.
   * @summary Does `modify` the vector.
   * @param {Vector2D} vector - The vector to copy.
   * @returns {this} The modified Vector2D that the function is called on.
   */
  copy(vector) {
    this.#typeCheck('Vector', vector);

    this.#x = vector.x;
    this.#y = vector.y;

    return this;
  }

  /**
   * @description The `clone` method returns a new vector with the same `x` and `y` values as the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @returns {Vector2D} A new Vector2D object with the same x and y values as the original Vector2D object.
   */
  clone() {
    return new Vector2D(this.#x, this.#y);
  }

  /**
   * @description The `toString` method returns a string representing the `x` and `y` values of the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @returns {string} A string representation of the x and y values of Vector2D that the function is called on.
   */
  toString() {
    return `x: ${this.#x}, y: ${this.#y}`;
  }

  /**
   * @description The `toArray` method returns an array of the `x` and `y` values of the vector that the function is called on.
   * @summary Does `NOT` modify the vector.
   * @returns {[x: number, y: number]} An array containing the x and y values of Vector2D that the function is called on.
   */
  toArray() {
    return [this.#x, this.#y];
  }

  /**
   * @description The `toObject` method returns an object with the properties `x` and `y`, which are set to the values of the Vector2D object values that are called the function.
   * @summary Does `NOT` modify the vector.
   * @returns {{x: number, y: number}} An object with the properties x and y values of Vector2D that the function is called on.
   */
  toObject() {
    return { x: this.#x, y: this.#y };
  }

  /**
   * @description The `toSize` method returns an object with the properties `width` and `height`, which are set to the values of the Vector2D object values that are called the function.
   * @summary Does `NOT` modify the vector.
   * @returns {{width: number, height: number}} An object with the properties width and height values of Vector2D that the function is called on.
   */
  toSize() {
    return { width: this.#x, height: this.#y };
  }

  /**
   * @description Checks if the received value matches the expected type and throws a TypeError if it does not.
   * @param {string} expected - The expected type of the received value.
   * @param {any} received - The value to be checked.
   * @throws {TypeError} If the received value does not match the expected type.
   */
  #typeCheck(expected, received) {
    let hasError = false;

    switch (expected) {
      case 'Vector': if (!(received instanceof Vector2D)) hasError = true; break;
      case 'number': if (!isNumber(received)) hasError = true; break;
      case 'number?': if (!isNil(received) && !isNumber(received)) hasError = true; break;
    }

    if (hasError) throw new TypeError(`[Vector2D] Expected a ${expected.endsWith('?') ? expected.slice(0, -1) : expected}, but received ${typeof received}`);
  }
}