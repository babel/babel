/* @minVersion 8.0.0 */

export default function _processResponse(
  responseP: Promise<Response>,
  method: "json" | "bytes" | "text",
  map?: (value: any) => any,
) {
  return responseP.then(response => {
    if (response.ok) {
      const value = response[method]();
      return map ? value.then(map) : value;
    }
    throw TypeError(`Fetch failed: ${response.status} ${response.statusText}`);
  });
}
