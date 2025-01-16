import compact from './compact';
import isNullOrUndefined from './isNullOrUndefined';
import isObject from './isObject';
import isUndefined from './isUndefined';

export default <T>(
  object: T,
  path?: string | null,
  defaultValue?: unknown,
): any => {
  console.log(object, path, defaultValue, 'Intial values');
  if (!path || !isObject(object)) {
    return defaultValue;
  }

  const result = compact(path.split(/[,[\].]+?/)).reduce(
    (result, key) =>
      isNullOrUndefined(result) ? result : result[key as keyof {}],
    object,
  );
  console.log(object, result, 'Result values');
  console.log(
    isUndefined(result),
    result === object,
    object[path as keyof T],
    defaultValue,
    'Return result',
  );

  return isUndefined(result) || result === object
    ? isUndefined(object[path as keyof T])
      ? defaultValue
      : object[path as keyof T]
    : result;
};
