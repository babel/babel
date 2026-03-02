const babel = require("@babel/core");

const code = `
let { a, ...rest } = obj;
let abc = { ...rest, c: 123 };
`;

const plugin = ({ types: t }) => {
    return {
        visitor: {
            ObjectExpression(path) {
                let isFirstSpread = true;
                for (const prop of path.node.properties) {
                    if (t.isSpreadElement(prop)) {
                        if (isFirstSpread && t.isIdentifier(prop.argument)) {
                            isFirstSpread = false;
                            const binding = path.scope.getBinding(prop.argument.name);
                            console.log("Found spread identifier:", prop.argument.name);
                            if (binding) {
                                console.log("  references:", binding.references);
                                console.log("  constant:", binding.constant);
                                console.log("  path.type:", binding.path.type);
                                if (binding.path.isVariableDeclarator()) {
                                    console.log("  init.type:", binding.path.get("init").type);
                                    if (binding.path.get("init").isCallExpression()) {
                                        console.log("  init isCallExpression!");
                                        const callee = binding.path.get("init.callee");
                                        console.log("  callee.type:", callee.type);
                                        if (callee.isIdentifier()) {
                                            console.log("  callee name:", callee.node.name);
                                        } else if (callee.isMemberExpression()) {
                                            console.log("  callee property:", callee.get("property").node.name);
                                            if (callee.get("object").isIdentifier()) {
                                                console.log("  callee object:", callee.get("object").node.name);
                                            } else {
                                                console.log("  callee object type:", callee.get("object").type);
                                            }
                                        } else if (callee.isSequenceExpression()) {
                                            console.log("  callee sequence length:", callee.get("expressions").length);
                                            const lastExpr = callee.get("expressions")[callee.get("expressions").length - 1];
                                            console.log("  last expr type:", lastExpr.type);
                                            if (lastExpr.isMemberExpression()) {
                                                console.log("  last expr property:", lastExpr.get("property").node.name);
                                                if (lastExpr.get("object").isIdentifier()) console.log("  last expr object:", lastExpr.get("object").node.name);
                                            }
                                        }
                                    }
                                }
                            } else {
                                console.log("  no binding found");
                            }
                        }
                    } else {
                        isFirstSpread = false;
                    }
                }
            }
        }
    };
};

// Use standalone transform without full preset env
babel.transformSync(code, {
    filename: "test.js",
    configFile: false,
    babelrc: false,
    plugins: ["./packages/babel-plugin-transform-object-rest-spread", plugin]
});
