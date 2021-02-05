module.exports = () => ({
  plugins: [["@babel/plugin-transform-react-jsx", { pragma: "___EmotionJSX", runtime: "classic" }]],
});
