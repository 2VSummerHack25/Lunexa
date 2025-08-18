export function filter(object, fields) {
  const updatedObject = {};
  for (const field of fields) {
    if (object[field] !== undefined && object[field] !== '') {
      updatedObject[field] = object[field];
    }
  }
  return updatedObject;
}
