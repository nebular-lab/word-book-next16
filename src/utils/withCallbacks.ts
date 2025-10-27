import type { report } from "@conform-to/react/future";

type Callbacks<T> = {
  onSuccess?: () => void;
  onError?: (result: T) => void;
};

export type FormActionResult = ReturnType<typeof report>;

export const withCallbacks = <Args extends unknown[]>(
  fn: (...args: Args) => Promise<FormActionResult>,
  callbacks: Callbacks<FormActionResult>,
) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const result = await promise;

    console.log("withCallbacks result:", result);

    if (!result.error) {
      callbacks.onSuccess?.();
    } else {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
