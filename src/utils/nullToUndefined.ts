/**
 * オブジェクト内の null をすべて undefined に変換する
 */
export function nullToUndefined<T extends Record<string, any>>(
  obj: T,
): {
  [K in keyof T]: T[K] extends null
    ? undefined
    : T[K] extends null | infer U
      ? U | undefined
      : T[K];
} {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] = value === null ? undefined : value;
  }
  return result;
}
