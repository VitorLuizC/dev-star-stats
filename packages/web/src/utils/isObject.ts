/**
 * Check if value is an object.
 * @param value - An unknown value.
 */
export default function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
