
export function uselessDelay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
