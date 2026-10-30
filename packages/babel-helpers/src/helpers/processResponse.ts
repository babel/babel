/* @minVersion 8.0.0 */

export default function _processResponse(
  responseP: Promise<Response>,
  method: "json" | "arrayBuffer" | "text",
  map?: (value: any) => any,
) {
  return responseP.then(function (response) {
    if (response.ok) {
      (response as any) = response[method]();
      return map ? (response as any).then(map) : response;
    }
    throw TypeError(
      "Fetch failed: " + response.status + " " + response.statusText,
    );
  });
}
