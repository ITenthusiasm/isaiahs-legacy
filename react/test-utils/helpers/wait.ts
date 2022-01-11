/**
 * Forces a process to wait the specified number of milliseconds.
 * @param ms
 */
export default function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
