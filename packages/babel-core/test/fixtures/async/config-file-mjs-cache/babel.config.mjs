export default function (api) {
  api.cache.never();

  return {
    plugins: ["./plugin"],
  };
}
