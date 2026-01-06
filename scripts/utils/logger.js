// @ts-check
/**
 * Logs a message to the console with a timestamp.
 * @param {string} msg - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
export function log(msg, ...args) {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`[${time}] ${msg}`, ...args);
}
