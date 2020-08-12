import hasKey from './hasKey';
import isObject from './isObject';

/**
 * Resolves an unknown value to error.
 * @param value - An unknown value.
 */
export default function resolveToError(value: unknown): Error {
  if (value instanceof Error) return value;
  return new Error(
    isObject(value) && hasKey(value, "message")
      ? String(value.message)
      : String(value)
  );
}
