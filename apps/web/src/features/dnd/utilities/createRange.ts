const defaultInitializer = (index: number): number => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => T = defaultInitializer as (index: number) => T
): T[] {
  return Array.from({ length }, (_, index) => initializer(index));
}
