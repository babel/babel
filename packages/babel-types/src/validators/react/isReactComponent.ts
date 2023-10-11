import buildMatchMemberExpression from "../buildMatchMemberExpression.ts";

const isReactComponent = buildMatchMemberExpression("React.Component");

export default isReactComponent;
