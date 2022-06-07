export function sanitizeObject(o) {
  for (const key in o) {
    if (o[key] === undefined || o[key] === null) delete o[key]
  }
  return o;
}