// @flow
import buildMatchMemberExpression from "../buildMatchMemberExpression";

const isReactComponent = buildMatchMemberExpression("React.Component");

export default isReactComponent;
