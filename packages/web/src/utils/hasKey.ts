/**
 * Check if object has key.
 * @param value - Any object value.
 * @param property - A property name in `string`.
 */
export default function hasKey<O extends object, K extends string>(
  value: O,
  property: K
): value is O & { [_ in K]: unknown } {
  return (
    Object.prototype.hasOwnProperty.call(value, property) || property in value
  );
}
