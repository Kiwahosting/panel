
export function uselessDelay(ms) {
  const err = new Error(
    'Useless delay was executed. These are placeholders for actual logic,'
    + 'and this should be removed.'
  );
  
  err.name = 'Warning';

  // eslint-disable-next-line no-console
  console.warn(err);

  return new Promise(res => setTimeout(res, ms));
}
