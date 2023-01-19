export function take<T>(array: T[], indexes: number[]) {
  return array.filter((_, index) => indexes.includes(index))
}
